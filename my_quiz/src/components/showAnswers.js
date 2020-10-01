import Axios from 'axios'
import React, { Component } from 'react'
import Cookie from 'js-cookie';
import cfg from '../config'
import { Link } from 'react-router-dom';
var URL=cfg.URL

export default class showAnswers extends Component {
    constructor(props){
        super(props)
        this.state={
            subAns:[],
            check:null,
            totalMarks:'',
            obtMarks:'',
            update:'',
            del:'',
            search:'',
            tNameSearch:''
        }
        this.marks=0;
        this.ar=[];
    }
    componentWillMount(){
        Axios.get(`${URL}/api/subAns`).then((response)=>{
            console.log(response.data)
            this.setState({subAns:response.data})
        }).catch((error)=>{
            console.log(error)
        })
    }
    addMarks=(value,i)=>{
        this.ar[i]=value
        // this.marks=this.marks+Number(value)
        // console.log(this.marks)
        var count = 0;
        for(var i = 0; i < this.ar.length; i++)
        {
            count = count + Number(this.ar[i]);
        }
        this.setState({obtMarks:count})
    }
    setMarks=()=>{
        Axios.put(`${URL}/api/subAns`,{testName:this.state.subAns[this.state.check].testName,
            email:this.state.subAns[this.state.check].email,marks:`${this.state.obtMarks}/${this.state.totalMarks}`}).then((res)=>{
                this.setState({update:"check done"})
            }).catch((error)=>{
                console.log(error)
            })
    }
    deleteAnswer=(email,tName)=>{
        Axios.delete(`${URL}/api/subAns/${email}/${tName}`).then((res)=>{
            this.setState({del:'one answersheet deleted'})
        }).catch((error)=>{
            console.log(error)
        })
    }
    render() {
        // console.log(this.state.subAns)
        // if(this.state.subAns[this.state.check]){
        // console.log(this.state.subAns[this.state.check].testName)}
        if(this.state.check!=null){
            return <div>
                        <h4 className="center"><b>Name:</b> {this.state.subAns[this.state.check].name} ; <b>test:</b>{this.state.subAns[this.state.check].testName}</h4>
                        <br/><br/>
                        <ol>
                            {this.state.subAns[this.state.check].answers.map((ans,index)=>{
                                return <div className="row"><li className="col-md-10"><ul><li className="text-danger"><b>Ques:</b>{Object.keys(ans)}</li><li><b>Ans:</b>{Object.values(ans)}</li></ul></li>
                                <span className="col-md-1 right"><input type="number" onBlur={(e)=>{return this.addMarks(e.target.value,index)}}></input></span>
                                </div>
                            })}
                        </ol>
                        <span className="col-md-2 right"><input type="number" value={this.state.obtMarks} ></input>obtainbed marks:</span>
                        <span className="col-md-2 right"><input type="number" onChange={(e)=>{return this.setState({totalMarks:e.target.value})}}></input>total marks</span>
                        <button onClick={()=>{return this.setState({check:null})}}>back</button><br/><br/>
                        <button className="btn btn-primary" onClick={()=>{return this.setMarks()}}>save</button><br/>
                        <span className="text-success">{this.state.update}</span>
                </div>
        }else{
        return (
            <div >
                <span className="left"><Link to="/">back to home</Link></span>
                <h2>Answer scripts</h2>
                <div >
                <span className="col-md-6"><input type="text" placeholder="search by name" onChange={(e)=>{return this.setState({search:e.target.value})}}></input></span>
                <span className="col-md-6"><input type="text" placeholder="search by testName" onChange={(e)=>{return this.setState({tNameSearch:e.target.value})}}></input></span>
                </div>
                <div className="table">
                <table className="table table-bordered" >
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>date,time</th>
                    <th>test Name</th>
                    <th>marks</th>
                    <th>check</th>
                    <th>delete</th>
                </tr>
                </thead>
                <tbody>
                    {this.state.subAns.map((ans,index)=>{
                        if(this.state.tNameSearch && this.state.search){
                            if(ans.name.toLowerCase().match(this.state.search.toLowerCase()) && ans.testName.toLowerCase().match(this.state.tNameSearch.toLowerCase())){
                                return <tr>
                                    <th>{ans.name}</th>
                                    <th>{ans.email}</th>
                                    <th>{ans.date}</th>
                                    <th>{ans.testName}</th>
                                    <th>{ans.marks?ans.marks:"not checked"}</th>
                                    <th><button onClick={()=>{return this.setState({check:index})}}>check</button></th>
                                    <th><button onClick={()=>{return this.deleteAnswer(ans.email,ans.testName)}}>delete</button></th>
                                </tr>
                            }else{
                                //
                            }
                        }
                        else if(this.state.search){
                            
                            if(ans.name.toLowerCase().match(this.state.search.toLowerCase())){
                                
                                return <tr>
                                <th>{ans.name}</th>
                                <th>{ans.email}</th>
                                <th>{ans.date}</th>
                                <th>{ans.testName}</th>
                                <th>{ans.marks?ans.marks:"not checked"}</th>
                                <th><button onClick={()=>{return this.setState({check:index})}}>check</button></th>
                                <th><button onClick={()=>{return this.deleteAnswer(ans.email,ans.testName)}}>delete</button></th>
                            </tr>
                            }else{
                                //
                            }
                        }else if(this.state.tNameSearch){
                            if(ans.testName.toLowerCase().match(this.state.tNameSearch.toLowerCase())){
                                return <tr>
                                <th>{ans.name}</th>
                                <th>{ans.email}</th>
                                <th>{ans.date}</th>
                                <th>{ans.testName}</th>
                                <th>{ans.marks?ans.marks:"not checked"}</th>
                                <th><button onClick={()=>{return this.setState({check:index})}}>check</button></th>
                                <th><button onClick={()=>{return this.deleteAnswer(ans.email,ans.testName)}}>delete</button></th>
                            </tr>
                            }else{
                                //
                            }
                        }
                        else{
                            return <tr>
                            <th>{ans.name}</th>
                            <th>{ans.email}</th>
                            <th>{ans.date}</th>
                            <th>{ans.testName}</th>
                            <th>{ans.marks?ans.marks:"not checked"}</th>
                            <th><button onClick={()=>{return this.setState({check:index})}}>check</button></th>
                            <th><button onClick={()=>{return this.deleteAnswer(ans.email,ans.testName)}}>delete</button></th>
                        </tr>
                        }
                    })}
                </tbody>
                </table>
                </div>
                <span className="text-danger">{this.state.del}</span>
            </div>
        )}
    }
}
