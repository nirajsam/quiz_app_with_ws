import React, { Component } from 'react'
import Axios from 'axios';
import { Link } from 'react-router-dom';
import cfg from '../config'
var URL=cfg.URL
export default class ResultShow extends Component {
    constructor(props){
        super(props);
        this.state={
            result:[],
            search:'',
            tNameSearch:''
        }
    }
    componentWillMount(){
        Axios.get(`${URL}/api/results`).then((response)=>{
            console.log(response.data)
            this.setState({result:response.data})
        }).catch((error)=>{
            console.log(error)
        })
    }
    deleteResult=(email,tName)=>{
        if(window.confirm("want to delete??")){
            Axios.delete(`${URL}/api/results/${email}/${tName}`).then((response)=>{
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
        <div>
                <span className="col-md-6"><input type="text" placeholder="search by name" onChange={(e)=>{return this.setState({search:e.target.value})}}></input></span>
                <span className="col-md-6"><input type="text" placeholder="search by testName" onChange={(e)=>{return this.setState({tNameSearch:e.target.value})}}></input></span>
        </div>
        <p></p>
            <div className="table">            
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>date,time</th>
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
                    if(this.state.tNameSearch && this.state.search){
                        if(res.name.toLowerCase().match(this.state.search.toLowerCase()) && res.testName.toLowerCase().match(this.state.tNameSearch.toLowerCase())){
                            return <tr>
                            <td>{res.name}</td>
                            <td>{res.email}</td>
                            <td>{res.date}</td>
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
                        }else{
                            //
                        }
                    }
                    else if(this.state.search){
                        
                        if(res.name.toLowerCase().match(this.state.search.toLowerCase())){
                            
                            return <tr>
                            <td>{res.name}</td>
                            <td>{res.email}</td>
                            <td>{res.date}</td>
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
                        }else{
                            //
                        }
                    }else if(this.state.tNameSearch){
                        if(res.testName.toLowerCase().match(this.state.tNameSearch.toLowerCase())){
                            return <tr>
                            <td>{res.name}</td>
                            <td>{res.email}</td>
                            <td>{res.date}</td>
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
                        }else{
                            //
                        }
                    }
                    else{
                        return <tr>
                            <td>{res.name}</td>
                            <td>{res.email}</td>
                            <td>{res.date}</td>
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
                    }
                })}

                
                </tbody>
            </table></div>
            </div>
            <div className="center"><Link to="/" ><button >Back Home</button></Link></div>
        </div>
        )
    }
}
