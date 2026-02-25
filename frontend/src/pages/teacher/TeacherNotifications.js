import React, { useEffect, useState } from "react";

import {
    Container,
    Typography,
    Grid,
    Paper,
    Box,
    TextField,
    Button,
    Avatar,
    Card,
    CardContent,
    IconButton,
    Stack
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";

import styled from "styled-components";
import axios from "axios";
import { useSelector } from "react-redux";

const TeacherNotifications = () => {

    const { currentUser } = useSelector(state => state.user);

    const teacherId = currentUser?._id;

    const [notifications, setNotifications] = useState([]);

    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {

        try {

            const res = await axios.get(
                "https://tutionplus.onrender.com/Notifications"
            );

            setNotifications(res.data);

        }
        catch (err) {
            console.log(err);
        }
    };

    const createNotification = async () => {

        if (!title || !message) return;

        await axios.post(
            "https://tutionplus.onrender.com/NotificationCreate",
            {
                title,
                message,
                senderId: teacherId,
                senderRole: "teacher"
            }
        );

        setTitle("");
        setMessage("");

        fetchNotifications();
    };

    const deleteNotification = async (id) => {

        try {

            await axios.delete(
                `https://tutionplus.onrender.com/Notification/${id}`
            );

            fetchNotifications();

        }
        catch (err) {
            console.log(err);
        }

    };

    return (

        <Container maxWidth="lg">

            {/* Header */}

            <Header>

                <Avatar sx={{ bgcolor: "#7c3aed" }}>
                    <NotificationsIcon />
                </Avatar>

                <Box>

                    <Typography variant="h5">
                        Notifications
                    </Typography>

                    <Typography variant="body2">
                        Send updates to students
                    </Typography>

                </Box>

            </Header>


            {/* Create Notification */}

            <FormCard>

                <Typography variant="h6" mb={2}>
                    Create Notification
                </Typography>

                <Grid container spacing={2}>

                    <Grid item xs={12} md={4}>

                        <TextField
                            fullWidth
                            label="Title"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                        />

                    </Grid>

                    <Grid item xs={12} md={8}>

                        <TextField
                            fullWidth
                            label="Message"
                            value={message}
                            onChange={(e) =>
                                setMessage(e.target.value)
                            }
                        />

                    </Grid>

                    <Grid item xs={12}>

                        <SendButton
                            startIcon={<SendIcon />}
                            onClick={createNotification}
                        >
                            Send Notification
                        </SendButton>

                    </Grid>

                </Grid>

            </FormCard>


            {/* Notification List */}

            <Grid container spacing={3} mt={1}>

                {notifications.map((n) => (

                    <Grid item xs={12} md={6} key={n._id}>

                        <NotificationCard>

                            <CardContent>

                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                >

                                    <Box>

                                        <Typography fontWeight="bold">
                                            {n.title}
                                        </Typography>

                                        <Typography variant="body2">
                                            {n.message}
                                        </Typography>

                                    </Box>

                                    <IconButton
                                        onClick={() =>
                                            deleteNotification(n._id)
                                        }
                                    >
                                        <DeleteIcon color="error" />
                                    </IconButton>

                                </Stack>

                            </CardContent>

                        </NotificationCard>

                    </Grid>

                ))}

            </Grid>

        </Container>

    );
};

export default TeacherNotifications;


/* Styled */

const Header = styled(Paper)`
display:flex;
gap:15px;
align-items:center;
padding:20px;
border-radius:16px;
margin-bottom:20px;
`;

const FormCard = styled(Paper)`
padding:20px;
border-radius:16px;
margin-bottom:20px;
`;

const NotificationCard = styled(Card)`
border-radius:16px;
`;

const SendButton = styled(Button)`
background:linear-gradient(135deg,#2563eb,#7c3aed);
color:white;
`;