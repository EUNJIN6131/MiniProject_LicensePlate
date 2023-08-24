import * as React from 'react';
import { Box, Typography } from "@mui/material";
import Images from "./Images";
import List from "./List";
import { useState, useEffect } from 'react';

export default function MainSub1() {

  const [recentNum, setRecentNum] = useState(null);

  useEffect(() => {
    // Make an HTTP request to fetch the most recent num from your server
    fetch('/api/recentNum') // Replace with your actual API endpoint
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the fetched num
        setRecentNum(data.recentNum); // Assuming your API response has a property named 'recentNum'
      })
      .catch((error) => {
        console.error('Error fetching recent num:', error);
      });
  }, []); // Run this effect only once when the component mounts

  return (
    <Box sx={{ margin: "20px" }}>
      <Box
        sx={{
          width: '100%',
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-evenly",
          gap: '20px', // Add this gap to create spacing between image and list boxes
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: '100%',
            alignItems: "center",
            justifyContent: "space-evenly"
          }}
        >
          <Box
            sx={{
              width: '100%',
              border: "1px solid rgb(189, 188, 188)",
              paddingBlock: "10px",
              marginBottom: "20px"
            }}
          >
            <Images />
          </Box>
          <Box
            sx={{
              width: '100%',
              maxHeight: '200px', // Set a fixed maximum height
              border: "1px solid rgb(189, 188, 188)",
              paddingBlock: "10px",
            }}
          >
            <List />
          </Box>
        </Box>
        <Box sx={{
          height:"573px",
border: "1px solid rgb(189, 188, 188)",
          display: "flex",
          flexDirection: "column",
          width: '100%',
          alignItems: "center",
          justifyContent: "center",
         
        }}>
         
          <Typography variant="h4">차량번호: {recentNum}</Typography>
      
        </Box>
      </Box>
    </Box>
  );
}
