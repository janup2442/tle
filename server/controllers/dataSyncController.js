import { UserModel } from "../models/user.js";
import axios from "axios";

const getUserInfo = async (handle) => {
    const result = await axios.get(`https://codeforces.com/api/user.info?handles=${handle}&checkHistoricHandles=false`)

    return (result.data).result;
}


const getUserSubmissions = async (handle) => {

    const result = await axios.get(`https://codeforces.com/api/user.status?handle=${handle}`)
    return result.data;

}


const getRatingDetails = async (handle) => {
    const result = await axios.get(`https://codeforces.com/api/user.rating?handle=${handle}`)

    return result.data;
}


const updateAllUser = async (queryString) => {
    const data = await getUserInfo(queryString);

    if (data?.length > 0) {
        data.map(item => {
            const handle = item.handle;

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

            const updateUser = (submissions, ratings) => {
                setTimeout(async() => {
                    try {
                        await UserModel.updateOne({
                            handle: handle
                        }, {
                            $set: {
                                avatar: item.avatar,
                                titlePhoto: item.titlePhoto,
                                lastOnlineTimeSeconds: item.lastOnlineTimeSeconds,
                                registrationTimeSeconds: item.registrationTimeSeconds,
                                rating: item.rating,
                                maxRating: item.maxRating,
                                rank: item.rank,
                                maxRank: item.maxRank,
                                organization: item.organization,
                                submissions: submissions,
                                ratingChange: ratings
                            }
                        })
                        console.log("User data just have been updated\n");

                    } catch (err) {
                        console.log(err.message);
                    }
                }, 2000);
            }

            // Promise.all([fetchSubmissions(), fetchRatings()]).then(([submissions, ratings]) => {
            //     updateUser(submissions, ratings);
            // })

            console.log(handle);
            
        })
    }

}


export default updateAllUser