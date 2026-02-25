import * as React from 'react';

import {
    Divider,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Box,
    Typography
} from '@mui/material';

import { Link, useLocation } from 'react-router-dom';
import TeacherNotifications from "./TeacherNotifications";
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Home';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';

import SchoolIcon from '@mui/icons-material/School';

import { useSelector } from 'react-redux';


const TeacherSideBar = () => {

    const location = useLocation();

    const { currentUser } = useSelector((state) => state.user);

    const sclassName = currentUser?.teachSclass?.sclassName || "Class";


    const isActive = (path) => location.pathname.startsWith(path);


    const menuItemStyle = (active) => ({
        mx: 1,
        my: 0.5,
        borderRadius: 2,
        background: active
            ? "linear-gradient(90deg,#2563eb,#7c3aed)"
            : "transparent",
        color: active ? "#fff" : "#374151",

        "&:hover": {
            background: active
                ? "linear-gradient(90deg,#2563eb,#7c3aed)"
                : "#f3f4f6",
        }
    });


    const iconStyle = (active) => ({
        color: active ? "#fff" : "#6b7280"
    });


    return (

        <Box>

            {/* TuitionPlus Logo */}

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    px: 2,
                    py: 2
                }}
            >

                <SchoolIcon sx={{ color: "#2563eb" }} />

                <Typography
                    fontWeight="bold"
                    color="#2563eb"
                >
                    TuitionPlus
                </Typography>

            </Box>


            {/* Main Menu */}

            <ListSubheader sx={{ fontWeight: "bold" }}>
                Main
            </ListSubheader>


            <ListItemButton
                component={Link}
                to="/Teacher/dashboard"
                sx={menuItemStyle(isActive("/Teacher/dashboard") || location.pathname === "/")}
            >

                <ListItemIcon sx={iconStyle(isActive("/Teacher/dashboard") || location.pathname === "/")}>
                    <HomeIcon />
                </ListItemIcon>

                <ListItemText primary="Dashboard" />

            </ListItemButton>



            <ListItemButton
                component={Link}
                to="/Teacher/class"
                sx={menuItemStyle(isActive("/Teacher/class"))}
            >

                <ListItemIcon sx={iconStyle(isActive("/Teacher/class"))}>
                    <ClassOutlinedIcon />
                </ListItemIcon>

                <ListItemText primary={`Class ${sclassName}`} />

            </ListItemButton>



            <ListItemButton
                component={Link}
                to="/Teacher/complain"
                sx={menuItemStyle(isActive("/Teacher/complain"))}
            >

                <ListItemIcon sx={iconStyle(isActive("/Teacher/complain"))}>
                    <AnnouncementOutlinedIcon />
                </ListItemIcon>

                <ListItemText primary="Complaints" />

            </ListItemButton>

<ListItemButton component={Link} to="/Teacher/materials">
    <ListItemIcon>
        <MenuBookIcon color={location.pathname.startsWith("/Teacher/materials") ? 'primary' : 'inherit'} />
    </ListItemIcon>
    <ListItemText primary="Materials" />
</ListItemButton>
<ListItemButton component={Link} to="/Teacher/notifications">

<ListItemIcon>
<NotificationsIcon
color={
location.pathname.startsWith("/Teacher/notifications")
? 'primary'
: 'inherit'
}
/>
</ListItemIcon>

<ListItemText primary="Notifications"/>

</ListItemButton>
            <Divider sx={{ my: 2 }} />


            {/* User Section */}

            <ListSubheader sx={{ fontWeight: "bold" }}>
                Account
            </ListSubheader>



            <ListItemButton
                component={Link}
                to="/Teacher/profile"
                sx={menuItemStyle(isActive("/Teacher/profile"))}
            >

                <ListItemIcon sx={iconStyle(isActive("/Teacher/profile"))}>
                    <AccountCircleOutlinedIcon />
                </ListItemIcon>

                <ListItemText primary="Profile" />

            </ListItemButton>



            <ListItemButton
                component={Link}
                to="/logout"
                sx={menuItemStyle(isActive("/logout"))}
            >

                <ListItemIcon sx={iconStyle(isActive("/logout"))}>
                    <ExitToAppIcon />
                </ListItemIcon>

                <ListItemText primary="Logout" />

            </ListItemButton>


        </Box>

    );

};

export default TeacherSideBar;