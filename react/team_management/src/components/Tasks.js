import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Task from "./Task";
import Box from "@mui/material/Box";
import "../styles/Shared.css";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import NewTask from "./NewTask";
import jwt_decode from "jwt-decode";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";

const url = "http://192.168.0.22:8088";
//const url = "http://10.17.48.57:8088";

export default function Tasks({
  data,
  status,
  setTaskName,
  setTaskDescription,
  setPriority,
  setStatus,
  setTeam,
  setAssagnies,
  setEstDur,
}) {
  useEffect(() => {
    getUpdatedUserData();
    //setStatusView();
  }, []);
  const handleOpenNew = () => setOpenNew(true);
  const handleCloseNew = () => setOpenNew(false);

  const [openNew, setOpenNew] = useState(false);
  const [backlog, setBacklog] = useState("");
  const [selected, setSelected] = useState("");
  const [inprogress, setInprogress] = useState("");
  const [finished, setFinished] = useState("");
  const [isLoading, setLoading] = useState(true);

  const getRole = () => {
    let token = localStorage.getItem("token");
    let decoded = jwt_decode(token);
    let roles = decoded.roles[0].authority;
    return roles;
  };

  const getUpdatedUserData = () => {
    let token = localStorage.getItem("token");
    axios
      .get(`${url}/users/getByName/${data.username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // setData(response.data);
        setBacklog(
          response.data.taskUser.filter((task) => task.status === "BACKLOG")
        );
        setSelected(
          response.data.taskUser.filter((task) => task.status === "SELECTED")
        );
        setInprogress(
          response.data.taskUser.filter((task) => task.status === "INPROGRESS")
        );
        setFinished(
          response.data.taskUser.filter((task) => task.status === "FINISHED")
        );
        setLoading(false);

        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
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
          <Task
            task={task}
            key={task.id}
            getUpdatedUserData={getUpdatedUserData}
          ></Task>
        ))}
      </Box>
    );
  };

  if (isLoading) {
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
        <Skeleton
          variant="text"
          sx={{ m: 1, height: "13rem", width: "13rem", justifySelf: "center" }}
        />
        <Skeleton
          variant="text"
          sx={{ m: 1, height: "13rem", width: "13rem", justifySelf: "center" }}
        />
        <Skeleton
          variant="text"
          sx={{ m: 1, height: "13rem", width: "13rem", justifySelf: "center" }}
        />
        <Skeleton
          variant="text"
          sx={{ m: 1, height: "13rem", width: "13rem", justifySelf: "center" }}
        />
      </Box>
    );
  }

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
        getUpdatedUserData={getUpdatedUserData}
      ></NewTask>
      {data.taskUser.length > 0 ? (
        <>
          {taskStatus(backlog, "Backlog")}
          {taskStatus(selected, "Selected")}
          {taskStatus(inprogress, "In progress")}
          {taskStatus(finished, "Finished")}
        </>
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
