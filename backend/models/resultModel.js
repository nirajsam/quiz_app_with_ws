const mongoose = require('mongoose')

const resultSchema = new mongoose.Schema({
    testName:{ type: String,index: true, required: true},
    name:{ type: String,index: true, required: true},
    email: {type:String, required:true,index: true},
    score:{ type: Number,index: true, required: true},
    numberOfQuestion:{ type: Number,index: true, required: true},
    numberOfAnsweredQuestion:{ type: Number,index: true, required: true},
    correctAnswer:{ type: Number,index: true, required: true},
    wrongAnswer:{ type: Number,index: true, required: true},
    usedHints:{ type: Number,index: true, required: true},
    fiftyFiftyUsed:{ type: Number,index: true, required: true},
});
resultSchema.index({ email: 1, testName: 1 }, { unique: true });

const resultModel =mongoose.model("Result", resultSchema);

module.exports= resultModel;