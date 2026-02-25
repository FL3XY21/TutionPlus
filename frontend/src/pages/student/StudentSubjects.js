import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  Table,
  TableBody,
  TableHead,
  TableContainer,
  Chip,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  CircularProgress
} from "@mui/material";

import MenuBookIcon from "@mui/icons-material/MenuBook";
import BarChartIcon from "@mui/icons-material/BarChart";
import TableChartIcon from "@mui/icons-material/TableChart";

import { useDispatch, useSelector } from "react-redux";

import { getSubjectList } from "../../redux/sclassRelated/sclassHandle";
import { getUserDetails } from "../../redux/userRelated/userHandle";

import CustomBarChart from "../../components/CustomBarChart";

import {
  StyledTableCell,
  StyledTableRow
} from "../../components/styles";



const StudentSubjects = () => {

  const dispatch = useDispatch();

  const { subjectsList, sclassDetails } =
    useSelector((state) => state.sclass);

  const {
    userDetails,
    currentUser,
    loading
  } = useSelector((state) => state.user);



  const [subjectMarks, setSubjectMarks] = useState([]);

  const [viewMode, setViewMode] =
    useState("table");



  // Fetch student details

  useEffect(() => {

    if (currentUser?._id) {

      dispatch(
        getUserDetails(
          currentUser._id,
          "Student"
        )
      );

    }

  }, [dispatch, currentUser]);



  // Set marks safely

  useEffect(() => {

    if (userDetails?.examResult) {

      setSubjectMarks(
        userDetails.examResult
      );

    }

  }, [userDetails]);



  // Fetch subjects list safely

  useEffect(() => {

    if (
      subjectMarks.length === 0 &&
      currentUser?.sclassName?._id
    ) {

      dispatch(
        getSubjectList(
          currentUser.sclassName._id,
          "ClassSubjects"
        )
      );

    }

  }, [
    subjectMarks,
    dispatch,
    currentUser
  ]);



  // Toggle view

  const handleViewChange =
    (event, newView) => {

      if (newView !== null) {

        setViewMode(newView);

      }

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
    <Container maxWidth="lg">

      {/* HEADER */}

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mt={2}
        mb={3}
      >

        <Box display="flex" alignItems="center">

          <MenuBookIcon
            sx={{
              fontSize: 32,
              color: "#7c3aed",
              mr: 1
            }}
          />

          <Typography variant="h4" fontWeight="bold">
            Subjects & Performance
          </Typography>

        </Box>



        {subjectMarks.length > 0 && (

          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={handleViewChange}
          >

            <ToggleButton value="table">
              <TableChartIcon sx={{ mr: 1 }} />
              Table
            </ToggleButton>

            <ToggleButton value="chart">
              <BarChartIcon sx={{ mr: 1 }} />
              Chart
            </ToggleButton>

          </ToggleButtonGroup>

        )}

      </Box>



      {/* SHOW MARKS */}

      {subjectMarks.length > 0 ? (

        <Paper sx={{ p: 3, borderRadius: 3 }}>

          {viewMode === "table" && (

            <TableContainer>

              <Table>

                <TableHead>

                  <StyledTableRow>

                    <StyledTableCell>
                      Subject
                    </StyledTableCell>

                    <StyledTableCell>
                      Marks
                    </StyledTableCell>

                    <StyledTableCell>
                      Status
                    </StyledTableCell>

                  </StyledTableRow>

                </TableHead>



                <TableBody>

                  {subjectMarks.map(
                    (result, index) => (

                      <StyledTableRow key={index}>

                        <StyledTableCell>

                          {
                            result?.subName
                              ?.subName
                          }

                        </StyledTableCell>



                        <StyledTableCell>

                          {
                            result?.marksObtained
                          }

                        </StyledTableCell>



                        <StyledTableCell>

                          <Chip
                            label={
                              result?.marksObtained >= 40
                                ? "Pass"
                                : "Fail"
                            }

                            color={
                              result?.marksObtained >= 40
                                ? "success"
                                : "error"
                            }

                          />

                        </StyledTableCell>

                      </StyledTableRow>

                    )
                  )}

                </TableBody>

              </Table>

            </TableContainer>

          )}



          {viewMode === "chart" && (

            <CustomBarChart
              chartData={subjectMarks}
              dataKey="marksObtained"
            />

          )}

        </Paper>

      ) : (

        /* SHOW CLASS SUBJECT LIST */

        <Paper sx={{ p: 4, borderRadius: 3 }}>

          <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom
          >
            Your Class Subjects
          </Typography>



          <Typography mb={2}>
            Class:
            {" "}
            {sclassDetails?.sclassName}
          </Typography>



          <Grid container spacing={2}>

            {subjectsList?.map(
              (subject, index) => (

                <Grid item xs={12} md={4} key={index}>

                  <Paper
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      background:
                        "linear-gradient(135deg,#7c3aed,#2563eb)",
                      color: "white"
                    }}
                  >

                    <Typography variant="h6">
                      {subject.subName}
                    </Typography>

                    <Typography variant="body2">
                      Code:
                      {" "}
                      {subject.subCode}
                    </Typography>

                  </Paper>

                </Grid>

              )
            )}

          </Grid>

        </Paper>

      )}

    </Container>
  );

};



export default StudentSubjects;