
import axios from 'axios'
import ContestHistory from '../components/contestHistory.jsx'
import ProblemSolving from '../components/problemSolving.jsx'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

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
            <h1>Student Profile Page</h1>
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
            <ProfileView user={user} />
            <ContestHistory contests={user.ratingChange} />
            <ProblemSolving submissions={user.submissions} />
        </>
    )
}


function ProfileView({ user }) {
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
    return (
        <>
            <Card sx={{ display: 'flex' }} className='border p-2 shadow-sm m-2'>
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
        </>
    )
}