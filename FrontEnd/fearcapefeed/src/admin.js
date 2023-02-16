import {React, Component} from 'react';
import {address} from './variables';

import axios from 'axios';

export default class Admin extends Component {
    state={
        apiResponse:" ",userid:'',firstname:'',lastname:'',organizationname:'',organizationid:'',role:'',status:"",
        isloggedin:'',details:[]
    }
    constructor(props){
		super(props);
        this.logincheck=this.logincheck.bind(this);
        this.approve=this.approve.bind(this);
        this.decline=this.decline.bind(this);
    }
    componentDidMount() {
        this.setState({userid:window.localStorage.getItem("userid")});
        this.setState({firstname:window.localStorage.getItem("firstname")});
        this.setState({lastname:window.localStorage.getItem("lastname")});
        this.setState({organizationname:window.localStorage.getItem("org")});
        this.setState({organizationid:window.localStorage.getItem("orgid")});
        this.setState({image:window.localStorage.getItem("image")});
        this.setState({role:window.localStorage.getItem("role")});
        this.setState({status:window.localStorage.getItem("status")});
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
        fetch(address+'getadmin?status=0')
        .then(res =>res.json())
        .then(res=> this.setState({ details: res}));
    }
    approve(e){
        var userid = e.currentTarget.dataset.userid;
        let formdata = new FormData();
        formdata.append('userid',userid);
        axios.post(address+'adminapprove',formdata)
        .then(res=>{
            window.location.reload();
        });
    }
    decline(e){
        var userid = e.currentTarget.dataset.userid;
        let formdata = new FormData();
        formdata.append('userid',userid);
        axios.post(address+'admindecline',formdata)
        .then(res=>{
            window.location.reload();
        });
    }
    

render(){
    return(
        <>
        <div className='Admin'>
            <table>
                 <tr>
                    <th>Image</th>
                    <th>User</th>
                    <th>Organization</th>
                    <th>Status</th>
                </tr>
                {this.state.details.map((detail)=>{
                    return <>

                <tr>
                    <td><div className='user-image-container' >
                        <img className="user-image" id="pic" src={"data:image/gif;base64,"+detail.image}  alt="login image"/>
                        </div>
                    </td>
                    <td>
                    <div>
                            <h6>{detail.firstname} {detail.lastname}</h6>
                        </div>
                    </td>
                    <td>
                        <div>
                            <h5>{detail.organization_name}</h5>
                        </div>
                    </td>
                    <td>
                        <div className='aprove'>
                            <button className='aprovebtn' data-userid={detail.user_id} onClick={this.approve}><a>Approve</a></button>
                            <button className='declinebtn bg-red' data-userid={detail.user_id} onClick={this.decline}><a>Decline</a> </button>
                        </div>
                    </td>
                </tr>
                </>
                })}
                 </table>
        </div>
        
        
        
        </>
    )}
}