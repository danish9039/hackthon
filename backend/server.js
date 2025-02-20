const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config({path: './config.env'});
const cookieparser = require('cookie-parser')
const port  = process.env.PORT 
const maprouter = require('./routes/map.route')
const authrouter  = require('./routes/router')
const connectDB = require('./db/conn')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin: "http://localhost:5173",
    methods:["GET","POST","PUT","DELETE"],
    credentials: true,
   
  
  }));
  
app.use(cookieparser())
connectDB()

app.use('/api/v1/auth',authrouter)
app.use('/api/v1/map',maprouter)
app.listen(port,(req,res)=>{
console.log(`server is running at port ${port}`)
})