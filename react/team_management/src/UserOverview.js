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
    <Box
      className="overview-box"
      sx={{
        display: "grid",
        gridGap: "1rem",
      }}
    >
      <UserInfo data={data}></UserInfo>

      <Teams data={data}></Teams>

      <Tasks data={data} status="INPROGRESS"></Tasks>
    </Box>
  );
}
