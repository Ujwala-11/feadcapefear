import {React, Component} from 'react';
import axios from 'axios';
import {address} from './variables';

import "./dashboard.css";

export default class Volunteer extends Component {
    state={
        apiResponse:" ",userid:'',firstname:'',lastname:'',organizationname:'',organizationid:'',
        isloggedin:'',image:'',imagefile:null,filechosen:false, preview:"" ,posts:[],details:[],chats:[],
        userValue:'',userselected:false,selecteduserId:'',curDT : new Date().toLocaleString(),chatselected:false,
        status:0,showallposts:false,selectedpostid:'',latitude:'0',longitude:'0',selectedPosttype:"",videofile:null,
        videochose:false,imagechoose:false,imagetype:null,
    }
    constructor(props){
		super(props);
        this.showPostform=this.showPostform.bind(this);
        this.showPostformimage=this.showPostformimage.bind(this);
        this.filechange=this.filechange.bind(this);   
        this.uploadimage=this.uploadimage.bind(this);
        this.post=this.post.bind(this);
        this.selectPosts=this.selectPosts.bind(this);
        this.commentSend=this.commentSend.bind(this);
        this.logincheck=this.logincheck.bind(this);
        this.like=this.like.bind(this);
        this.unlike=this.unlike.bind(this);
        this.taglocation=this.taglocation.bind(this);
        this.handleOptionChange=this.handleOptionChange.bind(this);
    }
    componentDidMount() {
        this.setState({userid:window.localStorage.getItem("userid")});
        this.setState({firstname:window.localStorage.getItem("firstname")});
        this.setState({lastname:window.localStorage.getItem("lastname")});
        this.setState({organizationname:window.localStorage.getItem("org")});
        this.setState({organizationid:window.localStorage.getItem("orgid")});
        this.setState({image:window.localStorage.getItem("image")});
        this.setState({isloggedin:window.localStorage.getItem("isloggedin")});
        this.logincheck();
        this.callAPI();  
    }
    logincheck(){
        var isloggedin= window.localStorage.getItem("isloggedin");
        if(!isloggedin){
            window.location.replace("/")
        }
    }
    callAPI() {
        fetch(address+"uploadevents?userid="+window.localStorage.getItem("userid"))
        .then(res =>res.json())
        .then(res => this.setState({ posts: res })); 
        fetch(address+"selectusers?userid="+window.localStorage.getItem("userid"))
        .then(res =>res.json())
        .then(res=> this.setState({ details: res}));
    }
    
    showPostform(){
        var el = document.getElementById('post-form');
        var bt=document.getElementById('plus-ic');
        if(el.classList.contains('show-post-form-vol')){
            el.classList.remove('show-post-form-vol');
            el.classList.remove('show-post-form-image-vol');
            bt.classList.remove('plus-to-cross');
        }else{
            el.classList.add('show-post-form-vol');
            bt.classList.add('plus-to-cross');
        }
    }   
    showPostformimage(){
        var el = document.getElementById('post-form');
        var bt=document.getElementById('plus-ic');
        if(el.classList.contains('show-post-form-image-vol')){
            el.classList.remove('show-post-form-image-vol');
        }else{
            el.classList.add('show-post-form-image-vol');
        }
    }   
filechange(e){
    var files= e.target.files[0];
    var extension = files.name.split(".").pop();
    if (extension === 'mp4'){
        this.setState({
            imagefile: files,
            videochose:true,
            filechosen:true,
            imagetype:1,
            preview : URL.createObjectURL(files)
        })
        alert(this.state.preview);
    }
    else{
        this.setState({
            imagefile: files,
            imagechose:true,
            filechosen:true,
            imagetype:0,
            preview : URL.createObjectURL(files)
        })
        alert(this.state.preview);
    }
  }
  uploadimage(){
    document.getElementById('img-file').click();
  }
  post(){ 
    var postText = document.getElementById("post-text").value;
    var enddate = document.getElementById("intro_from").value;
    var endtime = document.getElementById("appt").value;
    if(this.state.filechosen==false){
        let formdata = new FormData();
        formdata.append('posttext', postText);
        formdata.append('enddate', enddate);
        formdata.append('endtime', endtime);
        formdata.append('userid',window.localStorage.getItem("userid"));
        formdata.append('lat', this.state.latitude);
        formdata.append('long', this.state.longitude);
        axios.post(address+'createeventsmsg',formdata)
        .then(res=>{
            window.location.reload();
        });
    }
    else{
        let formdata = new FormData();
        formdata.append('image', this.state.imagefile);
        formdata.append('posttext', postText);
        formdata.append('enddate', enddate);
        formdata.append('endtime', endtime);
        formdata.append('imagetype', this.state.imagetype);
        formdata.append('userid',window.localStorage.getItem("userid"));
        formdata.append('lat', this.state.latitude);
        formdata.append('long', this.state.longitude);
        axios.post(address+'createevents',formdata)
        .then(res=>{
            window.location.reload();
        });
    }
}

commentSend(e){
    var comment = document.getElementById("commentsend").value;
    var userid = this.state.userid;
    var postid = e.currentTarget.dataset.postid;
    var date = this.state.curDT;
    let formdata = new FormData();
    formdata.append('commentsend', comment);
    formdata.append('userid',userid);
    formdata.append('postid',postid);
    formdata.append("timestamp",date);
    axios.post(address+'commentdata',formdata)
    .then(res=>{
        window.location.reload();
    });
}
selectPosts(e){
    var postid = e.currentTarget.dataset.postid;
    this.setState({
        selectedpostid:postid
    })
}
taglocation(e){
    var element = e.currentTarget;
    var istageed = element.classList.contains('added');
    if ('geolocation' in navigator&&!istageed) {
        var pos = navigator.geolocation.getCurrentPosition((position) => {
            this.setState({latitude:position.coords.latitude,longitude:position.coords.longitude});
            element.classList.add('added');
            alert("Location tagged successfully");
          });
      } else if(istageed){
        alert("Geolocation already tagged")
      }else{
        alert("Geolocation services are disabled for your browser")
      }
}
like(e){
    var postid=e.currentTarget.dataset.pid;
    var date = this.state.curDT;
    const data={
        postid:postid,
        userid:window.localStorage.getItem("userid"),
        date : date,
    }
    axios.post(address+'intrested',data)
    .then(res=>{
        window.location.reload();
    });
}
unlike(e){
   alert("Event request already sent");
}
ended(){
    alert("Participation Ended");
}
handleOptionChange(e) {
    this.setState({
        selectedPosttype:e.currentTarget.value
    })
}
  
logout(){
    window.localStorage.clear();
    window.location.reload();
    window.location.replace('/');
}
render(){
    return(
        <>
        <div className='container-fluid p-0 m-0'>
        <div className='rows sticky-nav bg-1'>
            <div className='container pt-2 pb-2'>
                <a className='brand' href="#icon">FCF</a>
                <ul className='nav-menu'>
                    <li><a className="nav-icon " href="/dashboard"><i className='fa fa-home'></i>Home</a></li>
                    <li><a className='nav-icon' href="/groups"><i className="fa fa-group"></i>{this.state.organizationname}</a></li>
                    <li><a className="nav-icon selected" href="/volunteeres"><i className="fa fa-user"></i>Volunteer</a></li>
                    <li><a className="nav-icon" onClick={this.logout} id="logoutbtn"><i className='fa fa-power-off'></i>Logout</a></li>
                </ul>
            </div>        
        </div>  
       
        <div className="container">
            <div className="d-flex custom-margin">
                <div className="col-md-3 left-pane mx-3 bg-white">
                    <div className='userImage-section bg-green'>
                        <div className="login-image-div">
                            <div className='image-div'>
                                <img className="user-image-img" id="pic" src={"data:image/gif;base64,"+this.state.image} alt="login image"/>
                            </div>
                        </div>
                            <h4>UserId: {this.state.userid}</h4>
                            <h6>Organization: {this.state.organizationname}</h6>
                    </div>
                    <div className='spacer-30'></div>
                    <div className="pane-content">    
                        <h5>Profile Content</h5>
                        <hr/>
                        <ul className='profile-content'>
                            <li>Name: {this.state.firstname} {this.state.lastname}</li>
                            <li>Organization Id:  {this.state.organizationid}</li>
                            <li>Organization : {this.state.organizationname}</li>
                        </ul>    
                    </div>
                    <hr/>
                </div>
                <div className="col-md-6 center-pane mx-1">
                    <div className='create-post-pane'>
                        <div className='creare-post-flex'>
                            <h2 className='create-post-name'>Create Event</h2>
                            <div className='create-post-btn'>
                                <button id="plus-ic" className='create-post-btn bg-green ' onClick={this.showPostform} type='button' placeholder='create'><i className='fa fa-plus'></i></button>
                            </div>
                        </div>
                        <div id="post-form" className='post-form' >
                            <textarea id="post-text" className='post-text' type="text" rows="3" placeholder="Write somethng .." ></textarea>
                            <div className='col-md-10 end-date-time inline-flex'>
                                <div className='col-md-5'>
                                <label className='form-label'>Event Date</label>
                                <input type="date" id="intro_from" className='form-input form-control'/></div>
                                <div className='col-md-5'>
                                <label for="appt">Event Start time</label>
                                <input type="time" id="appt" name="appt"/></div>
                            </div>
                            <div className='uploads inline' id='uploads' >
                                <p className='col-md-4 inline-block' id="post-image" onClick={this.uploadimage}>
                                    <i className='fa fa-camera' id='fa-camera' onClick={this.showPostformimage}><span>Image/Video</span></i>
                                    <input type='file' id="img-file" name="imageUpload" accept='image/jpg, image/png, image/jpeg,video/mp4' className='d-none'onChange={this.filechange}/>  
                                </p>
                                <a className='col-md-4 inline-block location' onClick={this.taglocation}><i className='fa fa-map-marker'></i> Tag location</a>
                                <div className='post-btn col-md-4 inline-block'>
                                    <button className='post-btn bg-green' type='button' onClick={this.post} placeholder='create'><a>Post</a> </button>
                                </div>
                                {!this.state.preview && <img src={''} height='0' width='0'/>}
                                {this.state.preview && <a>
                                    {!this.state.videochose &&<img id="img-post" src={this.state.preview} />}
                                    {this.state.videochose &&<video id="img-post" controls src={this.state.preview} />}
                                </a>}
                            </div>
                        </div>
                    </div>
                    <div className='posts'>
                        {this.state.posts.map((post)=>{
                            var pdate= post.time_stamp.split(" ")[0];
                            var ptime= post.time_stamp.split(" ")[1];
                            var dateParts = pdate.split("-");
                            var timeParts = ptime.split(":");
                            var hrs=timeParts[0];
                            var mins=timeParts[1];
                            var postdate = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0],hrs,mins);
                            var today=new Date();
                            var days= (today.getTime() - postdate.getTime())/86400000;
                            var daysint=parseInt(days);
                            var hrdiff=parseInt(days*24);
                            var mins=parseInt(days*24*60)
                            var daytext,intrest;                            
                            var intrested,isliked,locurl;
                            var enddate1 = post.event_end_date;
                            var todaydate1 = this.state.curDT;
                            var enddate = post.event_end_date.split("-");
                            var endyear=enddate[0];
                            var endmonth=enddate[1];
                            var endday=enddate[2];
                            var endtime = post.event_end_time.split(":");
                            var endhrs=endtime[0];
                            var endmins=endtime[1];
                            var todaydate= this.state.curDT.split(",")[0];
                            var todaytime1= this.state.curDT.split(" ")[1];  
                            var now = todaydate.split("/")
                            var todayyear=now[2];
                            var todaymonth=now[0];
                            var todayday=now[1];
                            var todaytime = todaytime1.split(":");
                            var todayhrs=todaytime[0];
                            var todaymins=todaytime[1];
                            if(endyear<=todayyear){
                                if( endmonth<=todaymonth){
                                    if(endday<=todayday ){
                                            intrest=true;
                                    }else{
                                        intrest=false;
                                    }
                                }else{
                                    intrest=false;
                                }                               
                            }else{
                                intrest=false;
                            }
                            if(daysint==0){
                                if(hrdiff==0){
                                    daytext=mins+" minutes ago"
                                }else{
                                    daytext=hrdiff+" hours ago"
                                }
                            }else{
                                daytext=daysint+" days ago";
                            } 
                            post.intrested?intrested=post.intrested:intrested=0;
                            post.userintrested==1?isliked=true:isliked=false;
                            locurl="https://www.google.com/maps/@"+post.lat+","+post.longitude+",15z";
                            if(post.imageUpload!=null){
                                return<div className={'post-pane'}>
                                    <div className='location_marker'>
                                        <a target="_blank" href={locurl}><i className='fa fa-map-marker'></i></a>
                                    </div>
                                    <div className='title'>
                                        <div className='image'>
                                            <img className="user-image-div" id="pic" src={"data:image/gif;base64,"+post.image} alt="login image"/>
                                        </div>
                                        <div>
                                            <h6>{post.firstname} {post.lastname}</h6>
                                            <p>{daytext}</p>
                                        </div>
                                    </div>
                                <div className='content'>
                                    <p>{post.event_text}</p>
                                    <div className='post-image'>
                                        {post.imagetype==1&&<video controls className="videoview" type="video/mp4" src={"data:video/mp4;base64,"+post.imageUpload}/>}
                                        {post.imagetype==0&&<img className="" id="pic" src={"data:image/gif;base64,"+post.imageUpload} alt="login image" />}
                                    </div>
                                </div>
                                <div className='actions'></div>
                                {intrest==false&&<div className='commenttext'>
                                    {isliked==true&&<button className='event_count liked' type='button' data-pid={post.eventid} onClick={this.unlike} ><span>Interested</span>{intrested}</button>}
                                    {isliked!=true&&<button className='event_count' type='button' data-pid={post.eventid} onClick={this.like} ><span>Interested</span>{intrested}</button>}
                                    {this.state.userid==post.user_id &&
                                        <button className='event_comment' type='button' onClick={this.selectPosts} data-postid={post.eventid}><i>Participants</i></button>
                                    }                                
                                </div>}
                                {intrest==true&&<div className='commenttext'>
                                    <button className='event_count ' type='button' onClick={this.ended}><span className=' end_btn'>Ended</span></button>
                                    {this.state.userid==post.user_id &&
                                        <button className='event_comment' type='button' onClick={this.selectPosts} data-postid={post.eventid}><i>Participants</i></button>
                                    }                               
                                </div>}
                                <div>
                                    {this.state.selectedpostid==post.eventid &&
                                        <div>
                                            <PostComments key={this.state.selectedpostid} SPId={this.state.selectedpostid}/>
                                        </div>
                                    }
                                </div>
                            </div>
                            }else{
                                return<div className={'post-pane'}>
                                    <div className='location_marker'>
                                        <a target="_blank" href={locurl}><i className='fa fa-map-marker'></i></a>
                                    </div>
                                    <div className='title'>
                                        <div className='image'>
                                            <img className="user-image-div" id="pic" src={"data:image/gif;base64,"+post.image} alt="login image"/>
                                        </div>
                                        <div>
                                            <h6>{post.firstname} {post.lastname} </h6>
                                            <p>{daytext}</p>
                                        </div>  
                                    </div>
                                <div className='content'>
                                    <p>{post.event_text}</p>
                                </div>
                                <div className='actions'></div>
                                {intrest==false&&<div className='commenttext'>
                                    {isliked==true&&<button className='event_count liked' type='button' data-pid={post.eventid} onClick={this.unlike} ><span>Interested</span>{intrested}</button>}
                                    {isliked!=true&&<button className='event_count' type='button' data-pid={post.eventid} onClick={this.like} ><span>Interested</span>{intrested}</button>}
                                    {this.state.userid==post.user_id &&
                                        <button className='event_comment' type='button' onClick={this.selectPosts} data-postid={post.eventid}><i>Participants</i></button>
                                    }                                
                                </div>}
                                {intrest==true&&<div className='commenttext'>
                                <button className='event_count ' type='button' onClick={this.ended}><span className=' end_btn'>Ended</span></button>
                                    {this.state.userid==post.user_id &&
                                        <button className='event_comment' type='button' onClick={this.selectPosts} data-postid={post.eventid}><i>Participants</i></button>
                                    }                                
                                </div>}
                                <div>
                                    {this.state.selectedpostid==post.eventid &&
                                        <div>
                                            <PostComments key={this.state.selectedpostid} SPId={this.state.selectedpostid}/>
                                        </div>
                                    }
                                </div>
                            </div>}
                        })}
                    </div>   
                </div>
            </div>
        </div>
    </div>
        
    </>
    )}
}
class PostComments extends Component{
    state={
        comments:[],
        postId:'',
    }
    constructor(props){
		super(props);
        this.callComments=this.callComments.bind(this);
    }
    componentDidMount(){      
       this.callComments(this.props.SPId);
    }
    callComments(postid){
        fetch(address+"geteventviews?userid="+window.localStorage.getItem("userid")+"&postid="+postid)
        .then(res =>res.json())
        .then(res => this.setState({ comments: res, postId:postid}))
        
    }
    render(){
        return <>
            <ul className='list-none-view '>
                {this.state.comments.map((comment)=>{
                    return <div className='view_comments'>
                        <p className='commenter'><span className='view_image'><img src={'data:image/gif;base64,'+comment.image}/></span> &nbsp;{comment.firstname} {comment.lastname}<span className='view_when'>{comment.time_stamp}</span></p>
                    </div>
                    ;
                })}
            </ul>
        </>
    }
}