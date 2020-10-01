const express = require('express');
const subQuestion = require('../models/subQuesModel')
const router = express.Router();
const  {getToken,isAuth, isAdmin} = require('../util');


// router.get("/:test", async(req,res)=>{
//     //console.log("sam")
//     const getQuestions = await Question.find({testName:req.params.test});
//     res.send((getQuestions))
//     //console.log(getQuestions)
// });
router.get("/fetch/tests", async(req,res)=>{
    const getQuestions = await subQuestion.find({},{testName:1,_id:0});
    //console.log(getQuestions)
    res.send((getQuestions))
    //console.log(products)
    
});
router.get("/:test", async(req,res)=>{
    //console.log("sam")
    const getQuestions = await subQuestion.find({testName:req.params.test});
    res.send((getQuestions))
    //console.log(getQuestions)
});


router.post("/", async(req,res)=>{
    // console.log(req.body.ar)
    let array=[];
    for (let index = 0; index < req.body.ar.length; index++) {
        array.push(JSON.parse(req.body.ar[index]))
        
    }
    
    let t=await subQuestion.updateOne({testName:req.body.name},{$set:{question:array,testTime:req.body.time}},{upsert:true})
    // console.log(t)
    if(t){
        return res.status(201).send({msg:"new product created", data:t})
    }
    return res.status(500).send({message:'error in creating product'})
})



router.delete("/:test", async (req,res)=>{
    console.log(req.params.test)
    const deleteProduct = await Question.deleteOne({testName:req.params.test});
    console.log(deleteProduct)
    if(deleteProduct){
        
        res.send({message:"product Deleted"});
    } else {
        res.send("Error in Deletion")
    }
})


module.exports=router