import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import PaginationButtons from './PaginationButtons';
import { API_BASE_URL } from "./api/api-config";
import axios from "axios";
import { useEffect } from 'react';
import { call } from "./api/ApiService";

const columns = [

  { field: 'logId', type: 'checkbox', headerName: 'seq', width: 100, headerAlign: 'center', align: 'center' },
  { field: 'licensePlate', headerName: '차량번호', width: 200, headerAlign: 'center', align: 'center',},
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

export default function List({ isAdmin ,rows}) {
  useEffect(() => {
    console.log("rows", rows);
  }, [rows]);
  
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 20;

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const rowsToDisplay = rows.slice(startIndex, endIndex);

  const pageCount = Math.ceil(rows.length / rowsPerPage);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };
  
  
  

  return (
    rows &&
    <div style={{ width: '100%', maxHeight: '100%', height: '100%', overflowY: 'auto' }}>
      <DataGrid
        rows={rowsToDisplay}
        columns={columns}
        pageSize={20}
        checkboxSelection
        components={{
          Pagination: (props) => (
            <PaginationButtons
              {...props}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              pageCount={pageCount} 
              isAdmin={isAdmin}
            />
          ),
        }}
      />
    </div>
  );
}