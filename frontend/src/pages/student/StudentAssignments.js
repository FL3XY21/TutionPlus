import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Box,
  Typography,
  Grid,
  Paper,
  Chip,
  Button,
  CircularProgress
} from "@mui/material";

import AssignmentIcon from "@mui/icons-material/Assignment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DownloadIcon from "@mui/icons-material/Download";

import { useSelector } from "react-redux";



const StudentAssignments = () => {

  const { currentUser } =
    useSelector(state => state.user);

  const classId =
    currentUser?.sclassName?._id;

  const studentId =
    currentUser?._id;



  const [assignments, setAssignments] =
    useState([]);

  const [loading, setLoading] =
    useState(true);



  useEffect(() => {

    fetchAssignments();

  }, []);



  const fetchAssignments =
    async () => {

      try {

        const res =
          await axios.get(
            `http://localhost:5000/AssignmentsClass/${classId}`
          );

        setAssignments(res.data);

      }
      catch (err) {

        console.log(err);

      }

      setLoading(false);

    };



  const getStatus = (deadline) => {

    if (!deadline)
      return {
        text: "No deadline",
        color: "default"
      };

    const today =
      new Date();

    const due =
      new Date(deadline);

    if (today > due)
      return {
        text: "Late",
        color: "error"
      };

    return {
      text: "Active",
      color: "success"
    };

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



  return (

    <Box>

      {/* HEADER */}

      <Box
        display="flex"
        alignItems="center"
        mb={3}
      >

        <AssignmentIcon
          sx={{
            fontSize: 32,
            mr: 1,
            color: "#7c3aed"
          }}
        />

        <Typography
          variant="h4"
          fontWeight="bold"
        >
          Assignments
        </Typography>

      </Box>



      {/* EMPTY STATE */}

      {assignments.length === 0 &&
        (
          <Paper
            sx={{
              p: 4,
              textAlign: "center"
            }}
          >

            <Typography>
              No assignments found
            </Typography>

          </Paper>
        )
      }



      {/* ASSIGNMENT CARDS */}

      <Grid container spacing={3}>

        {assignments.map(
          (assignment) => {

            const status =
              getStatus(
                assignment.deadline
              );

            return (

              <Grid
                item
                xs={12}
                md={6}
                lg={4}
                key={assignment._id}
              >

                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    transition: "0.3s",
                    "&:hover": {
                      transform:
                        "translateY(-5px)",
                      boxShadow: 6
                    }
                  }}
                >

                  {/* TITLE */}

                  <Typography
                    variant="h6"
                    fontWeight="bold"
                  >
                    {assignment.title}
                  </Typography>



                  {/* DESCRIPTION */}

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    mb={2}
                  >
                    {assignment.description}
                  </Typography>



                  {/* DEADLINE */}

                  <Box
                    display="flex"
                    alignItems="center"
                    mb={2}
                  >

                    <AccessTimeIcon
                      sx={{
                        fontSize: 18,
                        mr: 1
                      }}
                    />

                    <Typography
                      variant="body2"
                    >
                      Due:
                      {" "}
                      {assignment.deadline
                        ?
                        new Date(
                          assignment.deadline
                        ).toLocaleDateString()
                        :
                        "No deadline"
                      }

                    </Typography>

                  </Box>



                  {/* STATUS */}

                  <Chip
                    label={status.text}
                    color={status.color}
                    sx={{ mb: 2 }}
                  />



                  {/* FILE BUTTON */}

                  {assignment.fileUrl &&
                    (
                      <Button
                        fullWidth
                        variant="contained"
                        startIcon={
                          <DownloadIcon />
                        }
                        href={
                          assignment.fileUrl
                        }
                        target="_blank"
                      >
                        View Assignment
                      </Button>
                    )
                  }

                </Paper>

              </Grid>

            );

          }
        )}

      </Grid>

    </Box>

  );

};



export default StudentAssignments;