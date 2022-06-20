import React from "react";
import Typography from "@mui/material/Typography";

import Task from "./Task";
import Box from "@mui/material/Box";
import "./Shared.css";

export default function Tasks({ data, status }) {
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
          data.taskUser.map((task, key) => (
            <Box
              sx={{
                alignSelf: "center",
                justifySelf: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <Task task={task}></Task>
            </Box>
          ))
        ) : (
          data.taskUser.map((task, key) =>
            task.status === "INPROGRESS" ? (
              <Box
                sx={{
                  alignSelf: "center",
                  justifySelf: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Task task={task}></Task>
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
