import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import {
  Grid,
  Paper,
  Typography
} from "@mui/material";

const StudentAssignments = () => {

  const { currentUser } = useSelector(state => state.user);

  const classId = currentUser?.sclassName?._id;

  const [assignments, setAssignments] = useState([]);

  useEffect(() => {

    axios.get(
      `http://localhost:5000/AssignmentsClass/${classId}`
    )
    .then(res => setAssignments(res.data));

  }, []);

  return (

    <Grid container spacing={3}>

      {assignments.map(a => (

        <Grid item xs={4} key={a._id}>

          <Paper sx={{ p: 2 }}>

            <Typography variant="h6">
              {a.title}
            </Typography>

            <Typography>
              {a.description}
            </Typography>

          </Paper>

        </Grid>

      ))}

    </Grid>

  );

};

export default StudentAssignments;