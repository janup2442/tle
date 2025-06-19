

import express from 'express'
import { getAllUsers } from '../controllers/userController.js';



const userBasic = express.Router();


userBasic.get('/',getAllUsers)


export default userBasic