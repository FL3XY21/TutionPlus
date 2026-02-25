import React from "react";

import styled from "styled-components";

import {
  Container,
  Paper,
  Grid,
  Box,
  Typography,
  Avatar,
  Divider,
  Chip,
  Stack
} from "@mui/material";

import SchoolIcon from "@mui/icons-material/School";
import ClassIcon from "@mui/icons-material/Class";
import BadgeIcon from "@mui/icons-material/Badge";
import PersonIcon from "@mui/icons-material/Person";

import { useSelector } from "react-redux";



const StudentProfile = () => {

  const { currentUser, response, error }
    = useSelector((state) => state.user);



  if (response)
    console.log(response);

  else if (error)
    console.log(error);



  const sclassName =
    currentUser?.sclassName;

  const studentSchool =
    currentUser?.school;



  return (

    <Container maxWidth="md">

      {/* PROFILE HEADER */}

      <ProfileHeader elevation={4}>

        <Stack
          alignItems="center"
          spacing={2}
        >

          <Avatar
            sx={{
              width: 120,
              height: 120,
              fontSize: 48,
              bgcolor: "#7c3aed"
            }}
          >
            {String(currentUser?.name)
              ?.charAt(0)
              ?.toUpperCase()}
          </Avatar>



          <Typography
            variant="h4"
            fontWeight="bold"
          >
            {currentUser?.name}
          </Typography>



          <Chip
            icon={<BadgeIcon />}
            label={`Roll No: ${currentUser?.rollNum}`}
            color="primary"
          />

        </Stack>

      </ProfileHeader>



      {/* DETAILS CARD */}

      <ProfileCard elevation={3}>

        <Typography
          variant="h6"
          fontWeight="bold"
          mb={2}
        >
          Student Information
        </Typography>

        <Divider sx={{ mb: 3 }} />



        <Grid container spacing={3}>

          {/* NAME */}

          <Grid item xs={12} md={6}>

            <InfoBox>

              <PersonIcon color="primary" />

              <Box>

                <Typography variant="body2" color="text.secondary">
                  Full Name
                </Typography>

                <Typography fontWeight="bold">
                  {currentUser?.name}
                </Typography>

              </Box>

            </InfoBox>

          </Grid>



          {/* CLASS */}

          <Grid item xs={12} md={6}>

            <InfoBox>

              <ClassIcon color="primary" />

              <Box>

                <Typography variant="body2" color="text.secondary">
                  Class
                </Typography>

                <Typography fontWeight="bold">
                  {sclassName?.sclassName || "N/A"}
                </Typography>

              </Box>

            </InfoBox>

          </Grid>



          {/* SCHOOL */}

          <Grid item xs={12} md={6}>

            <InfoBox>

              <SchoolIcon color="primary" />

              <Box>

                <Typography variant="body2" color="text.secondary">
                  School / Institution
                </Typography>

                <Typography fontWeight="bold">
                  {studentSchool?.schoolName || "N/A"}
                </Typography>

              </Box>

            </InfoBox>

          </Grid>



          {/* USER ID */}

          <Grid item xs={12} md={6}>

            <InfoBox>

              <BadgeIcon color="primary" />

              <Box>

                <Typography variant="body2" color="text.secondary">
                  Student ID
                </Typography>

                <Typography fontWeight="bold">
                  {currentUser?._id}
                </Typography>

              </Box>

            </InfoBox>

          </Grid>

        </Grid>

      </ProfileCard>

    </Container>

  );

};

export default StudentProfile;



/* ================= STYLES ================= */

const ProfileHeader = styled(Paper)`
  padding: 40px;
  margin-bottom: 20px;
  border-radius: 16px;
  text-align: center;
  background: linear-gradient(135deg, #7c3aed, #5b21b6);
  color: white;
`;



const ProfileCard = styled(Paper)`
  padding: 30px;
  border-radius: 16px;
`;



const InfoBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;