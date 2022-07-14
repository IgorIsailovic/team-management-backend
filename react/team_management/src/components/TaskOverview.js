import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

export default function TaskOverview({ data }) {
  const [backlog, setBacklog] = useState("");
  const [selected, setSelected] = useState("");
  const [inprogress, setInprogress] = useState("");
  const [finished, setFinished] = useState("");

  const calculateTasks = () => {
    setBacklog(
      data.taskUser.filter((task) => task.status === "BACKLOG").length
    );
    setSelected(
      data.taskUser.filter((task) => task.status === "SELECTED").length
    );
    setInprogress(
      data.taskUser.filter((task) => task.status === "INPROGRESS").length
    );
    setFinished(
      data.taskUser.filter((task) => task.status === "FINISHED").length
    );
  };

  useEffect(() => {
    calculateTasks();
  }, []);
  return (
    <Box
      sx={{
        alignSelf: "center",
        justifySelf: "center",
        display: "grid",
        boxShadow: "1px 3px 10px  #9E9E9E",
        height: "100%",
        width: "100%",

        padding: "1rem",

        backgroundColor: "white",
        gridColumn: "1 / -1",
        gridTemplateColumns: "repeat(4, 1fr)",
        //gridGap: "0rem",
      }}
    >
      <Typography
        variant="h6"
        component="h2"
        fontWeight={700}
        align="center"
        sx={{ gridColumn: "1 / -1", alignSelf: "center" }}
      >
        Tasks Overview
      </Typography>
      <Box
        sx={{
          alignSelf: "center",
          justifySelf: "center",
          display: "grid",
          boxShadow: "1px 3px 10px  #9E9E9E",
          height: "90%",
          width: "90%",
          maxWidth: "60rem",
          padding: "1rem",
          backgroundColor: "white",
        }}
      >
        <Typography
          variant="h7"
          fontFamily="Helvetica"
          color="inherit"
          fontWeight={600}
          align="center"
          sx={{
            justifySelf: "center",
            width: "100%",
            alignSelf: "start",
          }}
        >
          Backlog
        </Typography>
        <Typography
          variant="h5"
          fontFamily="fantasy"
          color="inherit"
          fontWeight={300}
          align="center"
          sx={{
            justifySelf: "center",
            width: "100%",
            alignSelf: "center",
          }}
        >
          {backlog}
        </Typography>
      </Box>
      <Box
        sx={{
          alignSelf: "center",
          justifySelf: "center",
          display: "grid",
          boxShadow: "1px 3px 10px  #9E9E9E",
          height: "90%",
          width: "90%",
          maxWidth: "60rem",
          padding: "1rem",
          backgroundColor: "white",
        }}
      >
        <Typography
          variant="h7"
          fontFamily="Helvetica"
          color="inherit"
          fontWeight={600}
          align="center"
          sx={{
            justifySelf: "center",
            width: "100%",
            alignSelf: "start",
          }}
        >
          Selected
        </Typography>
        <Typography
          variant="h5"
          fontFamily="fantasy"
          color="inherit"
          fontWeight={300}
          align="center"
          sx={{
            justifySelf: "center",
            width: "100%",
            alignSelf: "center",
          }}
        >
          {selected}
        </Typography>
      </Box>
      <Box
        sx={{
          alignSelf: "center",
          justifySelf: "center",
          display: "grid",
          boxShadow: "1px 3px 10px  #9E9E9E",
          height: "90%",
          width: "90%",
          maxWidth: "60rem",
          padding: "1rem",
          backgroundColor: "white",
        }}
      >
        <Typography
          variant="h7"
          fontFamily="Helvetica"
          color="inherit"
          fontWeight={600}
          align="center"
          sx={{
            justifySelf: "center",
            width: "100%",
            alignSelf: "start",
          }}
        >
          In Progress
        </Typography>
        <Typography
          variant="h5"
          fontFamily="fantasy"
          color="inherit"
          fontWeight={300}
          align="center"
          sx={{
            justifySelf: "center",
            width: "100%",
            alignSelf: "center",
          }}
        >
          {inprogress}
        </Typography>
      </Box>
      <Box
        sx={{
          alignSelf: "center",
          justifySelf: "center",
          display: "grid",
          boxShadow: "1px 3px 10px  #9E9E9E",
          height: "90%",
          width: "90%",
          maxWidth: "60rem",
          padding: "1rem",
          backgroundColor: "white",
        }}
      >
        <Typography
          variant="h7"
          fontFamily="Helvetica"
          color="inherit"
          fontWeight={600}
          align="center"
          sx={{
            justifySelf: "center",
            width: "100%",
            alignSelf: "start",
          }}
        >
          Finished
        </Typography>
        <Typography
          variant="h5"
          fontFamily="fantasy"
          color="inherit"
          fontWeight={300}
          align="center"
          sx={{
            justifySelf: "center",
            width: "100%",
            alignSelf: "center",
          }}
        >
          {finished}
        </Typography>
      </Box>
    </Box>
  );
}
