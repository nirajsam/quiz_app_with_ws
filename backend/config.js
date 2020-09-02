module.exports={
    MONGODB_URL: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/quizApp',
    JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
}