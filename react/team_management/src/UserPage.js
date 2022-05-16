import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";

import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { maxWidth } from "@mui/system";

import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import GroupsIcon from "@mui/icons-material/Groups";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";

const drawerWidth = 240;

export default function UserPage(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(true);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const location = useLocation();
  const data = location.state.data;
  const user = location.state.user;
  const roles = location.state.roles;
  const authority = location.state.authority;
  const iat = location.state.iat;
  const exp = location.state.exp;

  console.log(`Data${data}`);
  const handleClick = () => {
    setOpen(!open);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar>
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
      </Toolbar>
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
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {data.teamUser.map((team, key) => (
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => console.log(Date.now())}
              >
                <ListItemText primary={team.name} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div"></Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div>
                <h1>Podaci o korisniku:</h1>
                <h2>Username: {user}</h2>
                <h2>Roles: {roles}</h2>

                <h2>IAT: {iat}</h2>
                <h2>Expiery: {exp}</h2>
                <hr
                  style={{
                    color: "#000000",
                    backgroundColor: "#000000",
                    height: 0.5,
                    borderColor: "#000000",
                    width: maxWidth,
                  }}
                />
              </div>
            </Box>
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {data.taskUser.length > 0 ? (
                ((<h1>Podaci o taskovima:</h1>),
                data.taskUser.map((task, key) => (
                  <>
                    <h2>TASK NAME: {task.name}</h2>
                    <h2>DESCRIPTION: {task.description}</h2>
                    <h2>ESTIMATED DURATION:{task.est_dur}</h2>
                    <h2>STATUS: {task.status}</h2>
                    <hr
                      style={{
                        color: "#000000",
                        backgroundColor: "#000000",
                        height: 0.5,
                        borderColor: "#000000",
                        width: maxWidth,
                      }}
                    />
                  </>
                )))
              ) : (
                <h1 style={{ textAlign: "center" }}>
                  Trenutno nema podataka o taskovima
                </h1>
              )}
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Container>
        </ThemeProvider>
      </Box>
    </Box>
  );
}

UserPage.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
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
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();
