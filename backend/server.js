const express=require('express')

const config= require('./config')
const dotenv = require('dotenv')
const bodyParser= require('body-parser')
const mongoose = require('mongoose')
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute')
const resultRoute = require('./routes/resultRoutes')
const subQuesRoute=require('./routes/subQuesRoute')
const subAnsRoute=require('./routes/subAnsRoute')

const port=process.env.PORT || 5001;

dotenv.config();

const mongodbUrl = config.MONGODB_URL
mongoose.connect(mongodbUrl, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).catch(error=>console.log("mongo error",error))

const cors=require('cors')
const app=express();

const corsOptions = {
    origin: ['https://nirajsam-quiz-app-ai.netlify.app'], // Add your React app's domain
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
  };
  
app.use(cors(corsOptions));
app.use(bodyParser.json())
// app.use(upload())
app.options('*', cors(corsOptions)); // Handle preflight requests
app.options('*', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://nirajsam-quiz-app-ai.netlify.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.status(204).end(); // No content
  });
  
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/subQues", subQuesRoute);
app.use("/api/subAns", subAnsRoute);
app.use("/api/results",resultRoute);

app.listen(port,'0.0.0.0', ()=>{
    console.log("server started")
})