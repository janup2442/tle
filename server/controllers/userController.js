import axios from 'axios'
import { UserModel } from '../models/user.js';

const addUser = (req, res) => {
    const { handle, email, phone ,name} = req.body;
    
    // prepare the submission details of the new user
    const fetchSubmissions = () => {
        const prepareSubmissionList = [];
        return new Promise(resolve => {
            setTimeout(async () => {
                const data = await getUserSubmissions(handle);
                if (data.result.length) {
                    data.result.map(item =>
                        prepareSubmissionList.push({
                            id: item.id,
                            contestId: item.contestId,
                            problemIndex: item.problem.index,
                            problemName: item.problem.name,
                            problemDificulty: item.problem.rating,
                            verdict: item.verdict == "OK" ? "Accepted" : item.verdict,
                            timeConsumed: item.timeConsumedMillis,
                            memoryConsumed: item.memoryConsumedBytes
                        })
                    )
                }
                resolve(prepareSubmissionList)
            }, 2000);
        });
    }

    const fetchRatings = () => {
        const prepareRatingList = [];
        return new Promise(resolve => {
            setTimeout(async () => {
                const data = await getRatingDetails(handle);
                if (data.result.length > 0) {
                    data.result.map(item => {
                        prepareRatingList.push({
                            contestId: item.contestId,
                            contestName: item.contestName,
                            updateTimeSecond: item.ratingUpdateTimeSeconds,
                            oldRating: item.oldRating,
                            newRating: item.newRating,
                            rank: item.rank,
                        })
                    })
                }

                resolve(prepareRatingList)
            }, 2000);
        })
    }

    const fetchUserInfo = (submissions, ratings) => {
        setTimeout(async () => {
            try {
                const data = await getUserInfo(handle)
                const userObject = new UserModel({
                    handle: data[0].handle,
                    firstName: data[0].firstName==undefined?name:data[0].firstName,
                    lastName: data[0].lastName==undefined?"":data[0].lastName,
                    email:email==undefined?"no data":email,
                    phone:phone==undefined?"no data":phone,
                    avatar: data[0].avatar,
                    titlePhoto: data[0].titlePhoto,
                    lastOnlineTimeSeconds: data[0].lastOnlineTimeSeconds,
                    registrationTimeSeconds: data[0].registrationTimeSeconds,
                    rating: data[0].rating,
                    maxRating: data[0].maxRating,
                    rank: data[0].rank,
                    maxRank: data[0].maxRank,
                    organization: data[0].organization,
                    submissions: submissions,
                    ratingChange: ratings
                })

                userObject.save();
                res.json(`${userObject.handle} is Added successfully`)
            } catch (err) {
                console.log(err);

            }
        }, 2000);
    }


    Promise.all([fetchRatings(),fetchSubmissions()])
    .then(([ratings,submissions])=>{
        fetchUserInfo(submissions,ratings);
    });
}



const getUserSubmissions = async (handle) => {

    const result = await axios.get(`https://codeforces.com/api/user.status?handle=${handle}`)
    return result.data;

}


const getRatingDetails = async (handle) => {
    const result = await axios.get(`https://codeforces.com/api/user.rating?handle=${handle}`)

    return result.data;
}


const getUserInfo = async (handle) => {
    const result = await axios.get(`https://codeforces.com/api/user.info?handles=${handle}&checkHistoricHandles=false`)

    return (result.data).result;
}



const getAllUsers = async (req,res)=>{
    const data = await UserModel.find().select('handle firstName lastName rating maxRating avatar email phone');
    res.json(data);
}

const getOneUser  =async (req,res)=>{
    const userHandle = req.query.handle
    const data  = await UserModel.findOne({handle:userHandle});
    res.json(data)
}
export {addUser ,getAllUsers,getOneUser}