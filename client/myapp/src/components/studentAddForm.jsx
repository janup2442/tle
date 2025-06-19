
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {useState} from 'react'
import axios from 'axios'
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

export default function StudentAddForm() {
    const [formData, setFormData] = useState({
        handle:"",
        email:"",
        phone:"",
        name:""
    })

    const [errorMsg , setErrorMsg] = useState(null); 
    const [isError , setError]  = useState(null)
    const [isLoading , setLoading] = useState(false)


    const handleEmail = (e)=>{
        e.preventDefault();
        setFormData({...formData,email:(e.target.value.trim())})
    }
    const handleHandle = (e)=>{
         e.preventDefault();
        setFormData({...formData,handle:(e.target.value.trim())})
    }
    const handlePhone = (e)=>{
         e.preventDefault();
        setFormData({...formData,phone:(e.target.value.trim())})
    }
    const handleName = (e)=>{
        e.preventDefault();

        setFormData({...formData,name:(e.target.value.trim())})
    }



    const handleSubmit = async()=>{
        try{
            setLoading(true)
            const result  = await axios.post('http://localhost:8500/edituser/adduser',formData)
            alert(result.data);
            setLoading(false)
        }catch(err){
            setErrorMsg(err)
            setError(true)
            setLoading(false)
        }
    }
    return (
        <>
            <Box>
                {
                    isError? <Alert severity="error">{errorMsg}</Alert>:null
                }
            </Box>
            <Box component="form"
                sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete="off"
                className='d-flex align-items-center shadow-sm my-2'>
                <div>
                    <TextField
                        label="Student Handle"
                        id="outlined-size-small"
                        margin='normal'
                        size="small"
                        name='handle'
                        onChange={handleHandle}
                    />
                    <TextField
                        label="Name"
                        id="outlined-size-small"
                        name='name'
                        size="small"
                        onChange={handleName}
                    />
                    <TextField
                        label="Email"
                        id="outlined-size-small"
                        name='email'
                        size="small"
                        onChange={handleEmail}
                    />
                    <TextField
                        label="Phone"
                        id="outlined-size-small"
                        name='phone'
                        size="small"
                        onChange={handlePhone}
                    />
                </div>
                <div className='border ms-auto me-3'>
                    {
                        isLoading?<CircularProgress/>:null
                    }
                    <Button variant="outlined" onClick={handleSubmit}>Add User</Button>
                </div>
            </Box>
        </>
    )

}