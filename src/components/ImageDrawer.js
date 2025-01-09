import React, { useState, useEffect } from "react";
import {
  Drawer,
  Typography,
  Box,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon, Edit as EditIcon } from "@mui/icons-material";
import EditIcons from "./EditIcons";
import Cropper from "react-easy-crop";

const ImageDrawer = ({ uploadedImage, uploadedImageTitle, drawerOpen, onClose }) => {
  const [assetTitle, setAssetTitle] = useState(uploadedImageTitle || "");
  const [isEditMode, setIsEditMode] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isCropping, setIsCropping] = useState(false);
  const [imageSrc, setImageSrc] = useState(uploadedImage); 
  const [rotation, setRotation] = useState(0);
  const [flipHorizontal, setFlipHorizontal] = useState(false); 
  const [flipVertical, setFlipVertical] = useState(false); 

  //useEffect when the title of the image changes to set the new title
  useEffect(() => {
    setAssetTitle(uploadedImageTitle);
  }, [uploadedImageTitle]);

  // when the image changes to set the new image
  useEffect(() => {
    setImageSrc(uploadedImage);
  }, [uploadedImage]);

  //function runs when user clicks on edit icon
  const handleEditClick = () => setIsEditMode(true);

  //flip the icons after clicking on close button
  const handleCloseEditIcons = () => {
    setIsCropping(false);
    setIsEditMode(false);
  };

  //function to crop the image
  const handleCropImage = async () => {
    
  };

  const handleRotate = () => {
    setRotation((prevRotation) => prevRotation + 90); 
  };

  //function to flip the image horizontaly
  const handleFlipHorizontal = () => {
    setFlipHorizontal(!flipHorizontal); 
  };

  //function to flip image vertically
  const handleFlipVertical = () => {
    setFlipVertical(!flipVertical); 
  };

  //function to replace image
  const handleReplace = () => {
    // document.getElementById('fileInput').click();
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
      {/* Header */}
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
        {imageSrc && (
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
            {!isCropping ? (
              <img
                src={imageSrc}
                alt="Selected"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  transform: `${flipHorizontal ? "scaleX(-1)" : ""} ${flipVertical ? "scaleY(-1)" : ""} rotate(${rotation}deg)`,
                }}
              />
            ) : (
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
              />
            )}

            {/* Toggle Edit Icon or other Icons */}
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
              <EditIcons
                onCloseEditIcons={handleCloseEditIcons}
                onCropImage={handleCropImage}
                onRotate={handleRotate}
                onFlipHorizontal={handleFlipHorizontal}
                onFlipVertical={handleFlipVertical}
                onReplace={handleReplace}
              />
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
            onChange={(e) => setAssetTitle(e.target.value)}
            fullWidth
            variant="outlined"
          />
          <TextField
            label="Enter Description"
            multiline
            rows={3}
            fullWidth
            variant="outlined"
          />
          <Button
            variant="contained"
            onClick={onClose}
            sx={{
              backgroundColor: "#334D6E",
              color: "#fff",
              width: "100%",
            }}
          >
            Upload Image
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default ImageDrawer;
