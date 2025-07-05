


import connectDB from './configs/db.js'
import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import cors from 'cors'
import requestLogger from './middlewere/reqLogger.js';
import editUser from './routes/editUser.js';
import userBasic from './routes/userBasic.js';
import userProfile from './routes/userProfile.js';
import cron from 'node-cron'
import { UserModel } from './models/user.js';
import axios from 'axios';
import updateAllUser from './controllers/dataSyncController.js';
const app = express();
// suync codefoces data
connectDB();
const prepareString = (list, offset, string) => {
    if (list?.length - offset > 10000) {
        for (let i = offset; i < (offset + 10000); i++) {
            string = string + ';' + list[i].handle;
        }

        offset = offset + 10000;
    } else {
        for (let i = offset; i < list?.length; i++) {
            string = string + ';' + list[i].handle;
        }
        offset = list.length;
    }
    return {
        data: string,
        doneTill: offset
    };
}
// cron.schedule('* * * * *', async () => {
//     const usersList = await UserModel.find().select('handle');
//     let queryString = usersList[0].handle;
//     let offset = 1;
//     while (offset < usersList.length) {
//         const { data, doneTill } = prepareString(usersList, offset, queryString);
//         offset = doneTill;
//         queryString = data;
//     }
//     if(queryString !=""){
//         console.log("got the string : " + queryString);
//         try {
//             updateAllUser(queryString);
//             console.log(queryString);
            
//         } catch (error) {
//             console.error(error);
//         }
//     }
//     console.log("data sync is completed , which was scheduled for 2 am , everyday\n")
// })
app.use(express.json())
app.use(cors())
app.use(requestLogger)
app.use('/edituser', editUser)
app.use('/students', userBasic)
app.use('/student', userProfile)
app.get('/', (req, res) => {
    res.json("got the requuest");
})

app.listen(process.env.PORT, () => {

    console.log("server is running");
})