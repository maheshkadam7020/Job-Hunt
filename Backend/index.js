import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv'
import dbconnect from './utils/db.js';
import userRoute from './routes/user.route.js'
import companyroute from './routes/company.route.js'
import jobroute from './routes/job.route.js'
import applicationroute from './routes/application.route.js'
dotenv.config({})
const app=express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());



const port = process.env.PORT || 8000;

app.get('/home',(req,resp)=>{
    return resp.status(200).json({
        message:"i am coming from backend",
        succuss:true
    })
})
 app.use("/api",userRoute);
 app.use("/api",companyroute);
 app.use("/api",jobroute);
 app.use("/api",applicationroute);

app.listen(port,()=>
{
    dbconnect();
    console.log(`Server is running at port ${port}`)
})