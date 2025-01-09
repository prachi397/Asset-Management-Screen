import React, { useState } from "react";
import ImageUploader from "./ImageUploader";
import ImageDrawer from "./ImageDrawer";

const Home = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [uploadedImageTitle, setUploadedImageTitle] = useState("");

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

  // function to close the drawer
  const handleCloseDrawer = () => {
    setDrawerOpen(false); 
    setUploadedImage(null); 
    setUploadedImageTitle(""); 
  };

  return (
    <div>
      <ImageUploader onUpload={handleImageUpload} />
      <ImageDrawer
        uploadedImage={uploadedImage}
        drawerOpen={drawerOpen}
        uploadedImageTitle={uploadedImageTitle}
        onClose={handleCloseDrawer}
      />
    </div>
  );
};
export default Home;
