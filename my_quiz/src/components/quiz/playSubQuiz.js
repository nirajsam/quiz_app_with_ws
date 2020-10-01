import Axios from 'axios'
import React, { Component } from 'react'
import Cookie from 'js-cookie';
import cfg from '../../config.js'
import { Link } from 'react-router-dom';
var URL=cfg.URL

export default class playSubQuiz extends Component {
    constructor(props){
        super(props)
        this.state={
            questions:[],
            testArea:'',
            answer:[],
            time:{},
            start:false,
            submit:''
        }
        this.array=[];
        this.interval=null;
    }
    componentWillMount(){
        console.log("sam")
        clearInterval(this.interval)
        Axios.get(`${URL}/api/subQues/${this.props.match.params.test}`).then((response)=>{
            console.log(response.data[0].question)
            sessionStorage.setItem('ques',JSON.stringify(response.data[0].question))
            sessionStorage.setItem('time',JSON.stringify(response.data[0].testTime))
            // this.setState({questions:response.data[0].question})
            let ar=[]
            for (let index = 0; index < response.data[0].question.length; index++) {
                ar.push(response.data[0].question[index])
                
            }
            this.setState({questions:ar})
            
        })
    }
    addArray=(q,a)=>{
        var ob={}
        
        ob[q]=a
        
        if(ob[q]!=0 && !this.state.answer.includes(JSON.stringify(ob))){
            this.array.push(ob)
            this.setState({answer:JSON.stringify(this.array)})
        }
        
        
    }
    startTest=()=>{
        this.setState({start:true})
        this.setTimer()
    }
    submitAns=()=>{
        Axios.post(`${URL}/api/subAns`,{name:JSON.parse(Cookie.get('userInfo')).name,
        email:JSON.parse(Cookie.get('userInfo')).email,testName:this.props.match.params.test,answers:JSON.parse(this.state.answer)})
        .then((response)=>{
            console.log("Answer posted")
            this.setState({submit:"you have submitted your answer"})
            
        }).catch((error)=>{
            console.log(error)
        })
    }
    setTimer = () => {
        const countDownTime = Date.now()+60000*sessionStorage.getItem('time');
        this.interval = setInterval(()=>{
            const now = new Date();
            const distance = countDownTime- now;

            const minutes = Math.floor((distance % (1000*60*60))/(1000*60));
            const seconds = Math.floor((distance % (1000*60))/(1000));

            if(distance <0){
                clearInterval(this.interval);
                this.setState({
                    time: {
                        minutes:0,
                        seconds:0
                    }
                }, () => {
                    this.submitAns();
                })
            }else{
                this.setState({
                    time: {
                        minutes,
                        seconds,
                        distance
                    }
                })
            }
        },1000);
    }
    render() {
        // console.log(this.state.answer)
        if(!this.state.start){
            return <div className="center">
                <h2>Test Instructions</h2>
                <ol>
                <li className="left" style={{fontSize:"20px"}}>Read carefully all instructions</li><br/><br/>
                <li className="left" style={{fontSize:"20px"}}>this is subjective paper test</li><br/><br/>
                <li className="left" style={{fontSize:"20px"}}>After completing your answer of every question make sure to click on done </li><br/><br/>
                <li className="left" style={{fontSize:"20px"}}>Marks is given in front of every question.</li><br/><br/>
                <li className="left" style={{fontSize:"20px"}}>Once you start your test timer will start,and when time is over your answers will be automatically submitted</li><br/><br/>
                <li className="left" style={{fontSize:"20px"}}>Click on submit button to submit your answers script</li><br/><br/>
                </ol>
                <button className="btn btn-primary center" style={{backgroundColor:"blue"}} onClick={()=>{return this.startTest()}}>start</button>
                <br/><span className="left"><Link to="/play/instructions">No take me back</Link></span>
            </div>
        }else if(this.state.submit){
            return <div  style={{color:"green"}}><span className="center" style={{fontSize:"40px"}}><b>You have submitted your answer..</b></span><br/>
            <span className="center"><Link to="/">back to home</Link></span><br/></div>
        }else{
        return (
            <div style={{padding:"2%"}}>
                <h4>subject: {this.props.match.params.test}</h4>
                <span className="right"><button style={{backgroundColor:"yellow",borderRadius:"20px"}} ><b>{this.state.time.minutes}:{this.state.time.seconds}</b> 
                 <span className="mdi mdi-clock-outline mdi-24px"></span></button></span>
                <p>final exam</p><br/>
                <hr/>
                <ol>
                {this.state.questions?this.state.questions.map((ques)=>{
                    return     <div>
                    <li><b>{ques.question}</b></li>
                    <textarea onChange={(e)=>{return this.setState({textArea:e.target.value})}}></textarea>
                    <button onBlur={(e)=>{return this.addArray(ques.question,this.state.textArea)}}>done</button>
                    </div>   
                }):null}</ol>
                <div className="center"><button className="btn btn-primary" onClick={()=>{return this.submitAns()}}>submit</button></div>
            </div>
        )}
    }
}
