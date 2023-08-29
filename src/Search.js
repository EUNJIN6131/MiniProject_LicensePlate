import * as React from 'react';
import { Box, Button, TextField, Select, MenuItem, Snackbar } from "@mui/material";
import List from "./List";
import Calendar from "./Calendar";
import { useState, useEffect } from 'react';
import { call } from './api/ApiService';
import axios from 'axios';
import { format, parseISO, parse } from 'date-fns';

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

  const handleQuerySubmit = (startDate, endDate) => {
    // Ensure that both start and end dates are selected
    if (!startDate || !endDate) {
        // Handle error, show a message to the user, etc.
        return;
    }

    // Format the dates using date-fns
    const formattedStartDate = format(startDate, 'yyyy-MM-dd HH:mm:ss');
    const formattedEndDate = format(endDate, 'yyyy-MM-dd HH:mm:ss');

    // Make an API call to your backend using Axios
    axios
        .get(`/main/search/date?startDate=${formattedStartDate}&endDate=${formattedEndDate}`)
        .then((response) => {
            // Assuming your backend returns data as an array of records
            const records = response.data;

            // Update the state variable with the retrieved records
            setRows(records);
        })
        .catch((error) => {
            // Handle API error, show an error message, etc.
            console.error("Error fetching data:", error);
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
              onQuerySubmit={handleQuerySubmit} />


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
          <List  rows={rows} />
        </Box>
      </Box>
    </Box>
  );
}
