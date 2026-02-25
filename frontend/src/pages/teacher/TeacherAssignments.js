import React, { useEffect, useState } from "react";

import {
    Container,
    Typography,
    Box,
    Grid,
    Paper,
    Button,
    TextField,
    Card,
    CardContent,
    IconButton,
    Stack,
    Avatar
} from "@mui/material";

import AssignmentIcon from "@mui/icons-material/Assignment";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import styled from "styled-components";

import axios from "axios";

import { useSelector } from "react-redux";


const TeacherAssignments = () => {

    const { currentUser } = useSelector(state => state.user);

    const teacherId = currentUser?._id;
    const classId = currentUser?.teachSclass?._id;
    const subjectId = currentUser?.teachSubject?._id;


    const [assignments, setAssignments] = useState([]);

    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    const [deadline, setDeadline] = useState("");


    useEffect(() => {
        fetchAssignments();
    }, []);


    const fetchAssignments = async () => {

        const res = await axios.get(
            `https://tutionplus.onrender.com/AssignmentsTeacher/${teacherId}`
        );

        setAssignments(res.data || []);
    };


    const createAssignment = async () => {

        await axios.post(
            "https://tutionplus.onrender.com/AssignmentCreate",
            {
                title,
                description,
                deadline,
                classId,
                subjectId,
                teacherId
            }
        );

        setTitle("");
        setDescription("");
        setDeadline("");

        fetchAssignments();
    };


    const deleteAssignment = async (id) => {

        await axios.delete(
            `https://tutionplus.onrender.com/Assignment/${id}`
        );

        fetchAssignments();
    };


    return (

        <Container maxWidth="lg">

            {/* Header */}

            <Header>

                <Avatar sx={{ bgcolor: "#2563eb" }}>
                    <AssignmentIcon />
                </Avatar>

                <Box>

                    <Typography variant="h5">
                        Assignment Management
                    </Typography>

                    <Typography variant="body2">
                        Create and manage student assignments
                    </Typography>

                </Box>

            </Header>


            {/* Create Form */}

            <FormCard>

                <Typography variant="h6" mb={2}>
                    Create Assignment
                </Typography>

                <Grid container spacing={2}>

                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            label="Title"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            label="Deadline"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={deadline}
                            onChange={e => setDeadline(e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            label="Description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <CreateButton
                            startIcon={<AddIcon />}
                            onClick={createAssignment}
                        >
                            Create Assignment
                        </CreateButton>
                    </Grid>

                </Grid>

            </FormCard>


            {/* Assignment List */}

            <Grid container spacing={3} mt={1}>

                {assignments.map(a => (

                    <Grid item xs={12} md={6} key={a._id}>

                        <AssignmentCard>

                            <CardContent>

                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                >

                                    <Box>

                                        <Typography fontWeight="bold">
                                            {a.title}
                                        </Typography>

                                        <Typography variant="body2">
                                            {a.description}
                                        </Typography>

                                        <Typography variant="caption">
                                            Deadline: {a.deadline?.substring(0,10)}
                                        </Typography>

                                    </Box>

                                    <IconButton
                                        onClick={() =>
                                            deleteAssignment(a._id)
                                        }
                                    >
                                        <DeleteIcon color="error"/>
                                    </IconButton>

                                </Stack>

                            </CardContent>

                        </AssignmentCard>

                    </Grid>

                ))}

            </Grid>

        </Container>

    );

};

export default TeacherAssignments;



const Header = styled(Paper)`
display:flex;
gap:15px;
align-items:center;
padding:20px;
border-radius:12px;
margin-bottom:20px;
`;

const FormCard = styled(Paper)`
padding:20px;
border-radius:12px;
margin-bottom:20px;
`;

const AssignmentCard = styled(Card)`
border-radius:12px;
`;

const CreateButton = styled(Button)`
background:linear-gradient(135deg,#2563eb,#7c3aed);
color:white;
`;