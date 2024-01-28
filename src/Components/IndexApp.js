import React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import {  useNavigate } from "react-router-dom";

const IndexApp = () => {
  const navigate = useNavigate();

  const handleNavigate = (route) => {

    navigate(route);
  };

  return (
    <div
      style={{
        backgroundImage:
          "url('asset/forme-coeur-stethoscope-pour-sujets-medicaux.jpg')",
        backgroundSize: "cover",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          "& > :not(style)": {
            m: 14,
            width: "12rem",
            height: "12rem",
            transition: "transform 0.3s",
            "&:hover": {
              transform: "scale(1.1)",
            },
          },
        }}
      >
        <Fab
          color="white"
          aria-label="list"
          onClick={() => handleNavigate("/listPatients")}
          style={{ cursor: "pointer" }}
        >
          <spam>List des patients </spam>
        </Fab>

        <Fab
          color="primary"
          aria-label="add"
          onClick={() => handleNavigate("/addPatient")}
          style={{ cursor: "pointer" }}
        >
          <span style={{ marginLeft: "8px" }}>Ajouter un patient</span>
        </Fab>
      </Box>
    </div>
  );
};

export default IndexApp;
