import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function AddQuestion() {
    const [tName, settName] = useState("")
    const [tTime, settTime] = useState(0)
    const [question, setquestion] = useState("")
    const [optA, setoptA] = useState("")
    const [optB, setoptB] = useState("")
    const [optC, setoptC] = useState("")
    const [optD, setoptD] = useState("")
    const [answer, setanswer] = useState("")
    const [qArray, setqArray] = useState([])
    const [test, settest] = useState([])
    //const [file, setFile] = useState("")  
    
    const addToArray = () =>{
        let a=qArray
        let array=a;
        console.log(array)
        
        array.push(JSON.stringify({"question":question,"optionA":optA,"optionB":optB,
        "optionC":optC,"optionD":optD,"answer":answer}))
        
        setqArray(array)
    }

    const submitArray = () => {
        console.log(qArray)
        axios.post("http://localhost:5000/api/products",{"ar":(qArray),"name":tName,time:tTime}).then((response)=>{
            console.log(response)
            window.location.reload()
        }).catch((error)=>{
            console.log(error)
        })
    }
    const showTestAvailable=()=>{
        axios.get("http://localhost:5000/api/products/fetch/tests").then((response)=>{
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
            axios.delete(`http://localhost:5000/api/products/${test}`).then((response)=>{
            console.log(test,"deleted")
            window.location.reload()
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
                <input type="text" name="testName" id="name" onChange={(e)=>settName(e.target.value)}></input>
            </div>
            <div className="col-md-2" >
                <label htmlFor="time" ><h5>testTime(in minutes):</h5></label>
                <input type="number" name="time" id="time" onChange={(e)=>settTime(e.target.value)}></input>
            </div><br/>
            {/* <div className="col-md-8">
                <div className="form-group col-md-5">
                    upload question picture<input type='file' className="form-control form-control" id="customFile" onChange={(e)=>setFile(e.target.value)}/>
                    <label className="form-control" htmlFor="customFile">
                        {fileName}
                    </label>
                </div><br/>
                <input className="col-md-4" type="button" value="upload" className="btn btn-primary" />
            
            
            </div> */}
            <div className="col-md-10">
                <label htmlFor="question"><h5>Question:</h5></label>
                <textarea type="text" name="question" id="name" onChange={(e)=>setquestion(e.target.value)}></textarea>
            </div> 
            <br/>
            <div className="col-md-6">
            <li >
                <label htmlFor="optA">optionA</label>
                <input type="text" name="optA" id="name" onChange={(e)=>setoptA(e.target.value)}></input>
            </li>
            <li >
                <label htmlFor="optB">optionB</label>
                <input type="text" name="optB" id="name" onChange={(e)=>setoptB(e.target.value)}></input>
            </li>
            <li >
                <label htmlFor="optC">optionC</label>
                <input type="text" name="optC" id="name" onChange={(e)=>setoptC(e.target.value)}></input>
            </li>
            <li >
                <label htmlFor="optD">optionD</label>
                <input type="text" name="optD" id="name" onChange={(e)=>setoptD(e.target.value)}></input>
            </li>
            </div><br/>
            <div className="col-md-8">
                <label htmlFor="answer"><h5>answer</h5></label>
                <input type="text" name="answer" id="name" onChange={(e)=>setanswer(e.target.value)}></input>
            </div>
            <div className="col-md-8">
                <button type="button" className="btn btn-primary" onClick={addToArray}>add to array</button><br/><br/>
                <button type="button" className="btn btn-primary" onClick={submitArray}>  submit</button>
            </div>
            <p className="col-md-4">{qArray}</p>
            
        </div>
        <div className="col-md-3 " style={{marginTop:"10%"}} >
                <div><button  onClick={showTestAvailable}>delete tests</button></div>
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

