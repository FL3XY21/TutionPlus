import React, { useEffect, useState } from "react";
import axios from "axios";

import {
 Box,
 Grid,
 Card,
 CardContent,
 Typography,
 CircularProgress,
 Stack,
 Button
} from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import SchoolIcon from "@mui/icons-material/School";
import ClassIcon from "@mui/icons-material/Class";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AssignmentIcon from "@mui/icons-material/Assignment";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import NotificationsIcon from "@mui/icons-material/Notifications";

import { useNavigate } from "react-router-dom";


// ========================
// Stat Card Component
// ========================

const StatCard = ({ title, value, icon, color }) => {

 return (

  <Card
   sx={{
    borderLeft: `6px solid ${color}`,
    borderRadius: 3,
    boxShadow: 3,
    transition: "0.3s",
    "&:hover": {
     transform: "translateY(-5px)"
    }
   }}
  >

   <CardContent>

    <Stack
     direction="row"
     justifyContent="space-between"
     alignItems="center"
    >

     <Box>

      <Typography
       variant="subtitle2"
       color="text.secondary"
      >
       {title}
      </Typography>

      <Typography
       variant="h4"
       fontWeight="bold"
      >
       {value}
      </Typography>

     </Box>

     {icon}

    </Stack>

   </CardContent>

  </Card>

 );

};


// ========================
// Main Component
// ========================

const AdminHomePage = () => {

 const navigate = useNavigate();

 const [loading, setLoading] = useState(true);

 const [stats, setStats] = useState({

  students: 0,
  teachers: 0,
  classes: 0,
  subjects: 0,
  assignments: 0,
  materials: 0,
  enrollments: 0

 });


// ========================
// Fetch Dashboard
// ========================

 useEffect(() => {

  fetchDashboard();

 }, []);



 const fetchDashboard = async () => {

  try {

   const res =
   await axios.get(
    "http://localhost:5000/AdminDashboard"
   );

   const data = res.data;

   console.log("Dashboard response:", data);


   // Supports ANY backend naming format
   setStats({

    students:
     data.students ??
     data.totalStudents ??
     data.studentCount ??
     0,

    teachers:
     data.teachers ??
     data.totalTeachers ??
     data.teacherCount ??
     0,

    classes:
     data.classes ??
     data.totalClasses ??
     data.classCount ??
     0,

    subjects:
     data.subjects ??
     data.totalSubjects ??
     data.subjectCount ??
     0,

    assignments:
     data.assignments ??
     data.totalAssignments ??
     data.assignmentCount ??
     0,

    materials:
     data.materials ??
     data.totalMaterials ??
     data.materialCount ??
     0,

    enrollments:
     data.enrollments ??
     data.totalEnrollments ??
     data.enrollmentCount ??
     0

   });

  }
  catch (error) {

   console.error(
    "Dashboard fetch error:",
    error.response?.data || error.message
   );

  }

  setLoading(false);

 };



// ========================
// Loading UI
// ========================

 if (loading) {

  return (

   <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="60vh"
   >

    <CircularProgress />

   </Box>

  );

 }



// ========================
// Main UI
// ========================

 return (

  <Box p={3}>

   <Typography
    variant="h4"
    fontWeight="bold"
    mb={3}
   >
    TuitionPlus Dashboard
   </Typography>



   <Grid container spacing={3}>


    <Grid item xs={12} md={3}>
     <StatCard
      title="Students"
      value={stats.students}
      color="#1976d2"
      icon={<PeopleIcon fontSize="large" />}
     />
    </Grid>


    <Grid item xs={12} md={3}>
     <StatCard
      title="Teachers"
      value={stats.teachers}
      color="#2e7d32"
      icon={<SchoolIcon fontSize="large" />}
     />
    </Grid>


    <Grid item xs={12} md={3}>
     <StatCard
      title="Classes"
      value={stats.classes}
      color="#ed6c02"
      icon={<ClassIcon fontSize="large" />}
     />
    </Grid>


    <Grid item xs={12} md={3}>
     <StatCard
      title="Subjects"
      value={stats.subjects}
      color="#9c27b0"
      icon={<MenuBookIcon fontSize="large" />}
     />
    </Grid>


    <Grid item xs={12} md={3}>
     <StatCard
      title="Assignments"
      value={stats.assignments}
      color="#d32f2f"
      icon={<AssignmentIcon fontSize="large" />}
     />
    </Grid>


    <Grid item xs={12} md={3}>
     <StatCard
      title="Materials"
      value={stats.materials}
      color="#2e7d32"
      icon={<UploadFileIcon fontSize="large" />}
     />
    </Grid>


    <Grid item xs={12} md={3}>
     <StatCard
      title="Enrollments"
      value={stats.enrollments}
      color="#ed6c02"
      icon={<HowToRegIcon fontSize="large" />}
     />
    </Grid>


   </Grid>



   {/* Quick Actions */}

   <Box mt={5}>

    <Typography variant="h5" mb={2}>
     Quick Actions
    </Typography>


    <Stack direction="row" spacing={2}>

     <Button
      variant="contained"
      onClick={() =>
       navigate("/Admin/materials/create")
      }
     >
      Upload Material
     </Button>


     <Button
      variant="contained"
      color="secondary"
      onClick={() =>
       navigate("/Admin/assignments/create")
      }
     >
      Create Assignment
     </Button>


     <Button
      variant="outlined"
      startIcon={<NotificationsIcon />}
      onClick={() =>
       navigate("/Admin/notifications")
      }
     >
      View Notifications
     </Button>


    </Stack>

   </Box>


  </Box>

 );

};

export default AdminHomePage;