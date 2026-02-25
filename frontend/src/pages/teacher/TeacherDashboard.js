import { useState } from 'react';
import {
    CssBaseline,
    Box,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import TeacherSideBar from './TeacherSideBar';
import { Navigate, Route, Routes } from 'react-router-dom';

import Logout from '../Logout';
import AccountMenu from '../../components/AccountMenu';

import { AppBar, Drawer } from '../../components/styles';

import StudentAttendance from '../admin/studentRelated/StudentAttendance';
import StudentExamMarks from '../admin/studentRelated/StudentExamMarks';

import TeacherClassDetails from './TeacherClassDetails';
import TeacherComplain from './TeacherComplain';
import TeacherHomePage from './TeacherHomePage';
import TeacherProfile from './TeacherProfile';
import TeacherViewStudent from './TeacherViewStudent';
import TeacherMaterials from "./TeacherMaterials";
import TeacherNotifications from "./TeacherNotifications";
const TeacherDashboard = () => {

    const [open, setOpen] = useState(true);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (

        <Box sx={{ display: 'flex' }}>

            <CssBaseline />

            {/* TuitionPlus Gradient AppBar */}

            <AppBar
                open={open}
                position="absolute"
                sx={{
                    background:
                        "linear-gradient(90deg,#2563eb,#7c3aed)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.15)"
                }}
            >

                <Toolbar sx={{ pr: '24px' }}>

                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: '20px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            flexGrow: 1,
                            fontWeight: "bold",
                            letterSpacing: 0.5
                        }}
                    >
                        TuitionPlus Teacher Dashboard
                    </Typography>

                    <AccountMenu />

                </Toolbar>

            </AppBar>


            {/* Modern Sidebar */}

            <Drawer
                variant="permanent"
                open={open}
                sx={{
                    '& .MuiDrawer-paper': {
                        position: 'relative',
                        whiteSpace: 'nowrap',
                        width: open ? 240 : 72,
                        transition: 'width 0.3s',
                        background: "#ffffff",
                        borderRight: "1px solid #e5e7eb",
                        boxShadow: "4px 0 12px rgba(0,0,0,0.05)"
                    }
                }}
            >

                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    }}
                >

                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>

                </Toolbar>

                <Divider />

                <List component="nav">

                    <TeacherSideBar />

                </List>

            </Drawer>


            {/* Main Content */}

            <Box
                component="main"
                sx={{
                    backgroundColor: "#f4f7ff",
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                    padding: "20px"
                }}
            >

                <Toolbar />


                <Routes>

                    <Route path="/" element={<TeacherHomePage />} />

                    <Route path="/Teacher/dashboard" element={<TeacherHomePage />} />

                    <Route path="/Teacher/profile" element={<TeacherProfile />} />

                    <Route path="/Teacher/complain" element={<TeacherComplain />} />

                    <Route path="/Teacher/class" element={<TeacherClassDetails />} />

                    <Route
                        path="/Teacher/class/student/:id"
                        element={<TeacherViewStudent />}
                    />

                    <Route
                        path="/Teacher/class/student/attendance/:studentID/:subjectID"
                        element={<StudentAttendance situation="Subject" />}
                    />

                    <Route
                        path="/Teacher/class/student/marks/:studentID/:subjectID"
                        element={<StudentExamMarks situation="Subject" />}
                    />


<Route
path="/Teacher/notifications"
element={<TeacherNotifications />}
/>
                    <Route path="/logout" element={<Logout />} />
<Route path="/Teacher/materials" element={<TeacherMaterials />} />
                    <Route path="*" element={<Navigate to="/" />} />

                </Routes>

            </Box>

        </Box>

    );

};

export default TeacherDashboard;