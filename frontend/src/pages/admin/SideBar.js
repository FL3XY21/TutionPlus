import * as React from 'react';
import {
    Divider,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader
} from '@mui/material';

import { Link, useLocation } from 'react-router-dom';

// Existing icons
import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import ReportIcon from '@mui/icons-material/Report';
import AssignmentIcon from '@mui/icons-material/Assignment';

// New LMS icons
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DashboardIcon from '@mui/icons-material/Dashboard';

const SideBar = () => {

    const location = useLocation();

    const isActive = (path) => location.pathname.startsWith(path);

    return (

        <>

            {/* Dashboard */}

            <ListItemButton component={Link} to="/Admin/dashboard">
                <ListItemIcon>
                    <DashboardIcon color={isActive("/Admin/dashboard") || location.pathname === "/" ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItemButton>


            {/* Academic Section */}

            <ListSubheader component="div" inset>
                Academic Management
            </ListSubheader>

            <ListItemButton component={Link} to="/Admin/classes">
                <ListItemIcon>
                    <ClassOutlinedIcon color={isActive("/Admin/classes") ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Classes" />
            </ListItemButton>

            <ListItemButton component={Link} to="/Admin/subjects">
                <ListItemIcon>
                    <AssignmentIcon color={isActive("/Admin/subjects") ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Subjects" />
            </ListItemButton>

            <ListItemButton component={Link} to="/Admin/teachers">
                <ListItemIcon>
                    <SupervisorAccountOutlinedIcon color={isActive("/Admin/teachers") ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Teachers" />
            </ListItemButton>

            <ListItemButton component={Link} to="/Admin/students">
                <ListItemIcon>
                    <PersonOutlineIcon color={isActive("/Admin/students") ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Students" />
            </ListItemButton>


            {/* LMS Section */}

            <Divider sx={{ my: 1 }} />

            <ListSubheader component="div" inset>
                LMS Management
            </ListSubheader>

            <ListItemButton component={Link} to="/Admin/assignments">
                <ListItemIcon>
                    <AssignmentIcon color={isActive("/Admin/assignments") ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Assignments" />
            </ListItemButton>

            <ListItemButton component={Link} to="/Admin/materials">
                <ListItemIcon>
                    <MenuBookIcon color={isActive("/Admin/materials") ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Materials" />
            </ListItemButton>

            <ListItemButton component={Link} to="/Admin/enrollments">
                <ListItemIcon>
                    <HowToRegIcon color={isActive("/Admin/enrollments") ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Enrollments" />
            </ListItemButton>

            <ListItemButton component={Link} to="/Admin/notifications">
                <ListItemIcon>
                    <NotificationsIcon color={isActive("/Admin/notifications") ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Notifications" />
            </ListItemButton>


            {/* Communication */}

            <Divider sx={{ my: 1 }} />

            <ListSubheader component="div" inset>
                Communication
            </ListSubheader>

            <ListItemButton component={Link} to="/Admin/notices">
                <ListItemIcon>
                    <AnnouncementOutlinedIcon color={isActive("/Admin/notices") ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Notices" />
            </ListItemButton>

            <ListItemButton component={Link} to="/Admin/complains">
                <ListItemIcon>
                    <ReportIcon color={isActive("/Admin/complains") ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Complaints" />
            </ListItemButton>


            {/* User */}

            <Divider sx={{ my: 1 }} />

            <ListSubheader component="div" inset>
                User
            </ListSubheader>

            <ListItemButton component={Link} to="/Admin/profile">
                <ListItemIcon>
                    <AccountCircleOutlinedIcon color={isActive("/Admin/profile") ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Profile" />
            </ListItemButton>

            <ListItemButton component={Link} to="/logout">
                <ListItemIcon>
                    <ExitToAppIcon color={isActive("/logout") ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Logout" />
            </ListItemButton>

        </>

    );

};

export default SideBar;