import React, { useEffect, useState } from "react";
import {
  Drawer,
  Typography,
  Box,
  TextField,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import CropIcon from "@mui/icons-material/Crop";
import RefreshIcon from "@mui/icons-material/Refresh";
import FlipIcon from "@mui/icons-material/Flip";
import FindReplaceIcon from "@mui/icons-material/FindReplace";

const ImageDrawer = ({
  uploadedImage,
  uploadedImageTitle,
  drawerOpen,
  onClose,
}) => {
  const [assetTitle, setAssetTitle] = useState(uploadedImageTitle || "");
  const [isEditMode, setIsEditMode] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [flippedHorizontally, setFlippedHorizontally] = useState(false);
  const [flippedVertically, setFlippedVertically] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);

  //useEffect to each tile set the tile when new image gets uploaded
  useEffect(() => {
    setAssetTitle(uploadedImageTitle);
  }, [uploadedImageTitle]);

  //functions to flip the edit icon
  const handleEditClick = () => {
    setIsEditMode(true); 
  };

  const handleCloseEditIcons = () => {
    setIsEditMode(false); 
  };

  return (
    <Drawer
      open={drawerOpen}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: "100vw",
          padding: "16px",
          boxSizing: "border-box",
          overflow: "hidden",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Add Asset
        </Typography>
        <IconButton onClick={onClose} sx={{ color: "black" }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: "16px",
        }}
      >
        {uploadedImage && (
          <Box
            sx={{
              flex: "1",
              maxWidth: "70%",
              maxHeight: "500px",
              position: "relative",
              overflow: "hidden",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          >
            <img
              src={uploadedImage}
              alt="Selected"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
            {/* Conditionally render the Edit icon or the group of icons */}
            {!isEditMode ? (
              <IconButton
                onClick={handleEditClick}
                sx={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  borderRadius: "8px",
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                  },
                }}
              >
                <EditIcon />
              </IconButton>
            ) : (
              <Box
                sx={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  padding: "5px",
                  borderRadius: "8px",
                  gap: "5px",
                }}
              >
                <Tooltip title="Close" placement="left">
                  <IconButton
                    onClick={handleCloseEditIcons}
                    sx={{ color: "white" }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Crop" placement="left">
                  <IconButton sx={{ color: "white" }}>
                    <CropIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Rotate" placement="left">
                  <IconButton sx={{ color: "white" }}>
                    <RefreshIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Flip Horizontal" placement="left">
                  <IconButton sx={{ color: "white" }}>
                    <FlipIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Flip Vertical" placement="left">
                  <IconButton
                    sx={{ color: "white", transform: "rotate(90deg)" }}
                  >
                    <FlipIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Replace" placement="left">
                  <IconButton sx={{ color: "white" }}>
                    <FindReplaceIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          </Box>
        )}

        <Box
          sx={{
            flex: "0.5",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <TextField
            label="Asset Title"
            value={assetTitle}
            fullWidth
            variant="outlined"
            sx={{ marginBottom: "16px" }}
          />
          <TextField
            label="Enter Description"
            multiline
            rows={3}
            fullWidth
            variant="outlined"
            sx={{ marginBottom: "16px" }}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#334D6E",
              color: "#fff",
              width: "100%",
              cursor: "pointer",
            }}
            onClick={onClose}
          >
            Upload Image
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default ImageDrawer;
