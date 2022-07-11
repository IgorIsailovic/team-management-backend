import React from "react";
import Box from "@mui/material/Box";
import UserInfo from "./UserInfo";
import Teams from "./Teams";
import Tasks from "./Tasks";
import "../styles/Shared.css";

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
