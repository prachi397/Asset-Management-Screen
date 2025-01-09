import React from "react";
import foloderImg from "../assets/folderImg.png";
import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const ImageUploader = ({ onUpload }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "10px",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <img src={foloderImg} alt="folder img" />
      <Typography sx={{ color: "#707683" }}>Add Assets here</Typography>
      <Button
        sx={{ backgroundColor: "#334D6E", cursor: "pointer" }}
        variant="contained"
        startIcon={<AddIcon />}
        component="label"
      >
        Add
        <input type="file" hidden accept="image/*" onChange={onUpload}/>
      </Button>
    </Box>
  );
};
export default ImageUploader;
