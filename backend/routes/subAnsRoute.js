const express = require('express');
const subAnswer = require('../models/subAnsModel')
const router = express.Router();

router.get("/", async(req,res)=>{
    //console.log("sam")
    const getAnswers = await subAnswer.find({});
    res.send((getAnswers))
    
});
router.get("/profile/:email", async(req,res)=>{
    //console.log("sam")
    const getResult = await subAnswer.find({email:req.params.email});
    res.send((getResult))
    
});

router.post('/', async (req, res) =>{
    console.log(req.body.answers)
    let ansArray=[];
    for (let index = 0; index < req.body.answers.length; index++) {
        ansArray.push((req.body.answers[index]))
        
    }
    const answer = new subAnswer({
        name:req.body.name,
        email:req.body.email,
        date:`${new Date().getDate()}/${new Date().getUTCMonth()}/${new Date().getUTCFullYear()},
        ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
        testName:req.body.testName,
        answers:ansArray
        
    });
    const newAnswer = await answer.save()
    if(newAnswer){
        res.send(newAnswer)
    
    }else{
        res.status(401).send({msg:'saving error'})
    }
})
router.put('/',async (req, res) =>{
    var email=req.body.email
    var tName=req.body.testName
    var marks=req.body.marks
    const setMarks = await subAnswer.updateOne({$and:[{email:email},{testName:tName}]},{$set:{marks:marks}});
    res.send((setMarks))
    console.log(setMarks)
})
router.delete("/:email/:tName", async (req,res)=>{
    console.log(req.params.email)
    const deleteProduct = await subAnswer.deleteOne({$and:[{testName:req.params.tName},{email:req.params.email}]});
    console.log(deleteProduct)
    if(deleteProduct){
        
        res.send({message:"product Deleted"});
    } else {
        res.send("Error in Deletion")
    }
})
module.exports=router;