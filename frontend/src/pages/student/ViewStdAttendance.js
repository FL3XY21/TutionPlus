import React, { useEffect, useState } from 'react';

import {
    KeyboardArrowDown,
    KeyboardArrowUp,
    InsertChart,
    InsertChartOutlined,
    TableChart,
    TableChartOutlined,
    School,
    Percent
} from '@mui/icons-material';

import {
    BottomNavigation,
    BottomNavigationAction,
    Box,
    Button,
    Collapse,
    Paper,
    Table,
    TableBody,
    TableHead,
    Typography,
    Grid,
    LinearProgress,
    CircularProgress,
    Stack
} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';

import { getUserDetails }
from '../../redux/userRelated/userHandle';

import {
    calculateOverallAttendancePercentage,
    calculateSubjectAttendancePercentage,
    groupAttendanceBySubject
}
from '../../components/attendanceCalculator';

import CustomBarChart
from '../../components/CustomBarChart';

import {
    StyledTableCell,
    StyledTableRow
}
from '../../components/styles';



const ViewStdAttendance = () => {

    const dispatch = useDispatch();

    const { userDetails,
            currentUser,
            loading,
            response,
            error }
        = useSelector((state) => state.user);



    const [openStates,
        setOpenStates]
        = useState({});



    const [subjectAttendance,
        setSubjectAttendance]
        = useState([]);

    const [selectedSection,
        setSelectedSection]
        = useState('table');



    useEffect(() => {

        dispatch(
            getUserDetails(
                currentUser._id,
                "Student"
            )
        );

    }, [dispatch, currentUser._id]);



    useEffect(() => {

        if (userDetails)
            setSubjectAttendance(
                userDetails.attendance || []
            );

    }, [userDetails]);



    const attendanceBySubject =
        groupAttendanceBySubject(
            subjectAttendance
        );



    const overallAttendancePercentage =
        calculateOverallAttendancePercentage(
            subjectAttendance
        );



    const subjectData =
        Object.entries(attendanceBySubject)
        .map(([subName,
               { present,
                 sessions }]) => ({

            subject: subName,

            attendancePercentage:
                calculateSubjectAttendancePercentage(
                    present,
                    sessions
                ),

            totalClasses: sessions,
            attendedClasses: present

        }));



    const handleOpen =
        (subId) => {

            setOpenStates(prev => ({
                ...prev,
                [subId]: !prev[subId]
            }));

        };



    const handleSectionChange =
        (event, newSection) => {

            setSelectedSection(
                newSection
            );

        };



    if (loading)
        return (
            <Box
                display="flex"
                justifyContent="center"
                mt={6}
            >
                <CircularProgress />
            </Box>
        );



    /* ======================
       TABLE UI
    ====================== */

    const renderTableSection = () => (

        <Box>

            {/* HEADER */}

            <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                mb={3}
            >

                <School
                    sx={{
                        color: "#7c3aed",
                        fontSize: 32
                    }}
                />

                <Typography
                    variant="h4"
                    fontWeight="bold"
                >
                    Attendance Overview
                </Typography>

            </Stack>



            {/* OVERALL CARD */}

            <Paper
                sx={{
                    p: 3,
                    mb: 3,
                    borderRadius: 3
                }}
            >

                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                >

                    <Percent
                        sx={{
                            fontSize: 40,
                            color: "#7c3aed"
                        }}
                    />

                    <Box flex={1}>

                        <Typography>
                            Overall Attendance
                        </Typography>

                        <Typography
                            variant="h4"
                            fontWeight="bold"
                        >
                            {overallAttendancePercentage.toFixed(2)}%
                        </Typography>

                        <LinearProgress
                            variant="determinate"
                            value={overallAttendancePercentage}
                            sx={{
                                mt: 1,
                                height: 10,
                                borderRadius: 5
                            }}
                        />

                    </Box>

                </Stack>

            </Paper>



            {/* TABLE */}

            <Paper
                sx={{
                    borderRadius: 3,
                    overflow: "hidden"
                }}
            >

                <Table>

                    <TableHead>

                        <StyledTableRow>

                            <StyledTableCell>
                                Subject
                            </StyledTableCell>

                            <StyledTableCell>
                                Present
                            </StyledTableCell>

                            <StyledTableCell>
                                Total
                            </StyledTableCell>

                            <StyledTableCell>
                                Percentage
                            </StyledTableCell>

                            <StyledTableCell align="center">
                                Details
                            </StyledTableCell>

                        </StyledTableRow>

                    </TableHead>



                    {Object.entries(attendanceBySubject)
                        .map(([subName,
                               { present,
                                 allData,
                                 subId,
                                 sessions }],
                              index) => {

                        const percent =
                            calculateSubjectAttendancePercentage(
                                present,
                                sessions
                            );

                        return (

                            <TableBody key={index}>

                                <StyledTableRow>

                                    <StyledTableCell>
                                        {subName}
                                    </StyledTableCell>

                                    <StyledTableCell>
                                        {present}
                                    </StyledTableCell>

                                    <StyledTableCell>
                                        {sessions}
                                    </StyledTableCell>

                                    <StyledTableCell>

                                        <Box>

                                            {percent}%

                                            <LinearProgress
                                                variant="determinate"
                                                value={percent}
                                                sx={{
                                                    mt: 1,
                                                    height: 6,
                                                    borderRadius: 5
                                                }}
                                            />

                                        </Box>

                                    </StyledTableCell>

                                    <StyledTableCell align="center">

                                        <Button
                                            variant="contained"
                                            onClick={() =>
                                                handleOpen(subId)
                                            }
                                        >
                                            {openStates[subId]
                                                ? <KeyboardArrowUp />
                                                : <KeyboardArrowDown />
                                            }
                                        </Button>

                                    </StyledTableCell>

                                </StyledTableRow>



                                {/* DETAILS */}

                                <StyledTableRow>

                                    <StyledTableCell
                                        colSpan={6}
                                    >

                                        <Collapse
                                            in={openStates[subId]}
                                        >

                                            <Box p={2}>

                                                {allData.map(
                                                    (data,
                                                     index) => {

                                                        const date =
                                                            new Date(
                                                                data.date
                                                            )
                                                            .toISOString()
                                                            .substring(0,10);

                                                        return (

                                                            <Typography key={index}>
                                                                {date}
                                                                —
                                                                {data.status}
                                                            </Typography>

                                                        );

                                                    })

                                                }

                                            </Box>

                                        </Collapse>

                                    </StyledTableCell>

                                </StyledTableRow>

                            </TableBody>

                        );

                    })}

                </Table>

            </Paper>

        </Box>

    );



    /* ======================
       CHART UI
    ====================== */

    const renderChartSection = () => (

        <Paper
            sx={{
                p: 3,
                borderRadius: 3
            }}
        >

            <Typography
                variant="h5"
                mb={2}
                fontWeight="bold"
            >
                Attendance Analytics
            </Typography>

            <CustomBarChart
                chartData={subjectData}
                dataKey="attendancePercentage"
            />

        </Paper>

    );



    return (

        <Box p={3} pb={8}>

            {subjectAttendance.length > 0
                ? (
                    <>
                        {selectedSection === "table"
                            ? renderTableSection()
                            : renderChartSection()
                        }

                        <Paper
                            sx={{
                                position: "fixed",
                                bottom: 0,
                                left: 0,
                                right: 0,
                                borderRadius: 0,
                                boxShadow: 3
                            }}
                        >

                            <BottomNavigation
                                value={selectedSection}
                                onChange={handleSectionChange}
                            >

                                <BottomNavigationAction
                                    label="Table"
                                    value="table"
                                    icon={
                                        selectedSection === "table"
                                            ? <TableChart />
                                            : <TableChartOutlined />
                                    }
                                />

                                <BottomNavigationAction
                                    label="Chart"
                                    value="chart"
                                    icon={
                                        selectedSection === "chart"
                                            ? <InsertChart />
                                            : <InsertChartOutlined />
                                    }
                                />

                            </BottomNavigation>

                        </Paper>

                    </>
                )
                :
                (
                    <Typography>
                        No attendance data available
                    </Typography>
                )
            }

        </Box>

    );

};

export default ViewStdAttendance;