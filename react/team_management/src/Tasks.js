import React from "react";
import Typography from "@mui/material/Typography";

import Task from "./Task";
import Box from "@mui/material/Box";
import "./Shared.css";

export default function Tasks({ data, status }) {
  const backlog = data.taskUser.filter((task) => task.status === "BACKLOG");
  const selceted = data.taskUser.filter((task) => task.status === "SELECTED");
  const inprogress = data.taskUser.filter(
    (task) => task.status === "INPROGRESS"
  );
  const finished = data.taskUser.filter((task) => task.status === "FINISHED");

  const taskStatus = (status, name) => {
    return (
      <Box
        sx={{
          display: "grid",
          gridGap: "1rem",
          alignSelf: "start",
          justifySelf: "center",
          width: "100%",
          height: "100%",
          background: "#F1F1F1",
          padding: "1rem",
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          fontWeight={700}
          align="center"
          sx={{ mt: 2 }}
        >
          {name}
        </Typography>
        {status.map((task) => (
          <Task task={task} key={task.id}></Task>
        ))}
      </Box>
    );
  };
  return (
    <Box
      className="tasks"
      sx={{
        display: "grid",
        width: "100%",
        height: "100%",
        gridGap: "1rem",
        alignSelf: "center",
        justifySelf: "center",
        gridColumn: "1 / -1",
      }}
    >
      {data.taskUser.length > 0 ? (
        status === undefined ? (
          <>
            {taskStatus(backlog, "Backlog")}
            {taskStatus(selceted, "Selected")}
            {taskStatus(inprogress, "In progress")}
            {taskStatus(finished, "Finished")}
          </>
        ) : (
          data.taskUser.map((task) =>
            task.status === "INPROGRESS" ? (
              <Box
                key={task.id}
                sx={{
                  alignSelf: "center",
                  justifySelf: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Task task={task} key={task.id}></Task>
              </Box>
            ) : null
          )
        )
      ) : (
        <Typography
          sx={{
            alignSelf: "center",
            justifySelf: "center",
          }}
          variant="body1"
          fontFamily="Helvetica"
          color="inherit"
          align="center"
          fontWeight={700}
        >
          Trenutno nema podataka o taskovima
        </Typography>
      )}
    </Box>
  );
}
