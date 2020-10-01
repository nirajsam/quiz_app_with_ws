const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{ type: String, required: true},
    email: {type:String, required:true, unique: true, dropDups: true},
    class:{type:String},
    rollNo:{type:String},
    password:{type:String, required:true},
    isAdmin:{type:Boolean, required:true, default:false},
    isTeacher:{type:Boolean, required:true, default:false},
    verify:{type:Boolean, required:true, default:true}
});

const userModel =mongoose.model("User", userSchema);

module.exports= userModel;