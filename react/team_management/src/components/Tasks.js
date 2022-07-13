import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Task from "./Task";
import Box from "@mui/material/Box";
import "../styles/Shared.css";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import NewTask from "./NewTask";
import jwt_decode from "jwt-decode";

export default function Tasks({ data, status }) {
  const backlog = data.taskUser.filter((task) => task.status === "BACKLOG");
  const selceted = data.taskUser.filter((task) => task.status === "SELECTED");
  const inprogress = data.taskUser.filter(
    (task) => task.status === "INPROGRESS"
  );
  const finished = data.taskUser.filter((task) => task.status === "FINISHED");

  const handleOpenNew = () => setOpenNew(true);
  const handleCloseNew = (
    setTaskName,
    setTaskDescription,
    setPriority,
    setStatus,
    setTeam,
    setAssagnies
  ) => {
    setOpenNew(false);
    setTaskName("");
    setTaskDescription("");
    setPriority("");
    setStatus("");
    setTeam("");
    setAssagnies([]);
  };
  const [openNew, setOpenNew] = useState(false);

  const getRole = () => {
    let token = localStorage.getItem("token");
    let decoded = jwt_decode(token);
    let roles = decoded.roles[0].authority;
    return roles;
  };

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
          minHeight: "14rem",
          gridAutoRows: "min-content",
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
      {getRole() === "Admin" ? (
        <Fab
          color="primary"
          aria-label="add"
          sx={{ position: "fixed", bottom: 50, right: 50 }}
          onClick={handleOpenNew}
        >
          <AddIcon />
        </Fab>
      ) : null}
      <NewTask
        open={openNew}
        handleClose={handleCloseNew}
        userData={data}
      ></NewTask>
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
