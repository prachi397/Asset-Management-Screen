import React, { useState } from "react";
import ImageUploader from "./ImageUploader";
import ImageDrawer from "./ImageDrawer";
import { useNavigate } from "react-router-dom";

const Home = ({ setImageList, imageList }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [uploadedImageTitle, setUploadedImageTitle] = useState("");
  const [description, setDescription] = useState("");

  const [rotation, setRotation] = useState(0);
  const [flipHorizontal, setFlipHorizontal] = useState(false);
  const [flipVertical, setFlipVertical] = useState(false);

  const [isCropping, setIsCropping] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);

  const navigate = useNavigate();

  //function to upload an image after clicking on add button
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      const imageTitle = file.name;
      setUploadedImage(imageURL);
      setUploadedImageTitle(imageTitle);
      setDrawerOpen(true);
    }
  };

  // Function to replace the uploaded image
  const handleReplaceImage = (newImage, newTitle) => {
    setUploadedImage(newImage);
    setUploadedImageTitle(newTitle);
    setFlipHorizontal(false);
    setFlipVertical(false);
    setIsCropping(false);
    setRotation(0);
  };

  //function to crop the image
  const handleCropImage = async () => {
    setIsCropping(true);
  };

  const handleCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  //crop the image
  const generateCroppedImage = async () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = uploadedImage;
    return new Promise((resolve, reject) => {
      img.onload = () => {
        canvas.width = croppedArea.width; 
        canvas.height = croppedArea.height; 
        ctx.save();
        ctx.translate(-croppedArea.x, -croppedArea.y); 
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

        ctx.drawImage(img, 0, 0, img.width, img.height);
        // Extract the cropped portion
        const croppedImageData = canvas.toDataURL("image/jpeg");
        ctx.restore();
        resolve(croppedImageData);
      };

      img.onerror = (err) => reject(err);
    });
  };

  //function to rotate the image
  const handleRotate = () => {
    setRotation((prevRotation) => prevRotation + 90);
  };

  //function to flip the image horizontaly
  const handleFlipHorizontal = () => {
    setFlipHorizontal(!flipHorizontal);
  };

  //function to flip image vertically
  const handleFlipVertical = () => {
    const newFlipVertical = !flipVertical;
    setFlipVertical(newFlipVertical);
  };

  // Save the uploaded image and navigate to the gallery
  const handleSaveImageToList = (imageURL, imageTitle, description) => {
    const newImage = {
      id: Date.now(),
      url: imageURL,
      title: imageTitle,
      description: description,
      date: new Date(),
    };
    setImageList((prevList) => [...prevList, newImage]);
    setDrawerOpen(false);
    navigate("/gallery");
  };

  // function to close the drawer
  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setUploadedImage(null);
    setUploadedImageTitle("");
    setFlipHorizontal(false);
    setFlipVertical(false);
    setIsCropping(false);
    setRotation(0);
  };
  return (
    <div>
      <ImageUploader onUpload={handleImageUpload} />
      <ImageDrawer
        uploadedImage={uploadedImage}
        uploadedImageTitle={uploadedImageTitle}
        drawerOpen={drawerOpen}
        onClose={handleCloseDrawer}
        onReplace={handleReplaceImage}
        handleCropImage={handleCropImage}
        isCropping={isCropping}
        crop={crop}
        setCrop={setCrop}
        zoom={zoom}
        setZoom={setZoom}
        handleCropComplete={handleCropComplete}
        generateCroppedImage={generateCroppedImage}
        setIsCropping={setIsCropping}
        handleRotate={handleRotate}
        rotation={rotation}
        handleFlipHorizontal={handleFlipHorizontal}
        flipHorizontal={flipHorizontal}
        handleFlipVertical={handleFlipVertical}
        flipVertical={flipVertical}
        handleSaveImageToList={handleSaveImageToList}
        description={description}
        setDescription={setDescription}
      />
    </div>
  );
};
export default Home;
