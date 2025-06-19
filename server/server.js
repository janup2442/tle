


import connectDB from './configs/db.js'
import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import cors from 'cors'
import requestLogger from './middlewere/reqLogger.js';
import editUser from './routes/editUser.js';
import userBasic from './routes/userBasic.js';
import userProfile from './routes/userProfile.js';

const app = express();
app.use(express.json())
app.use(cors())

app.use(requestLogger)
connectDB();
app.use('/edituser',editUser)
app.use('/students',userBasic)
app.use('/student',userProfile)
app.get('/',(req,res)=>{
    res.json("got the requuest");
})

app.listen(process.env.PORT , ()=>{
    
    console.log("server is running");
})