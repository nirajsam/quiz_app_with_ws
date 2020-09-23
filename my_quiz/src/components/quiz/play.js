import React, { Component, Fragment } from 'react'
import { Helmet } from 'react-helmet'
// import questions from '../../questions.json'
import isEmpty from '../../utils/is-empty'
import M from 'materialize-css'
import classnames from 'materialize-css'
import correctNotf from '../../assets/audio/success.mp3';
import errorNotf from '../../assets/audio/error.mp3';
import clickNotf from '../../assets/audio/click.mp3';
import axios from 'axios'
import Cookie from 'js-cookie';

// axios.get("http://localhost:5000/api/products").then((response)=>{
//     this.setState({"questions":JSON.stringify(response.data)})
//     sessionStorage.setItem('ques',JSON.stringify(response.data))
//     console.log(this.state.questions)
//     console.log(sessionStorage.getItem('ques'))
    
// }).catch((error)=>{
//     console.log(error)
// })
class play extends Component {
    constructor(props){
        super(props)
        this.state={
            questions:JSON.parse(sessionStorage.getItem('ques')),
            currentQuestion:{},
            nextQuestion:{},
            previousQuestion:{},
            answer:'',
            numberOfQuestions:0,
            numberOfAnsweredQuestions:0,
            currentQuestionIndex:0,
            score:0,
            correctAnswers:0,
            wrongAnswers:0,
            hints:5,
            previousRandomNumbers:[],
            fiftyFifty:2,
            usedFiftyFifty:false,
            time:{},
            previousButtonDisabled:true,
            nextButtonDisabled:false,
            FiftyFiftyUsed:0,
            hintsUsed:0,
            load:false
        };
        this.interval=null;
        this.qAr=[]
    }
    
    load = () => {
        this.setState({load:true});
        this.loadQuestions();
    }
    loadQuestions= ()=> {
        
        const {questions, currentQuestion, nextQuestion, previousQuestion}=this.state;
        this.displayQuestions(questions,currentQuestion,nextQuestion,previousQuestion)
        this.setTimer()
    }
    
    componentWillMount () {
        Cookie.set('tName',this.props.match.params.test)
        console.log(this.props.match.params.test)
        clearInterval(this.interval)
        axios.get(`https://niraj-quiz-app.herokuapp.com/api/products/${this.props.match.params.test}`).then((response)=>{
            //console.log(response)
            //this.setState({"questions":(response.data[0].question)})
           
            sessionStorage.setItem('ques',JSON.stringify(response.data[0].question))
            sessionStorage.setItem('time',JSON.stringify(response.data[0].testTime))
            this.setState({questions:response.data[0].question})
            // console.log(this.state.questions)
            // console.log(sessionStorage.getItem('ques'))
            
        }).catch((error)=>{
            console.log(error)
        })
        
    }
    
        
    
    componentWillUnmount(){
        sessionStorage.removeItem('ques')
        
    }
    displayQuestions = (questions = this.state.questions,currentQuestion,nextQuestion,previousQuestion) => {
        let {currentQuestionIndex}=this.state;
        if(!isEmpty(this.state.questions)){
            questions=this.state.questions;
            currentQuestion=questions[currentQuestionIndex];
            nextQuestion=questions[currentQuestionIndex+1];
            previousQuestion=questions[currentQuestionIndex-1]
            const answer=currentQuestion.answer;
            this.setState({
                currentQuestion,
                nextQuestion,
                previousQuestion,
                numberOfQuestions:questions.length,
                answer,
                previousRandomNumbers:[]
            },()=>{
                this.showOptions();
                this.handleDisableButton();
            })
        }
    }

    handleOptionClick = (e) => {
        if(e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()){
            
            setTimeout(() => {
                // document.getElementById("correct-sound").play()
            }, 500);
            this.correctAnswer()
        }else{
            setTimeout(() => {
                // document.getElementById("error-sound").play()
            }, 500);
            this.wrongAnswer()
        }
    }
    handleButtonClick = (e) => {
        switch (e.target.id) {
            case "next-button":
                this.handleNextButtonClick();
                break;
            case "prev-button":
                this.handlePrevButtonClick();
                break;
            case "quit-button":
                this.handleQuitButtonClick();
                break;
            default:
                break;
        }
    }
    handleNextButtonClick = () => {
        this.playButtonSound();
        if(this.state.nextQuestion !== undefined){
            this.setState(prevState=>({
                currentQuestionIndex:prevState.currentQuestionIndex+1
            }),()=>{
                this.displayQuestions(this.state.state,this.state.currentQuestion,this.state.nextQuestion,this.state.previousQuestion);
            })
        }
    }
    handlePrevButtonClick = () => {
        this.playButtonSound();
        if(this.state.previousQuestion !== undefined){
            this.setState(prevState=>({
                currentQuestionIndex:prevState.currentQuestionIndex-1
            }),()=>{
                this.displayQuestions(this.state.state,this.state.currentQuestion,this.state.nextQuestion,this.state.previousQuestion);
            })
        }
    }
    handleQuitButtonClick = () => {
        this.playButtonSound();
        if(window.confirm('Are you sure want to quit ?')){
            this.props.history.push('/')
        }
    }

    playButtonSound = () => {
        document.getElementById("click-sound").play()
    }
    correctAnswer = () => {
        // M.toast({
        //     html:'correct Answer',
        //     classes: 'toast-valid',
        //     displayLength:1500
        // })
        
        if(this.qAr.includes(this.state.currentQuestion.question)){
            console.log("p")
        this.setState(prevState => ({
            // score:prevState.score+1,
            // correctAnswers:prevState.correctAnswers+1,
            currentQuestionIndex:prevState.currentQuestionIndex+1,
            numberOfAnsweredQuestions:prevState.numberOfAnsweredQuestions+1
        }),()=>{
            if(this.state.nextQuestion === undefined){
                // this.endGame()
                
            }else{
                this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion)
            }
            
        })}else{
            this.setState(prevState => ({
                score:prevState.score+1,
                correctAnswers:prevState.correctAnswers+1,
                currentQuestionIndex:prevState.currentQuestionIndex+1,
                numberOfAnsweredQuestions:prevState.numberOfAnsweredQuestions+1
            }),()=>{
                if(this.state.nextQuestion === undefined){
                    // this.endGame()
                    
                }else{
                    this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion)
                }
                
            })
            this.qAr.push(this.state.currentQuestion.question)
            console.log(this.qAr)
        }
    }
    wrongAnswer = () => {
        // navigator.vibrate(1000);
        // M.toast({
        //     html:'wrong Answer',
        //     classes: 'toast-invalid',
        //     displayLength:1500
        // })
        if(this.qAr.includes(this.state.currentQuestion.question)){
        this.setState(prevState => ({
            // wrongAnswers:prevState.wrongAnswers+1,
            currentQuestionIndex:prevState.currentQuestionIndex+1,
            numberOfAnsweredQuestions:prevState.numberOfAnsweredQuestions
        }),() => {
            if(this.state.nextQuestion === undefined){
                // this.endGame()
            }else{
                this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion)
            }
        })}else{
            this.setState(prevState => ({
                wrongAnswers:prevState.wrongAnswers+1,
                currentQuestionIndex:prevState.currentQuestionIndex+1,
                numberOfAnsweredQuestions:prevState.numberOfAnsweredQuestions
            }),() => {
                if(this.state.nextQuestion === undefined){
                    // this.endGame()
                }else{
                    this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion)
                }
            })
            this.qAr.push(this.state.currentQuestion.question)
        }
    }
    showOptions = () => {
        const options = Array.from(document.querySelectorAll('.option'));

        options.forEach(option=>{
            option.style.visibility='visible'
        });
        this.setState({
            usedFiftyFifty:false
        })
    }
    handleHints = () => {
        if(this.state.hints>0){
            const options = Array.from(document.querySelectorAll('.option'));
        let indexOfAnswer;
        options.forEach((option, index) => {
            if(option.innerHTML.toLowerCase()===this.state.answer.toLowerCase()){
                indexOfAnswer=index;
            }
        })
        while (true) {
            const randomNumber = Math.round(Math.random()*3);
            if(randomNumber !== indexOfAnswer && !this.state.previousRandomNumbers.includes(randomNumber)){
                options.forEach((option,index)=>{
                    if(index===randomNumber){
                        option.style.visibility='hidden';
                        this.setState((prevState)=>({
                            hints:prevState.hints-1,
                            previousRandomNumbers:prevState.previousRandomNumbers.concat(randomNumber)
                        }))
                    }
                });
                break;
            }
            if(this.state.previousRandomNumbers.length >=3) break;
        }
        }
        
    }
    handleFiftyFifty = () => {
        if(this.state.fiftyFifty > 0 && this.state.usedFiftyFifty == false){
            const options = document.querySelectorAll('.option');
            const randomNumbers = [];
            let indexOfAnswer;

            options.forEach((option,index)=>{
                if(option.innerHTML.toLowerCase()===this.state.answer.toLowerCase()){
                    indexOfAnswer=index;
                }
            });
            let count=0;
            do {
                const randomNumber = Math.round(Math.random()*3);
                if(randomNumber!==indexOfAnswer){
                    if(randomNumbers.length<2 && !randomNumbers.includes(randomNumber) && !randomNumbers.includes(indexOfAnswer)){
                        randomNumbers.push(randomNumber);
                        count++;
                    }else{
                        while(true){
                            const newRandomNumber = Math.round(Math.random()*3);
                            if(!randomNumbers.includes(newRandomNumber) &&!!randomNumbers.includes(indexOfAnswer)){
                                randomNumbers.push(newRandomNumber);
                                count++;
                                break
                            }
                        }
                    }
                }
            } while (count<2);
            options.forEach((option,index)=>{
                if(randomNumbers.includes(index)){
                    option.style.visibility='hidden';
                }
            });
            this.setState(prevState=>({
                fiftyFifty:prevState.fiftyFifty-1,
                usedFiftyFifty:true
            }))
        }
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
                    this.endGame();
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
    handleDisableButton = () => {
        if(this.state.previousQuestion === undefined || this.state.currentQuestionIndex===0){
            this.setState({
                previousButtonDisabled:true
            });
            document.getElementById("prev-button").style.visibility='hidden';
        }else{
            this.setState({
                previousButtonDisabled:false
            });
            document.getElementById("prev-button").style.visibility='visible';
        }
        if(this.state.nextQuestion === undefined || this.state.currentQuestionIndex+1===this.setState.numberOfQuestions){
            this.setState({
                nextButtonDisabled:true
            });
            document.getElementById("next-button").style.visibility='hidden'
        }else{
            this.setState({
                nextButtonDisabled:false
            });
            document.getElementById("next-button").style.visibility='visible'
        }
    }
    endGame = () => {
        alert('quiz has ended!');
        const {state} = this;
        const playerStats = {
            score:state.score,
            numberOfQuestions:state.numberOfQuestions,
            numberOfAnsweredQuestions:state.numberOfAnsweredQuestions,
            correctAnswers:state.correctAnswers,
            wrongAnswers:state.wrongAnswers,
            FiftyFiftyUsed:2-state.fiftyFifty,
            hintsUsed:5-state.hints
        }
        console.log(playerStats);
        setTimeout(() => {
            this.props.history.push('/play/quizSummary', playerStats)
        },1000);
    }
    render() {
        const {currentQuestion,currentQuestionIndex,numberOfQuestions, hints, fiftyFifty, time}=this.state;
        if(!this.state.load){
            return <div className="">
                <h2>How To play the Game</h2>
                        <p>Ensure you read guidelines properly:</p>
                        <ul className="browser-default" id="min-list">
                            <li>Each Question consist of four answer</li>
                            <li>only one correct answer among all four</li>
                            <li>No negative marks</li>
                            <li>you can not change your answer once you marked, so mark wisely</li>
                            <li>then click on start button to load questions and options</li>
                        </ul><br></br><br></br>
                <div className="center"><button className="btn btn-primary" style={{backgroundColor:"blue"}} onClick={()=>{return this.load()}}>Start</button></div></div>
        }else{
        return (
            <Fragment>
                <Helmet><title>Quiz-page</title></Helmet>
                
                <Fragment>
                    <audio id="correct-sound" src={correctNotf}></audio>
                    <audio id="error-sound" src={errorNotf}></audio>
                    <audio id="click-sound" src={clickNotf}></audio>
                </Fragment>
                <div className="questions">
                    <h2>Quiz Mode</h2>
                    <div className="center">
                    {this.state.questions.map((q,index)=>{
                        if(this.qAr.includes(q.question)){
                            return <button id={`${q.question}`}  style={{borderRadius:"50%", height:"30px",width:"30px",backgroundColor:"blue",color:"white"}}>{index+1}</button>
                        }else{
                            return <button id={`${q.question}`}  style={{borderRadius:"50%", height:"30px",width:"30px"}}>{index+1}</button>
                        }
                        })}
                    </div>
                    <div className="lifeline-container">
                        {/* <p>
                            <span onClick={this.handleFiftyFifty} className="mdi mdi-set-center mdi-24px lifeline-icon">
                            <span className="lifeline">{fiftyFifty}</span>
                            </span>
                        </p>
                        <p>
                            <span onClick={this.handleHints} className="mdi mdi-lightbulb-on-outline mdi-24px lifeline-icon">
                            <span className="lifeline">{hints}</span>
                            </span>
                        </p> */}
                    </div>
                    <div>
                        <p>
                            <span className="left" style={{float:"left"}}>{currentQuestionIndex+1} of {numberOfQuestions} </span>
                            <span className="right">{time.minutes}:{time.seconds}<span className="mdi mdi-clock-outline mdi-24px"></span></span>
                        </p>
                    </div><br/>
                    <h4 className="text-center">{currentQuestion.question}</h4>
                    <div className="options-container">
                        <p onClick={this.handleOptionClick} className="option" >{currentQuestion.optionA}</p>
                        <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionB}</p>
                    </div>
                    <div className="options-container">
                        <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionC}</p>
                        <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionD}</p>
                    </div>
                    <div className="button-container">
                        <button style={{backgroundColor:"blue",color:"white"}} id="prev-button" onClick={this.handleButtonClick} disabled={this.state.previousButtonDisabled}>previous</button>
                        <button style={{backgroundColor:"green",color:"white"}}  id="next-button" onClick={this.handleButtonClick} disabled={this.state.nextButtonDisabled}>next</button>   
                    </div>
                    <button id="quit-button" className="btn btn-warning" style={{backgroundColor:"yellow",color:"black"}} onClick={this.handleButtonClick}>quit</button>
                    <button id="submit-button" className="btn btn-danger btn-lg right" style={{backgroundColor:"red",color:"white"}} onClick={this.endGame}>submit</button>
                </div>
            </Fragment>
        )}
    }
}
export default play;
