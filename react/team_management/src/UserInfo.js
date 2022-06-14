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
    <>
      <Avatar
        alt={data.firstName.charAt(0) + data.lastName.charAt(0)}
        src={getAvatar(data.username)}
        sx={{
          color: "#1976d3",
          bgcolor: "white",
          justifySelf: "center",
          height: "9rem",
          width: "9rem",
          gridColumn: "span 2",
        }}
      ></Avatar>
      <PersonIcon sx={{ margin: "10px", alignSelf: "center" }}></PersonIcon>
      {data.firstName} {data.lastName}
      <p>Email: {data.email}</p>
      <p>Roles: {data.roles.map((role, key) => role.roleName)}</p>
    </>
  );
}
