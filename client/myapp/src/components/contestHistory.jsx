import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import PropTypes from 'prop-types';
import { LineChart } from '@mui/x-charts/LineChart';


export default function ContestHistory(props) {
    const { contests } = props;
    const ratingBucket = [0,1200, 1400, 1600, 1900, 2100, 2600, 3000, 4000];
    const userRating = [];
    const prepareRating = () => {

        contests?.map(item => {
            userRating.push(item.newRating);
        })
    }

    prepareRating();
    console.log(userRating);
    
    return (

        <>
            <div>
                <LineChart
                    xAxis={[{ data: ratingBucket }]}
                    series={[
                        {
                            data: userRating
                        },
                    ]}
                    height={300}
                />
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
                                contests?.slice().reverse().map(item => (
                                    <TableRow>
                                        <TableCell>{item.contestName}</TableCell>
                                        <TableCell sx={{ maxWidth: '200px' }}>{Date(item.updateTimeSecond * 1000).toString()}</TableCell>
                                        <TableCell>{item.oldRating}</TableCell>
                                        <TableCell className={(item.oldRating - item.newRating) < 0 ? "text-danger fw-semibold" : "text-success fw-semibold"}>{(item.oldRating - item.newRating)}</TableCell>
                                        <TableCell>{item.newRating}</TableCell>
                                    </TableRow>
                                ))
                            }

                        </TableBody>
                        <TableFooter>

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