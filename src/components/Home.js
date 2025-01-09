import React, { useState } from "react";
import ImageUploader from "./ImageUploader";
import ImageDrawer from "./ImageDrawer";

const Home = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [uploadedImageTitle, setUploadedImageTitle] = useState("");

  const [rotation, setRotation] = useState(0);
  const [flipHorizontal, setFlipHorizontal] = useState(false);
  const [flipVertical, setFlipVertical] = useState(false);

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
    setRotation(0);
  };

  //function to crop the image
  const handleCropImage = async () => {};

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

  // function to close the drawer
  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setUploadedImage(null);
    setUploadedImageTitle("");
    setFlipHorizontal(false);
    setFlipVertical(false);
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
        handleRotate={handleRotate}
        rotation={rotation}
        handleFlipHorizontal={handleFlipHorizontal}
        flipHorizontal={flipHorizontal}
        handleFlipVertical={handleFlipVertical}
        flipVertical={flipVertical}
      />
    </div>
  );
};
export default Home;
