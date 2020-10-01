import React, {Component, Fragment} from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Cookie from 'js-cookie';
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import cfg from '../../config.js'
var URL=cfg.URL

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
export default class QuizInstruction extends Component {
    constructor(props){
        super(props)
        this.state={
            test:[],
            subTest:[],
            hide:false,
            hideTestAr:[],
            loading:true,
        }
        var c=0
    }

    componentWillMount () {
        clearInterval(this.interval)
        axios.get(`${URL}/api/products/fetch/tests`).then((response)=>{
            console.log(response.data)
            let ar=[];
            for (let index = 0; index < response.data.length; index++) {
                ar.push(response.data[index].testName)
            }
            this.setState({test:(ar),loading:false})
            //sessionStorage.setItem('test',JSON.stringify(response.data.testName))
            // console.log(this.state.test)
            
        }).catch((error)=>{
            console.log(error)
        })
        axios.get(`${URL}/api/subQues/fetch/tests`).then((response)=>{
            console.log(response.data)
            let ar=[];
            for (let index = 0; index < response.data.length; index++) {
                ar.push(response.data[index].testName)
            }
            this.setState({subTest:(ar),loading:false})
            //sessionStorage.setItem('test',JSON.stringify(response.data.testName))
            // console.log(this.state.test)
            
        }).catch((error)=>{
            console.log(error)
        })
        
    }
    hideTest=(x)=>{
        
        // console.log(localStorage.getItem('hideAr'))
        // this.setState({hideTestAr:a})
        // console.log(localStorage.getItem('hideAr'))
        if(localStorage.getItem('hideAr')){
            // console.log("n")
            var a=localStorage.getItem('hideAr').split(',')
            var ar=a;
            if(!a.includes(x)){
                ar.push(x)
            }else if(a.includes(x)){
                var index = ar.indexOf(x);
                ar.splice(index, 1);
            }}
        else{
            // console.log("k")
            var ar=[]
            ar.push(x)
        }
        
        // this.setState({hideTestAr:ar})
        localStorage.setItem('hideAr',ar)
        // console.log((localStorage.getItem('hideAr')))
        this.setState({hide:!this.state.hide})
        
        
    }
    hideSubTest=(x)=>{
        if(localStorage.getItem('hideSubAr')){
            // console.log("n")
            var a=localStorage.getItem('hideSubAr').split(',')
            var ar=a;
            if(!a.includes(x)){
                ar.push(x)
            }else if(a.includes(x)){
                var index = ar.indexOf(x);
                ar.splice(index, 1);
            }}
        else{
            // console.log("k")
            var ar=[]
            ar.push(x)
        }
        
        // this.setState({hideTestAr:ar})
        localStorage.setItem('hideSubAr',ar)
        // console.log((localStorage.getItem('hideAr')))
        this.setState({hide:!this.state.hide})
        
        
    }
    render() {
        return (
            <div className="form">
                <Fragment>
                    <Helmet><title>Quiz-Instructions-Quiz App</title></Helmet>
                    <div className="instructions container">
                        {/* <h2>How To play the Game</h2>
                        <p>Ensure you read guidelines properly:</p>
                        <ul className="browser-default" id="min-list">
                            <li>Each Question consist of four answer</li>
                            <li>only one correct answer among all four</li>
                            <li>No negative marks</li>
                            <li>you can not change your answer once you marked, so mark wisely</li>
                            <li>now chose your test which you want to give and click</li>
                            <li>then click on reload button to load questions and options</li>
                        </ul><br></br><br></br> */}
                        <div>
                            <span className="left"><Link to="/">No take me back</Link></span><br/>
                            
                        </div><br/>
                        <div className="row jumbotron inst">
                        <span className="left" style={{fontSize:"30px"}}><>Objective Tests</></span><br/><br/><hr/>
                        {!this.state.loading?<div>{this.state.test.map((test)=>{
                            if(localStorage.getItem('hideAr')){
                                var a=localStorage.getItem('hideAr').split(',')
                                // console.log(a)
                                if(a.includes(test)){
                                    return <div className="col-md-2 center" ><Link style={{padding:"1%"}} ><button className="btn btn-primary center "
                                    disabled={true}>{test}</button></Link>{JSON.parse(Cookie.get('userInfo')).isAdmin?<div className="mdi mdi-eye" onClick={()=>{return this.hideTest(test)}}></div>:null}<br/></div>}
                                else{
                                    return <div className="col-md-2 center"><Link style={{padding:"1%"}} to={Cookie.get('userInfo')?`/play/quiz/${test}`:'/login'} ><button className="btn btn-primary center "
                                    disabled={false}>{test}</button></Link>{JSON.parse(Cookie.get('userInfo')).isAdmin?<div className="mdi mdi-eye" onClick={()=>{return this.hideTest(test)}}></div>:null}<br/></div>
                                }
                            }else{
                                return <div className="col-md-2 center" ><Link style={{padding:"1%"}} to={Cookie.get('userInfo')?`/play/quiz/${test}`:'/login'} ><button className="btn btn-primary center "
                                disabled={false}>{test}</button></Link>{JSON.parse(Cookie.get('userInfo')).isAdmin?<div className="mdi mdi-eye" onClick={()=>{return this.hideTest(test)}}></div>:null}<br/></div>
                            }
                            })}</div>:<div className="sweet-loading">
                            <ClipLoader
                              css={override}
                              size={150}
                              color={"#123abc"}
                              loading={this.state.loading}
                            />loading...
                          </div>}<br/>
                        </div>
                        <div className="row jumbotron inst">
                        <span className="left" style={{fontSize:"30px"}}><>Subjective Tests</></span><br/><br/>
                        <hr></hr>
                          <div>{this.state.subTest.map((test)=>{
                              if(localStorage.getItem('hideSubAr')){
                                var a=localStorage.getItem('hideSubAr').split(',')
                                // console.log(a)
                                if(a.includes(test)){
                                    return <div className="col-md-2 center" ><Link style={{padding:"2%"}}   ><button className="btn btn-primary center "
                                    disabled={true}>{test}</button></Link>{JSON.parse(Cookie.get('userInfo')).isAdmin?<div className="mdi mdi-eye" onClick={()=>{return this.hideSubTest(test)}}></div>:null}<br/></div>}
                                else{
                                    return <div className="col-md-2 center"><Link style={{padding:"2%"}}  to={Cookie.get('userInfo')?`/play/subQues/${test}`:'/login'} ><button className="btn btn-primary center "
                                    disabled={false}>{test}</button></Link>{JSON.parse(Cookie.get('userInfo')).isAdmin?<div className="mdi mdi-eye" onClick={()=>{return this.hideSubTest(test)}}></div>:null}<br/></div>
                                }
                            }else{
                                return <div className="col-md-2 center" ><Link style={{padding:"2%"}}  to={Cookie.get('userInfo')?`/play/subQues/${test}`:'/login'} ><button className="btn btn-primary center "
                                disabled={false}>{test}</button></Link>{JSON.parse(Cookie.get('userInfo')).isAdmin?<div className="mdi mdi-eye" onClick={()=>{return this.hideSubTest(test)}}></div>:null}<br/></div>
                            }
                          })}</div></div>

                    </div>
                </Fragment>
            </div>
        )
    }
}
    

