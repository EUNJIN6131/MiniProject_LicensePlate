import * as React from 'react';
import { Box, Typography } from "@mui/material";
import Images from "./Images";
import List from "./List";
import { useState, useEffect } from 'react';
import axios from "axios";
import { API_BASE_URL } from "./api/api-config";


export default function Record() {

  const [imageUpload, setImageUpload] = useState([]);
  const [recentNum, setRecentNum] = useState(null);
  const [imageQueue, setImageQueue] = useState([]);

  // useEffect(() => {
  //   showRecord()
  // }, []);


  // 3.차량 출입 로그 기록
  const showRecord = async (imageSrc) => {
    console.log("Enter the car");
    console.log("Image source received:", imageSrc);

    // 이미지 경로를 FormData에 추가
    const formData = new FormData();

    formData.append("file", imageSrc);
    // for (let i = 0; i < imageSrc.length; i++) {
    //   formData.append("files", imageSrc[i]);
    // }

    try {
      const response = await axios.post(`${API_BASE_URL}/main/record`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const data = response.data;
      console.log("Data", data);
    } catch (error) {
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up the request:", error.message);
      }
    }
  };

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
          justifyContent: "space-between",
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
            justifyContent: "space-between",

          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '50vh',
              border: "1px solid rgb(189, 188, 188)",
            }}
          >
            <Images setImageUpload={setImageUpload} showRecord={showRecord} />
          </Box>
          <Box
            sx={{
              width: '100%',
              height: '45vh',
              border: "1px solid rgb(189, 188, 188)",
            }}
          >
            {/* <List rows={records} />/// */}
            {/* <List /> */}
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
