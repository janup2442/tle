import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import PropTypes from 'prop-types';
import { LineChart } from '@mui/x-charts/LineChart';
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
    const { contests } = props;
    const ratingBucket = [];
    const userRating = [];
    const prepareRating = () => {
        contests?.map(item => {
            userRating.push(item.newRating);
        })
    }
    const prepareBucket = () => {
        let i = 0;
        let offset = 4000 / (contests?.length);
        for (let j = i; j < (contests?.length); j++) {
            ratingBucket.push(i);
            i += offset;
        }
    }

    let contestCopy  = [];
    if(Array.isArray(contests)){
        contestCopy = [...contests]
        contestCopy.reverse();
    }
    
    

    prepareBucket();

    prepareRating();


    const handleChangePage = (newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }
    // console.log(userRating);

    return (

        <>
            <div className="p-2 m-2 border shadow-sm rounded">
                <LineChart
                    xAxis={[{ data: ratingBucket }]}
                    series={[
                        {
                            data: userRating,
                        },
                    ]}
                    height={300}
                />
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
                                        <TableCell className={(item.oldRating - item.newRating) < 0 ? "text-danger fw-semibold" : "text-success fw-semibold"}>{(item.oldRating - item.newRating)}</TableCell>
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

ContestHistory.propTypes = {
    contests: PropTypes.array
}