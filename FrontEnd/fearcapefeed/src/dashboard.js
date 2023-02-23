import {React, Component} from 'react';
import axios from 'axios';
import {address} from './variables';

import "./dashboard.css";
import Admin from './admin';
import userImage from "./resources/profilepic.jpg";
import image from "./resources/hd-wallpaper-g6cdf55a9b_1920.jpg";

export default class Dashboard extends Component {
    state={
        apiResponse:" ",userid:'',firstname:'',lastname:'',organizationname:'',organizationid:'',
        isloggedin:'',image:'',imagefile:null,filechosen:false, preview:"" ,posts:[],details:[],chats:[],
        userValue:'',userselected:false,selecteduserId:'',curDT : new Date().toLocaleString(),chatselected:false,
        status:0,showallposts:false,selectedpostid:'',latitude:'0',longitude:'0',selectedPosttype:"",
    }
    constructor(props){
		super(props);
        this.showPostform=this.showPostform.bind(this);
        this.showPostformimage=this.showPostformimage.bind(this);
        this.filechange=this.filechange.bind(this);   
        this.uploadimage=this.uploadimage.bind(this);
        this.post=this.post.bind(this);
        this.selectusers=this.selectusers.bind(this);
        this.emergency=this.emergency.bind(this);
        this.normal=this.normal.bind(this);
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
        fetch(address+"uploadpost?userid="+window.localStorage.getItem("userid"))
        .then(res =>res.json())
        .then(res => this.setState({ posts: res })); 
        fetch(address+"selectusers?userid="+window.localStorage.getItem("userid"))
        .then(res =>res.json())
        .then(res=> this.setState({ details: res}));
    }
    
    showPostform(){
        var el = document.getElementById('post-form');
        var bt=document.getElementById('plus-ic');
        if(el.classList.contains('show-post-form')){
            el.classList.remove('show-post-form');
            el.classList.remove('show-post-form-image');
            bt.classList.remove('plus-to-cross');
        }else{
            el.classList.add('show-post-form');
            bt.classList.add('plus-to-cross');
        }
    }   
    showPostformimage(){
        var el = document.getElementById('post-form');
        var bt=document.getElementById('plus-ic');
        if(el.classList.contains('show-post-form-image')){
            el.classList.remove('show-post-form-image');
            bt.classList.remove('plus-to-cross');
        }else{
            el.classList.add('show-post-form-image');
        }
    }   
filechange(e){
    var files= e.target.files[0];  
    this.setState({
        imagefile: files,
        filechosen:true,
        preview : URL.createObjectURL(e.target.files[0])
    })
  }
  uploadimage(){
    document.getElementById('img-file').click();
  }
  post(){ 
    var postType = this.state.selectedPosttype;
    if(postType==='emergency'){
        postType=1
    }else{
        postType=2
    }
    var postText = document.getElementById("post-text").value;
    let formdata = new FormData();
    formdata.append('image', this.state.imagefile);
    formdata.append('posttype', postType);
    formdata.append('posttext', postText);
    formdata.append('userid',window.localStorage.getItem("userid"));
    formdata.append('organizationid',window.localStorage.getItem("orgid"));
    formdata.append('organizationname',window.localStorage.getItem("org"));
    formdata.append('lat', this.state.latitude);
    formdata.append('long', this.state.longitude);
    axios.post(address+'createpost',formdata)
    .then(res=>{
        window.location.reload();
    });
}

selectusers(e){
    var a = e.currentTarget.dataset.firstname;
    var b = e.currentTarget.dataset.lastname;
    var c = e.currentTarget.dataset.userid;
    var d = e.currentTarget.dataset.image;
    this.setState({
        userselected:true,
        chatselected:true,
        selecteduserId:c,
        selecteduserIdprop:c
    });
    document.getElementById("selected_image").setAttribute("src","data:image/gif;base64,"+d)
    document.getElementById("selected_name").innerHTML = " "+a+" "+b  
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
emergency(e){
    var prev=document.getElementsByClassName('selected')[0];
    if(prev){
        prev.classList.remove('selected')
    }
    e.currentTarget.classList.add('selected');
    this.setState({
        showallposts:false,
    });
}
normal(e){
    var prev=document.getElementsByClassName('selected')[0];
    if(prev){
        prev.classList.remove('selected')
    }
    e.currentTarget.classList.add('selected')
    this.setState({
        showallposts:true,
    });
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
    const data={
        postid:postid,
        userid:window.localStorage.getItem("userid")
    }

    axios.post(address+'likepost',data)
    .then(res=>{
        window.location.reload();
    });
}
unlike(e){
    var postid=e.currentTarget.dataset.pid;
    const data={
        postid:postid,
        userid:window.localStorage.getItem("userid")
    }
    
    axios.post(address+'unlikepost',data)
    .then(res=>{
        window.location.reload();
    });
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
            {window.localStorage.getItem('role')=='USER' &&
            window.localStorage.getItem('status')==0 &&
            <div className='dashboard'>
            <p>Your Account is waiting for approval by admin! You will be able to access the app once your account is approved by admin</p>
            <p>Please note your userid for logging into the app<br/>userid: {window.localStorage.getItem('userid')}</p>
            <div className="logout">
                        <button type="button"  onClick={this.logout} id="logoutbtn"><a>Logout</a></button>
            </div>
            </div>
            }
            {window.localStorage.getItem('role')!='USER' &&
            <div className='dashboard'>
                <p>Hi {window.localStorage.getItem('firstname')}! Profiles are waiting for your approval</p>
                <div className="logout_admin">
                        <button type="button"  onClick={this.logout} id="logoutbtn"><a>Logout</a></button>
                </div>
                <Admin/>
            </div>
            }   
        {window.localStorage.getItem('role')=='USER' &&
        window.localStorage.getItem('status')==1 &&
        <div className='container-fluid p-0 m-0'>
        <div className='rows sticky-nav bg-1'>
                <div className='container pt-2 pb-2'>
                <a className='brand' href="#icon">FCF</a>
                <ul className='nav-menu'>
                    <li><a className="nav-icon selected" href="/dashboard"><i className='fa fa-home'></i>Home</a></li>
                    <li><a className='nav-icon' href="/groups"><i className="fa fa-group"></i>{this.state.organizationname}</a></li>
                    {/* <li><a className="nav-icon" ><i className="fa fa-user"></i>Volunteer</a></li> */}
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
                            <h2 className='create-post-name'>Create Post</h2>
                            
                            <div className='create-post-btn'>
                                <button id="plus-ic" className='create-post-btn bg-green ' onClick={this.showPostform} type='button' placeholder='create'><i className='fa fa-plus'></i></button>
                            </div>
                        </div>
                        <div id="post-form" className='post-form' >
                            <div className='form-group'>
                            <label>Post Type : </label>
                            <form>
                                <div className="radio">
                                    <label><input type="radio" id="post-type" value="emergency" checked={this.state.selectedPosttype=="emergency"} onChange={this.handleOptionChange} />Emergency</label>
                                    <label><input type="radio" id="post-type" value="normal" checked={this.state.selectedPosttype=="normal"} onChange={this.handleOptionChange} />Normal</label>
                                </div>
                            </form>
                            </div>
                            <textarea id="post-text" className='post-text' type="text" rows="3" placeholder="Write somethng .." ></textarea>

                            <div className='uploads inline' id='uploads' >
                                <p className='col-md-4 inline-block' id="post-image" onClick={this.uploadimage}>
                                    <i className='fa fa-camera' id='fa-camera' onClick={this.showPostformimage}></i>Image
                                    <input type='file' id="img-file" name="imageUpload" accept='image/jpg, image/png, image/jpeg' className='d-none'onChange={this.filechange}/>  
                                </p>
                                <a className='col-md-4 inline-block location' onClick={this.taglocation}><i className='fa fa-map-marker'></i> Tag location</a>
                            
                                <div className='post-btn col-md-4 inline-block'>
                                    <button className='post-btn bg-green' type='button' onClick={this.post} placeholder='create'><a>Post</a> </button>
                                </div>
                                {!this.state.preview && <img src={''} height='0' width='0'/>} 
                                {this.state.preview && <img id="img-post" src={this.state.preview} />}
                            </div>
                        </div>
                    </div>
                    <div className='tab-pane'>
                        <button className='tab selected' onClick={this.emergency}><a>Emergency</a></button>
                        <button className='tab'  onClick={this.normal}><a>All Posts</a> </button>
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
                            var daytext;
                            var likes,isliked,locurl;
                            if(daysint==0){
                                if(hrdiff==0){
                                    daytext=mins+" minutes ago"
                                }else{
                                    daytext=hrdiff+" hours ago"
                                }
                            }else{
                                daytext=daysint+" days ago";
                            } 
                            post.likes?likes=post.likes:likes=0;
                            post.userlike==1?isliked=true:isliked=false;
                            locurl="https://www.google.com/maps/@"+post.lat+","+post.longitude+",15z"
                            
                            if(this.state.showallposts==false){
                                if(post.post_type==1){
                                    return<div className={'post-pane'}>
                                        <div className='location_marker'>
                                            <a target="_blank" href={locurl}><i className='fa fa-map-marker'></i></a>
                                        </div>
                                        <div className='title'>
                                        <div className='image'>
                                            <img className="user-image" id="pic" src={"data:image/gif;base64,"+post.image} alt="login image"/>
                                        </div>
                                        <div>
                                            <h6>{post.firstname} {post.lastname}</h6>
                                            <p>{daytext}</p>
                                        </div>
                                        
                                    </div>
                                <div className='content'>
                                <p>{post.post_text}</p>
                                <div className='post-image'>
                                <img className="" id="pic" src={"data:image/gif;base64,"+post.imageUpload} alt="login image" />
    
                                </div>
                                </div>
                                <div className='actions'>
                                
                                        
                                </div>
                                
                                <div className='commenttext'>
                                        
                                {isliked==true&&<button className='post_likes liked' type='button' data-pid={post.postid} onClick={this.unlike} ><i className="fa fa-thumbs-up" ></i>{likes}</button>}
                                        {isliked!=true&&<button className='post_likes' type='button' data-pid={post.postid} onClick={this.like} ><i className="fa fa-thumbs-up" ></i>{likes}</button>}
                                        <input type="text"  id="commentsend" placeholder="Comment Here..." />
                                        <button className='commentsend bg-green' type='button' data-postid={post.postid} onClick={this.commentSend} ><i className="fa fa-send" ></i> </button>
                                        <button className='comment' type='button' onClick={this.selectPosts} data-postid={post.postid}><i className='fa fa-comments'></i></button>    
                                </div>
                                <div>
                                    {this.state.selectedpostid==post.postid &&
                                        <div>
                                            <PostComments key={this.state.selectedpostid} SPId={this.state.selectedpostid}/>
                                        </div>
                                    }
                                </div>
                            </div>}
                            }else{
                                return<div className='post-pane'>
                                    <div className='location_marker'>
                                            <a target="_blank" href={locurl}><i className='fa fa-map-marker'></i></a>
                                        </div>
                                        <div className='title'>
                                        <div className='image'>
                                            <img className="user-image" id="pic" src={"data:image/gif;base64,"+post.image} alt="login image"/>
                                        </div>
                                        <div>
                                            <h6 >{post.firstname} {post.lastname}</h6>
                                            <p>{daytext}  {post.userlike}</p>
                                        </div>
                                    </div>
                                <div className='content'>
                                <p>{post.post_text}</p>
                                <div className='post-image'>
                                <img className="" id="pic" src={"data:image/gif;base64,"+post.imageUpload} alt="login image" />
    
                                </div>
                                </div>
                                <div className='actions'>
                                                                     
                                </div>
                                <div className='commenttext'>
                                    {isliked==true&&<button className='post_likes liked' type='button' data-pid={post.postid} onClick={this.unlike} ><i className="fa fa-thumbs-up" ></i>{likes}</button>}
                                        {isliked!=true&&<button className='post_likes' type='button' data-pid={post.postid} onClick={this.like} ><i className="fa fa-thumbs-up" ></i>{likes}</button>}
                                            <input type="text"  id="commentsend" placeholder="Comment Here..." />
                                            <button className='commentsend bg-green' type='button' data-postid={post.postid} onClick={this.commentSend} ><i className="fa fa-send" ></i> </button>
                                            <button className='comment' type='button' onClick={this.selectPosts} data-postid={post.postid}><i className='fa fa-comments'></i></button>
                                    </div>
                                <div>
                                    {this.state.selectedpostid==post.postid &&
                                        <div>
                                            <PostComments key={this.state.selectedpostid} SPId={this.state.selectedpostid}/>
                                        </div>
                                    }
                                </div>
                            </div>
                            }
                        })}
                    </div>   
                </div>
                <div className="col-md-3 right-pane mx-3 bg-white">
                    <div className='users bg-green'>
                        <h3>Users</h3>
                    </div>
                    {/* <div className='search-bar'>
                       <i className="fa fa-search icon"></i>
                        <input className="input-field" type="text"
                          placeholder="Search.." />
                    </div> */}
                    <div className='users-select'>
                        <ul>
                            {this.state.details.map((detail)=>{
                                return<div className='users-pane '><a onClick={this.selectusers} data-userid={detail.user_id} data-firstname={detail.firstname} data-lastname={detail.lastname}
                                    data-image={detail.image}>
                                    <div className='multiple-users ' >
                                        <div className='user-image ' >
                                            <img className="user-image" id="pic" src={"data:image/gif;base64,"+detail.image}  alt="login image"/>
                                        </div>
                                        <div >
                                            <h6>{detail.firstname} {detail.lastname}</h6>
                                        </div>
                                    </div>
                                    </a>
                                </div>
                            })}
                        </ul>
                    </div>
                    {!this.state.userselected && <p id="zero-users">Select users to chat</p>} 
                    <div className={'chat-section visible-'+this.state.userselected}>
                        <div className='users bg-green'>
                            <h3 className='chat-title '>
                                <img id="selected_image" className='chat-title-img '/>
                                <b id="selected_name">Name</b>
                                {/* <a className='refresh' onClick={this.refreshchat}><i className='fa fa-refresh'></i></a> */}
                            </h3>
                        </div>
                    {this.state.chatselected && 
                            <UserChat key={this.state.selecteduserId} suId={this.state.selecteduserId}/>
                       }
                        
                    </div>        
                </div>    
            </div>
        </div>
    </div>}
        
    </>
    )}
}
class UserChat extends Component{
    state={
        chats:[],
        recuid:'',
        curDT : new Date().toLocaleString(),
        count:0,
        intervalId:0,
        timerId:null
    }
    constructor(props){
		super(props);
        this.callChat=this.callChat.bind(this);
        this.chatsend=this.chatsend.bind(this);
        this.refreshchat=this.refreshchat.bind(this);
    }
    componentDidMount(){
        this.callChat(this.props.suId);
        
    }
    componentWillUnmount(){
    }
    
    callChat(recid){
        fetch(address+"getchatdata?userid="+window.localStorage.getItem("userid")+"&recieverid="+recid)
        .then(res =>res.json())
        .then(res=> this.setState({ chats: res, recuid:recid}));
    }
    chatsend(){
        var chat = document.getElementById("chatsend").value;
        var sender = window.localStorage.getItem("userid");
        var reciever = this.props.suId;
        var date = this.state.curDT;
        let formdata = new FormData();
        formdata.append('chatsend', chat);
        formdata.append('sender',sender);
        formdata.append('reciever',reciever);
        formdata.append("timestamp",date);
        axios.post(address+'chatdata',formdata)
        .then(res=>{
            document.getElementById("chatsend").value="";
            this.callChat(reciever);
        });
    }
    refreshchat(){
        this.callChat(this.props.suId);
    }
    
    render(){
        return <>
        <div className='chat-box'>
             <a className='refresh' onClick={this.refreshchat}><i className='fa fa-refresh'></i></a>
            <ul className='list-none pl-15'>
                {this.state.chats.map((cht)=>{
                    if(cht.from_user==window.localStorage.getItem("userid")){
                        return <li className='from-message'>{cht.message} <span>{cht.time_stamp}</span></li>}
                    else{
                        return <li className='to-message'>{cht.message} <span>{cht.time_stamp}</span></li>
                    }
                })}
                
            </ul></div>
            <div className='post-bar'>
                            <div className='post-text-bar'>
                                <input type="text" placeholder="Type Here.." id="chatsend"/>
                                <div >
                                    <button className='post-message-btn bg-green' type='button' onClick={this.chatsend} ><i className="fa fa-send" ></i> </button>
                                </div>
                            </div>  
                        </div>
        </>
    }
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
        fetch(address+"getcommentdata?userid="+window.localStorage.getItem("userid")+"&postid="+postid)
        .then(res =>res.json())
        .then(res => this.setState({ comments: res, postId:postid}))
        
    }
    render(){
        return <>
            <ul className='list-none'>
                {this.state.comments.map((comment)=>{
                    return <div className='post_comments'>
                        <p className='commenter'><span className='commenter_image'><img src={'data:image/gif;base64,'+comment.image}/></span>{comment.firstname} {comment.lastname}<span className='comment_when'>{comment.time_stamp}</span></p>
                        <p className='user_comment'>{comment.comments}</p>
                    </div>
                    ;
                })}
            </ul>
        </>
    }
}