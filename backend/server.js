const express=require('express')

const config= require('./config')
const dotenv = require('dotenv')
const bodyParser= require('body-parser')
const mongoose = require('mongoose')
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute')
const resultRoute = require('./routes/resultRoutes')
// const commentRoute = require('./routes/commentRoute')
// const rateRoute = require('./routes/rateRoute')
// const upload = require('express-fileupload')
const PORT=process.env.port || 5000;

dotenv.config();

const mongodbUrl = config.MONGODB_URL
mongoose.connect(mongodbUrl, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).catch(error=>console.log(error.reason))

const cors=require('cors')
const app=express();

app.use(bodyParser.json())
app.use(cors())
// app.use(upload())

app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/results",resultRoute);
// app.use("/api/comment", commentRoute);
// app.use("/api/rate", rateRoute);
//console.log("sam")
// app.get("/api/products/:id",(req,res)=>{
//     const productId = req.params.id;
//     const product = data.products.find(x=>x._id===productId);
//     if(product){
//         res.send(product)
//     }else{
//         res.status(404).send({msg:"product Not found"})
//     }
//     res.send(data.products);
// });
// app.get('/',(req,res)=>{
//     res.sendFile(__dirname+'/index.html')
// })


//  app.post('/upload',(req,res)=>{
//      if(req.files == null){
//          return res.status(400).json({msg:'no file uploaded'})
//      }
//      const file = req.files.file;
//      file.mv(`E:/Ekart_project/frontend/public/images/${file.name}`,err =>{
//          if(err){
//              console.error(err);
//              return res.status(500).send(err);
//          }
//          res.json({fileName:file.name, filePath:`/images/${file.name}`})
//      })
//  })
 

app.listen(PORT, ()=>{
    console.log("server started")
})