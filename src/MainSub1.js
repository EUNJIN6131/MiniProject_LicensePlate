import * as React from 'react';
import { Box, Typography } from "@mui/material";
import Images from "./Images";
import List from "./List";
import { useState, useEffect } from 'react';

export default function MainSub1() {

  const [recentNum, setRecentNum] = useState(null);

  useEffect(() => {

    fetch('/api/recentNum')
      .then((response) => response.json())
      .then((data) => {

        setRecentNum(data.recentNum);
      })
      .catch((error) => {
        console.error('Error fetching recent num:', error);
      });
  }, []);

  return (
    <Box sx={{ margin: "20px" }}>
      <Box
        sx={{
          width: '100%',
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          // justifyContent: "space-evenly",
          gap: '20px',
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
              height: '400px', // Set a fixed height for the parent container
              border: "1px solid rgb(189, 188, 188)",
              paddingBlock: "10px",
            }}
          >
            <List />
          </Box>
        </Box>

        <Box sx={{
          height: "772px",
          border: "1px solid rgb(189, 188, 188)",
          display: "flex",
          flexDirection: "column",
          width: '1500px',
          alignItems: "center",
          justifyContent: "center",

        }}>

          <Typography variant="h4">차량번호: {recentNum}</Typography>

        </Box>
      </Box>
    </Box>
  );
}
