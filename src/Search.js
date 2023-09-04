import * as React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import List from "./List";
import Calendar from "./Calendar";
import EditLog from "./EditLog";
import AlertNothing from "./alert/AlertNothing";
import { useState, useEffect } from "react";
import { call } from "./api/ApiService";
import { format, parseISO, } from "date-fns";
import dayjs from 'dayjs';

export default function Search({selectedTab}) {
  const [isAdmin, setIsAdmin] = useState(false);                    // 관리자 여부
  const [licensePlate, setLicensePlate] = useState("");             // 차량번호 입력 저장
  const [rows, setRows] = useState([]);                             // 레코드(행) 목록
  const [open, setOpen] = useState(false);                          // 검색결과 유무 팝업상태

  const [startDate, setStartDate] = useState(null);                 // 시작날짜
  const [endDate, setEndDate] = useState(null);                     // 종료날짜
  const [isEnterPressed, setIsEnterPressed] = useState(false);      // 엔터키 동작
  const [resetDateRange, setResetDateRange] = useState(true);
  const [calendarLoaded, setCalendarLoaded] = useState(false);

  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [historyRows, setHistoryRows] = useState([]);

  useEffect(() => {
    fetchEditHistory()
  }, []);

  // useEffect(() => {
  //   if (selectedTab === 2) {
  //     const today = dayjs();
  //     setStartDate(today);
  //     setEndDate(today);
  //     onQuerySubmit(today, today);
  //   }
  // }, [selectedTab]);

  useEffect(() => {
    if (selectedTab === 2) {
      const today = dayjs();
      if (resetDateRange) {
        // Reset to today's date
        setStartDate(today);
        setEndDate(today);
      }
      onQuerySubmit(startDate, endDate);
      setResetDateRange(false); // Toggle the reset flag
    } else {
      setResetDateRange(true); // Reset the flag when switching to other tabs
    }
  }, [selectedTab, startDate, endDate, resetDateRange]);

  // 3.차량 번호별 로그 조회
  const handleSearchClick = (licensePlate) => {
    console.log("Button clicked");

    call(`/main/search/plate/${licensePlate}`, "GET", null)
      .then((data) => {
        console.log("data", data.data);
        const responseData = data.data;

        if (responseData.length > 0) {
          const updatedRows = responseData.map((record, index) => {
            const formattedDate = format(parseISO(record.date), "yyyy-MM-dd HH:mm:ss");
            return { ...record, id: index + 1, date: formattedDate };           // 새 객체 생성, ... <- 확산 연산자
          });
          setRows(updatedRows);
        } else {
          setOpen(true);
          setRows([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // 4.날짜별 로그 조회
  const onQuerySubmit = async (startDate, endDate) => {
    console.log("Received startDate:", startDate);
    console.log("Received endDate:", endDate);

    const jsStartDate = startDate.toDate();
    const jsEndDate = endDate.toDate();

    const formattedStartDate = format(jsStartDate, "yyyy-MM-dd");
    const formattedEndDate = format(jsEndDate, "yyyy-MM-dd");

    console.log("Formatted startDate:", formattedStartDate);
    console.log("Formatted endDate:", formattedEndDate);

    call(`/main/search/date/${formattedStartDate}/${formattedEndDate}`, "GET", null)
      .then((data) => {
        console.log("data", data);
        const responseData = data.data;

        if (Array.isArray(responseData)) {
          const updatedRows = responseData.map((record, index) => {
            const formattedDate = format(parseISO(record.date), "yyyy-MM-dd HH:mm:ss");
            return { ...record, id: index + 1, date: formattedDate };         // 새 객체 생성, ... <- 확산 연산자
          });
          setRows(updatedRows);
        } else {
          console.error("데이터가 배열이 아닙니다:", responseData.data);
          setOpen(true);
        }
      })
      .catch((error) => {
        console.error("데이터 가져오기 오류:", error);
      });
  };

  //6.수정/삭제 기록 조회
  const fetchEditHistory = () => {
    console.log("Button clicked");

    call(`/main/history`, "GET", null)
      .then((data) => {
        console.log("data", data.data);
        const responseData = data.data;

        if (Array.isArray(responseData)) {
          const updatedRows = responseData.map((record, index) => {
            const formattedDate = format(parseISO(record.date), "yyyy-MM-dd HH:mm:ss");
            return { ...record, id: index + 1, date: formattedDate };         // 새 객체 생성, ... <- 확산 연산자
          });
          setHistoryRows(updatedRows)
        } else {
          console.error("데이터가 배열이 아닙니다:", responseData.data);
        }
      })
      .catch((error) => {
        console.error("데이터 가져오기 오류:", error);
      });
  };

  const handleLicensePlateChange = (event) => {
    setLicensePlate(event.target.value);
  };

  const handleCloseNoRecordsPopup = () => {
    setOpen(false);
  };

  const onDateChange = (newStartDate, newEndDate) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
    onQuerySubmit(newStartDate, newEndDate);
  };

  return (
    <Box sx={{ margin: "20px" }}>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          gap: "20px",
        }}
      >
        <Box
          sx={{
            width: "30%",
            height: "100vh",
            border: "1px solid rgb(189, 188, 188)",
            paddingBlock: "10px",
          }}
        >
          <Box sx={{ margin: "20px" }}>
            <Calendar
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              onQuerySubmit={onQuerySubmit}
              setRows={setRows}
              onDateChange={onDateChange}
            />

            <Box sx={{ width: "100%", marginTop: "55px", display: "flex", gap: "15px", justifyContent: "center", alignItems: "center" }}>
              <Box sx={{ width: "70%" }}>
                <TextField
                  label="차량번호 조회"
                  variant="outlined"
                  fullWidth
                  value={licensePlate}
                  onChange={handleLicensePlateChange}
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      setIsEnterPressed(true);
                      handleSearchClick(licensePlate);
                    }
                  }}
                />
              </Box>
              <Box sx={{ width: "30%", marginTop: "10px" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSearchClick(licensePlate)}
                  sx={{
                    width: "100%",
                    border: "1px solid black",
                    backgroundColor: isEnterPressed ? "#CCCCCC" : "#DDDDDD",
                    color: "black",
                    "&:hover": {
                      backgroundColor: "#CCCCCC",
                    },
                  }}
                >
                  조회하기
                </Button>
              </Box>
            </Box>
            <AlertNothing severity="error" open={open}
              setOpen={setOpen}
              text={"조회된 차량이 없습니다."} />
            <Box
              sx={{
                width: "100%",
                display: "flex",
                marginTop: "35px",
                flexDirection: "column"
                // border: "1px solid rgb(189, 188, 188)",
              }}
            >
              <Typography variant="수정/삭제 조회" sx={{ marginBottom: "10px", textAlign: "left" }}>
                수정/삭제 조회
              </Typography>

              <Box sx={{
                width: "100%",
                display: "flex",
                border: "1px solid rgb(189, 188, 188)",
              }}>
                <EditLog
                  sx={{
                    width: "100%",
                    height: "50vh",
                    display: "flex",
                    border: "1px solid rgb(189, 188, 188)",
                    alignItems: "center",
                  }}
                  historyRows={historyRows}
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            flex: "1",
            width: "70%",
            height: "100vh",
            border: "1px solid rgb(189, 188, 188)",
            paddingBlock: "10px",
          }}
        >
          {/* <List isAdmin={isAdmin} rows={rows} /> */}
          <List setRows={setRows} rows={rows}
            rowSelectionModel={rowSelectionModel} setRowSelectionModel={setRowSelectionModel}
            fetchEditHistory={fetchEditHistory}
          />
        </Box>
      </Box>
    </Box>
  );
}
