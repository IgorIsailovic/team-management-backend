import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useLocation } from "react-router-dom";
import axios from "axios";
import GroupsIcon from "@mui/icons-material/Groups";
import ListSubheader from "@mui/material/ListSubheader";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import AssignmentIcon from "@mui/icons-material/Assignment";
import "./UserPage.css";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
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
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [openSub, setOpenSub] = useState(true);
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const navigate = useNavigate();

  const location = useLocation();
  const data = location.state.data;

  const handleClick = () => {
    setOpenSub(!openSub);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleTeamClick = (team) => {
    let token = localStorage.getItem("token");
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
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
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
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            align="center"
          >
            User Page
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,

          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{ height: "15%" }}>
          <Container
            sx={{
              display: "grid",
              justifyItems: "center",
              gridGap: "0.5rem",
              marginTop: "1rem",
            }}
          >
            <Avatar
              alt={data.firstName.charAt(0) + data.lastName.charAt(0)}
              src="/public/ceks.jpg"
            >
              {data.firstName.charAt(0) + data.lastName.charAt(0)}
            </Avatar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              align="center"
            >
              {`${data.firstName} ${data.lastName}`}
            </Typography>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </Container>
        </DrawerHeader>
        <Divider />
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
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <GroupsIcon />
            </ListItemIcon>

            <ListItemText primary="Teams" />
            {openSub ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openSub} timeout={1} unmountOnExit>
            <List component="div" disablePadding>
              {data.teamUser.map((team, key) => (
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => handleTeamClick(team.name)}
                >
                  <ListItemText primary={team.name} />
                </ListItemButton>
              ))}
              {/*  <ListItemButton sx={{ pl: 4 }} onClick={handleNewTeam}>
                <ListItemText primary="Join another team" />
              </ListItemButton>*/}
            </List>
          </Collapse>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <ThemeProvider theme={theme}>
          <Container
            className="main-container"
            component="main"
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr",
              justifyItems: "center",
              alignItems: "center",
              gridGap: "1rem",
              height: "100%",
            }}
          >
            <CssBaseline />
            <Typography
              className="naslov"
              variant="h5"
              fontFamily="inherit"
              color="inherit"
              fontWeight={900}
              align="center"
            >
              Tasks
            </Typography>

            {data.taskUser.length > 0 ? (
              data.taskUser.map((task, key) => (
                <Card
                  //variant="outlined"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 9fr",
                    justifyContent: "center",
                    alignContent: "center",
                    backgroundColor: "inherit",
                    padding: "10px",
                    margin: "5px",
                    width: "100%",
                    textAlign: "center",
                    borderRadius: "1.5rem",
                    minWidth: "280px",
                    maxWidth: "550px",
                    height: "130px",
                  }}
                >
                  <Avatar sx={{ bgcolor: "green" }}>
                    <AssignmentIcon />
                  </Avatar>
                  <Typography
                    variant="body1"
                    fontFamily="Helvetica"
                    color="inherit"
                    align="center"
                    fontWeight={900}
                  >
                    {task.name}
                  </Typography>

                  <Typography
                    sx={{
                      gridColumn: "span 2",
                    }}
                    variant="body2"
                    fontFamily="Helvetica"
                    color="inherit"
                    align="center"
                    marginBottom={2}
                  >
                    {task.description === task.description.substring(0, 40)
                      ? `${task.description.substring(0, 40)}`
                      : `${task.description.substring(0, 40)}...`}
                  </Typography>
                  <Button
                    style={{
                      color: "inherit",
                      border: "solid 0.2px black",
                      height: "2rem",
                      width: "5rem",
                      gridColumn: "span 2",
                    }}
                  >
                    Detailed
                  </Button>
                </Card>
              ))
            ) : (
              <Typography
                sx={{
                  gridColumn: "span 2",
                }}
                variant="h4"
                fontFamily="Helvetica"
                color="inherit"
                align="center"
                marginBottom={2}
              >
                Trenutno nema podataka o taskovima
              </Typography>
            )}

            <Box
              className="copyright"
              sx={{
                marginTop: 4,
                width: "100%",
                alignSelf: "center",
              }}
            >
              <Copyright />
            </Box>
          </Container>
        </ThemeProvider>
      </Main>
    </Box>
  );
}