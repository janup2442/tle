// const mongoose = require('mongoose');
import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config({path: '../.env'});


// 
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB || 'mongodb://localhost:27017/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName:'codeforcesAssignment'
    });
    console.log('✅ MongoDB connected successfully!');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1); 
  }
};

export default connectDB
