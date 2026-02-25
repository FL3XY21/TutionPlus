import * as React from "react";
import {
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Box,
  Typography
} from "@mui/material";

import { Link, useLocation } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from "@mui/icons-material/AnnouncementOutlined";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SchoolIcon from "@mui/icons-material/School";
import NotificationsIcon from "@mui/icons-material/Notifications";



const StudentSideBar = () => {

  const location = useLocation();


  // reusable style
  const itemStyle = (path) => ({
    borderRadius: 2,
    mx: 1,
    my: 0.5,
    transition: "all 0.2s ease",
    backgroundColor: location.pathname.startsWith(path)
      ? "rgba(124, 58, 237, 0.1)"
      : "transparent",

    "&:hover": {
      backgroundColor: "rgba(124, 58, 237, 0.08)",
      transform: "translateX(4px)"
    }
  });



  return (
    <Box sx={{ px: 1 }}>

      {/* LOGO / TITLE */}

      


      <Divider sx={{ mb: 1 }} />


      {/* MAIN MENU */}

      <ListSubheader sx={{ bgcolor: "transparent", fontWeight: "bold" }}>
        Dashboard
      </ListSubheader>


      <ListItemButton
        component={Link}
        to="/Student/dashboard"
        sx={itemStyle("/Student/dashboard")}
      >
        <ListItemIcon>
          <HomeIcon
            color={
              location.pathname.startsWith("/Student/dashboard")
                ? "primary"
                : "inherit"
            }
          />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>



      <ListItemButton
        component={Link}
        to="/Student/subjects"
        sx={itemStyle("/Student/subjects")}
      >
        <ListItemIcon>
          <MenuBookIcon
            color={
              location.pathname.startsWith("/Student/subjects")
                ? "primary"
                : "inherit"
            }
          />
        </ListItemIcon>
        <ListItemText primary="Subjects" />
      </ListItemButton>



      <ListItemButton
        component={Link}
        to="/Student/assignments"
        sx={itemStyle("/Student/assignments")}
      >
        <ListItemIcon>
          <AssignmentIcon
            color={
              location.pathname.startsWith("/Student/assignments")
                ? "primary"
                : "inherit"
            }
          />
        </ListItemIcon>
        <ListItemText primary="Assignments" />
      </ListItemButton>



<ListItemButton component={Link} to="/Student/materials">
    <ListItemIcon>
        <MenuBookIcon color={
            location.pathname.startsWith("/Student/materials")
            ? 'primary'
            : 'inherit'
        } />
    </ListItemIcon>
    <ListItemText primary="Materials" />
</ListItemButton>



     <ListItemButton component={Link} to="/Student/notifications">
    <ListItemIcon>
        <NotificationsIcon color={
            location.pathname.startsWith("/Student/notifications")
            ? 'primary'
            : 'inherit'
        } />
    </ListItemIcon>
    <ListItemText primary="Notifications" />
</ListItemButton>



      <ListItemButton
        component={Link}
        to="/Student/attendance"
        sx={itemStyle("/Student/attendance")}
      >
        <ListItemIcon>
          <ClassOutlinedIcon
            color={
              location.pathname.startsWith("/Student/attendance")
                ? "primary"
                : "inherit"
            }
          />
        </ListItemIcon>
        <ListItemText primary="Attendance" />
      </ListItemButton>



      <ListItemButton
        component={Link}
        to="/Student/complain"
        sx={itemStyle("/Student/complain")}
      >
        <ListItemIcon>
          <AnnouncementOutlinedIcon
            color={
              location.pathname.startsWith("/Student/complain")
                ? "primary"
                : "inherit"
            }
          />
        </ListItemIcon>
        <ListItemText primary="Complain" />
      </ListItemButton>



      <Divider sx={{ my: 2 }} />


      {/* USER SECTION */}

      <ListSubheader sx={{ bgcolor: "transparent", fontWeight: "bold" }}>
        User
      </ListSubheader>


      <ListItemButton
        component={Link}
        to="/Student/profile"
        sx={itemStyle("/Student/profile")}
      >
        <ListItemIcon>
          <AccountCircleOutlinedIcon
            color={
              location.pathname.startsWith("/Student/profile")
                ? "primary"
                : "inherit"
            }
          />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItemButton>



      <ListItemButton
        component={Link}
        to="/logout"
        sx={itemStyle("/logout")}
      >
        <ListItemIcon>
          <ExitToAppIcon
            color={
              location.pathname.startsWith("/logout")
                ? "primary"
                : "inherit"
            }
          />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>



    </Box>
  );

};

export default StudentSideBar;