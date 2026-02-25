import React from "react";
import { useSelector } from "react-redux";

import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  Divider,
  Paper
} from "@mui/material";

import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import EmailIcon from "@mui/icons-material/Email";
import SchoolIcon from "@mui/icons-material/School";
import BadgeIcon from "@mui/icons-material/Badge";

const AdminProfile = () => {

  const { currentUser } = useSelector((state) => state.user);

  if (!currentUser) {
    return (
      <Typography sx={{ p: 3 }}>
        No profile data found
      </Typography>
    );
  }

  return (
    <Box sx={{ p: 3 }}>

      {/* Page Title */}

      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
      >
        Admin Profile
      </Typography>

      <Grid container spacing={3}>

        {/* Left Card */}

        <Grid item xs={12} md={4}>

          <Card sx={{ borderRadius: 3, boxShadow: 3 }}>

            <CardContent sx={{ textAlign: "center" }}>

              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  mx: "auto",
                  mb: 2,
                  bgcolor: "#1976d2",
                  fontSize: 40
                }}
              >
                {currentUser.name?.charAt(0).toUpperCase()}
              </Avatar>

              <Typography variant="h5">
                {currentUser.name}
              </Typography>

              <Typography color="text.secondary">
                Administrator
              </Typography>

              <Chip
                icon={<AdminPanelSettingsIcon />}
                label="Admin"
                color="primary"
                sx={{ mt: 2 }}
              />

            </CardContent>

          </Card>

        </Grid>

        {/* Right Card */}

        <Grid item xs={12} md={8}>

          <Card sx={{ borderRadius: 3, boxShadow: 3 }}>

            <CardContent>

              <Typography variant="h6" mb={2}>
                Profile Information
              </Typography>

              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>

                <Grid item xs={12} sm={6}>
                  <Paper sx={{ p: 2 }}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <BadgeIcon color="primary" />
                      <Typography color="text.secondary">
                        Name
                      </Typography>
                    </Box>

                    <Typography variant="h6">
                      {currentUser.name}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Paper sx={{ p: 2 }}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <EmailIcon color="primary" />
                      <Typography color="text.secondary">
                        Email
                      </Typography>
                    </Box>

                    <Typography variant="h6">
                      {currentUser.email}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Paper sx={{ p: 2 }}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <SchoolIcon color="primary" />
                      <Typography color="text.secondary">
                        School
                      </Typography>
                    </Box>

                    <Typography variant="h6">
                      {currentUser.schoolName || "Not set"}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Paper sx={{ p: 2 }}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <AdminPanelSettingsIcon color="primary" />
                      <Typography color="text.secondary">
                        Role
                      </Typography>
                    </Box>

                    <Typography variant="h6">
                      Administrator
                    </Typography>
                  </Paper>
                </Grid>

              </Grid>

            </CardContent>

          </Card>

        </Grid>

      </Grid>

    </Box>
  );

};

export default AdminProfile;