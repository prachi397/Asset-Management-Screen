import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Gallery from "./components/Gallery";
import Home from "./components/Home";

const App = () => {
  const [imageList, setImageList] = useState([]); 

  return (
      <Routes>
        <Route path="/" element={<Home setImageList={setImageList} imageList={imageList} />} />
        <Route path="/gallery" element={<Gallery imageList={imageList} />} />
      </Routes>
  );
};

export default App;
