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
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          gap: '20px',
        }}
      >
        <Box sx={{
          width: '30%', // Set this to 70% or any other percentage you desire
          height: '700px',
          border: "1px solid rgb(189, 188, 188)",
          paddingBlock: "10px",
        }}>
          <Calendar />
        </Box>

        <Box sx={{
          flex: '1',
          width: '70%', // Set this to 30% or any other percentage you desire
          height: '700px',
          border: "1px solid rgb(189, 188, 188)",
          paddingBlock: "10px",
        }}>
          <List />
        </Box>
      </Box>
    </Box>
  );
}
