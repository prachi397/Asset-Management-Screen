import React, { useState } from "react";
import Masonry from "@mui/lab/Masonry";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const Gallery = ({ imageList }) => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("newest");

  //filter the images based on date and description
  const filteredImages = imageList
    .filter(
      (image) =>
        image.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        image.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (filter === "newest") {
        return b.date - a.date;
      }
      if (filter === "oldest") {
        return a.date - b.date;
      }
      if (filter === "az") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  function handleAddMore() {
    navigate("/");
  }

  return (
    <Box sx={{ padding: "20px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <Box sx={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
          <TextField
            label="Search Assets by description"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            sx={{ maxWidth: "300px" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton onClick={() => {}} aria-label="search">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Filter</InputLabel>
            <Select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              label="Filter"
              sx={{ width: 150 }}
            >
              <MenuItem value="newest">Newest First</MenuItem>
              <MenuItem value="oldest">Oldest First</MenuItem>
              <MenuItem value="az">A-Z</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Button
          sx={{ backgroundColor: "#334D6E", cursor: "pointer" }}
          variant="contained"
          startIcon={<AddIcon />}
          component="label"
          onClick={handleAddMore}
        >
          Add
        </Button>
      </Box>

      <Masonry columns={{ xs: 2, sm: 3, md: 4 }} spacing={2}>
        {filteredImages.map((image) => (
          <Box key={image.id} sx={{ borderRadius: "8px", overflow: "hidden" }}>
            <img
              src={image.url}
              alt={image.title || "Uploaded Image"}
              style={{
                width: "100%",
                display: "block",
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />
          </Box>
        ))}
      </Masonry>
    </Box>
  );
};

export default Gallery;
