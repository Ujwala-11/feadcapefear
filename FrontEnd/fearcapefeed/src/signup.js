import {React, Component} from 'react';
import axios from "axios";
import "./signup.css";
import {address} from './variables';

import userImage from "./resources/profilepic.jpg";

export default class Signup extends Component {
    constructor(props){
		super(props);
		this.state = { apiResponse: "" ,userid:'',organizationname:"",organizationid:"",isloggedin:false,organizations:[],imagefile:null,imageurl:'' };
        this.preview=this.preview.bind(this);
        this.signingup=this.signingup.bind(this);
	}
	componentWillMount() {
        this.setState({userid:window.localStorage.getItem("userid")});
        this.setState({isloggedin:window.localStorage.getItem("isloggedin")});
        this.setState({organizationid:window.localStorage.getItem("organizationid")});
        this.setState({organizationname:window.localStorage.getItem("organizationname")});
        if(this.state.isloggedin){
            window.location.replace('/dashboard');
        }
        this.callAPI();
	}
    preview(e){
        var file=document.getElementById('image-file').files[0];
        this.setState({imageurl:URL.createObjectURL(file)});
        this.setState({imagefile:file});
    }
    callAPI() {
		fetch(address+"getorg")
			.then(res=>res.json())
            .then(res=>this.setState({organizations:res}));
	}
    imagechange(){
        let formdata = new FormData();
        formdata.append('image', this.state.imagefile);
        axios.post(address+"imageupload",formdata)
            .then((res)=>{window.location.reload();})
    }
    signingup(){
        var a = document.getElementById("password").value;
        var b = document.getElementById("confirmpassword").value;
        var c = document.getElementById("firstname").value;
        var d = document.getElementById("lastname").value;
        var e = document.getElementById("organizationId").value;
        var f=this.state.organizations.findIndex(x=>x.organization_id==e);
        var g =this.state.organizations[f].organization_name;
        
        let formdata = new FormData();
        formdata.append('image', this.state.imagefile);
        formdata.append('firstname', c);
        formdata.append('lastname', d);
        formdata.append('password', a);
        formdata.append('org_id',e);
        formdata.append('org_name', g);
        
        if (a === ""){
            document.getElementById("message").innerHTML="please fill password";
            return false;
        }
        else if(a.length < 6 ){
            document.getElementById("message").innerHTML="password length must be greather than 6";
            return false;
        }
        else if(a.length > 15 ){
            document.getElementById("message").innerHTML="password length must be smaller than 15";
            return false;
        }
        else if(a!==b){
            document.getElementById("message").innerHTML="passwords are not same";
            return false;
        }else{
            if(a&&c&&d&&e){
                const data = {
                    firstname: c,
                    lastname:d,
                    password:a,
                    org_id:e,
                    org_name:g,
                    
                };
                axios.post(address+'signup',formdata).then(res=>{
                    if(res.data){
                        alert("Note this is to login "+res.data.userid);
                        window.localStorage.setItem("userid",res.data.userid);
                        window.localStorage.setItem("role",res.data.role);
                        window.localStorage.setItem("status",res.data.status);
                        window.localStorage.setItem("isloggedin",true);
                        window.location.replace('/');
                        
                    }
                });
            }
        }
    }
render(){
    return(
        <>
        <div className='signup'>
            <div className="container curved-border">
            <center>
                <div className="row">
                    <div className="col-md-8 bg-white">
                        
                        <h3 className='signup-form-details'>Please fill your details</h3><br/>
                        <form>
                            <div className="login-image-div">
                                    {this.state.imageurl?
                                    <label className='image-div'>
                                        <img className="user-image" id="pic" src={this.state.imageurl} alt="login image"/>
                                    <input id="image-file" type="file" className='d-none' onChange={this.preview}/>
                                </label>
                                    :<label className='image-div'>
                                         <img className="user-image" id="pic" src={userImage} alt="login image"/>
                                    <input id="image-file" type="file" className='d-none' onChange={this.preview}/>
                                </label>
                                    }
                            </div>
                            <br/>
                            <input type="text" id="firstname" placeholder="First Name" name="firstname" required/>  <br />
                            <input type="text" id="lastname" placeholder="Last Name" name="lastname" required/>  <br />
                            <select name="organizationId" id="organizationId" defaultValue={0}>
                                <option value='0' disabled >Select Organization</option>
                                        {this.state.organizations.map((el,index)=>(
                                <option  key={index} value={el.organization_id}> {el.organization_name} </option>))}
                            </select>

                            <input type="password" id="password" placeholder="Password" name="password" required/><br />
                            
                            <input type="password" id="confirmpassword" placeholder="confirm Password" name="password" required/><br />
                            <span id="message"></span><br/>

                            <button type="button" onClick={this.signingup} className="signupbtn">signup</button>
                            
                           
                        </form>
                     
                    </div>
                        
                    <div className="col-md-4 bg-green">
                        <div className="newuser">
                                <h2>Already have an account? </h2><br/>
                                <p>Login with your credentials</p><br/>
                                <button type="button"><a href="/" target="_self" rel="noopener noreferrer" >Login</a></button>
                            </div>
                        </div>
                </div>
                </center>
            </div>
        </div>
        </>
    );
}
}