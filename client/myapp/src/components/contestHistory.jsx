import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import PropTypes from 'prop-types';
import Divider from "@mui/material/Divider";
import { useState } from 'react'
import TablePagination from "@mui/material/TablePagination";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip ,ResponsiveContainer } from 'recharts';

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};


export default function ContestHistory(props) {

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(7);
    let maxRating = 0;
    const { contests } = props;
    // const codeforcesRatingTiers = [
    //     { lower: 0, upper: 1199, title: "Newbie", color: "gray" },
    //     { lower: 1200, upper: 1399, title: "Pupil", color: "green" },
    //     { lower: 1400, upper: 1599, title: "Specialist", color: "cyan" },
    //     { lower: 1600, upper: 1899, title: "Expert", color: "blue" },
    //     { lower: 1900, upper: 2099, title: "Candidate Master", color: "purple" },
    //     { lower: 2100, upper: 2299, title: "Master", color: "orange" },
    //     { lower: 2300, upper: 2399, title: "International Master", color: "orange" },
    //     { lower: 2400, upper: 2599, title: "Grandmaster", color: "red" },
    //     { lower: 2600, upper: 2999, title: "International Grandmaster", color: "red" },
    //     { lower: 3000, upper: Infinity, title: "Legendary Grandmaster", color: "red" }
    // ];
    const ratingBucket = [0,4000];
    const userRatingData =[]
    const prepareRating = () => {
        let i  =1;
        contests?.map(item => {
            maxRating = Math.max(item.newRating,maxRating)
            userRatingData.push({
                contest:i++,
                rating:item.newRating,
                change:(item.newRating - item.oldRating)
            })
        })
    }

    prepareRating();

    let contestCopy = [];
    if (Array.isArray(contests)) {
        contestCopy = [...contests]
        contestCopy.reverse();
    }
    const handleChangePage = (newPage) => {
        setPage(newPage);
    }
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }
    // console.log(userRating);

    return (

        <>
            <div className="p-2 m-2 border shadow-sm rounded">
                <RatingGraph data={userRatingData} ratingTier = {ratingBucket} maxRating={maxRating}/>
                <Divider />
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Contest Name</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Old Rating</TableCell>
                                <TableCell>Rating Change</TableCell>
                                <TableCell>New Rating</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                contestCopy?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item => (
                                    <TableRow>
                                        <TableCell>{item.contestName}</TableCell>
                                        <TableCell sx={{ maxWidth: '200px' }}>{new Date(item.updateTimeSecond * 1000).toString()}</TableCell>
                                        <TableCell>{item.oldRating}</TableCell>
                                        <TableCell className={(item.newRating - item.oldRating) < 0 ? "text-danger fw-semibold" : "text-success fw-semibold"}>{(item.newRating - item.oldRating)}</TableCell>
                                        <TableCell>{item.newRating}</TableCell>
                                    </TableRow>
                                ))
                            }

                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[7, 10, 25, { label: 'All', value: -1 }]}
                                    count={contestCopy?.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    slotProps={{
                                        select: {
                                            inputProps: {
                                                'aria-label': 'rows per page',
                                            },
                                            native: true,
                                        },
                                    }}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>

                        </TableFooter>
                    </Table>
                </TableContainer>
            </div>
        </>
    )
}

function RatingGraph({data}){
    // const yAxisLimit = 4000
    return(
        <>
            <ResponsiveContainer width='100%' height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray={'3 3'}/>
                    <XAxis dataKey={'contest'}/>
                    <YAxis domain={[0,4000]} />
                    <Tooltip/>
                    <Line type={'monotone'} dataKey={'rating'} stroke="#8884d8" strokeWidth={2} dot={{r:4}} activeDot={{r:6}}/>
                </LineChart>
            </ResponsiveContainer>
        </>
    )
}

