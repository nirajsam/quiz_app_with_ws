const mongoose = require('mongoose')

const subAnsSchema = new mongoose.Schema({
    name:{ type: String, required: true},
    email: {type:String,index: true, required:true},
    date:{type:String,required: true},
    testName:{type: String,index: true, required: true},
    answers:{ type: Array, required: true},
    marks:{type:String,default:'not checked',required: true}
    
});
subAnsSchema.index({ email: 1, testName: 1 }, { unique: true });

const subAnsModel =mongoose.model( "subAnswers", subAnsSchema);

module.exports= subAnsModel;
console.log(subAnsModel)