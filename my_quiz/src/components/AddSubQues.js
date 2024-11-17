import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import cfg from '../config'
var URL=cfg.URL

export default function AddSubQuestion() {
    const [tName, settName] = useState("")
    const [tTime, settTime] = useState(1)
    const [question, setquestion] = useState("")
    const [qArray, setqArray] = useState([])
    const [test, settest] = useState([])
    const [del, setdel] = useState('')
    const [submit, setsubmit] = useState('')
    
    const addToArray = () =>{
        let a=qArray
        let array=a;
        console.log(array)
        
        array.push(JSON.stringify({"question":question}))
        
        setqArray(array)
        settName('')
        settTime('')
        setquestion('')
        
    }

    const submitArray = () => {
        console.log(qArray)
        axios.post(`${URL}/api/subQues`,{"ar":(qArray),"name":tName,time:tTime}).then((response)=>{
            console.log(response)
            setsubmit('submitted')
        }).catch((error)=>{
            console.log(error)
        })
    }
    const showTestAvailable=()=>{
        axios.get(`${URL}/api/subQues/fetch/tests`).then((response)=>{
            console.log(response.data)
            let ar=[];
            for (let index = 0; index < response.data.length; index++) {
                ar.push(response.data[index].testName)
            }
            settest(ar)
            
            console.log(this.state.test)
            
        }).catch((error)=>{
            console.log(error)
        })
    }
    const deleteTestAvailable=(test)=>{
        if(window.confirm("are you sure want to delete this test ??")){
            axios.delete(`${URL}/api/subQues/${test}`).then((response)=>{
            console.log(test,"deleted")
            setdel('deleted')
        }).catch((error)=>{
            console.log(error)
        })
        }
        
    }
    
    return (
         <div className="row">
        <div className="col-md-9" style={{margin:"1% 0% 0% 0% "}}>
            <h2 className="text-center"><b>Add Questions</b></h2><Link to="/" ><button className="text-left">Back Home</button></Link>
            <br/><div className="col-md-5" >
                <label htmlFor="testName" ><h5>testName:</h5></label>
                <input type="text" name="testName" id="name" value={tName} onChange={(e)=>settName(e.target.value)}></input>
            </div>
            <div className="col-md-2" >
                <label htmlFor="time" ><h5>testTime(in minutes):</h5></label>
                <input type="number" name="time" id="time" value={tTime} onChange={(e)=>settTime(e.target.value)}></input>
            </div><br/>
            <div className="col-md-10">
                <label htmlFor="question"><h5>Question:</h5></label>
                <textarea type="text" name="question" id="name" value={question} onChange={(e)=>setquestion(e.target.value)}></textarea>
            </div> 
            <br/>
            <div className="col-md-8">
                <button type="button" className="btn btn-primary" onClick={addToArray}>add to array</button><br/><br/>
                <button type="button" className="btn btn-primary" onClick={submitArray}>  submit</button>
            </div>
            <span className="text-success">{submit}</span>
            <p className="col-md-4">{qArray}</p>
            
        </div>
        <div className="col-md-3 " style={{marginTop:"10%"}} >
                <div><button  onClick={showTestAvailable}>delete tests</button></div><span className="text-success">{del}</span>
                <div><br/>
                <ul>
                    {test.map((test)=>{
                                        return <><li><button className="btn btn-primary" 
                                        onClick={()=>{return deleteTestAvailable(test)}}
                                        >{test}</button></li><br/></>
                                    })}
                </ul>
                </div>
            </div>
        </div>
    )
}

