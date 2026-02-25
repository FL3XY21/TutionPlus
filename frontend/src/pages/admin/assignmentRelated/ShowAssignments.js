import React, { useEffect, useState } from "react";
import axios from "axios";

import {
    Typography,
    Grid,
    Box,
    Button,
    CircularProgress,
    Alert
} from "@mui/material";

import AssignmentCard from "./AssignmentCard";
import { useNavigate } from "react-router-dom";

const ShowAssignments = () => {

    const navigate = useNavigate();

    const [assignments, setAssignments] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);


    useEffect(() => {

        fetchAssignments();

    }, []);


    const fetchAssignments = async () => {

        try {

            setLoading(true);

            const res = await axios.get(
                "http://localhost:5000/Assignments"
            );

            setAssignments(res.data);

            setError(null);

        }
        catch (err) {

            console.error("Fetch assignment error:", err);

            setError("Failed to load assignments");

        }
        finally {

            setLoading(false);

        }

    };


    // Loading state
    if (loading) {

        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="60vh"
            >
                <CircularProgress size={40} />
            </Box>
        );

    }


    // Error state
    if (error) {

        return (
            <Box m={3}>
                <Alert severity="error">
                    {error}
                </Alert>
            </Box>
        );

    }


    return (

        <Box p={3}>


            {/* Header */}

            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={4}
            >

                <Typography variant="h4" fontWeight="bold">
                    Assignment Management
                </Typography>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                        navigate("/Admin/assignments/create")
                    }
                >
                    Create Assignment
                </Button>

            </Box>


            {/* Empty state */}

            {assignments.length === 0 ? (

                <Alert severity="info">
                    No assignments found. Create your first assignment.
                </Alert>

            ) : (

                <Grid container spacing={3}>

                    {assignments.map((assignment) => (

                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                            key={assignment._id}
                        >

                            <AssignmentCard
                                assignment={assignment}
                                refresh={fetchAssignments}
                            />

                        </Grid>

                    ))}

                </Grid>

            )}

        </Box>

    );

};

export default ShowAssignments;