const express = require('express');
const User = require('../models/userModel')
const router = express.Router();
const  {getToken} = require('../util');

router.get("/getUser", async(req,res)=>{
    // console.log("sam")
    const getUser = await User.find({});
    res.send((getUser))
    
});

// router.get("/:eamil", async (req, res) =>{})
router.post('/signin', async (req, res) =>{
    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    })
    if(signinUser){
        res.send({
            _id:signinUser.id,
            name:signinUser.name,
            email:signinUser.email,
            isAdmin:signinUser.isAdmin,
            verify:signinUser.verify,
            isTeacher:signinUser.isTeacher,
            token:getToken(signinUser)
        })
    }else{
        res.status(401).send({msg:'Invalid Email or Password!'})
    }
})
router.post('/register', async (req, res) =>{
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        class:req.body.clas,
        rollNo:req.body.roll,
        password:req.body.password
    });
    const newUser = await user.save()
    if(newUser){
        res.send({
            _id:newUser.id,
            name:newUser.name,
            email:newUser.email,
            isAdmin:newUser.isAdmin,
            token:getToken(newUser)
        })
    
    }else{
        res.status(401).send({msg:'Invalid user data'})
    }
})

router.put("/vSt", async (req,res)=>{
    var email=req.body.email
    var name=req.body.name
    var verify=req.body.verify
    console.log(verify)
    const verifyStudent = await User.updateOne({$and:[{email:email},{name:name}]},{$set:{verify:verify}});
    res.send((verifyStudent))
    console.log(verifyStudent)
})
router.put("/vTr", async (req,res)=>{
    var email=req.body.email
    var name=req.body.name
    var isTeacher=req.body.isTeacher
    
    const verifyTeacher = await User.updateOne({$and:[{email:email},{name:name}]},{$set:{isTeacher:isTeacher}});
    res.send((verifyTeacher))
    console.log(verifyTeacher)
})
router.get("/createadmin", async (req,res)=>{
    try {
        const user = new User({
            name:'Niraj',
            email:'nirajsam15@gmail.com',
            password:'Niraj@1234',
            isAdmin:true
        });
        const newUser = await user.save();
        res.send(newUser);
    } catch (error) {
        res.send({msg:error.message})
    }
    
})
module.exports=router