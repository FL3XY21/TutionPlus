import React from "react";

import {
    Container,
    Paper,
    Typography,
    Box,
    Avatar,
    Grid,
    Stack,
    Chip
} from "@mui/material";

import SchoolIcon from "@mui/icons-material/School";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ClassIcon from "@mui/icons-material/Class";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";

import styled from "styled-components";

import { useSelector } from "react-redux";



const TeacherProfile = () => {

    const { currentUser, response, error } =
        useSelector((state) => state.user);

    if (response) console.log(response);
    else if (error) console.log(error);

    const teachSclass = currentUser.teachSclass;
    const teachSubject = currentUser.teachSubject;
    const teachSchool = currentUser.school;



    const InfoCard = ({ icon, title, value, color }) => (

        <Paper
            elevation={0}
            sx={{
                p: 2,
                borderRadius: 3,
                border: "1px solid #e5e7eb",
                display: "flex",
                alignItems: "center",
                gap: 2
            }}
        >

            <Avatar sx={{ bgcolor: color }}>
                {icon}
            </Avatar>

            <Box>

                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    {title}
                </Typography>

                <Typography variant="h6">
                    {value}
                </Typography>

            </Box>

        </Paper>

    );



    return (

        <Container maxWidth="md">

            {/* Profile Header */}

            <StyledHeader elevation={0}>

                <Stack spacing={2} alignItems="center">

                    <Avatar
                        sx={{
                            width: 100,
                            height: 100,
                            fontSize: 40,
                            bgcolor: "#7c3aed"
                        }}
                    >
                        {currentUser.name.charAt(0)}
                    </Avatar>

                    <Typography
                        variant="h4"
                        fontWeight="bold"
                    >
                        {currentUser.name}
                    </Typography>

                    <Chip
                        label="Teacher"
                        sx={{
                            bgcolor: "#2563eb",
                            color: "white",
                            fontWeight: "bold"
                        }}
                    />

                </Stack>

            </StyledHeader>



            {/* Info Section */}

            <Grid container spacing={3} mt={2}>

                <Grid item xs={12} md={6}>
                    <InfoCard
                        icon={<PersonIcon />}
                        title="Full Name"
                        value={currentUser.name}
                        color="#2563eb"
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <InfoCard
                        icon={<EmailIcon />}
                        title="Email"
                        value={currentUser.email}
                        color="#7c3aed"
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <InfoCard
                        icon={<ClassIcon />}
                        title="Class Assigned"
                        value={teachSclass?.sclassName}
                        color="#059669"
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <InfoCard
                        icon={<MenuBookIcon />}
                        title="Subject"
                        value={teachSubject?.subName}
                        color="#ea580c"
                    />
                </Grid>

                <Grid item xs={12}>
                    <InfoCard
                        icon={<SchoolIcon />}
                        title="School"
                        value={teachSchool?.schoolName}
                        color="#dc2626"
                    />
                </Grid>

            </Grid>

        </Container>

    );

};



export default TeacherProfile;



const StyledHeader = styled(Paper)`
    padding: 30px;
    border-radius: 20px;
    text-align: center;
    background: linear-gradient(135deg, #2563eb, #7c3aed);
    color: white;
`;