const express = require('express');
const Question = require('../models/productModel')
const router = express.Router();
const  {getToken,isAuth, isAdmin} = require('../util');
const {getAiQuestions}  = require('../getAiQuestions');


router.get("/:test", async(req,res)=>{
    try{
        const getQuestions = await Question.find({testName:req.params.test});
        res.send((getQuestions))
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error fetching questions" });
      }
});
router.post("/ai", async (req, res) => {
    try {
      if (!req.body.examName || !req.body.subject || !req.body.noOfQuest || !req.body.time) {
        return res.status(400).send({ message: "Invalid request body" });
      }
      const getAIQuestions = await getAiQuestions(req.body.examName, req.body.subject, req.body.noOfQuest, req.body.time);
      if (getAIQuestions.error) {
        return res.status(500).send({ message: "Error fetching AI questions", error: getAIQuestions.error });
      }
      res.send([getAIQuestions]);
    } catch (error) {
      res.status(500).send({ message: "Error fetching AI questions" });
    }
  });

router.get("/fetch/tests", async(req,res)=>{
    try{
        const getQuestions = await Question.find({},{testName:1,_id:0});
        res.send((getQuestions))
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error fetching questions" });
    }
});

router.post("/", async(req,res)=>{
    let array=[];
    for (let index = 0; index < req.body.ar.length; index++) {
        array.push(JSON.parse(req.body.ar[index]))   
    }
    let t=await Question.updateOne({testName:req.body.name},{$set:{question:array,testTime:req.body.time}},{upsert:true})
    if(t){
        return res.status(201).send({msg:"new product created", data:t})
    }
    return res.status(500).send({message:'error in creating product'})
})

// Delete a question
router.delete("/:test", async (req, res) => {
    try {
      if (!req.params.test) {
        return res.status(400).send({ message: "Invalid test name" });
      }
  
      const deleteProduct = await Question.deleteOne({ testName: req.params.test });
      if (deleteProduct) {
        res.send({ message: "Question deleted" });
      } else {
        res.send("Error in deletion");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error deleting question" });
    }
  });


module.exports=router