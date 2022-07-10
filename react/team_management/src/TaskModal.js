import React from "react";
import Avatar from "@mui/material/Avatar";

import Typography from "@mui/material/Typography";
import { Box, IconButton } from "@mui/material";
import Modal from "@mui/material/Modal";
import AvatarGroup from "@mui/material/AvatarGroup";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CloseIcon from "@mui/icons-material/Close";
import jwt_decode from "jwt-decode";

export default function TaskModal({
  task,
  open,
  handleClose,
  taskResult,
  taskResult1,
  assigner,
}) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    bgcolor: "background.paper",
    boxShadow: "1px 3px 10px  #9E9E9E",
    p: 2,
    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "auto auto 3fr",
    overflow: "scroll",

    maxHeight: "80%",
    maxWidth: "50rem",
    minWidth: "20rem",
  };

  const getRole = () => {
    let token = localStorage.getItem("token");
    let decoded = jwt_decode(token);
    let roles = decoded.roles[0].authority;
    return roles;
  };

  function deleteTask() {
    let token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:8088/tasks/${task.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        console.log("task deleted");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style} className="card-modal">
        <Box
          className="modal-header"
          sx={{ display: "grid", gridTemplateColumns: "7fr 1fr 1fr 1fr" }}
        >
          <Typography
            variant="body1"
            align="center"
            fontWeight={700}
            sx={{ alignSelf: "start", justifySelf: "start", m: 1 }}
          >
            Taks ID: {task.id}
          </Typography>
          {getRole() === "Admin" ? (
            <>
              <IconButton
                sx={{
                  alignSelf: "start",
                  justifySelf: "center",
                  color: "primary.main",
                }}
                onClick={null}
              >
                <EditIcon></EditIcon>
              </IconButton>
              <IconButton
                sx={{
                  alignSelf: "start",
                  justifySelf: "center",
                  color: "primary.main",
                }}
                onClick={deleteTask}
              >
                <DeleteForeverIcon></DeleteForeverIcon>
              </IconButton>
            </>
          ) : null}
          <IconButton
            sx={{
              alignSelf: "start",
              justifySelf: "center",
              color: "primary.main",
              gridColumn: "4/-1",
            }}
            onClick={handleClose}
          >
            <CloseIcon></CloseIcon>
          </IconButton>
        </Box>
        <Box sx={{ m: 2 }}>
          <Typography
            variant="h5"
            component="h2"
            fontWeight={700}
            align="center"
            sx={{ mt: 2 }}
          >
            {task.name}
          </Typography>
          <Typography
            id="modal-modal-description"
            align="center"
            sx={{ mt: 2 }}
          >
            {task.description}
          </Typography>
        </Box>

        <Box sx={{ display: "grid" }}>
          <Box sx={{ display: "grid", m: 1 }}>
            <Typography
              variant="h6"
              id="modal-modal-description"
              align="center"
              fontWeight={600}
              sx={{ m: 1 }}
            >
              Priority
            </Typography>
            {task.priority === "HIGH" ? (
              <ArrowUpwardIcon
                style={{
                  color: "red",
                  alignSelf: "center",
                  justifySelf: "center",
                  m: 1,
                }}
              />
            ) : task.priority === "LOW" ? (
              <ArrowDownwardIcon
                style={{
                  color: "green",
                  alignSelf: "center",
                  justifySelf: "center",
                  m: 1,
                }}
              />
            ) : (
              <ArrowForwardIcon
                style={{
                  color: "orange",
                  alignSelf: "center",
                  justifySelf: "center",
                  m: 1,
                }}
              />
            )}
          </Box>
          <Box sx={{ display: "grid", m: 1 }}>
            <Typography
              variant="h6"
              align="center"
              fontWeight={600}
              sx={{ alignSelf: "center", justifySelf: "center", m: 1 }}
            >
              Team
            </Typography>

            <Typography align="center" sx={{ m: 1 }}>
              {taskResult1}
            </Typography>
          </Box>
          <Box sx={{ display: "grid", m: 1 }}>
            <Typography
              variant="h6"
              align="center"
              fontWeight={600}
              sx={{ alignSelf: "center", justifySelf: "center", m: 1 }}
            >
              Status
            </Typography>
            <Typography
              color="inherit"
              align="center"
              sx={{
                alignSelf: "center",
                justifySelf: "center",
                marginBottom: "1rem",
              }}
            >
              {task.status}
            </Typography>
          </Box>
          <Box sx={{ display: "grid", m: 1 }}>
            <Typography variant="h6" fontWeight={600} align="center" m="1">
              Assigner
            </Typography>
            <Tooltip title={taskResult}>
              <Avatar
                src={assigner}
                sx={{
                  bgcolor: "white",
                  justifySelf: "center",
                  m: 1,
                }}
              ></Avatar>
            </Tooltip>
          </Box>
          <Box sx={{ display: "grid", m: 1 }}>
            <Typography
              variant="h6"
              fontWeight={600}
              align="center"
              sx={{ m: 1 }}
            >
              Assignies
            </Typography>
            <AvatarGroup max={4} sx={{ justifySelf: "center", m: 1 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
              <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
              <Avatar
                alt="Trevor Henderson"
                src="/static/images/avatar/5.jpg"
              />
            </AvatarGroup>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
