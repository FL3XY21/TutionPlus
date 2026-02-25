import React, { useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Avatar
} from "@mui/material";

import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import CountUp from "react-countup";
import styled from "styled-components";

import SeeNotice from "../../components/SeeNotice";

import { getClassStudents, getSubjectDetails } from "../../redux/sclassRelated/sclassHandle";
import { useDispatch, useSelector } from "react-redux";

const TeacherHomePage = () => {

  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);
  const { subjectDetails, sclassStudents } = useSelector((state) => state.sclass);

  const classID = currentUser.teachSclass?._id;
  const subjectID = currentUser.teachSubject?._id;

  useEffect(() => {
    if (subjectID) dispatch(getSubjectDetails(subjectID, "Subject"));
    if (classID) dispatch(getClassStudents(classID));
  }, [dispatch, subjectID, classID]);

  const numberOfStudents = sclassStudents?.length || 0;
  const numberOfSessions = subjectDetails?.sessions || 0;

  const stats = [
    {
      title: "Students",
      value: numberOfStudents,
      icon: <PeopleAltIcon />,
      gradient: "linear-gradient(135deg,#2563eb,#3b82f6)"
    },
    {
      title: "Lessons",
      value: numberOfSessions,
      icon: <MenuBookIcon />,
      gradient: "linear-gradient(135deg,#7c3aed,#8b5cf6)"
    },
    {
      title: "Assignments",
      value: 24,
      icon: <AssignmentIcon />,
      gradient: "linear-gradient(135deg,#059669,#10b981)"
    },
    {
      title: "Hours",
      value: 30,
      suffix: " hrs",
      icon: <AccessTimeIcon />,
      gradient: "linear-gradient(135deg,#ea580c,#f97316)"
    }
  ];

  return (

    <Container maxWidth="xl">

      {/* Welcome Banner */}

      <WelcomeCard elevation={0}>

        <Box>

          <Typography variant="h4" fontWeight="bold">
            Welcome back, {currentUser.name}
          </Typography>

          <Typography>
            Here's what's happening with your class today
          </Typography>

        </Box>

        <Avatar
          sx={{
            width: 60,
            height: 60,
            bgcolor: "white",
            color: "#2563eb",
            fontSize: 28,
            fontWeight: "bold"
          }}
        >
          {currentUser.name?.charAt(0)}
        </Avatar>

      </WelcomeCard>


      {/* Stats Cards */}

      <Grid container spacing={3} mt={1}>

        {stats.map((stat, index) => (

          <Grid item xs={12} sm={6} md={3} key={index}>

            <StatCard elevation={0}>

              <StatIcon sx={{ background: stat.gradient }}>
                {stat.icon}
              </StatIcon>

              <Typography color="text.secondary">
                {stat.title}
              </Typography>

              <Typography variant="h4" fontWeight="bold">

                <CountUp
                  start={0}
                  end={stat.value}
                  duration={2}
                  suffix={stat.suffix || ""}
                />

              </Typography>

            </StatCard>

          </Grid>

        ))}

      </Grid>


      {/* Notices Section */}

      <Box mt={4}>

        <NoticeCard elevation={0}>

          <Typography variant="h6" fontWeight="bold" mb={2}>
            Latest Notices
          </Typography>

          <SeeNotice />

        </NoticeCard>

      </Box>


    </Container>

  );

};

export default TeacherHomePage;



/* Styled Components */

const WelcomeCard = styled(Paper)`
  padding: 30px;
  border-radius: 18px;
  background: linear-gradient(135deg,#2563eb,#7c3aed);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const StatCard = styled(Paper)`
  padding: 25px;
  border-radius: 16px;
  text-align: center;
  transition: 0.3s;
  background: white;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0px 12px 30px rgba(0,0,0,0.12);
  }
`;

const StatIcon = styled(Avatar)`
  margin: auto;
  margin-bottom: 10px;
  width: 55px;
  height: 55px;
  color: white;
`;

const NoticeCard = styled(Paper)`
  padding: 25px;
  border-radius: 16px;
  background: white;
`;