
import axios from 'axios'
import ContestHistory from '../components/contestHistory.jsx'
import ProblemSolving from '../components/problemSolving.jsx'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'

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
            <h1>Hi this is anup jaiswal</h1>
            <Box>
                {
                    isLoading?<Alert severity='info'>
                        <CircularProgress className='me-2'/>
                        <h4>Loading... PLease Wait</h4>
                    </Alert>:<Wrapper user={userProfile}/>
                }
            </Box>
        </>
    )



}

function Wrapper({user}) {
    return (
        <>
            <ProfileView user={user}/>
            <ContestHistory contests={user.ratingChange}/>
            <ProblemSolving submissions={user.submissions}/>
        </>
    )
}


function ProfileView({user}) {
    return (
        <>
            <div>
                <div className='vstack gap-2 border p-3 m-2 rounded shadow-sm'>
                    <p>{user.firstName + user.lastName}</p>
                    <p>{user.rating} (maxRating = {user.maxRating})</p>
                    <p>{user.rank}</p>
                    <p>{user.organization}</p>
                </div>
            </div>
        </>
    )
}