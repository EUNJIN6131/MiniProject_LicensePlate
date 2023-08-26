import * as React from 'react';
import { Box } from "@mui/material";
import List from "./List";
import Calendar from "./Calendar";
import { useState, useEffect } from 'react';

export default function Search() {
  return (
    <Box sx={{ margin: "20px" }}>
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          gap: '20px',
        }}
      >
        <Box sx={{
          width: '30%', 
          height: '100vh',
          border: "1px solid rgb(189, 188, 188)",
          paddingBlock: "10px",
        }}>
            <Box sx={{margin:'20px'}}>
          <Calendar />
          </Box>
        </Box>

        <Box sx={{
          flex: '1',
          width: '70%', 
          height: '100vh',
          border: "1px solid rgb(189, 188, 188)",
          paddingBlock: "10px",
        }}>
          <List />
        </Box>
      </Box>
    </Box>
  );
}
