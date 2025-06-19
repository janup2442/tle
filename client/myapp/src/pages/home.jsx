
import StudentsTable from '../components/studentTable.jsx'
import axios from 'axios'
import {useState,useEffect} from 'react'
import StudentAddForm from '../components/studentAddForm.jsx'
export default function HomePage() {
    const [studentInfo , setStudentInfo] = useState([]);
    const fetchInfo = async ()=>{
        const result  = await axios.get('http://localhost:8500/students')
        setStudentInfo(result.data);
    }
    useEffect(()=>{
        fetchInfo();
    },[])

    

    return (
        <>
            <StudentAddForm/>

            <StudentsTable rows={studentInfo} />
        </>
    )
}