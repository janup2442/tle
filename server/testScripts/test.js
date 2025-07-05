import connectDB from "../configs/db.js";
import { UserModel } from "../models/user.js";
import axios from "axios";

connectDB();
const fetchUser = async () => {
    try {
        console.log('function is called');
        
        const result = await UserModel.find();
        if (result) {
            console.log(result);
        }
    } catch (error) {
        console.log(error.message);

    }
}


fetchUser();