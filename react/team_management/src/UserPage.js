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
import { maxWidth } from "@mui/system";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";

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

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openSub, setOpenSub] = useState(true);
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const location = useLocation();
  const data = location.state.data;
  const user = location.state.user;
  const roles = location.state.roles;
  const authority = location.state.authority;
  const iat = location.state.iat;
  const exp = location.state.exp;

  const handleClick = () => {
    setOpenSub(!openSub);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function handleNewTeam() {
    let id = data.id;
    let token = localStorage.getItem("token");
    axios
      .get(`http://localhost:8088/users/${id}/1`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(`OVO JE RESPONSE ${response}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

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
    <Box sx={{ display: "flex" }}>
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
        <DrawerHeader>
          <Avatar alt="Remy Sharp" src="/public/logo192.png">
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
                  onClick={() => console.log(Date.now())}
                >
                  <ListItemText primary={team.name} />
                </ListItemButton>
              ))}
              <ListItemButton sx={{ pl: 4 }} onClick={handleNewTeam}>
                <ListItemText primary="Join another team" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <h1 style={{ textAlign: "center" }}>Tasks</h1>
            {data.taskUser.length > 0 ? (
              data.taskUser.map((task, key) => (
                <Box
                  sx={{
                    marginTop: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Card
                    //variant="outlined"
                    style={{
                      backgroundColor: "#1976d3",
                      padding: "10px",
                      width: "100%",
                      textAlign: "center",
                      borderRadius: "1rem",
                    }}
                  >
                    <Typography
                      variant="body1"
                      color="white"
                      align="center"
                      fontWeight={900}
                    >
                      {task.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="white"
                      align="center"
                      marginBottom={2}
                    >
                      {task.description}
                    </Typography>
                    <Button
                      style={{
                        color: "white",
                        border: "solid 2px white",
                      }}
                    >
                      Detailed
                    </Button>
                  </Card>
                </Box>
              ))
            ) : (
              <h1 style={{ textAlign: "center" }}>
                Trenutno nema podataka o taskovima
              </h1>
            )}
            <Box
              sx={{
                marginTop: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
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
