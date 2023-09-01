import * as React from 'react';
import { Box, Typography } from "@mui/material";
import Images from "./Images";
import List from "./List";
import { useState, useEffect } from 'react';
import axios from "axios";
import { call } from "./api/ApiService";

export default function Record() {

  const [recentNum, setRecentNum] = useState(null);

  // const [records, setRecords] = useState([]); // State to store the list of records

  // useEffect(() => {
  
  //   axios.post('/main/record') 
  //     .then((response) => {
  //       setRecords(response.data.records);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching records:', error);
  //     });
      
  // }, []);

  return (
    <Box sx={{ margin: "20px" }}>
      <Box
        sx={{
          height: '100vh',
          width: '100%',
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          alignItems: "stretch",
          justifyContent:"space-between",
          gap: '20px',
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: '65%',
            height: '100vh',
            alignItems: "center",
            justifyContent:"space-between",
            
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '40vh',
              border: "1px solid rgb(189, 188, 188)",
            }}
          >
            <Images />
          </Box>
          <Box
            sx={{
              width: '100%',
              height: '55vh',
              border: "1px solid rgb(189, 188, 188)",
            }}
          >
            {/* <List rows={records} />/// */}
            <List />
          </Box>
        </Box>

        <Box sx={{
          height: '100vh',
          width: '35%',
          border: "1px solid rgb(189, 188, 188)",
          display: "flex",
        }}>

          <Typography variant="h4">차량번호: {recentNum}</Typography>

        </Box>
      </Box>
    </Box>

  );
}
