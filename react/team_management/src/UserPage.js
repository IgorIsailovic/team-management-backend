import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useLocation } from "react-router-dom";
import axios from "axios";
import GroupsIcon from "@mui/icons-material/Groups";
import ListSubheader from "@mui/material/ListSubheader";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import AssignmentIcon from "@mui/icons-material/Assignment";
import "./Shared.css";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "@mui/material/BottomNavigation";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import CheckIcon from "@mui/icons-material/Check";
import Modal from "@mui/material/Modal";
import PersonIcon from "@mui/icons-material/Person";
import nikola from "./ceks.png";
import igor from "./igor.png";
import milan from "./milan.png";
import Tasks from "./Tasks";
import Teams from "./Teams";
import UserInfo from "./UserInfo";
import UserOverview from "./UserOverview";

const drawerWidth = 200;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    width: "100%",
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const theme = createTheme();

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function UserPage() {
  let token = localStorage.getItem("token");
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const [view, setView] = useState("user");

  const navigate = useNavigate();

  const location = useLocation();
  const data = location.state.data;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  /* const handleTaskDetails = (id) => {
    axios
      .get(`http://localhost:8088/teams/teamsForTask/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTaskTeams(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get(`http://localhost:8088/users/getUsersForTask/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTaskUsers(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };*/
  const handleClickView = (pageView) => {
    setView(pageView);
  };

  const getView = (view) => {
    switch (view) {
      case "user":
        return <UserOverview data={data}></UserOverview>;
      case "teams":
        return <Teams data={data}></Teams>;
      case "tasks":
        return (
          <Container
            className="tasks"
            sx={{
              gridColumn: "span 2",
              display: "grid",
              gridTemplateColumns: "1fr",
              gridTemplateRows: "auto" /* NEW */,

              // gridAutoRows: "auto",
              justifyItems: "center",
              alignItems: "center",
              gridGap: "1rem",
            }}
          >
            <Tasks data={data}></Tasks>
          </Container>
        );
      case "userInfo":
        return (
          <Container
            sx={{
              gridColumn: "span 2",
              display: "grid",
              gridTemplateColumns: "1fr",
              gridTemplateRows: "auto" /* NEW */,
              // gridAutoRows: "auto",
              justifyItems: "center",
              alignItems: "center",
              gridGap: "1rem",
            }}
          >
            <UserInfo data={data}></UserInfo>
          </Container>
        );
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
  const handleClickTeam = (team) => {
    let decoded = jwt_decode(token);
    let user = decoded.sub;
    let roles = decoded.roles[0].authority;
    let authority = decoded.authority;
    let iat = decoded.iat;
    let exp = decoded.exp;
    axios
      .get(`http://localhost:8088/users/getUsersForTeam/${team}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        let users = response.data;
        axios
          .get(`http://localhost:8088/tasks/getTasksForTeam/${team}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            let tasks = response.data;
            navigate("/teamPage", {
              state: {
                tasks: tasks,
                users: users,
                team: team,
              },
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function Copyright(props) {
    return (
      <Typography
        variant="body1"
        color="text.secondary"
        {...props}
        padding="1rem"
      >
        {"Copyright © "}
        <Link color="inherit" href="https://github.com/IgorIsailovic">
          Igor Isailovic
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar
          sx={{
            display: "grid",
            gridTemplateColumns: !open ? "11fr 1fr 1fr 1fr" : "12fr 1fr 1fr",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            sx={{
              color: "black",
              bgcolor: "white",
              mr: 2,
              ...(open && { display: "none" }),
              justifySelf: "start",
            }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            onClick={handleDrawerClose}
            sx={{
              color: "black",
              bgcolor: "white",
              mr: 2,
              ...(!open && { display: "none" }),
              justifySelf: "start",
            }}
          >
            <ChevronLeftIcon />
          </IconButton>

          <IconButton onClick={() => handleClickView("teams")}>
            <Avatar
              sx={{
                color: "#1976d3",
                bgcolor: "white",
                mr: 2,
                justifySelf: "center",
                margin: "0",
              }}
            >
              <GroupsIcon />
            </Avatar>
          </IconButton>
          <IconButton onClick={() => handleClickView("tasks")}>
            <Avatar
              sx={{
                color: "#1976d3",
                bgcolor: "white",
                mr: 2,
                justifySelf: "center",
                margin: "0",
              }}
            >
              <AssignmentIcon />
            </Avatar>
          </IconButton>
          {open ? null : (
            <IconButton onClick={() => handleClickView("user")}>
              <Avatar
                alt={data.firstName.charAt(0) + data.lastName.charAt(0)}
                src={getAvatar(data.username)}
                sx={{
                  color: "#1976d3",
                  bgcolor: "white",
                  justifySelf: "center",
                }}
              ></Avatar>
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            marginTop: "4rem",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader
              component="div"
              id="nested-list-subheader"
            ></ListSubheader>
          }
        >
          <ListItemButton onClick={() => handleClickView("user")}>
            <IconButton>
              <Avatar
                alt={data.firstName.charAt(0) + data.lastName.charAt(0)}
                src={getAvatar(data.username)}
                sx={{
                  color: "#1976d3",
                  bgcolor: "white",
                  justifySelf: "center",
                }}
              >
                {data.firstName.charAt(0) + data.lastName.charAt(0)}
              </Avatar>
            </IconButton>
            <Typography
              variant="inherit"
              component="div"
              sx={{ justifySelf: "start", alignSelf: "center" }}
            >
              {`${data.firstName} ${data.lastName}`}
            </Typography>
          </ListItemButton>
          <ListItemButton onClick={() => handleClickView("teams")}>
            <ListItemIcon>
              <GroupsIcon />
            </ListItemIcon>
            <ListItemText primary="Teams" />
          </ListItemButton>
          <ListItemButton onClick={() => handleClickView("tasks")}>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Tasks" />
          </ListItemButton>
          <ListItemButton onClick={() => handleClickView("userInfo")}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="User Info" />
          </ListItemButton>
        </List>
      </Drawer>
      <Main open={open} sx={{ backgroundColor: "#f8fafd", height: "120%" }}>
        <DrawerHeader />
        <ThemeProvider theme={theme}>
          <Container
            className="main-container"
            component="main"
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridTemplateRows: "1fr 1fr" /* NEW */,
              gridAutoRows: "auto",
              justifyItems: "center",
              alignItems: "center",
              gridGap: "1rem",
              marginTop: "2rem",
            }}
          >
            <CssBaseline />

            {getView(view)}

            <Box
              className="copyright"
              sx={{
                marginTop: 4,
                width: "100%",
                alignSelf: "center",
              }}
            ></Box>
          </Container>
        </ThemeProvider>
      </Main>
      <BottomNavigation
        sx={{
          position: "fixed",
          width: "100%",
          bottom: 0,
        }}
      >
        <Copyright marginLeft={open ? "240px" : "0"} />
      </BottomNavigation>
    </Box>
  );
}
