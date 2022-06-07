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
import BottomNavigation from "@mui/material/BottomNavigation";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import CheckIcon from "@mui/icons-material/Check";
import { CheckCircle } from "@mui/icons-material";
import Modal from "@mui/material/Modal";
import PersonIcon from "@mui/icons-material/Person";

const drawerWidth = 200;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

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

const ModalTask = ({ task, openModal, handleCloseModal }) => {
  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      BackdropProps={{
        style: {
          opacity: 0.3,
        },
      }}
    >
      <Box sx={{ ...style }}>
        <Container
          className="main-container"
          component="main"
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gridAutoRows: "auto",
            justifyItems: "center",
            alignItems: "center",
            gridGap: "1rem",
            height: "100%",
          }}
        >
          <Avatar sx={{ bgcolor: "green", justifySelf: "start" }}>
            <AssignmentIcon />
          </Avatar>
          <Typography
            variant="body1"
            fontFamily="Helvetica"
            color="inherit"
            align="center"
            fontWeight={900}
            sx={{
              gridColumn: "span 2",
              justifySelf: "start",
            }}
          >
            {task.name}
          </Typography>

          <Typography
            sx={{
              gridColumn: "span 3",
            }}
            variant="body2"
            fontFamily="Helvetica"
            color="inherit"
            align="center"
            marginBottom={2}
          >
            {task.description}
          </Typography>
          <Typography
            sx={
              {
                // gridColumn: "",
              }
            }
            variant="body2"
            fontFamily="Helvetica"
            color="inherit"
            align="center"
            marginBottom={2}
          >
            <b> Estimated duration(h):</b> {task.est_dur}
          </Typography>
          <Avatar
            sx={{
              bgcolor: "green",
              alignSelf: "center",
              justifySelf: "end",
            }}
          >
            {task.status === "FINISHED" ? (
              <CheckIcon />
            ) : (
              <HourglassBottomIcon />
            )}
          </Avatar>
          <Typography
            variant="body2"
            fontFamily="Helvetica"
            color="inherit"
            align="center"
            fontWeight={900}
            sx={{
              alignSelf: "center",
              justifySelf: "center",
            }}
          >
            {task.status === "FINISHED" ? "Finished" : "In Progress"}
          </Typography>
        </Container>
      </Box>
    </Modal>
  );
};
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
  const [openSub, setOpenSub] = useState(true);
  const [openSubTasks, setOpenSubTasks] = useState(true);
  const [openModal, setOpenModal] = React.useState(false);
  const [taskTeams, setTaskTeams] = useState("");
  const [taskUsers, setTaskUsers] = useState("");

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
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

  const handleTaskDetails = (id) => {
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
  };

  const handleTeamClick = (team) => {
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
          sx={{ display: "grid", gridTemplateColumns: "1fr 13fr 1fr 1fr 1fr" }}
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

          <Typography
            variant="h6"
            component="div"
            sx={{ justifySelf: "start", alignSelf: "center" }}
          >
            {`${data.firstName} ${data.lastName}`}
          </Typography>
          <IconButton onClick={!open ? handleDrawerOpen : handleDrawerClose}>
            <Avatar
              alt={data.firstName.charAt(0) + data.lastName.charAt(0)}
              src="/public/ceks.jpg"
              sx={{
                color: "#1976d3",
                bgcolor: "white",
                justifySelf: "center",
              }}
            >
              {data.firstName.charAt(0) + data.lastName.charAt(0)}
            </Avatar>
          </IconButton>
          <IconButton onClick={() => navigate("/teamPage")}>
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
          <IconButton onClick={() => navigate("/")}>
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
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <GroupsIcon />
            </ListItemIcon>

            <ListItemText primary="Teams" />
          </ListItemButton>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>

            <ListItemText primary="Tasks" />
          </ListItemButton>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>

            <ListItemText primary="User Info" />
          </ListItemButton>
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
              gridTemplateRows: "auto 1fr" /* NEW */,

              gridAutoRows: "auto",
              justifyItems: "center",
              alignItems: "center",
              gridGap: "1rem",
              height: "",
            }}
          >
            <CssBaseline />

            {data.taskUser.length > 0 ? (
              data.taskUser.map((task, key) => (
                <>
                  <Card
                    //variant="outlined"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 5fr 5fr",
                      justifyContent: "center",
                      alignContent: "center",
                      backgroundColor: "inherit",
                      padding: "15px",
                      margin: "5px",
                      width: "100%",
                      textAlign: "center",
                      borderRadius: "1rem",
                      minWidth: "280px",
                      maxWidth: "400px",
                      height: "150px",
                      gridGap: "0.3rem",
                    }}
                  >
                    <Avatar sx={{ bgcolor: "#1976d3" }}>
                      <AssignmentIcon />
                    </Avatar>
                    <Typography
                      variant="body1"
                      fontFamily="Helvetica"
                      color="inherit"
                      align="center"
                      fontWeight={900}
                      sx={{
                        gridColumn: "span 2",
                      }}
                    >
                      {task.name}
                    </Typography>

                    <Typography
                      sx={{
                        gridColumn: "span 3",
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
                      sx={{
                        alignSelf: "center",
                        justifySelf: "center",
                      }}
                      style={{
                        color: "inherit",
                        border: "solid 0.2px black",
                        height: "2rem",
                        width: "5rem",
                        // gridRow: "span 2",
                      }}
                      onClick={handleOpenModal}
                    >
                      Detailed
                    </Button>
                    <Avatar
                      sx={{
                        bgcolor:
                          task.status === "FINISHED" ? "green" : "orange",
                        alignSelf: "center",
                        justifySelf: "end",
                      }}
                    >
                      {task.status === "FINISHED" ? (
                        <CheckIcon />
                      ) : (
                        <HourglassBottomIcon />
                      )}
                    </Avatar>
                    <Typography
                      variant="body2"
                      fontFamily="Helvetica"
                      color="inherit"
                      align="center"
                      fontWeight={900}
                      sx={{
                        alignSelf: "center",
                        justifySelf: "center",
                      }}
                    >
                      {task.status === "FINISHED" ? "Finished" : "In Progress"}
                    </Typography>
                  </Card>
                  <ModalTask
                    task={task}
                    openModal={openModal}
                    handleCloseModal={handleCloseModal}
                    handleOpenModal={handleCloseModal}
                  ></ModalTask>
                </>
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
        <Copyright />
      </BottomNavigation>
    </Box>
  );
}
