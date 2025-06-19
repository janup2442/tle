import mongoose from 'mongoose'

const submissionSchema = new mongoose.Schema({
    id:{
        type:Number
    },
    contestId:{
        type:Number
    },
    creationTimeSeconds:{
        type:Number
    },
    problemIndex:{
        type:String
    },
    problemName:{
        type:String
    },
    problemDificulty:{
        type:Number
    },
    verdict:{
        type:String
    },
    timeConsumed:{
        type:Number
    },
    memoryConsumed:{
        type:Number
    }
},{_id:false});


const userRatingSchema = new mongoose.Schema({
    contestId:Number,
    contestName:String,
    updateTimeSecond:Number,
    oldRating:Number,
    newRating:Number,
    rank:Number
    
},{_id:false})

const userSchema = new mongoose.Schema({
  handle: {
    type: String,
    required: true,
    trim: true,
    unique: true 
  },
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  email:{
    type:String,
  },
  phone:{
    type:String,
  },
  avatar: {
    type: String,
    required: true,
    trim: true
  },
  titlePhoto: {
    type: String,
    required: true,
    trim: true
  },
  lastOnlineTimeSeconds: {
    type: Number,
    required: true
  },
  registrationTimeSeconds: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 0
  },
  maxRating: {
    type: Number,
    required: true,
    min: 0
  },
  rank: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  maxRank: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  organization: {
    type: String,
    default: "",
    trim: true
  },
  submissions:{
    type:[submissionSchema]
  },
  ratingChange:{
    type:[userRatingSchema]
  }
}, {
  timestamps: true
});


const UserModel = mongoose.model('User', userSchema);

export  {UserModel}
