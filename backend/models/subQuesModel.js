const mongoose = require('mongoose')

const subQuestionSchema = new mongoose.Schema({
    testName:{type: String, required: true},
    testTime:{type: Number, required: true},
    question:{ type: Array, required: true},
    
});

const subQuestionModel =mongoose.model( "subQuestions", subQuestionSchema);

module.exports= subQuestionModel;
console.log(subQuestionModel)