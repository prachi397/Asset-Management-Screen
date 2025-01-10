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
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";

const ImageDrawer = ({
  uploadedImage,
  uploadedImageTitle,
  description,
  setDescription,
  drawerOpen,
  onClose,
  onReplace,
  handleCropImage,
  handleRotate,
  rotation,
  handleFlipHorizontal,
  flipHorizontal,
  handleFlipVertical,
  isCropping,
  crop,
  setCrop,
  handleCropComplete,
  generateCroppedImage,
  zoom,
  setZoom,
  setIsCropping,
  flipVertical,
  handleSaveImageToList,
}) => {
  const navigate = useNavigate();

  const [assetTitle, setAssetTitle] = useState(uploadedImageTitle || "");
  const [isEditMode, setIsEditMode] = useState(false);
  const [imageSrc, setImageSrc] = useState(uploadedImage);

  const [openSnackbar, setOpenSnackbar] = useState(false);

  // UseEffect to reset title and image when the image changes
  useEffect(() => {
    setImageSrc(uploadedImage);
    setAssetTitle(uploadedImageTitle);
  }, [uploadedImage, uploadedImageTitle]);

  // Function to toggle edit mode
  const handleEditClick = () => setIsEditMode(true);

  // Function to close edit mode
  const handleCloseEditIcons = () => {
    setIsCropping(false);
    setIsEditMode(false);
  };

  //transforming the image based on user actions and save it into imageList
  const generateTransformedImage = async () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = imageSrc;  
    return new Promise((resolve, reject) => {
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.translate(-canvas.width / 2, -canvas.height / 2);
        if (flipHorizontal) {
          ctx.scale(-1, 1); 
          ctx.translate(-canvas.width, 0); 
        }
  
        if (flipVertical) {
          ctx.scale(1, -1); 
          ctx.translate(0, -canvas.height);
        }
        ctx.drawImage(img, 0, 0);
        const newImageURL = canvas.toDataURL("image/jpeg");
        resolve(newImageURL);
  
        ctx.restore();
      };
  
      img.onerror = (err) => reject(err);
    });
  };
  

  // Function to replace image
  const handleReplace = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const newImageURL = URL.createObjectURL(file);
        const newImageTitle = file.name;
        onReplace(newImageURL, newImageTitle);
      }
    };
    fileInput.click();
  };

  const handleImageUpload = async () => {
    if (!description) {
      setOpenSnackbar(true); 
      return;
    }  
    let processedImage = imageSrc;  
    if (isCropping) {
      processedImage = await generateCroppedImage(); 
    } else if (rotation !== 0 || flipHorizontal || flipVertical) {
      processedImage = await generateTransformedImage(); 
    }
    handleSaveImageToList(processedImage, uploadedImageTitle, description);
    onClose();
    navigate("/gallery");
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
          height: "70%",
        }}
      >
        {imageSrc && (
          <Box
            sx={{
              flex: "1",
              position: "relative",
              overflow: "hidden",
              borderRadius: "8px",
              border: "1px solid #ccc",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "500px",
            }}
          >
            {!isCropping ? (
              <img
                src={imageSrc}
                alt="Selected"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transform: `${flipHorizontal ? "scaleX(-1)" : ""} ${
                    flipVertical ? "scaleY(-1)" : ""
                  } rotate(${rotation}deg)`,
                }}
              />
            ) : (
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                aspect={16 / 9}
                onCropChange={setCrop}
                onCropComplete={handleCropComplete}
                onZoomChange={setZoom}
                style={{
                  containerStyle: {
                    width: "100%",
                    height: "100%",
                    position: "relative",
                  },
                  cropAreaStyle: {
                    width: "100%",
                    height: "100%",
                  },
                }}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={3}
            fullWidth
            variant="outlined"
          />
          <Button
            variant="contained"
            onClick={handleImageUpload}
            sx={{
              backgroundColor: "#334D6E",
              color: "#fff",
              width: "100%",
            }}
          >
            Upload Image
          </Button>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={() => setOpenSnackbar(false)}
          >
            <Alert onClose={() => setOpenSnackbar(false)} severity="error">
              Description is mandatory!
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </Drawer>
  );
};

export default ImageDrawer;
