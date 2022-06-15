import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import AssignmentIcon from "@mui/icons-material/Assignment";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import CheckIcon from "@mui/icons-material/Check";
import Typography from "@mui/material/Typography";

export default function Task({ task }) {
  return (
    <Card
      //variant="outlined"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 5fr 5fr",
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "inherit",
        padding: "15px",
        margin: "5px",
        width: "100%",
        textAlign: "center",
        borderRadius: "1rem",
        minWidth: "280px",
        maxWidth: "400px",
        height: "150px",
        gridGap: "0.3rem",
        boxShadow: "1px 3px 10px  #9E9E9E",
      }}
    >
      <Avatar sx={{ bgcolor: "#1976d3" }}>
        <AssignmentIcon />
      </Avatar>
      <Typography
        variant="body1"
        fontFamily="Helvetica"
        color="inherit"
        align="center"
        fontWeight={900}
        sx={{
          gridColumn: "span 2",
        }}
      >
        {task.name}
      </Typography>

      <Typography
        sx={{
          gridColumn: "span 3",
        }}
        variant="body2"
        fontFamily="Helvetica"
        color="inherit"
        align="center"
        marginBottom={2}
      >
        {task.description === task.description.substring(0, 40)
          ? `${task.description.substring(0, 40)}`
          : `${task.description.substring(0, 40)}...`}
      </Typography>
      <Button
        sx={{
          alignSelf: "center",
          justifySelf: "center",
        }}
        style={{
          color: "inherit",
          border: "solid 0.2px black",
          height: "2rem",
          width: "5rem",
          // gridRow: "span 2",
        }}
        onClick={null}
      >
        Detailed
      </Button>
      <Avatar
        sx={{
          bgcolor: task.status === "FINISHED" ? "green" : "orange",
          alignSelf: "center",
          justifySelf: "end",
        }}
      >
        {task.status === "FINISHED" ? <CheckIcon /> : <HourglassBottomIcon />}
      </Avatar>
      <Typography
        variant="body2"
        fontFamily="Helvetica"
        color="inherit"
        align="center"
        fontWeight={900}
        sx={{
          alignSelf: "center",
          justifySelf: "center",
        }}
      >
        {task.status === "FINISHED" ? "Finished" : "In Progress"}
      </Typography>
    </Card>
  );
}
