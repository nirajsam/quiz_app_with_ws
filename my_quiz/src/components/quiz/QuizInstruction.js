import React, {Component, Fragment} from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Cookie from 'js-cookie';
export default class QuizInstruction extends Component {
    constructor(props){
        super(props)
        this.state={
            test:[]
        }
    }

    componentWillMount () {
        clearInterval(this.interval)
        axios.get("https://niraj-quiz-app.herokuapp.com/api/products/fetch/tests").then((response)=>{
            console.log(response.data)
            let ar=[];
            for (let index = 0; index < response.data.length; index++) {
                ar.push(response.data[index].testName)
            }
            this.setState({"test":(ar)})
            //sessionStorage.setItem('test',JSON.stringify(response.data.testName))
            console.log(this.state.test)
            
        }).catch((error)=>{
            console.log(error)
        })
        
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
                        <div className="row jumbotron">
                        <span className="left" style={{fontSize:"40px"}}><>Available Tests</></span><br/><br/><hr/>
                        {this.state.test.map((test)=>{
                                return <div className="col-md-2 center" style={{padding:"2%"}}><Link to={Cookie.get('userInfo')?`/play/quiz/${test}`:'/login'} ><button className="btn btn-primary center "
                                >{test}</button></Link><br/></div>
                            })}</div>
                    </div>
                </Fragment>
            </div>
        )
    }
}
    

