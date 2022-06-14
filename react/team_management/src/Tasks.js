import React from "react";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import AssignmentIcon from "@mui/icons-material/Assignment";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import CheckIcon from "@mui/icons-material/Check";
import Task from "./Task";
import { Container } from "@mui/material";
import "./Shared.css";

export default function Tasks({ data, status }) {
  return data.taskUser.length > 0 ? (
    status === undefined ? (
      data.taskUser.map((task, key) => <Task task={task}></Task>)
    ) : (
      data.taskUser.map((task, key) =>
        task.status === "INPROGRESS" ? <Task task={task}> </Task> : null
      )
    )
  ) : (
    <Typography
      sx={{
        gridColumn: "span 2",
      }}
      variant="h4"
      fontFamily="Helvetica"
      color="inherit"
      align="center"
      marginBottom={2}
    >
      Trenutno nema podataka o taskovima
    </Typography>
  );
}
