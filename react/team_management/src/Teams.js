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
          backgroundColor: "white",
          width: "100%",
          margin: "5px",
          padding: "1.5rem",
          //gridColumn: "span 2",
          gridRow: "auto",
        }}
      >
        <h4>{team.name}</h4>
      </Box>
    ))
  ) : (
    <p>Niste ni u jednom timu</p>
  );
}
