import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import AssignmentIcon from "@mui/icons-material/Assignment";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import CheckIcon from "@mui/icons-material/Check";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import axios from "axios";
import Modal from "@mui/material/Modal";
import AvatarGroup from "@mui/material/AvatarGroup";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import nikola from "./ceks.png";
import igor from "./igor.png";
import milan from "./milan.png";
import Tooltip from "@mui/material/Tooltip";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  boxShadow: "1px 3px 10px  #9E9E9E",
  p: 4,
  display: "grid",
  gridTemplateColumns: "1fr",
  gridTemplateRows: "1fr 2fr",
  maxWidth: "50rem",
  minWidth: "20rem",
};

export default function Task({ task }) {
  const [taskResult, setTaskResult] = useState("");
  const [taskResult1, setTaskResult1] = useState("");
  const [open, setOpen] = useState(false);
  const [assigner, setAssigner] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function cardClick() {
    let token = localStorage.getItem("token");
    axios
      .get(`http://localhost:8088/tasks/${task.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        axios
          .all([
            axios.get(
              `http://localhost:8088/users/getOne/${response.data.assigner}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            ),
            axios.get(`http://localhost:8088/teams/${response.data.team}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
          ])
          .then(
            axios.spread((...responses) => {
              setTaskResult(`${responses[0].data.username}`);
              setTaskResult1(` ${responses[1].data.name}`);
              setAssigner(getAvatar(responses[0].data.username));
            })
          )
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
    handleOpen();
  }

  const getAvatar = (user) => {
    switch (user) {
      case "igor":
        return igor;
      case "nikola":
        return nikola;
      case "milan":
        return milan;
      default:
        return null;
    }
  };
  return (
    <>
      <div>
        <Modal open={open} onClose={handleClose}>
          <Box sx={style} className="card-modal">
            <Box>
              <Typography
                id="modal-modal-title"
                variant="h5"
                component="h2"
                align="center"
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
              <Box sx={{ display: "grid", mt: 2 }}>
                <Typography
                  variant="h6"
                  id="modal-modal-description"
                  align="center"
                >
                  Priority
                </Typography>
                {task.priority === "HIGH" ? (
                  <ArrowUpwardIcon
                    style={{
                      color: "red",
                      alignSelf: "center",
                      justifySelf: "center",
                    }}
                  />
                ) : task.priority === "LOW" ? (
                  <ArrowDownwardIcon
                    style={{
                      color: "green",
                      alignSelf: "center",
                      justifySelf: "center",
                    }}
                  />
                ) : (
                  <ArrowForwardIcon
                    style={{
                      color: "orange",
                      alignSelf: "center",
                      justifySelf: "center",
                    }}
                  />
                )}
              </Box>
              <Box sx={{ display: "grid", mt: 2 }}>
                <Typography
                  id="modal-modal-description"
                  variant="h6"
                  align="center"
                  sx={{ alignSelf: "center", justifySelf: "center" }}
                >
                  Team
                </Typography>

                <Typography id="modal-modal-description" align="center">
                  {taskResult1}
                </Typography>
              </Box>
              <Box sx={{ display: "grid", mt: 2 }}>
                <Typography
                  id="modal-modal-description"
                  variant="h6"
                  align="center"
                >
                  Assigner
                </Typography>
                <Tooltip title={taskResult}>
                  <Avatar
                    src={assigner}
                    sx={{
                      bgcolor: "white",
                      justifySelf: "center",
                    }}
                  ></Avatar>
                </Tooltip>
              </Box>
              <Box sx={{ display: "grid", mt: 2 }}>
                <Typography
                  id="modal-modal-description"
                  variant="h6"
                  align="center"
                  //sx={{ mt: 2 }}
                >
                  Assignies
                </Typography>
                <AvatarGroup max={4} sx={{ justifySelf: "center" }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  <Avatar
                    alt="Travis Howard"
                    src="/static/images/avatar/2.jpg"
                  />
                  <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                  <Avatar
                    alt="Agnes Walker"
                    src="/static/images/avatar/4.jpg"
                  />
                  <Avatar
                    alt="Trevor Henderson"
                    src="/static/images/avatar/5.jpg"
                  />
                </AvatarGroup>
              </Box>
            </Box>
          </Box>
        </Modal>
      </div>
      <Card
        //variant="outlined"
        onClick={cardClick}
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 3fr 2fr",
          cursor: "pointer",
          backgroundColor: "inherit",
          padding: "15px 15px 15px 15px",
          //margin: "5px",
          width: "100%",
          textAlign: "center",
          borderRadius: "0rem",
          minWidth: "280px",
          //maxWidth: "50rem",
          height: "100%",
          minHeight: "8rem",
          gridGap: "1rem",
          boxShadow: "1px 3px 10px  #9E9E9E",
        }}
      >
        <Avatar
          sx={{
            bgcolor: "#919fae",
            alignSelf: "center",
            justifySelf: "center",
          }}
        >
          <AssignmentIcon />
        </Avatar>
        <Typography
          variant="body1"
          fontFamily="Helvetica"
          color="inherit"
          align="center"
          alignSelf="center"
          justifyContent="start"
          fontWeight={900}
          sx={{
            alignSelf: "center",
            justifySelf: "center",
          }}
        >
          {task.name}
        </Typography>
        {/*
    <Typography
      sx={{
        gridColumn: "span 3",
        width: "80%",
        alignSelf: "center",
        justifySelf: "center",
      }}
      variant="body2"
      fontFamily="Helvetica"
      color="inherit"
      flexWrap="wrap"
    >
      {task.description === task.description.substring(0, 50)
        ? `${task.description.substring(0, 50)}`
        : `${task.description.substring(0, 50)}...`}
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
     */}
        <Box
          sx={{
            display: "grid",
            gridColumn: "3 / -1",
            alignSelf: "center",
            justifySelf: "center",
          }}
        >
          <Typography
            variant="body2"
            fontFamily="Helvetica"
            color="inherit"
            align="center"
            fontWeight={900}
            sx={{
              alignSelf: "center",
              justifySelf: "center",
              marginBottom: "1rem",
            }}
          >
            {task.status === "FINISHED" ? "Finished" : "In Progress"}
          </Typography>

          <Avatar
            sx={{
              bgcolor: task.status === "FINISHED" ? "green" : "orange",
              alignSelf: "center",
              justifySelf: "center",
            }}
          >
            {task.status === "FINISHED" ? (
              <CheckIcon />
            ) : (
              <HourglassBottomIcon />
            )}
          </Avatar>
        </Box>
        {/*
        <Typography
          variant="body2"
          fontFamily="Helvetica"
          color="inherit"
          align="center"
          fontWeight={900}
          sx={{
            alignSelf: "center",
            justifySelf: "center",
            gridColumn: "1 / 2",
          }}
        >
          {`Estimated duration: ${task.est_dur}h`}
        </Typography>
        <Typography
          variant="body2"
          fontFamily="Helvetica"
          color="inherit"
          align="center"
          fontWeight={900}
          sx={{
            alignSelf: "center",
            justifySelf: "center",
            gridColumn: "1 / 2",
          }}
        >
          {`Priority: ${task.priority}`}
        </Typography>
        <Typography
          variant="body2"
          fontFamily="Helvetica"
          color="inherit"
          align="center"
          fontWeight={900}
          sx={{
            alignSelf: "center",
            justifySelf: "center",
            gridColumn: "1 / 2",
          }}
        >
          {`Assigner id: ${task.assigner_id}`}
        </Typography>
        */}
      </Card>
    </>
  );
}
