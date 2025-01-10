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

  const handleCropComplete = () => {};
  const generateCroppedImage = () => {};

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
    setFlipVertical(!flipVertical);
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
        croppedArea={croppedArea}
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
