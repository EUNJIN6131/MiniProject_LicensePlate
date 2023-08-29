import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import PaginationButtons from './PaginationButtons';
import { API_BASE_URL } from "./api/api-config";
import axios from "axios";
import { call } from "./api/ApiService";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Box, Button, TextField, Select, MenuItem, Snackbar } from "@mui/material";

const columns = [

  { field: 'logId', type: 'checkbox', headerName: 'seq', width: 100, headerAlign: 'center', align: 'center' },
  { field: 'licensePlate', headerName: '차량번호', width: 200, headerAlign: 'center', align: 'center', editable: true},
  {
    field: 'date',
    headerName: '시간',
    width: 250,
    headerAlign: 'center',
    align: 'center',
  },

  {
    field: 'accuracy',
    headerName: '인식률',
    width: 150,
    headerAlign: 'center',
    align: 'center',
    // valueFormatter: (params) => (params.value !== null ? params.value.toFixed(2) : ''),
  },
  {
    field: 'originalImage',
    headerName: '이미지',
    width: 150,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'predictedImage',
    headerName: '이미지',
    width: 150,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'isPresent',
    headerName: '차량 기등록',
    width: 150,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'isUpdated',
    headerName: '수정',
    width: 100,
    headerAlign: 'center',
    align: 'center',
  },

];

// const rows = [
//   { id: 1, seq: 1, carNumber: 'AB 1234', accuracy: 0.95, img: '이미지1',  registration: '차량 기등록', edit: '분류1', time: '2023-08-25 10:00:00' },
// ];

export default function List({ isAdmin , rows = []}) {
  useEffect(() => {
    console.log("rows", rows);
  }, [rows]);
  
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 20;

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const rowsToDisplay = Array.isArray(rows) ? rows.slice(startIndex, endIndex) : [];



  const pageCount = Math.ceil(rows.length / rowsPerPage);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };
  
 
  const [selectedRows, setSelectedRows] = React.useState([]); // 선택한 행을 추적하는 상태
  const [editPopup, setEditPopup] = React.useState(false);
  const [deletePopup, setDeletePopup] = React.useState(false);

  

  const handleCloseEditPopup = () => {
    setEditPopup(false);
  };

  const handleCloseDeletePopup = () => {
    setDeletePopup(false);
  };

  const [selectedRowIds, setSelectedRowIds] = useState([]);

  // DataGrid에서 행 선택 상태 변경 시 호출될 콜백 함수
  const handleRowSelectionChange = (newSelection) => {
    setSelectedRowIds(newSelection.selectionModel);
  };

   const handleEditClick = () => {
    if (selectedRowIds.length === 0) {
      // 선택한 행이 없으면 아무것도 하지 않습니다.
      return;
    }

    // 선택한 행의 데이터를 기반으로 수정 API 호출을 수행합니다.
    // selectedRowIds 배열에 있는 행의 ID를 사용하여 API 호출 등을 수행합니다.

    selectedRowIds.forEach((selectedRowId) => {
      // 수정 대상 로그의 ID를 찾습니다.
      const selectedRow = rows.find((row) => row.id === selectedRowId);
      if (selectedRow) {
        // 차량 번호 수정 API 호출 예시
        const logId = selectedRow.logId;
        const updatedLicensePlate = selectedRow.licensePlate;

        axios
          .put(`${API_BASE_URL}/main/update/${logId}`, { licensePlate: updatedLicensePlate })
          .then((response) => {
            // 수정이 성공하면 메시지를 보여줍니다.
            console.log('수정이 성공했습니다.');
          })
          .catch((error) => {
            // 수정 중 오류가 발생하면 에러 메시지를 보여줍니다.
            console.error('수정 중 오류가 발생했습니다.', error);
          });
      }
    });
  };

  const handleDeleteClick = () => {
    if (selectedRows.length === 0) {
      // 선택한 행이 없으면 아무것도 하지 않습니다.
      return;
    }

    // 선택한 행의 데이터를 기반으로 삭제 API 호출을 수행합니다.
    // selectedRows 배열에 있는 행의 데이터를 사용하여 API 호출 등을 수행합니다.

    // 예를 들어, API_BASE_URL을 기반으로 삭제 API를 호출하는 방법은 다음과 같을 수 있습니다.
    const logIdsToDelete = selectedRows.map((selectedRow) => selectedRow.logId);
    axios
      .delete(`${API_BASE_URL}/main/delete`, { data: logIdsToDelete })
      .then((response) => {
        // 삭제가 성공하면 메시지를 보여줍니다.
        console.log('삭제가 성공했습니다.');
      })
      .catch((error) => {
        // 삭제 중 오류가 발생하면 에러 메시지를 보여줍니다.
        console.error('삭제 중 오류가 발생했습니다.', error);
      });
  };

  
  return (
    rows &&
    <div style={{ width: '100%', maxHeight: '100%', height: '100%', overflowY: 'auto' }}>
      
      <DataGrid
        rows={rowsToDisplay}
        columns={columns}
        pageSize={20}
        checkboxSelection
        onSelectionModelChange={handleRowSelectionChange}
        components={{
          Pagination: (props) => (
            <PaginationButtons
              {...props}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              pageCount={pageCount} 
              isAdmin={isAdmin}
              onEditClick={handleEditClick} // 수정 버튼 클릭 핸들러 전달
                onDeleteClick={handleDeleteClick} // 삭제 버튼 클릭 핸들러 전달

            />
            
          ),
        }}
      />
    </div>
  );
}