import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Drawer from "@mui/material/Drawer";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import nikola from "./ceks.png";
import igor from "./igor.png";
import milan from "./milan.png";
import Tasks from "./Tasks";
import Teams from "./Teams";
import UserInfo from "./UserInfo";
import UserOverview from "./UserOverview";
import GroupsIcon from "@mui/icons-material/Groups";
import ListSubheader from "@mui/material/ListSubheader";
import Avatar from "@mui/material/Avatar";
import AssignmentIcon from "@mui/icons-material/Assignment";

import { useEffect } from "react";

const drawerWidth = 240;
const mainColor = "black";
const secondaryColor = "white";

export default function MainPage() {
  let token = localStorage.getItem("token");
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState("user");
  const [drawer, setDrawer] = useState(null);
  const [margin, setMargin] = useState(null);

  const navigate = useNavigate();

  const location = useLocation();
  const data = location.state.data;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    handleClickView("user");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickView = (pageView) => {
    setView(pageView);
    setOpen(!open);
  };

  useEffect(() => {
    function closeDrawer() {
      if (window.innerWidth < 928 && open) {
        handleDrawerClose();
        setDrawer(false);
        setMargin(`-${drawerWidth}px`);
      }
      if (window.innerWidth > 928) {
        handleDrawerOpen();
        setDrawer(true);
        setMargin(0);
      }
    }
    window.addEventListener("resize", closeDrawer);
  });

  useEffect(() => {
    function closeDrawer() {
      if (window.innerWidth > 928) {
        handleDrawerOpen();
        setDrawer(true);
        setMargin(0);
      }
    }
    closeDrawer();
  }, []);

  const getView = (view) => {
    switch (view) {
      case "user":
        return <UserOverview data={data}></UserOverview>;
      case "teams":
        return <Teams data={data}></Teams>;
      case "tasks":
        return <Tasks data={data}></Tasks>;
      case "userInfo":
        return <UserInfo data={data}></UserInfo>;
      default:
        return null;
    }
  };
  const getAvatar = (user) => {
    switch (user) {
      case "igor":
        return igor;
      case "nikola":
        return nikola;
      case "milan":
        return milan;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: mainColor,
        }}
      >
        <Toolbar>
          {!drawer ? (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={open ? handleDrawerClose : handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
          ) : null}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar
                  alt={data.firstName.charAt(0) + data.lastName.charAt(0)}
                  src={getAvatar(data.username)}
                  sx={{
                    color: mainColor,
                    bgcolor: "white",
                    justifySelf: "center",
                  }}
                >
                  {data.firstName.charAt(0) + data.lastName.charAt(0)}
                </Avatar>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant={drawer ? "permanent" : "persistent"}
        open={open}
        PaperProps={{
          sx: {
            backgroundColor: secondaryColor,
          },
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List
            sx={{
              /* width: "100%",*/ maxWidth: 360,
              bgcolor: "transparent",
              marginTop: "1rem",
            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader
                component="div"
                id="nested-list-subheader"
              ></ListSubheader>
            }
          >
            <ListItemButton
              onClick={() => handleClickView("teams")}
              sx={{ backgroundColor: secondaryColor }}
            >
              <ListItemIcon sx={{ color: mainColor }}>
                <GroupsIcon />
              </ListItemIcon>
              <ListItemText primary="Teams" sx={{ color: mainColor }} />
            </ListItemButton>
            <ListItemButton
              onClick={() => handleClickView("tasks")}
              sx={{ backgroundColor: secondaryColor }}
            >
              <ListItemIcon sx={{ color: mainColor }}>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Tasks" sx={{ color: mainColor }} />
            </ListItemButton>
            <ListItemButton
              onClick={() => handleClickView("userInfo")}
              sx={{ backgroundColor: secondaryColor }}
            >
              <ListItemIcon sx={{ color: mainColor }}>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="User Info" sx={{ color: mainColor }} />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          display: "grid",
          flexGrow: 1,
          p: 3,
          marginLeft: margin,
        }}
      >
        <Toolbar />
        <Box id="main">{getView(view)}</Box>
      </Box>
    </Box>
  );
}
