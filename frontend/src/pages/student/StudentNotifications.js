import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Avatar,
  Stack,
  Divider,
  Chip
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";
import CampaignIcon from "@mui/icons-material/Campaign";

import { useSelector } from "react-redux";



const StudentNotifications = () => {

  const { currentUser } =
    useSelector(state => state.user);

  const studentId =
    currentUser?._id;



  const [notifications, setNotifications] =
    useState([]);

  const [loading, setLoading] =
    useState(true);



  useEffect(() => {

    fetchNotifications();

  }, []);



  const fetchNotifications =
    async () => {

      try {

        const res =
          await axios.get(
            `http://localhost:5000/Notifications/${studentId}`
          );

        setNotifications(res.data);

      }
      catch (err) {

        console.log(err);

      }

      setLoading(false);

    };



  const formatDate =
    (date) => {

      return new Date(date)
        .toLocaleString();

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

        <NotificationsIcon
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
          Notifications
        </Typography>

      </Box>



      {/* EMPTY */}

      {notifications.length === 0 &&
        (
          <Paper
            sx={{
              p: 4,
              textAlign: "center"
            }}
          >
            No notifications yet
          </Paper>
        )
      }



      {/* LIST */}

      <Stack spacing={2}>

        {notifications.map(
          (notification, index) => (

            <Paper
              key={notification._id}
              sx={{
                p: 2.5,
                borderRadius: 3,
                transition: "0.2s",
                "&:hover": {
                  boxShadow: 6
                }
              }}
            >

              <Stack
                direction="row"
                spacing={2}
              >

                {/* ICON */}

                <Avatar
                  sx={{
                    bgcolor:
                      "#7c3aed"
                  }}
                >
                  <CampaignIcon />
                </Avatar>



                {/* CONTENT */}

                <Box
                  flex={1}
                >

                  <Typography
                    fontWeight="bold"
                  >
                    {notification.title ||
                     "Notification"}
                  </Typography>



                  <Typography
                    variant="body2"
                    color="text.secondary"
                    mt={0.5}
                  >
                    {notification.message}
                  </Typography>



                  <Box
                    mt={1}
                    display="flex"
                    justifyContent="space-between"
                  >

                    <Chip
                      label={
                        notification.role ||
                        "Admin"
                      }
                      size="small"
                    />

                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      {formatDate(
                        notification.createdAt
                      )}
                    </Typography>

                  </Box>

                </Box>

              </Stack>

            </Paper>

          )
        )}

      </Stack>

    </Box>

  );

};



export default StudentNotifications;