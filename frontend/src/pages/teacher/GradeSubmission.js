import React from "react";
import axios from "axios";

import {
    Button
} from "@mui/material";

const gradeSubmission = async (submissionId) => {

    await axios.put(

        `http://localhost:5000/SubmissionGrade/${submissionId}`,

        {

            grade: "A",

            feedback: "Good work"

        }

    );

};

export default gradeSubmission;