import React from "react";
import GroupsIcon from "@mui/icons-material/Groups";
import { Container } from "react-bootstrap";
import { IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";

export default function Teams({ data }) {
  const clicked = () => {
    console.log("clicked");
  };
  return data.teamUser.length > 0 ? (
    data.teamUser.map((team, key) => (
      <IconButton
        onClick={clicked}
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
          color: "black",
        }}
      >
        <Typography
          variant="body1"
          fontFamily="Helvetica"
          color="inherit"
          align="center"
          fontWeight={700}
          sx={{ alignSelf: "start", justifySelf: "start" }}
        >
          {team.name}
        </Typography>
      </IconButton>
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
      <Typography
        variant="body1"
        fontFamily="Helvetica"
        color="inherit"
        align="center"
        fontWeight={700}
        sx={{ alignSelf: "start", justifySelf: "start" }}
      >
        Niste ni u jednom timu
      </Typography>
    </Box>
  );
}
