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
      <UserInfo data={data}></UserInfo>
      <Box
        sx={{
          alignSelf: "start",
          justifySelf: "start",
          borderRadius: "3rem",
          padding: "1.5rem",
          display: "grid",
          gridTemplateColumns: "1fr",
          gridTemplateRows: "auto" /* NEW */,
          backgroundColor: "white",
          //width: "100%",
          height: "100%",
          boxShadow: "1px 3px 10px  #9E9E9E",

          // gridAutoRows: "auto",
          justifyItems: "center",
          alignItems: "start",
        }}
      >
        <Teams data={data}></Teams>
      </Box>
      <Box
        className="tasks"
        sx={{
          borderRadius: "3rem",
          gridColumn: "span 2",
          padding: "1.5rem",
          display: "grid",
          gridTemplateColumns: "1fr",
          gridTemplateRows: "auto" /* NEW */,
          backgroundColor: "white",
          //width: "100%",
          height: "100%",
          boxShadow: "1px 3px 10px  #9E9E9E",

          // gridAutoRows: "auto",
          justifyItems: "center",
          alignItems: "start",
          gridGap: "1rem",
        }}
      >
        <Tasks data={data} status="INPROGRESS"></Tasks>
      </Box>
    </>
  );
}
