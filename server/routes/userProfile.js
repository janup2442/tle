


import express from 'express'
import { getOneUser } from '../controllers/userController.js'


const userProfile = express.Router()

userProfile.get('/',getOneUser)


export default userProfile