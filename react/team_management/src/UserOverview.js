import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import UserInfo from "./UserInfo";
import Teams from "./Teams";
import Tasks from "./Tasks";
import "./Shared.css";
import { Typography } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import { IconButton, Avatar } from "@mui/material";

export default function UserOverview({ data }) {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "2rem",
          width: "100%",
          height: "100%",
          padding: "1.5rem",
        }}
      >
        <UserInfo data={data}></UserInfo>
      </Box>
      <Box
        sx={{
          borderRadius: "2rem",
          backgroundColor: "white",
          width: "100%",
          height: "100%",
          padding: "1.5rem",
        }}
      >
        <Teams data={data}></Teams>
      </Box>
      <Box
        className="tasks"
        sx={{
          borderRadius: "2rem",
          gridColumn: "span 2",
          padding: "1.5rem",
          display: "grid",
          gridTemplateColumns: "1fr",
          gridTemplateRows: "auto" /* NEW */,
          backgroundColor: "white",
          width: "100%",
          height: "100%",
          // gridAutoRows: "auto",
          justifyItems: "center",
          alignItems: "center",
          gridGap: "1rem",
        }}
      >
        <Tasks data={data} status="INPROGRESS"></Tasks>
      </Box>
    </>
  );
}
