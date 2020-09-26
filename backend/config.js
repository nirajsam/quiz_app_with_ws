const dotenv = require('dotenv')
dotenv.config()
module.exports={
    // MONGODB_URL: process.env.MONGO_URL,
    MONGODB_URL:'mongodb://localhost/quizApp',
    JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
}
// console.log(process.env.MONGO_URL)