import * as React from 'react';
import { Box, Button, TextField, Select, MenuItem } from "@mui/material";
import List from "./List";
import Calendar from "./Calendar";
import { useState, useEffect } from 'react';


export default function Search() {

  const [licensePlate, setLicensePlate] = useState("");

  const handleLicensePlateChange = (event) => {
    setLicensePlate(event.target.value);
  };

  const handleSearchClick = () => {
    // 여기에서 차량번호판 조회 로직을 추가하세요.
    // licensePlate 상태 변수에 입력된 차량번호를 사용할 수 있습니다.
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
                  onClick={handleSearchClick}
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

            {/* <Box sx={{ marginTop: '60px' }}>
              <Select
                value={category}
                onChange={handleCategoryChange}
                label="Category"
                fullWidth
              >
                <MenuItem value="dog">Dog</MenuItem>
                <MenuItem value="cat">Cat</MenuItem>
              </Select>
            </Box>

            
            <Box sx={{ marginTop: '20px' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSearchClick}
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
            </Box> */}


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
