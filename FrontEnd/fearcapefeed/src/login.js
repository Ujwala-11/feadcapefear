import React, { Component } from "react";
import {address} from './variables';
import axios from "axios";
import './App.css';
import './login.css';

export default class Login extends Component{
    constructor(props){
		super(props);
		this.state = { apiResponse: "",password:'' ,isloggedin:false };
	}
	componentWillMount() {
        this.setState({
            isloggedin:window.localStorage.getItem("isloggedin"),
            password:window.localStorage.getItem("password"),
        })
        window.localStorage.clear();
        // if(this.state.isloggedin){
        //     window.location.replace('/dashboard');
        // }
	}
     login=()=>{
        var a= document.getElementById("password").value;
        var b=document.getElementById("userid").value;
        if(b&&a){
            const data = {
                userid: b,
                password: a,
            };
            axios.post(address+'login',data)
            .then(res => {
                if(res.data.user_id){
                console.log(res.data);
                window.localStorage.setItem("userid",res.data.user_id);
                window.localStorage.setItem("role",res.data.role);
                window.localStorage.setItem("status",res.data.status);
                window.localStorage.setItem("image",res.data.image);
                window.localStorage.setItem("firstname",res.data.firstname);
                window.localStorage.setItem("lastname",res.data.lastname);
                window.localStorage.setItem("org",res.data.organization_name);
                window.localStorage.setItem("orgid",res.data.organization_id);
                window.localStorage.setItem("isloggedin",true);
                window.location.replace('/dashboard');
                }else{
                    alert(res.data);
                }
                })
            .catch(err => {
                console.log(err)
            });
        }
    }
	render(){
    return(
        <>
        <section id="login">
            <center>
                <div className="container curved-border">
                    <div className="row">
                        <div className="col-md-8 bg-white">
                            <div>
                                <form> 
                                <center> <h3 className="login-details">Login to your account</h3></center>
                                <div className="login">
                                    <div className="forms">
                                        <input type="text" id="userid" placeholder="User Id" name="userid" required/>  <br />
                                        <input type="password" id="password" placeholder="Password" name="password" required/><br />
                                
                                        <span id="msg"></span><br/>

                                        <button type="button" onClick={this.login} className="loginbtn">Login</button>
                                    </div>
                                </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-4 bg-green">
                            <div className="newuser">
                                <h2>New Here ?</h2><br/>
                                <p>Signup and join your Organization Groups to be connected </p><br/>
                                <button type="button"><a href="signup" target="_self" rel="noopener noreferrer" >Sign Up</a></button>
                            </div>
                        </div>        
                    </div>
                </div>
            </center>
	    </section>
        </>
    );
	}
}