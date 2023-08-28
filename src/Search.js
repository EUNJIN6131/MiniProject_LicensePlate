import * as React from 'react';
import { Box, Button, TextField, Select, MenuItem } from "@mui/material";
import List from "./List";
import Calendar from "./Calendar";
import { useState, useEffect } from 'react';
import {call} from './api/ApiService';

export default function Search() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [licensePlate, setLicensePlate] = useState("");
  const [rows, setRows] = useState([]);

  const handleLicensePlateChange = (event) => {
    setLicensePlate(event.target.value);
  };

  const handleSearchClick = () => {
    console.log("Button clicked"); // Log before making the API call

    call(`/main/search/plate/0008`, "GET", null)
      .then((data) => {
        console.log('data', data.data[0]); // Log the received data
        let respData = data.data[0]
        data.data[0]["id"] = 1
        setRows([respData]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setSubCategory(''); // Reset sub-category when category changes
  };

  const handleSubCategoryChange = (event) => {
    setSubCategory(event.target.value);
  };
  

  // const rows = [
  //   { id: 1, seq: 1, carNumber: 'AB 1234', inAndOut: '입차', accuracy: 0.95, img: '이미지1', dist: '분류1', time: '2023-08-25 10:00:00' },
  // ];
  

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
          <Box sx={{ margin: '20px', }}>

            <Calendar />

            <Box sx={{ width:'100%', marginTop: '70px' , display: 'flex' ,gap:'15px'}}>
              <Box sx={{ width:'70%',}}>
                <TextField
                  label="차량번호 조회"
                  variant="outlined"
                  fullWidth
                  value={licensePlate}
                  onChange={handleLicensePlateChange}
                />
              </Box>
              <Box sx={{ width:'30%',marginTop: '10px' ,}}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSearchClick()}
                  sx={{
                    width: '100%',
                    border: '1px solid black',
                    backgroundColor: '#DDDDDD',
                    color: 'black',
                    '&:hover': {
                      backgroundColor: '#CCCCCC',
                    },
                  }}
                >
                  조회하기
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box sx={{
          flex: '1',
          width: '70%',
          height: '100vh',
          border: "1px solid rgb(189, 188, 188)",
          paddingBlock: "10px",
        }}>
           <List isAdmin={isAdmin} rows={rows}/>
        </Box>
      </Box>
    </Box>
  );
}
