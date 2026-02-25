import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Grid,
  Paper,
  Typography,
  Box,
  Avatar
} from "@mui/material";

import MenuBookIcon from "@mui/icons-material/MenuBook";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SchoolIcon from "@mui/icons-material/School";
import NotificationsIcon from "@mui/icons-material/Notifications";

import { useSelector } from "react-redux";



const StudentHomePage = () => {

  const { currentUser } = useSelector(state => state.user);

  const studentId = currentUser?._id;
  const classId = currentUser?.sclassName?._id;

  const [stats, setStats] = useState({
    subjects: 0,
    assignments: 0,
    materials: 0,
    notifications: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {

    try {

      const subjects = await axios.get(
        `http://localhost:5000/ClassSubjects/${classId}`
      );

      const assignments = await axios.get(
        `http://localhost:5000/AssignmentsClass/${classId}`
      );

      const materials = await axios.get(
        `http://localhost:5000/MaterialList/${classId}`
      );

      const notifications = await axios.get(
        `http://localhost:5000/Notifications/${studentId}`
      );

      setStats({
        subjects: subjects.data.length,
        assignments: assignments.data.length,
        materials: materials.data.length,
        notifications: notifications.data.length
      });

    } catch (err) {
      console.log(err);
    }

  };


  // NEW MODERN CARD COMPONENT (UI ONLY)
  const StatCard = ({ title, value, icon, color }) => (

    <Paper
      elevation={4}
      sx={{
        p: 3,
        borderRadius: 3,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        transition: "0.3s",
        borderLeft: `6px solid ${color}`,
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)"
        }
      }}
    >

      <Box>

        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            fontWeight: 500
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            mt: 1
          }}
        >
          {value}
        </Typography>

      </Box>


      <Avatar
        sx={{
          bgcolor: color,
          width: 56,
          height: 56
        }}
      >
        {icon}
      </Avatar>

    </Paper>

  );


  return (

    <Box sx={{ p: 1 }}>

      {/* Welcome Header */}

      <Box mb={4}>

        <Typography variant="h4" fontWeight="bold">
          Welcome, {currentUser?.name}
        </Typography>

        <Typography color="text.secondary">
          Here's your academic overview
        </Typography>

      </Box>



      {/* Stats Grid */}

      <Grid container spacing={3}>

        <Grid item xs={12} sm={6} md={3}>

          <StatCard
            title="Subjects"
            value={stats.subjects}
            icon={<MenuBookIcon />}
            color="#2563eb"
          />

        </Grid>

        <Grid item xs={12} sm={6} md={3}>

          <StatCard
            title="Assignments"
            value={stats.assignments}
            icon={<AssignmentIcon />}
            color="#7c3aed"
          />

        </Grid>

        <Grid item xs={12} sm={6} md={3}>

          <StatCard
            title="Materials"
            value={stats.materials}
            icon={<SchoolIcon />}
            color="#059669"
          />

        </Grid>

        <Grid item xs={12} sm={6} md={3}>

          <StatCard
            title="Notifications"
            value={stats.notifications}
            icon={<NotificationsIcon />}
            color="#ea580c"
          />

        </Grid>

      </Grid>



      {/* Bottom Info Section */}

      <Box mt={5}>

        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 3
          }}
        >

          <Typography variant="h6" fontWeight="bold" mb={1}>
            Student Overview
          </Typography>

          <Typography color="text.secondary">

            Access your subjects, complete assignments,
            download study materials, and stay updated
            with notifications — all in one place.

          </Typography>

        </Paper>

      </Box>

    </Box>

  );

};


export default StudentHomePage;