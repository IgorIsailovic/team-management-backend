import React from "react";
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
import Modal from "@mui/material/Modal";
import PersonIcon from "@mui/icons-material/Person";
import nikola from "./ceks.png";
import igor from "./igor.png";
import milan from "./milan.png";
import Tasks from "./Tasks";
import Teams from "./Teams";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import Typography from "@mui/material/Typography";
import ContactMailIcon from "@mui/icons-material/ContactMail";

export default function userInfo({ data }) {
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
    <Container
      sx={{
        boxShadow: "1px 3px 10px  #9E9E9E",
        height: "100%",
        padding: "3rem",
        borderRadius: "3rem",
        backgroundColor: "white",
      }}
    >
      <Container
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr",
          marginBottom: "2rem",
        }}
      >
        <Avatar
          alt={data.firstName.charAt(0) + data.lastName.charAt(0)}
          src={getAvatar(data.username)}
          sx={{
            color: "#1976d3",
            bgcolor: "white",
            justifySelf: "center",
            alignSelf: "center",
            height: "9rem",
            width: "9rem",
          }}
        ></Avatar>
      </Container>
      <Container
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 9fr",
          margin: "1rem",
          gridGap: "1rem",
        }}
      >
        <PersonIcon
          sx={{ alignSelf: "start", justifySelf: "start", color: "#1976d3" }}
        ></PersonIcon>
        <Typography
          variant="body1"
          fontFamily="Helvetica"
          color="inherit"
          align="center"
          fontWeight={700}
          sx={{ alignSelf: "start", justifySelf: "start" }}
        >
          {data.firstName} {data.lastName}
        </Typography>
      </Container>
      <Container
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 9fr",
          margin: "1rem",
          gridGap: "1rem",
        }}
      >
        <AlternateEmailIcon
          sx={{ alignSelf: "start", justifySelf: "start", color: "#1976d3" }}
        ></AlternateEmailIcon>
        <Typography
          variant="body1"
          fontFamily="Helvetica"
          color="inherit"
          align="center"
          fontWeight={700}
          sx={{ alignSelf: "start", justifySelf: "start" }}
        >
          {data.email}
        </Typography>
      </Container>
      <Container
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 9fr",
          margin: "1rem",
          gridGap: "1rem",
        }}
      >
        <ContactMailIcon
          sx={{ alignSelf: "center", justifySelf: "start", color: "#1976d3" }}
        ></ContactMailIcon>
        <Typography
          variant="body1"
          fontFamily="Helvetica"
          color="inherit"
          align="center"
          fontWeight={700}
          sx={{ alignSelf: "start", justifySelf: "start" }}
        >
          {data.roles.map((role, key) => role.roleName)}
        </Typography>
      </Container>
    </Container>
  );
}
