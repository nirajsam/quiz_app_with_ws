import React, { Component } from 'react'
import Axios from 'axios';
import { Link } from 'react-router-dom';
import cfg from '../config'
var URL=cfg.URL
export default class UserShow extends Component {
    constructor(props){
        super(props);
        this.state={
            users:[],
            search:'',
            vSuccess:false
        }
    }
    componentWillMount(){
        Axios.get(`${URL}/api/users/getUser`).then((response)=>{
            console.log(response.data)
            this.setState({users:response.data})
        }).catch((error)=>{
            console.log(error)
        })
    }
    deleteResult=(email)=>{
        if(window.confirm("want to delete??")){
            // Axios.delete(`${URL}/api/results/${email}/${tName}`).then((response)=>{
            // console.log("deleted")
            
        // }).catch((error)=>{
        //     console.log(error)
        // })
          }
        
    }
    verifyStudent=(name,email,v)=>{
        // this.setState({verifySt:!this.state.verifySt})
        Axios.put(`${URL}/api/users/vSt`,{name:name,email:email,verify:v}).then((res)=>{
            this.setState({vSuccess:true})
            alert("verify or dismiss done for one student")
        }).catch((error)=>{
            console.log(error)
        })
    }
    verifyTeacher=(name,email,v)=>{
        // this.setState({verifySt:!this.state.verifySt})
        Axios.put(`${URL}/api/users/vTr`,{name:name,email:email,isTeacher:v}).then((res)=>{
            this.setState({tSuccess:true})
            alert(" varified one teacher")
        }).catch((error)=>{
            console.log(error)
        })
    }
    render() {
        return (
            <div >        
        <div class="container">
        <h2>Registered user</h2>
        <input type="text" placeholder="search by name" onChange={(e)=>{return this.setState({search:e.target.value})}}></input>
        <p></p>
            <div className="table">            
            <table class="table table-bordered">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>class</th>
                    <th>Roll No</th>
                    <th>password</th>
                    <th>verify</th>
                    <th>delete</th>
                </tr>
                </thead>
                <tbody>
                {this.state.users.map((res)=>{
                    if(this.state.search){
                        if(res.name.toLowerCase().match(this.state.search.toLowerCase())){
                            return <tr>
                            <td>{res.name}</td>
                            <td>{res.email}</td>
                            <td>{res.class?res.class:"Teacher"}</td>
                            <td>{res.rollNo?res.rollNo:"unavailble"}</td>
                            <td>password</td>
                            <td>{!res.class?<button onClick={()=>{return this.verifyTeacher(res.name,res.email,!res.isTeacher)}}>{!res.isTeacher?"verifyTeacher":"dismisTeacher"}</button>:
                            <button onClick={()=>{return this.verifyStudent(res.name,res.email,!res.verify)}}>{!res.verify?"verifyStudent":"dismisStudent"}</button>}</td>
                            {/* <td>{res.usedHints}</td> */}
                            {/* <td>{res.fiftyFiftyUsed}</td> */}
                            <td onClick={()=>{return this.deleteResult(res.email,res.testName)}}><span className="mdi mdi-delete"></span></td>
                        </tr>
                        }else{
                            //
                        } 
                    }else{
                    return(
                        <tr>
                            <td>{res.name}</td>
                            <td>{res.email}</td>
                            <td>{res.class?res.class:"Teacher"}</td>
                            <td>{res.rollNo?res.rollNo:"unavailble"}</td>
                            <td>password</td>
                            <td>{!res.class?<button onClick={()=>{return this.verifyTeacher(res.name,res.email,!res.isTeacher)}}>{!res.isTeacher?"verifyTeacher":"dismisTeacher"}</button>:
                            <button onClick={()=>{return this.verifyStudent(res.name,res.email,!res.verify)}}>{!res.verify?"verifyStudent":"dismisStudent"}</button>}</td>
                            {/* <td>{res.usedHints}</td> */}
                            {/* <td>{res.fiftyFiftyUsed}</td> */}
                            <td onClick={()=>{return this.deleteResult(res.email,res.testName)}}><span className="mdi mdi-delete"></span></td>
                        </tr>
                    ) }
                })}
                
                </tbody>
            </table></div>
            </div>
            <div className="center"><Link to="/" ><button >Back Home</button></Link></div>
        </div>
        )
    }
}
