import React, { useState } from "react";
import ImageUploader from "./ImageUploader";

const Home = () =>{
    const [uploadedImage, setUploadedImage] = useState(null);
    const [imageList, setImageList] = useState([]);
    const [drawerOpen, setDrawerOpen] = useState(false);
  
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
          const imageURL = URL.createObjectURL(file);
          setUploadedImage(imageURL);
          setImageList((prevList) => [...prevList, imageURL]); 
          setDrawerOpen(true);
        }
    };
    return(
        <div>
            <ImageUploader onUpload={handleImageUpload}/>
        </div>
    )
}
export default Home;