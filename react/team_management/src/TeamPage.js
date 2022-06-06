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
import "./TeamPage.css";

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
    width: "100%",
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function TeamPage() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [openSub, setOpenSub] = useState(true);
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const location = useLocation();
  const data = location.state.data;
  const users = location.state.users;
  const tasks = location.state.tasks;
  const team = location.state.team;

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

  /*const handleUserDetails = (user) => {
    axios
      .get(`http://localhost:8088/users/getByName/${user}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(`Response${response.data}`);
        navigate("/userPage", {
          state: {
            data: response.data,
            user: user,
            roles: roles,
            authority: authority,
            iat: iat,
            exp: exp,
          },
        });
        console.log(result);
      })
      .catch(function (error) {
        console.log(error);
      });
  };*/

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            align="center"
          >
            {team}
          </Typography>
        </Toolbar>
      </AppBar>

      <Main open={open}>
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
              height: "50%",
              marginTop: "2rem",
            }}
          >
            <CssBaseline />
            <Typography
              className="naslov"
              variant="h6"
              fontFamily="inherit"
              color="inherit"
              fontWeight={900}
              align="center"
            >
              Users
            </Typography>

            {users.length > 0 ? (
              users.map((user, key) => (
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
                    {user.firstName} {user.lastName}
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
                    {user.roles.map((role, key) => role.roleName)}
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
                variant="body2"
                fontFamily="Helvetica"
                color="inherit"
                align="center"
                marginBottom={2}
              >
                Trenutno nema podataka o userima
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
          <Container
            className="main-container"
            component="main"
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr",
              justifyItems: "center",
              alignItems: "center",
              gridGap: "1rem",
              height: "50%",
            }}
          >
            <CssBaseline />
            <Typography
              className="naslov"
              variant="h6"
              fontFamily="inherit"
              color="inherit"
              fontWeight={900}
              align="center"
            >
              Tasks
            </Typography>

            {tasks.length > 0 ? (
              tasks.map((task, key) => (
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
                variant="body1"
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
