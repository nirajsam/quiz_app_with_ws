import React, { Component, Fragment } from 'react'
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux';
import Axios from 'axios';
import Cookie from 'js-cookie';

class quizSummary extends Component {
    constructor(props){
        super(props);
        this.state={
            score:0,
            numberOfQuestions:0,
            numberOfAnsweredQuestions:0,
            correctAnswers:0,
            wrongAnswers:0,
            usedHints:0,
            fiftyFiftyUsed:0
        }
    }

    componentDidMount () {
        const {state}=this.props.location;
        this.setState({
            score:(state.score/state.numberOfQuestions)*100,
            numberOfQuestion:state.numberOfQuestions,
            numberOfAnsweredQuestion:state.numberOfAnsweredQuestions,
            correctAnswer:state.correctAnswers,
            wrongAnswer:state.wrongAnswers,
            usedHints:state.hintsUsed,
            fiftyFiftyUsed:state.FiftyFiftyUsed
        }) 
        
    }
    componentDidUpdate(){
        this.saveResult()
    }
    saveResult(){
        Axios.post("https://niraj-quiz-app.herokuapp.com/api/results",{tName:Cookie.get('tName'),name:JSON.parse(Cookie.get('userInfo')).name
        ,email:JSON.parse(Cookie.get('userInfo')).email,
        score:this.state.score,nOfQ:this.state.numberOfQuestion,nOfAQ:
        this.state.numberOfAnsweredQuestion,cA:this.state.correctAnswer,wA:this.state.wrongAnswer,uH:
        this.state.usedHints,ffu:this.state.fiftyFiftyUsed}).then((response)=>{
            console.log("result posted")
            Cookie.remove('tName')
        }).catch((error)=>{
            console.log(error)
        })
    }
    render() {
        const {state, score}= this;
        console.log(state.score)
        let stats,remark;
        if(score<=30 || score==0){
            remark = 'You need to study hard'
        }else if(state.score>30 && state.score<=50){
            remark='Better luck next time'
        }else if(state.score>50 && state.score<=70){
            remark='You can do Better'
        }else if(state.score>70 && state.score<=84){
            remark='Yo did great'
        }else{
            remark='You are absolute Genius'
        }
        if(state !== undefined){
            stats = (
                <Fragment>
                    <div className="center">
                        <span style={{color:"green"}} className="mdi mdi-check-circle-outline success-icon mdi-48px"></span>
                    </div>
                    <h1 className="center">Quiz has ended</h1>
                    <div className="jumbotron container">
                        <h4 className="center">{remark}</h4>
                        <h3 className="center">Your Score: {this.state.score.toFixed(0)}&#37;</h3>
                        <span className="stat left">Total number of questions</span>
                        <span className="right">{this.state.numberOfQuestion}</span><br/>

                        {/* <span className="stat left">number of Answered questions</span>
                        <span className="right">{this.state.numberOfAnsweredQuestion}</span><br/> */}

                        <span className="stat left">number of correct answers</span>
                        <span className="right">{this.state.correctAnswer}</span><br/>

                        <span className="stat left">number of wrong answers</span>
                        <span className="right">{this.state.wrongAnswer}</span><br/>
{/* 
                        <span className="stat left">number of used hints</span>
                        <span className="right">{this.state.usedHints}</span><br/>

                        <span className="stat left">number of used fifty fifty</span>
                        <span className="right">{this.state.fiftyFiftyUsed}</span><br/> */}
                    </div>
                    <div className="center">
                        <ul>
                            <li style={{}}>
                                <Link to="/">Back to home</Link>
                            </li>
                        </ul>
                    </div>
                </Fragment>
            )
        }else{
            stats=(
            <section>
            <h1 className="no-stats">No stats available please take a quiz</h1>
                <ul>
                    <li>
                        <Link to="/">Back to home</Link>
                    </li>
                    <li>
                        <Link to="/play/quiz">Take a quiz</Link>
                    </li>
                </ul>
            </section>
            )
        }
        return (
            <Fragment>
                <Helmet><title>Quiz App - summary</title></Helmet>
                {stats}
            </Fragment>
        )
    }
}
export default quizSummary;
