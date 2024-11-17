const dotenv = require('dotenv')
dotenv.config()
module.exports={
    // MONGODB_URL: 'mongodb+srv://mongoUser:Niraj1997@cluster0.kt5yz.mongodb.net/quiz?retryWrites=true&w=majority' || process.env.MONGO_URL ,
    // MONGODB_URL: 'mongodb+srv://nirajsam15:Niraj@1997@cluster0.92rfapw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    MONGODB_URL: 'mongodb+srv://nirajsam15:D7Tsdeqi4TLFLrv9@cluster0.vwbfaul.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    //MONGODB_URL:'mongodb://localhost/quizApp',
    JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
}
// console.log(process.env.MONGO_URL)