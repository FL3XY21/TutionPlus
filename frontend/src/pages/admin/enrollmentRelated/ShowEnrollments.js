import React, { useEffect, useState } from "react";
import axios from "axios";

import {
    Typography,
    Card,
    CardContent,
    Grid,
    Box,
    CircularProgress
} from "@mui/material";

const ShowEnrollments = () => {

    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchEnrollments();

    }, []);

    const fetchEnrollments = async () => {

        try {

            const res = await axios.get(
                "https://tutionplus.onrender.com/Enrollments"
            );

            setEnrollments(res.data);

        } catch (error) {

            console.log(error);

        }

        setLoading(false);

    };

    if (loading) {

        return (
            <Box display="flex" justifyContent="center" mt={5}>
                <CircularProgress />
            </Box>
        );

    }

    return (

        <Box>

            <Typography variant="h4" mb={3}>
                Enrollments
            </Typography>

            <Grid container spacing={3}>

                {enrollments.map((enrollment) => (

                    <Grid item xs={12} md={6} lg={4}
                        key={enrollment._id}
                    >

                        <Card>

                            <CardContent>

                                <Typography>
                                    Student ID: {enrollment.studentId}
                                </Typography>

                                <Typography>
                                    Class ID: {enrollment.classId}
                                </Typography>

                            </CardContent>

                        </Card>

                    </Grid>

                ))}

            </Grid>

        </Box>

    );

};

export default ShowEnrollments;