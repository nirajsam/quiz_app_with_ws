const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    testName:{type: String, required: true},
    testTime:{type: Number, required: true},
    question:{ type: Array, required: true},
    
});

const questionModel =mongoose.model( "questions", questionSchema);

module.exports= questionModel;
console.log(questionModel)