import React, { Component } from 'react'
import Axios from 'axios';
import { Link } from 'react-router-dom';

export default class ResultShow extends Component {
    constructor(props){
        super(props);
        this.state={
            result:[],
        }
    }
    componentWillMount(){
        Axios.get("https://niraj-quiz-app.herokuapp.com/api/results").then((response)=>{
            console.log(response.data)
            this.setState({result:response.data})
        }).catch((error)=>{
            console.log(error)
        })
    }
    deleteResult=(email,tName)=>{
        if(window.confirm("want to delete??")){
            Axios.delete(`https://niraj-quiz-app.herokuapp.com/api/results/${email}/${tName}`).then((response)=>{
            console.log("deleted")
            
        }).catch((error)=>{
            console.log(error)
        })
          }
        
    }
    render() {
        return (
            <div >        
        <div class="container">
        <h2>Result of students</h2>
        <p></p>            
            <table class="table table-bordered">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>test Name</th>
                    <th>Score</th>
                    <th>No of question</th>
                    {/* <th>answered question</th> */}
                    <th>correct</th>
                    <th>wrong</th>
                    {/* <th>used hints</th>
                    <th>fifty fifty used</th> */}
                    <th>delete</th>
                </tr>
                </thead>
                <tbody>
                {this.state.result.map((res)=>{
                    return(
                        <tr>
                            <td>{res.name}</td>
                            <td>{res.email}</td>
                            <td>{res.testName}</td>
                            <td>{res.score}</td>
                            <td>{res.numberOfQuestion}</td>
                            {/* <td>{res.numberOfAnsweredQuestion}</td> */}
                            <td>{res.correctAnswer}</td>
                            <td>{res.wrongAnswer}</td>
                            {/* <td>{res.usedHints}</td> */}
                            {/* <td>{res.fiftyFiftyUsed}</td> */}
                            <td onClick={()=>{return this.deleteResult(res.email,res.testName)}}><span className="mdi mdi-delete"></span></td>
                        </tr>
                    ) 
                })}
                
                </tbody>
            </table>
            </div>
            <div className="center"><Link to="/" ><button >Back Home</button></Link></div>
        </div>
        )
    }
}
