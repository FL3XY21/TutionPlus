import { useState } from 'react';
import {
    CssBaseline,
    Box,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    Paper
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SchoolIcon from '@mui/icons-material/School';

import StudentSideBar from './StudentSideBar';
import { Route, Routes } from 'react-router-dom';

import StudentHomePage from './StudentHomePage';
import StudentProfile from './StudentProfile';
import StudentSubjects from './StudentSubjects';
import ViewStdAttendance from './ViewStdAttendance';
import StudentComplain from './StudentComplain';
import Logout from '../Logout';

import StudentAssignments from "./StudentAssignments";
import StudentNotifications from "./StudentNotifications";
import StudentMaterials from "./StudentMaterials";
import AccountMenu from '../../components/AccountMenu';
import { AppBar, Drawer } from '../../components/styles';


const StudentDashboard = () => {

    const [open, setOpen] = useState(true);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (

        <Box sx={{ display: 'flex' }}>

            <CssBaseline />

            {/* TOP APP BAR */}
            <AppBar open={open} position='fixed' sx={styles.appBar}>

                <Toolbar>

                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={toggleDrawer}
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <SchoolIcon sx={{ mr: 1 }} />

                    <Typography
                        variant="h6"
                        sx={{
                            flexGrow: 1,
                            fontWeight: 600,
                            letterSpacing: 0.5
                        }}
                    >
                        TuitionPlus Student Portal
                    </Typography>

                    <AccountMenu />

                </Toolbar>

            </AppBar>


            {/* SIDEBAR */}
            <Drawer
                variant="permanent"
                open={open}
                sx={open ? styles.drawerStyled : styles.hideDrawer}
            >

                <Toolbar sx={styles.toolBarStyled}>

                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>

                </Toolbar>

                <Divider />

                <List component="nav">
                    <StudentSideBar />
                </List>

            </Drawer>


            {/* MAIN CONTENT */}
            <Box component="main" sx={styles.mainContainer}>

                <Toolbar />

                <Paper sx={styles.contentWrapper} elevation={0}>

                    <Routes>

                        <Route path="/Student/dashboard" element={<StudentHomePage />} />

                        <Route path="/Student/subjects" element={<StudentSubjects />} />

                        <Route path="/Student/assignments" element={<StudentAssignments />} />

                        <Route path="/Student/materials" element={<StudentMaterials />} />

                        <Route path="/Student/notifications" element={<StudentNotifications />} />

                        <Route path="/Student/attendance" element={<ViewStdAttendance />} />

                        <Route path="/Student/profile" element={<StudentProfile />} />

                        <Route path="/Student/complain" element={<StudentComplain />} />

                        <Route path="/logout" element={<Logout />} />

                    </Routes>

                </Paper>

            </Box>

        </Box>

    );
};

export default StudentDashboard;



/* UI ONLY STYLES */

const styles = {

    appBar: {

        background: "linear-gradient(90deg, #2563eb, #7c3aed)",

        boxShadow: "0 4px 20px rgba(0,0,0,0.1)"

    },

    mainContainer: {

        backgroundColor: "#f4f6f8",

        flexGrow: 1,

        minHeight: "100vh",

        padding: "24px"

    },

    contentWrapper: {

        padding: "24px",

        borderRadius: "12px",

        backgroundColor: "#ffffff",

        minHeight: "85vh"

    },

    toolBarStyled: {

        display: 'flex',

        alignItems: 'center',

        justifyContent: 'flex-end',

        px: [1],

    },

    drawerStyled: {

        display: "flex"

    },

    hideDrawer: {

        display: 'flex',

        '@media (max-width: 600px)': {

            display: 'none',

        },

    },

};