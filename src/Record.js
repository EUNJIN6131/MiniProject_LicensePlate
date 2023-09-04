import * as React from 'react';
import { Box, Typography } from "@mui/material";
import Images from "./Images";
import List from "./List";
import { useState, useEffect } from 'react';
import axios from "axios";
import { call } from "./api/ApiService";
export default function Record() {

  const [imageUpload, setImageUpload] = useState([]);
  const [recentNum, setRecentNum] = useState(null);

  // 3.차량 출입 로그 기록
  const showRecord = async () => {
    console.log("enter the car")
    const formData = new FormData();

    console.log("imageUpload content:", imageUpload);

    for (let i = 0; i < imageUpload.length; i++) {

      const file = imageUpload[i];
      formData.append("file", file);

      console.log("File appended:", formData.get("file")); // Step 2
      
      call(`/main/record`, "POST", formData)
        .then((response) => {
          const data = response.data;
          console.log("data", data);
        })
        .catch((error) => {
          console.error("이미지 가져오기 오류:", error);
        });
    } 
  };

        // const responseData = data.data;
        // if (Array.isArray(responseData)) {
        //   const updatedRows = responseData.map((img, index) => {
        //     return { ...img, id: index + 1,};         // 새 객체 생성, ... <- 확산 연산자
        //   });
        //   setImageUpload(updatedRows);
        // } else {
        //   console.error("이미지가 없습니다:", responseData.data);
        // }
  // };

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
              height: '40vh',
              border: "1px solid rgb(189, 188, 188)",
            }}
          >
            <Images setImageUpload={setImageUpload} showRecord={showRecord} />
          </Box>
          <Box
            sx={{
              width: '100%',
              height: '55vh',
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
