import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Avatar
} from "@mui/material";

import SchoolIcon from "@mui/icons-material/School";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useNavigate } from "react-router-dom";

const HomePage = () => {

  const navigate = useNavigate();

  return (

    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(120deg, #4f46e5, #7c3aed, #2563eb)",
        display: "flex",
        alignItems: "center"
      }}
    >

      <Container maxWidth="lg">

        <Grid container spacing={4} alignItems="center">

          {/* LEFT HERO SECTION */}

          <Grid item xs={12} md={6}>

            <Stack spacing={3}>

              <Box display="flex" alignItems="center">

                <Avatar
                  sx={{
                    bgcolor: "white",
                    color: "#4f46e5",
                    mr: 2,
                    width: 56,
                    height: 56
                  }}
                >
                  <SchoolIcon fontSize="large" />
                </Avatar>

                <Typography
                  variant="h4"
                  fontWeight="bold"
                  color="white"
                >
                  TuitionPlus
                </Typography>

              </Box>


              <Typography
                variant="h2"
                fontWeight="bold"
                color="white"
                sx={{ lineHeight: 1.2 }}
              >
                Smart Academic
                <br />
                Management Platform
              </Typography>


              <Typography
                variant="h6"
                color="white"
                sx={{ opacity: 0.9 }}
              >
                Manage classes, students, teachers,
                assignments, study materials and performance
                with one powerful cloud platform.
              </Typography>


              <Stack direction="row" spacing={2}>

                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    background: "white",
                    color: "#4f46e5",
                    fontWeight: "bold",
                    px: 3,
                    py: 1.5,
                    "&:hover": {
                      background: "#f3f4f6"
                    }
                  }}
                  onClick={() => navigate("/choose")}
                >
                  Get Started
                </Button>

              </Stack>

            </Stack>

          </Grid>



          {/* RIGHT LOGIN CARD */}

          <Grid item xs={12} md={6}>

            <Paper
              elevation={15}
              sx={{
                p: 5,
                borderRadius: 4,
                backdropFilter: "blur(10px)"
              }}
            >

              <Stack spacing={3}>

                <Typography
                  variant="h4"
                  fontWeight="bold"
                  textAlign="center"
                >
                  Welcome Back
                </Typography>

                <Typography
                  textAlign="center"
                  color="text.secondary"
                >
                  Access your TuitionPlus dashboard
                </Typography>


                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  startIcon={<LoginIcon />}
                  sx={{
                    py: 1.5,
                    fontWeight: "bold",
                    fontSize: 16
                  }}
                  onClick={() => navigate("/choose")}
                >
                  Login
                </Button>


                <Button
                  fullWidth
                  variant="outlined"
                  size="large"
                  startIcon={<PersonAddIcon />}
                  sx={{
                    py: 1.5,
                    fontWeight: "bold"
                  }}
                  onClick={() => navigate("/AdminRegister")}
                >
                  Create Account
                </Button>


                <Button
                  fullWidth
                  variant="text"
                  sx={{
                    fontWeight: "bold",
                    color: "#4f46e5"
                  }}
                  onClick={() => navigate("/chooseasguest")}
                >
                  Continue as Guest
                </Button>


              </Stack>

            </Paper>

          </Grid>

        </Grid>

      </Container>

    </Box>

  );

};

export default HomePage;