import React, { useEffect, useState } from "react";

import {
    Container,
    Paper,
    Typography,
    Box,
    Avatar,
    Grid,
    Button,
    Collapse,
    Table,
    TableBody,
    TableHead,
    Stack,
    Divider
} from "@mui/material";

import {
    KeyboardArrowDown,
    KeyboardArrowUp,
    Person
} from "@mui/icons-material";

import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";

import { getUserDetails } from "../../redux/userRelated/userHandle";

import { useNavigate, useParams } from "react-router-dom";

import {
    calculateOverallAttendancePercentage,
    calculateSubjectAttendancePercentage,
    groupAttendanceBySubject
} from "../../components/attendanceCalculator";

import CustomPieChart from "../../components/CustomPieChart";

import { PurpleButton } from "../../components/buttonStyles";

import {
    StyledTableCell,
    StyledTableRow
} from "../../components/styles";



const TeacherViewStudent = () => {

    const navigate = useNavigate();

    const params = useParams();

    const dispatch = useDispatch();



    const {
        currentUser,
        userDetails,
        response,
        loading,
        error
    } = useSelector((state) => state.user);



    const address = "Student";

    const studentID = params.id;

    const teachSubject = currentUser.teachSubject?.subName;

    const teachSubjectID = currentUser.teachSubject?._id;



    useEffect(() => {
        dispatch(getUserDetails(studentID, address));
    }, [dispatch, studentID]);



    if (response) console.log(response);
    else if (error) console.log(error);



    const [subjectMarks, setSubjectMarks] = useState([]);

    const [subjectAttendance, setSubjectAttendance] = useState([]);

    const [openStates, setOpenStates] = useState({});



    const handleOpen = (subId) => {

        setOpenStates(prev => ({
            ...prev,
            [subId]: !prev[subId]
        }));

    };



    useEffect(() => {

        if (userDetails) {

            setSubjectMarks(userDetails.examResult || []);

            setSubjectAttendance(userDetails.attendance || []);

        }

    }, [userDetails]);



    const overallAttendancePercentage =
        calculateOverallAttendancePercentage(subjectAttendance);

    const overallAbsentPercentage =
        100 - overallAttendancePercentage;



    const chartData = [

        { name: "Present", value: overallAttendancePercentage },

        { name: "Absent", value: overallAbsentPercentage }

    ];



    if (loading)
        return <Typography>Loading...</Typography>;



    return (

        <Container maxWidth="lg">

            {/* PROFILE HEADER */}

            <ProfileHeader elevation={0}>

                <Stack alignItems="center" spacing={2}>

                    <Avatar
                        sx={{
                            width: 90,
                            height: 90,
                            bgcolor: "#7c3aed",
                            fontSize: 36
                        }}
                    >
                        {userDetails?.name?.charAt(0)}
                    </Avatar>

                    <Typography variant="h4" fontWeight="bold">
                        {userDetails?.name}
                    </Typography>

                    <Typography color="text.secondary">
                        Roll No: {userDetails?.rollNum}
                    </Typography>

                    <Typography color="text.secondary">
                        Class: {userDetails?.sclassName?.sclassName}
                    </Typography>

                    <Typography color="text.secondary">
                        School: {userDetails?.school?.schoolName}
                    </Typography>

                </Stack>

            </ProfileHeader>



            {/* ATTENDANCE SECTION */}

            <SectionCard elevation={0}>

                <SectionTitle>
                    Attendance Overview
                </SectionTitle>

                <Grid container spacing={3}>

                    <Grid item xs={12} md={6}>

                        <CustomPieChart data={chartData} />

                        <Typography
                            align="center"
                            mt={2}
                            fontWeight="bold"
                        >
                            Overall Attendance:
                            {" "}
                            {overallAttendancePercentage.toFixed(2)}%
                        </Typography>

                    </Grid>



                    <Grid item xs={12} md={6}>

                        {Object.entries(
                            groupAttendanceBySubject(subjectAttendance)
                        ).map(([subName,
                            { present, allData, subId, sessions }]) => {

                            if (subName !== teachSubject)
                                return null;

                            const percentage =
                                calculateSubjectAttendancePercentage(
                                    present,
                                    sessions
                                );

                            return (

                                <Paper key={subId} sx={{ p: 2 }}>

                                    <Typography variant="h6">
                                        {subName}
                                    </Typography>

                                    <Typography>
                                        Present: {present}
                                    </Typography>

                                    <Typography>
                                        Sessions: {sessions}
                                    </Typography>

                                    <Typography>
                                        Attendance: {percentage}%
                                    </Typography>



                                    <Button
                                        variant="outlined"
                                        sx={{ mt: 1 }}
                                        onClick={() => handleOpen(subId)}
                                    >
                                        Details
                                    </Button>



                                    <Collapse in={openStates[subId]}>

                                        <Table>

                                            <TableHead>

                                                <StyledTableRow>

                                                    <StyledTableCell>
                                                        Date
                                                    </StyledTableCell>

                                                    <StyledTableCell>
                                                        Status
                                                    </StyledTableCell>

                                                </StyledTableRow>

                                            </TableHead>

                                            <TableBody>

                                                {allData.map((data, i) => (

                                                    <StyledTableRow key={i}>

                                                        <StyledTableCell>
                                                            {
                                                                new Date(data.date)
                                                                    .toISOString()
                                                                    .substring(0, 10)
                                                            }
                                                        </StyledTableCell>

                                                        <StyledTableCell>
                                                            {data.status}
                                                        </StyledTableCell>

                                                    </StyledTableRow>

                                                ))}

                                            </TableBody>

                                        </Table>

                                    </Collapse>

                                </Paper>

                            );

                        })}

                    </Grid>

                </Grid>



                <PurpleButton
                    sx={{ mt: 3 }}
                    onClick={() =>
                        navigate(
                            `/Teacher/class/student/attendance/${studentID}/${teachSubjectID}`
                        )
                    }
                >
                    Add Attendance
                </PurpleButton>

            </SectionCard>



            {/* MARKS SECTION */}

            <SectionCard elevation={0}>

                <SectionTitle>
                    Subject Marks
                </SectionTitle>

                {subjectMarks.map((result, index) => {

                    if (result.subName?.subName !== teachSubject)
                        return null;

                    return (

                        <Table key={index}>

                            <TableHead>

                                <StyledTableRow>

                                    <StyledTableCell>
                                        Subject
                                    </StyledTableCell>

                                    <StyledTableCell>
                                        Marks
                                    </StyledTableCell>

                                </StyledTableRow>

                            </TableHead>

                            <TableBody>

                                <StyledTableRow>

                                    <StyledTableCell>
                                        {result.subName.subName}
                                    </StyledTableCell>

                                    <StyledTableCell>
                                        {result.marksObtained}
                                    </StyledTableCell>

                                </StyledTableRow>

                            </TableBody>

                        </Table>

                    );

                })}



                <PurpleButton
                    sx={{ mt: 3 }}
                    onClick={() =>
                        navigate(
                            `/Teacher/class/student/marks/${studentID}/${teachSubjectID}`
                        )
                    }
                >
                    Add Marks
                </PurpleButton>

            </SectionCard>

        </Container>

    );

};



export default TeacherViewStudent;



const ProfileHeader = styled(Paper)`
    padding: 30px;
    border-radius: 20px;
    margin-bottom: 20px;
    text-align: center;
    background: linear-gradient(135deg, #2563eb, #7c3aed);
    color: white;
`;



const SectionCard = styled(Paper)`
    padding: 25px;
    border-radius: 16px;
    margin-bottom: 20px;
`;



const SectionTitle = styled(Typography)`
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 15px;
`;