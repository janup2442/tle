import express from 'express'
import { addUser } from '../controllers/userController.js';


const editUser  = express.Router();


editUser.post('/adduser',addUser);


export default editUser