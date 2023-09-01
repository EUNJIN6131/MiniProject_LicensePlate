import * as React from 'react';
import { Box, Button, TextField, Select, MenuItem, Snackbar } from "@mui/material";
import List from "./List";
import Calendar from "./Calendar";
import { useState, useEffect } from 'react';
import { call } from './api/ApiService';
import axios from 'axios';
import { format, parseISO, parse } from 'date-fns';
import { API_BASE_URL } from "./api/api-config";

export default function Search() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [licensePlate, setLicensePlate] = useState("");
  const [rows, setRows] = useState([]);
  const [noRecordsPopup, setNoRecordsPopup] = useState(false);

  const handleLicensePlateChange = (event) => {
    setLicensePlate(event.target.value);
  };


  //   useEffect(() => {
  //     fetchInitialList(); // Fetch initial list when the component mounts
  //   }, []);

  //   const fetchInitialList = (date) => {
  //     // Fetch and set the initial list
  //     // For example, fetch the list of all records here
  //     // Replace this with your actual API call to fetch the initial list
  //     call(`/main/search/date/${start}&${end}`, "GET", null)
  //     .then((data) => {
  //       console.log('data', data.data); // Log the received data
  //       const responseData = data.data;

  //       if (responseData.length > 0) {
  //         const updatedRows = responseData.map((record, index) => {
  //           // Adding an ID to each record to make them unique
  //           return { ...record, id: index + 1 };
  //         });

  //         setRows(updatedRows);
  //       } else {
  //         setNoRecordsPopup(true);
  //         setRows([]);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // };


  const handleSearchClick = (licensePlate) => {
    console.log("Button clicked");

    call(`/main/search/plate/${licensePlate}`, "GET", null)
      .then((data) => {
        console.log('data', data.data); // Log the received data
        const responseData = data.data;

        if (responseData.length > 0) {
          const updatedRows = responseData.map((record, index) => {
            // Adding an ID to each record to make them unique
            const formattedDate = format(parseISO(record.date), 'yyyy-MM-dd HH:mm:ss');
            return { ...record, id: index + 1, date: formattedDate };
          });

          setRows(updatedRows);
        } else {
          setNoRecordsPopup(true);
          setRows([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const onQuerySubmit = async (startDate, endDate) => {
    console.log("Received startDate:", startDate);
    console.log("Received endDate:", endDate);
  
    // Convert dayjs objects to JavaScript Date objects
    const jsStartDate = startDate.toDate();
    const jsEndDate = endDate.toDate();
  
    // Format the dates using date-fns
    const formattedStartDate = format(jsStartDate, 'yyyy-MM-dd');
    const formattedEndDate = format(jsEndDate, 'yyyy-MM-dd');
  
    console.log("Formatted startDate:", formattedStartDate);
    console.log("Formatted endDate:", formattedEndDate);
  
    call(`/main/search/date/${formattedStartDate}/${formattedEndDate}`, "GET", null)
    .then((data) => {
      console.log('data', data); 
      const responseData = data.data; 
  
      
      if (Array.isArray(responseData)) {
        const updatedRows = responseData.map((record, index) => {
         
          const formattedDate = format(parseISO(record.date), 'yyyy-MM-dd HH:mm:ss');
          return { ...record, id: index + 1, date: formattedDate };
        });
  
        
        setRows(updatedRows);
      } else {
        
        console.error("데이터가 배열이 아닙니다:", responseData.data);
       
      }
    })
    .catch((error) => {
      console.error("데이터 가져오기 오류:", error);
    });
    
  };
  


  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [isEnterPressed, setIsEnterPressed] = useState(false);
  const [dateRange, setDateRange] = React.useState([null, null]);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setSubCategory(''); // Reset sub-category when category changes
  };

  const handleSubCategoryChange = (event) => {
    setSubCategory(event.target.value);
  };

  const handleCloseNoRecordsPopup = () => {
    setNoRecordsPopup(false);
  };

  const updateRows = (newRows) => {
    setRows(newRows);
  };

  const onDateChange = (newStartDate, newEndDate) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
    // 여기서 onQuerySubmit을 호출하여 데이터를 가져옵니다.
    onQuerySubmit(newStartDate, newEndDate);
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

            <Calendar  
               startDate={startDate}
               endDate={endDate}
               setStartDate={setStartDate}
               setEndDate={setEndDate}
               onQuerySubmit={onQuerySubmit}
               setRows={setRows} 
               onDateChange={onDateChange} 
             />


            <Box sx={{ width: '100%', marginTop: '70px', display: 'flex', gap: '15px' }}>
              <Box sx={{ width: '70%', }}>
                <TextField
                  label="차량번호 조회"
                  variant="outlined"
                  fullWidth
                  value={licensePlate}
                  onChange={handleLicensePlateChange}
                  onKeyPress={(event) => {
                    if (event.key === 'Enter') {
                      setIsEnterPressed(true);
                      handleSearchClick(licensePlate);
                    }
                  }}
                />
              </Box>
              <Box sx={{ width: '30%', marginTop: '10px', }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSearchClick(licensePlate)}
                  sx={{
                    width: '100%',
                    border: '1px solid black',
                    backgroundColor: isEnterPressed ? '#CCCCCC' : '#DDDDDD',
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
            <Snackbar
              open={noRecordsPopup}
              autoHideDuration={1000}
              onClose={handleCloseNoRecordsPopup}
              message="조회된 차량이 없습니다."
              sx={{ marginBottom: '360px' }}
            />
          </Box>
        </Box>
        <Box sx={{
          flex: '1',
          width: '70%',
          height: '100vh',
          border: "1px solid rgb(189, 188, 188)",
          paddingBlock: "10px",
        }}>
          {/* <List isAdmin={isAdmin} rows={rows} /> */}
          <List  setRows={setRows} rows={rows} />
        </Box>
      </Box>
    </Box>
  );
}
