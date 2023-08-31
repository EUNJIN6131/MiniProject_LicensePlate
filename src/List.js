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
  { field: 'licensePlate', headerName: '차량번호', width: 200, headerAlign: 'center', align: 'center', editable: true },
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

export default function List({ isAdmin, rows = [] }) {
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


  const [selectedRows, setSelectedRows] = useState([]);

  const [editPopup, setEditPopup] = React.useState(false);
  const [deletePopup, setDeletePopup] = React.useState(false);
  const [editingLicense, setEditingLicense] = useState({ logId: null, value: '' });


  const handleCloseEditPopup = () => {
    setEditPopup(false);
  };

  const handleCloseDeletePopup = () => {
    setDeletePopup(false);
  };



  const handleRowSelectionChange = (newSelection) => {
    setSelectedRows(newSelection.selectionModel);
  };


const [licensePlate, setLicensePlate] = useState('');
const [submittedPlate, setsubmittedPlate] = useState('');
const [userEditedLicensePlate, setUserEditedLicensePlate] = useState('');

console.log('selectedRows:', selectedRows);



const handleEditClick = () => {
  // Validate user input (license plate)
  if (!userEditedLicensePlate.trim()) {
    console.error('Invalid user input for license plate.');
    // You can show an error message to the user here if needed.
    return;
  }

  // Extract data to modify (license plate fields only)
  const updatedData = rows.map((row) => {
    if (selectedRows.includes(row.logId)) {
      return {
        ...row,
        licensePlate: userEditedLicensePlate, // Replaced with user input value
      };
    }
    return row;
  });

  console.log('updatedData:', updatedData);

  // Manually set userId to 'admin' for testing
  const jsonData = {
    userId: 'admin',
    data: updatedData,
  };

  axios
    .put(`${API_BASE_URL}/main/update`, jsonData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      console.log('Modification successful', response.data);
      // Success processing
    })
    .catch((error) => {
      console.error('Error editing', error);
      // Handle the error response from the server
      if (error.response && error.response.data) {
        console.error('Server error details:', error.response.data);
        // You can show an error message to the user here if needed.
      }
    });
};

const handleDeleteClick = () => {
  // Extract selected log IDs
  const logIds = selectedRows.map((row) => row.logId);

  // Manually set userId to 'admin' for testing
  const jsonData = {
    userId: 'admin',
    logIds: logIds,
  };

  axios
    .delete(`${API_BASE_URL}/main/delete`, {
      data: jsonData,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      console.log('Delete successful.', response.data);
      // Process deletion success
    })
    .catch((error) => {
      console.error('An error occurred while deleting', error);
      // error handling
    });
};

  return (
    rows &&
    <div style={{ width: '100%', maxHeight: '100%', height: '100%', overflowY: 'auto' }}>

<DataGrid
  rows={rowsToDisplay}
  columns={columns}
  pageSize={20}
  checkboxSelection={true}
  onSelectionModelChange={handleRowSelectionChange}
  onEditCellChange={(params) => {
    const { id, field, value } = params;
    console.log('Edit cell change - ID:', id, 'Field:', field, 'Value:', value);

    // Update the userEditedLicensePlate state with the edited value
    setUserEditedLicensePlate(value);
  }}
  components={{
    Pagination: (props) => (
      <PaginationButtons
        {...props}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        pageCount={pageCount}
        isAdmin={isAdmin}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />
    ),
  }}
/>
    </div>
  );
}
