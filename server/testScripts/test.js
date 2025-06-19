import connectDB from "../configs/db.js";
import {UserModel,UserSubmissionData,UserRatingData} from "../models/user.js";
import { userInfo,userStatus,userRating } from "../mockdata/userData.js";
connectDB();



const prepareSubmissionList = [];
userStatus.result.map(item=>
    FeferSubmissionList.push({
        id:item.id,
        contestId:item.contestId,
        problemIndex:item.problem.index,
        problemName:item.problem.name,
        problemDificulty:item.problem.rating,
        verdict:item.verdict == "OK" ?"Accepted":item.verdict,
        timeConsumed:item.timeConsumedMillis,
        memoryConsumed:item.memoryConsumedBytes
    })
)










console.log("all done");
console.log(prepareSubmissionList.length);







