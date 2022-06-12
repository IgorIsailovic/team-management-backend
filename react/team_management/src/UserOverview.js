import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import UserInfo from "./UserInfo";
import Teams from "./Teams";
import Tasks from "./Tasks";
export default function UserOverview({ data }) {
  return (
    <>
      <Box>
        <h1>User Info</h1>
        <UserInfo data={data}></UserInfo>
      </Box>
      <Box>
        <h1>Teams</h1>
        <Teams data={data}></Teams>
      </Box>
      <Box sx={{}}>
        <h1>Tasks in progress</h1>
        <Tasks data={data} status="INPROGRESS"></Tasks>
      </Box>
    </>
  );
}
