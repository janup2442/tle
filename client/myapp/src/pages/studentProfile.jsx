
import axios from 'axios'
import ContestHistory from '../components/contestHistory.jsx'
import ProblemSolving from '../components/problemSolving.jsx'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import * as React from 'react';
// import { useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SectionDivision from '../components/section.jsx'



export default function StudentProfilePage() {
    const { handle } = useParams();
    const [userProfile, setProfile] = useState({});
    const [isLoading, setLoading] = useState(false)

    const fetchUser = async () => {
        setLoading(true)
        const result = await axios.get(`http://localhost:8500/student?handle=${handle}`);
        setProfile(result.data);
        setLoading(false);
    }
    useEffect(() => {
        fetchUser()
    }, [])


    return (
        <>
            <h3 className='px-4 p-3 shadow'>Student Profile Page</h3>
            <Box>
                {
                    isLoading ? <Alert severity='info'>
                        <CircularProgress className='me-2' />
                        <h4>Loading... PLease Wait</h4>
                    </Alert> : <Wrapper user={userProfile} />
                }
            </Box>
        </>
    )



}

function Wrapper({ user }) {
    return (
        <>
            <SectionDivision title={'Student Profile'} color={'primary'}>
                <ProfileView user={user} submissions={user.submissions} />
            </SectionDivision>
            <SectionDivision title={'Submissions'} color={'primary'}>
                <ProblemSolving submissions={user.submissions} />
            </SectionDivision>
            <SectionDivision title={'Contests'} color={'primary'}>
                <ContestHistory contests={user.ratingChange} />
            </SectionDivision>
        </>
    )
}


function ProfileView({ user, submissions }) {
    const defineRating = (rating) => {
        if (rating < 1200) {
            return "gray"
        } else if (rating >= 1200 && rating <= 1399) {
            return "green"
        } else if (rating >= 1400 && rating <= 1599) {
            return "cyan"
        } else if (rating >= 1600 && rating <= 1899) {
            return "blue"
        } else if (rating >= 1900 && rating <= 2099) {
            return "voilet"
        } else if (rating >= 2100 && rating <= 2399) {
            return "orange"
        } else {
            return "red"
        }
    }

    useEffect(() => {
        filterSubmission(0);
    }, [])
    const [rangedSubmissions, setSubmission] = useState({
        maxRatingProblem: 0,
        averageRating: 0,
        totalProblem: 0
    });

    const filterSubmission = (time) => {
        const endTime = Math.floor(Date.now() / 1000) - (time * 24 * 60 * 60);

        console.log('endtime is : ' + endTime);
        let result = [];
        if (time==0) {
             result = submissions?.filter((item)=>{
                return item.verdict == 'Accepted'
            })
        } else {
             result = submissions?.filter((item) => {
                return item.submittedOn >= (endTime) && item.verdict == 'Accepted';
            })
        }
        console.log(result);
        let temp = {
            maxRatingProblem: 0,
            averageRating: 0,
            totalSumOfRating: 0,
            totalProblem: result?.length
        };
        result?.map((item) => {
            if (item.problemDificulty) {
                temp.maxRatingProblem = Math.max(temp.maxRatingProblem, item.problemDificulty);
                temp.totalSumOfRating += item.problemDificulty;
            };
        })
        console.log(temp);
        if (temp) {

            if(temp.totalProblem!=0){
                temp.averageRating = Math.floor(temp.totalSumOfRating / temp.totalProblem)
            }
            setSubmission(temp);
        }
    }
    const handleFilter = (e) => {
        e.preventDefault();
        switch (e.target.value) {
            case '7': filterSubmission(7);
                break;
            case '30': filterSubmission(30);
                break;
            case '90': filterSubmission(90);
                break;
            default: filterSubmission(0)
                break;
        }
    }
    return (
        <>
            <div className='row row-cols-1 row-cols-md-2 g-3'>
                <Card sx={{ display: 'flex' }} className='border p-2 shadow-sm'>
                    <Box sx={{ display: 'flex' }}>
                        <CardMedia
                            component="img"
                            sx={{ width: 151 }}
                            image={user.titlePhoto}
                            alt="Live from space album cover"
                        />
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h4" className='fw-semibold'>
                                {user.firstName + user.lastName}
                            </Typography>
                            <Typography component={'div'} variant='h6'>
                                Current Rating : {user.rating}
                            </Typography>
                            <Typography component={'div'} variant='h6'>
                                Maximum Rating : {user.maxRating}
                            </Typography>
                            <Typography component={'div'} variant='h6' >
                                Rank :
                                <span style={{ color: defineRating(user.rating) }}> {user.rank}</span>
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                component="div"
                                sx={{ color: 'text.secondary' }}
                            >
                                {user.organization}
                            </Typography>
                        </CardContent>
                    </Box>
                </Card>

                <div className='border-start'>
                    <div>
                        <form>
                            <label htmlFor="" className='form-text'>Filter</label>
                            <select name="" id="" className='form-select' onChange={handleFilter}>
                                <option value="0" selected>Overall</option>
                                <option value="7">Last 7 days</option>
                                <option value="30">Last 30 days</option>
                                <option value="90">Last 90 days</option>
                            </select>
                        </form>
                    </div>
                    <div className='row row-cols-2 g-2 m-3'>
                        <div className='col px-2 py-3 shadow-sm'>
                            <div className='text-center'>
                                <div className='fw-semibold fs-4'>{rangedSubmissions.maxRatingProblem}</div>
                                <div className='mt-2 fw-semibold'>Most Dificult</div>
                            </div>
                        </div>
                        <div className='col px-2 py-3 shadow-sm'>
                            <div className='text-center'>
                                <div className='fw-semibold fs-4'>{rangedSubmissions.averageRating}</div>
                                <div className='mt-2 fw-semibold'>Average Rating</div>
                            </div>
                        </div>
                        <div className='col px-2 py-3 shadow-sm'>
                            <div className='text-center'>
                                <div className='fw-semibold fs-4'>{rangedSubmissions.totalProblem}</div>
                                <div className='mt-2 fw-semibold'>Total Problem solved</div>
                            </div>
                        </div>
                        <div className='col px-2 py-3 shadow-sm'></div>
                    </div>
                </div>

            </div>
        </>
    )
}