import React from "react";
import axios from "axios";

import {
    Card,
    CardContent,
    Typography,
    Button,
    Box
} from "@mui/material";

const AssignmentCard = ({ assignment, refresh }) => {

    const deleteAssignment = async () => {

        if (!window.confirm("Delete assignment?")) return;

        await axios.delete(
            `http://localhost:5000/Assignment/${assignment._id}`
        );

        refresh();

    };

    return (

        <Card>

            <CardContent>

                <Typography variant="h6">
                    {assignment.title}
                </Typography>

                <Typography variant="body2">
                    Class:
                    {" "}
                    {assignment.classId?.sclassName || "N/A"}
                </Typography>

                <Typography variant="body2">
                    Subject:
                    {" "}
                    {assignment.subjectId?.subName || "N/A"}
                </Typography>

                <Typography variant="body2">
                    Teacher:
                    {" "}
                    {assignment.teacherId?.name || "N/A"}
                </Typography>

                <Typography variant="body2">
                    Deadline:
                    {" "}
                    {assignment.deadline
                        ? new Date(
                            assignment.deadline
                        ).toLocaleDateString()
                        : "N/A"}
                </Typography>

                <Box mt={2}>

                    <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={deleteAssignment}
                    >
                        Delete
                    </Button>

                </Box>

            </CardContent>

        </Card>

    );

};

export default AssignmentCard;