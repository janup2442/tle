
import StudentsTable from '../components/studentTable.jsx'
import axios from 'axios'
import { useState, useEffect } from 'react'
import StudentAddForm from '../components/studentAddForm.jsx'
import SectionDivision from '../components/section.jsx'
import Navbar from '../components/navbar.jsx'
export default function HomePage() {
    const [studentInfo, setStudentInfo] = useState([]);
    const fetchInfo = async () => {
        const result = await axios.get('http://localhost:8500/students')
        setStudentInfo(result.data);
    }
    useEffect(() => {
        fetchInfo();
    }, [])

    return (
        <>
            <Navbar />
            <SectionDivision title={'Add Students'} color={'primary'}>
                <StudentAddForm />
            </SectionDivision>

            <SectionDivision title={'Enrolled Students'} color={'primary'}>
                <StudentsTable rows={studentInfo} />
            </SectionDivision>
        </>
    )
}