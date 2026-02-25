import React from "react";
import axios from "axios";

import {
    Button
} from "@mui/material";

const gradeSubmission = async (submissionId) => {

    await axios.put(

        `https://tutionplus.onrender.com/SubmissionGrade/${submissionId}`,

        {

            grade: "A",

            feedback: "Good work"

        }

    );

};

export default gradeSubmission;