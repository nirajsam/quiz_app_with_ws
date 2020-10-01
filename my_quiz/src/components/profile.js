import Axios from 'axios';
import React, { Component } from 'react'
import Cookie from 'js-cookie';
import cfg from '../config'
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
            <>
            <div className="center">
                <h2>{JSON.parse(Cookie.get('userInfo')).name}'s profile</h2>
            </div>
            <div className="center">
                <ul>
                    <li>Email Id: {JSON.parse(Cookie.get('userInfo')).email}</li>
                    <li>class: {JSON.parse(Cookie.get('userInfo')).class?JSON.parse(Cookie.get('userInfo')).class:"Teacher"}</li>
                </ul><br/>
                <h4>Objective tests</h4>
                <ul>{this.state.objTest?this.state.objTest.map((t)=>{
                    return <li>{t.testName} : {Math.round(t.score*10)/10}</li>
                }):"no test given yet"}</ul>
                <h4>subjective tests</h4>
                <ul>
                {this.state.subTest.length?this.state.subTest.map((t)=>{
                    return <li>{t.testName} : {typeof(t.testName)==Number?<span>{Math.round(Number(t.score)*10)/10}%</span>:t.marks}</li>
                }):"no test given yet"}
                </ul>
            </div>
            </>
        )
    }
}
