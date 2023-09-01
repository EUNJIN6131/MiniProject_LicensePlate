import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import PaginationButtons from "./PaginationButtons";
import { API_BASE_URL } from "./api/api-config";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Box, Button, TextField, Snackbar } from "@mui/material";

const columns = [
  { field: "logId", type: "checkbox", headerName: "seq", width: 100, headerAlign: "center", align: "center" },
  { field: "licensePlate", headerName: "차량번호", width: 200, headerAlign: "center", align: "center", editable: true },
  {
    field: "accuracy",
    headerName: "인식률",
    width: 150,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "vehicleImage",
    headerName: "차량 이미지",
    width: 150,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "plateImage",
    headerName: "번호판 이미지",
    width: 150,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "state",
    headerName: "상태",
    width: 150,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "date",
    headerName: "시간",
    width: 250,
    headerAlign: "center",
    align: "center",
  },
];

export default function List({ rows, setRows, updateRows }) {
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 20;
  const [userEditedLicensePlate, setUserEditedLicensePlate] = useState(""); // 추가

  useEffect(() => {
    // rows 상태가 변경될 때마다 재랜더링
  }, [rows]);
  
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const rowsToDisplay = Array.isArray(rows) ? rows.slice(startIndex, endIndex) : [];

  const pageCount = Math.ceil(rows.length / rowsPerPage);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleLicensePlateEdit = (event) => {
    setUserEditedLicensePlate(event.target.value);
    console.log('Edited License Plate:', event.target.value); // Add this line to check the input
  };

  const handleEditClick = () => {
    console.log('Edit button clicked');
    
    const selectedSeqValues = rowSelectionModel.map((rowId) => ({
      logId: rowsToDisplay[rowId - 1].logId,
      licensePlate: rowsToDisplay[rowId - 1].licensePlate,
    }));


    
    if (selectedSeqValues.length === 0) {
      console.error('No rows selected for editing.');
      return;
    }
    
    console.log("Selected Rows:", selectedSeqValues);
    // 수정한 licensePlate 값을 출력합니다.

  
  
    const updatedRows = rows.map((row) => {
      if (selectedSeqValues.includes(row.logId)) {
        return {
          ...row,
          LicensePlate: userEditedLicensePlate, // Apply the edited value
        };
      }
      return row;
    });
  
    const userId = "IruIruIru"; // Set userId arbitrarily for testing
  
    // Prepare the data to be used for the PUT request
    const requestData = {
      data: updatedRows, // Send the updated rows
    };
  
    axios
      .put(`${API_BASE_URL}/main/update/${userId}`, requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("수정 성공.", response.data);
  
        // Update the 'rows' state with the modified data
        setRows(updatedRows);
      })
      .catch((error) => {
        console.error("수정 중 오류 발생", error);
      });
  };


  const handleDeleteClick = () => {
    const selectedSeqValues = rowSelectionModel.map((rowId) => rowsToDisplay[rowId - 1].logId);
  
    // "logId" 속성을 가진 객체 배열 생성
    const jsonData = selectedSeqValues.map((logId) => ({ logId }));
    // const userId = "admin";
    
    axios
      .delete(`${API_BASE_URL}/main/delete/${"IruIruIru"}`, {
        data: jsonData,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("삭제 성공.", response.data);
  
        const updatedRows = rows.filter((row) => !selectedSeqValues.includes(row.logId));
  
        // 필터링된 행으로 'rows' 상태를 업데이트합니다.
        setRows(updatedRows); // 이 부분이 올바르게 작동하는지 확인하세요.
      })
      .catch((error) => {
        console.error("삭제 중 오류 발생", error);
      });
  }
  
  return (
    rows && (
      <div style={{ width: "100%", maxHeight: "100%", height: "100%", overflowY: "auto" }}>
        <DataGrid
          rows={rowsToDisplay}
          columns={columns}
          pageSize={20}
          checkboxSelection={true}
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
          rowSelectionModel={rowSelectionModel}
          components={{
            Pagination: (props) => (
              <PaginationButtons
                {...props}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                pageCount={pageCount}
                onDeleteClick={handleDeleteClick}
                onEditClick={handleEditClick}
              />
            ),
          }}
          key={(row) => row.logId}
        />
      </div>
    )
  );
}
