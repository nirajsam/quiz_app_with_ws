const express = require('express');
const Result = require('../models/resultModel')
const router = express.Router();

router.get("/", async(req,res)=>{
    //console.log("sam")
    const getResult = await Result.find({});
    res.send((getResult))
    
});
router.get("/profile/:email", async(req,res)=>{
    //console.log("sam")
    const getResult = await Result.find({email:req.params.email});
    res.send((getResult))
    
});

router.post('/', async (req, res) =>{
    try {
        console.log(req.body.name)
        const result = new Result({
        testName:req.body.tName,
        name:req.body.name,
        email:req.body.email,
        date:`${new Date().getDate()}/${new Date().getUTCMonth()}/${new Date().getUTCFullYear()},
        ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
        score:req.body.score,
        numberOfQuestion:req.body.nOfQ,
        numberOfAnsweredQuestion:req.body.nOfAQ,
        correctAnswer:req.body.cA,
        wrongAnswer:req.body.wA,
        usedHints:req.body.uH,
        fiftyFiftyUsed:req.body.ffu,
        
        });
        const newResult = await result.save()
        if(newResult){
            res.send(newResult)
        
        }else{
            res.status(401).send({msg:'saving error'})
        }
    } catch (error) {
        res.status(404).send({msg:'unknown saving error'})   
    }
    
})
router.delete("/:email/:tName", async (req,res)=>{
    console.log(req.params.email)
    const deleteProduct = await Result.deleteOne({$and:[{testName:req.params.tName},{email:req.params.email}]});
    console.log(deleteProduct)
    if(deleteProduct){
        
        res.send({message:"product Deleted"});
    } else {
        res.send("Error in Deletion")
    }
})
module.exports=router;