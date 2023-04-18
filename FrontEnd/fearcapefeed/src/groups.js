import {React, Component} from 'react';
import axios from 'axios';
import "./dashboard.css";
import userImage from "./resources/profilepic.jpg";
import {address} from './variables';


import image from "./resources/grouplogo.png";

export default class GroupBoard extends Component {
    state = {
        apiResponse:" ",userid:'',firstname:'',lastname:'',organizationname:'',organizationid:'',isloggedin:'',
        image:'',imagefile:null,filechosen:false, preview:"",showallposts:false,curDT : new Date().toLocaleString(),
        posts:[],details:[],selectedpostid:'',latitude:'0',longitude:'0',selectedPosttype:"",videofile:null,
        videochose:false,imagechoose:false,imagetype:null,
    }
    constructor(props){
		super(props);
        this.showPostform=this.showPostform.bind(this);
        this.showPostformimage=this.showPostformimage.bind(this);
        this.filechange=this.filechange.bind(this);
        this.uploadimage=this.uploadimage.bind(this);
        this.post=this.post.bind(this);
        this.emergency=this.emergency.bind(this);
        this.normal=this.normal.bind(this);
        this.logincheck=this.logincheck.bind(this);
        this.selectPosts=this.selectPosts.bind(this);
        this.commentSend=this.commentSend.bind(this);
        this.chatsend=this.chatsend.bind(this);
        this.taglocation=this.taglocation.bind(this);
        this.handleOptionChange=this.handleOptionChange.bind(this);
    }
    componentDidMount(){
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
        
        fetch(address+"uploadgrouppost?orgid="+window.localStorage.getItem("orgid")+"&userid="+window.localStorage.getItem("userid"))
        .then(res =>res.json())
        .then(res=> this.setState({ posts: res}));
        fetch(address+"groupusers?orgid="+window.localStorage.getItem("orgid")+"&userid="+window.localStorage.getItem("userid"))
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
        }else{
            el.classList.add('show-post-form-image');        }
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
        var postType = this.state.selectedPosttype;
        if(postType==='emergency'){
            postType=1
        }else{
            postType=2
        }
        var postText = document.getElementById("post-text").value;
        if(this.state.filechosen==false){
            let formdata = new FormData();
            formdata.append('posttype', postType);
            formdata.append('posttext', postText);
            formdata.append('userid',window.localStorage.getItem("userid"));
            formdata.append('organizationid',window.localStorage.getItem("orgid"));
            formdata.append('organizationname',window.localStorage.getItem("org"));
            formdata.append('lat', this.state.latitude);
            formdata.append('long', this.state.longitude);
            axios.post(address+'grouppostmsg',formdata)
            .then(res=>{
                window.location.reload();
            });
        }
        else{
            let formdata = new FormData();
            formdata.append('image', this.state.imagefile);
            formdata.append('posttype', postType);
            formdata.append('posttext', postText);
            formdata.append('userid',window.localStorage.getItem("userid"));
            formdata.append('organizationid',window.localStorage.getItem("orgid"));
            formdata.append('organizationname',window.localStorage.getItem("org"));
            formdata.append('lat', this.state.latitude);
            formdata.append('long', this.state.longitude);
            formdata.append('imagetype', this.state.imagetype); 
            axios.post(address+'grouppost',formdata)
            .then(res=>{
                window.location.reload();
            });
        }   
    }
    chatsend(){
        var chat = document.getElementById("chatsend").value;
        var sender = this.state.userid;
        var orgid = window.localStorage.getItem("orgid");
        var date = this.state.curDT;
        let formdata = new FormData();
        formdata.append('chatsend', chat);
        formdata.append('sender',sender);
        formdata.append('orgid',orgid);
        formdata.append("timestamp",date);
        axios.post(address+'groupchatdata',formdata)
        .then(res=>{
            window.location.reload();
        });
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
        <div className='container-fluid p-0 m-0'>
            <div className='group-rows sticky-nav bg-1'>
            <div className='container pt-2 pb-2'>
                <a className='brand' href="#icon">FCF</a>
                <ul className='nav-menu'>
                    <li><a className="nav-icon" href="/dashboard"><i className='fa fa-home'></i>Home</a></li>
                    <li><a className='nav-icon selected' href="/groups"><i className="fa fa-group"></i>{this.state.organizationname}</a></li>
                    <li><a className="nav-icon" href="/volunteeres" ><i className="fa fa-user"></i>Volunteer</a></li>
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
                            <h5>Group</h5>
                            <h6> {this.state.organizationname} Group</h6>
                            
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
                            <div id="post-form" className='post-form'>
                            <div className='form-group'>
                            <label>Post Type : </label>
                            <form>
                                <div className="radio">
                                    <label><input type="radio" id="post-type" value="emergency" checked={this.state.selectedPosttype=="emergency"} onChange={this.handleOptionChange} />Emergency</label>
                                    <label><input type="radio" id="post-type" value="normal" checked={this.state.selectedPosttype=="normal"} onChange={this.handleOptionChange} />Normal</label>
                                </div>
                            </form>
                            </div>
                                <textarea className='post-text' id="post-text" type="text" rows="3" placeholder="write somethng .." ></textarea>
                                
                                <div className='uploads inline'>
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
                                    {!this.state.videochose && <img id="img-post" src={this.state.preview} />}
                                    {this.state.videochose && <video id="img-post" controls src={this.state.preview} />}
                                </a>}
                                </div>
                            </div>
                        </div>
                        <div className='tab-pane'>
                            <button className='tab selected' onClick={this.emergency}><a>Emergency</a></button>
                            <button className='tab'  onClick={this.normal}><a>All Posts</a> </button>
                        </div>
                        
                        <div className='group-posts'>
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
                                var daytext,likes,isliked,locurl;
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
                                if(post.imageUpload!=null){
                                    if(this.state.showallposts==false){
                                        if(post.post_type==1){
                                            return<div className='post-pane'>
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
                                    <p>{post.post_text}</p>
                                    <div className='post-image'>
                                        {post.imagetype==1&&<video controls className="videoview" type="video/mp4" src={"data:video/mp4;base64,"+post.imageUpload}/>}
                                        {post.imagetype==0&&<img className="" id="pic" src={"data:image/gif;base64,"+post.imageUpload} alt="login image" />}
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
                                                    <img className="user-image-div" id="pic" src={"data:image/gif;base64,"+post.image} alt="login image"/>
                                                </div>
                                                <div>
                                                    <h6 >{post.firstname} {post.lastname}</h6>
                                                    <p>{daytext}</p>
                                                </div>
                                            </div>
                                        <div className='content'>
                                        <p>{post.post_text}</p>
                                        <div className='post-image'>
                                        {post.imagetype==1&&<video controls className="videoview" type="video/mp4" src={"data:video/mp4;base64,"+post.imageUpload}/>}
                                        {post.imagetype==0&&<img className="" id="pic" src={"data:image/gif;base64,"+post.imageUpload} alt="login image" />}
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
                                }else{
                                    if(this.state.showallposts==false){
                                        if(post.post_type==1){
                                            return<div className='post-pane'>
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
                                            <p>{post.post_text}</p>
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
                                                    <img className="user-image-div" id="pic" src={"data:image/gif;base64,"+post.image} alt="login image"/>
                                                </div>
                                                <div>
                                                    <h6 >{post.firstname} {post.lastname}</h6>
                                                    <p>{daytext}</p>
                                                </div>
                                            </div>
                                        <div className='content'>
                                        <p>{post.post_text}</p>
                                        
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
                                }
                            })}
                        </div>
                    </div>

                    <div className="col-md-3 right-pane mx-3 bg-white">
                    <div className='users bg-green'>
                            <h3>Users</h3>
                        </div>
                        <div className='users-select-group'>
                            <ul>
                                {this.state.details.map((detail)=>{
                                    return<div className='users-pane '>
                                        <div className='multiple-users ' >
                                            <div className='user-image ' >
                                                <img className="user-image-div" id="pic" src={"data:image/gif;base64,"+detail.image}  alt="login image"/>
                                            </div>
                                            <div >
                                                <h6>{detail.firstname} {detail.lastname}</h6>
                                            </div>
                                        </div>
                                        
                                    </div>
                                })}
                            </ul>
                        </div>
                        <div className='chat-section'>
                        <div className='users bg-green'>
                                <h3 className='chat-title '>
                                    <img id="selected_image" className='chat-title-img'  src={image}/>
                                    <b>{this.state.organizationname}</b>
                                </h3>
                            </div>
                        <div className='group-chat'>
                                <UserChat />
                            </div>
                            <div className='post-bar'>
                                <div className='post-text-bar'>
                                    <input type="text" placeholder="Type Here.." id="chatsend"/>
                                    <div >
                                        <button className='post-message-btn bg-green' type='button' onClick={this.chatsend} ><i className="fa fa-send" ></i> </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>        
                </div>
            </div>
        </div>
    </>
    )}
}
class UserChat extends Component{
    state={
        chats:[]
    }
    constructor(props){
		super(props);
        this.callChat=this.callChat.bind(this);
    }
    componentDidMount(){      
       this.callChat();
    }
    
    callChat(){
        fetch(address+"getgroupchatdata?userid="+window.localStorage.getItem("userid")+"&orgid="+window.localStorage.getItem("orgid"))
        .then(res =>res.json())
        .then(res=> this.setState({ chats: res}));
    }
    
    render(){
        return <>
            <ul className='list-none pl-15'>
                {this.state.chats.map((cht)=>{
                    if(cht.user_id!=window.localStorage.getItem("userid")){
                        return <li className='from-message'><span>{cht.firstname} {cht.lastname}</span>{cht.message} <span>{cht.time_stamp}</span></li>}
                    else{
                        return <li className='to-message'><span>{cht.firstname} {cht.lastname}</span>{cht.message} <span>{cht.time_stamp}</span></li>
                    }
                })}
                
            </ul>
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
                   <p className='commenter'><span className='commenter_image'><img src={'data:image/gif;base64,'+comment.image}/></span> {comment.firstname} {comment.lastname}<span className='comment_when'>{comment.time_stamp}</span></p>
                   <p className='user_comment'>{comment.comments}</p>
               </div>
                    ;
                })}
            </ul>
        </>
    }
}