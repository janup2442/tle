import Box from "@mui/material/Box";
import React from 'react'
import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'
import {useState} from 'react'

export default function ProblemSolving({ submissions }) {
    return (
        <>
            <Box component={'section'} >
                <div>
                    <Heatmap data={submissions} />
                </div>
            </Box>
        </>
    )
}

function Heatmap({ data }) {
    let temp = new Map();

    Array.isArray(data) ? data.map(item => {
        const key = new Date(item.submittedOn * 1000).toISOString();
        const keyFormat = key.slice(0, 10);
        if (!temp.has(keyFormat)) {
            temp.set(keyFormat, 0);
        }
        temp.set(keyFormat, temp.get(keyFormat) + 1);
    }) : null
    const dummy = [];
    if (temp) {
        temp.forEach((value, key) => {
            dummy.push({
                date: key,
                count: value
            })
        })
        console.log(dummy);
    }

    const [year , setYear] = useState(new Date().getFullYear())

    const handleYearChange = (e)=>{
        e.preventDefault();
        setYear(e.target.value)
    }

    return (
        <>
            <div style={{ width: '100%', maxWidth: 1000 }} className="mx-auto">
                <select name="" id="" onChange={handleYearChange}>
                    <option value="current Year" selected>{new Date().getFullYear()}</option>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                </select>
                <CalendarHeatmap
                    startDate={new Date(`${year}-01-01`)}
                    endDate={new Date(`${year}-12-31`)}
                    values={dummy}
                    classForValue={(value) => {
                        if (!value || !value.count) return 'color-empty';
                        if (value.count >= 5) return 'color-github-4';
                        if (value.count >= 3) return 'color-github-3';
                        if (value.count >= 1) return 'color-github-2';
                        return 'color-github-1';
                    }}
                />
            </div>
        </>
    )
}

