import express from 'express'
import { addUser, deleteUser } from '../controllers/userController.js';


const editUser  = express.Router();


editUser.post('/adduser',addUser);
editUser.get('/delete',deleteUser);


export default editUser