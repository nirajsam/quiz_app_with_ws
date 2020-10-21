import Axios from 'axios';
import React, { Component } from 'react'
import Cookie from 'js-cookie';
import cfg from '../config'
import { Link } from 'react-router-dom';
var URL=cfg.URL
export default class Profile extends Component {
    constructor(props){
        super(props);
        this.state={
            objTest:[],
            subTest:[]
        }
    }
    componentWillMount(){
        Axios.get(`${URL}/api/subAns/profile/${JSON.parse(Cookie.get('userInfo')).email}`).then((res)=>{
            console.log(res)
            this.setState({subTest:res.data})
            
        }).catch((error)=>{
            console.log(error)
        })
        Axios.get(`${URL}/api/results/profile/${JSON.parse(Cookie.get('userInfo')).email}`).then((res)=>{
            console.log(res)
            this.setState({objTest:res.data})
            
        }).catch((error)=>{
            console.log(error)
        })
    }
    render() {
        console.log(this.state.objTest)
        return (
            <div className=" center" style={{backgroundColor:"#add8e6",justifyContent:"center",margin:"10%"}}>
            <div >
                <span className="mdi mdi-account-circle" style={{fontSize:"100px"}}></span>
                <h2>{JSON.parse(Cookie.get('userInfo')).name}'s profile</h2>
            </div>
            <div >
                <ul className="center">
                    <li><b>Email Id:</b> {JSON.parse(Cookie.get('userInfo')).email}</li>
                    <li><b>class:</b> {JSON.parse(Cookie.get('userInfo')).class?JSON.parse(Cookie.get('userInfo')).class:"Teacher"}</li>
                </ul><br/>
                <div style={{backgroundColor:"#add8e6",color:"black"}}>
                <h4 style={{backgroundColor:"blue",color:"white"}}>Objective tests</h4>
                <table className="table table-striped table-responsive" >
                    <tr>
                        <th>testName</th>
                        <th>test Date</th>
                        <th>Marks obtained(%)</th>
                    </tr>
                    {this.state.objTest?this.state.objTest.map((t)=>{
                    return <tr><td><b>{t.testName} :</b></td><td>{t.date}</td> <td>{Math.round(t.score*10)/10}</td></tr>
                }):"no test given yet"}</table>
                </div>
                <div style={{backgroundColor:"#add8e6",color:"black"}}>
                <h4 style={{backgroundColor:"blue",color:"white"}}>subjective tests</h4>
                <table className="table table-striped table-responsive">
                    <tr>
                        <th>testName</th>
                        <th>test Date</th>
                        <th>Marks obtained</th>
                    </tr>
                {this.state.subTest.length?this.state.subTest.map((t)=>{
                    return <tr><td><b>{t.testName} :</b></td><td>{t.date}</td> <td>{typeof(t.testName)==Number?<span>{Math.round(Number(t.score)*10)/10}%</span>:t.marks}
                </td></tr>}):"no test given yet"}
                </table></div>
            </div>
            <span className="center"><button><Link to="/">back to homepage</Link></button></span>
            </div>
        )
    }
}
