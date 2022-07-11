import React, { useState } from "react";
import axios from "axios";
import nikola from "../images/ceks.png";
import igor from "../images/igor.png";
import milan from "../images/milan.png";
import TaskModal from "./TaskModal";
import TaskCard from "./TaskCard";

export default function Task({ task }) {
  const [open, setOpen] = useState(false);
  const [taskResult, setTaskResult] = useState("");
  const [taskResult1, setTaskResult1] = useState("");
  const [assigner, setAssigner] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function cardClick() {
    let token = localStorage.getItem("token");
    console.log(task.id);
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
        <TaskModal
          task={task}
          open={open}
          handleClose={handleClose}
          taskResult={taskResult}
          taskResult1={taskResult1}
          assigner={assigner}
        ></TaskModal>
        <TaskCard task={task} cardClick={cardClick}></TaskCard>
      </div>
    </>
  );
}
