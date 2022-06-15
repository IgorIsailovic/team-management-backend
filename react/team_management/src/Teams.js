import React from "react";
import GroupsIcon from "@mui/icons-material/Groups";
import { Container } from "react-bootstrap";
import Box from "@mui/material/Box";

export default function Teams({ data }) {
  return data.teamUser.length > 0 ? (
    data.teamUser.map((team, key) => (
      <Box
        sx={{
          borderRadius: "2rem",
          border: "1px solid #1976d3",
          boxShadow: "1px 3px 10px  #9E9E9E",
          backgroundColor: "white",
          width: "100%",
          margin: "1rem",
          padding: "1.5rem",
          //gridColumn: "span 2",
          gridRow: "auto",
        }}
      >
        <h4>{team.name}</h4>
      </Box>
    ))
  ) : (
    <Box
      sx={{
        borderRadius: "3rem",
        boxShadow: "1px 3px 10px  #9E9E9E",
        backgroundColor: "white",
        width: "100%",
        margin: "1rem",
        padding: "1.5rem",
        //gridColumn: "span 2",
        gridRow: "auto",
      }}
    >
      Niste ni u jednom timu
    </Box>
  );
}
