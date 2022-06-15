import React from "react";
import Typography from "@mui/material/Typography";

import Task from "./Task";

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
        alignSelf: "center",
        justifySelf: "start",
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
