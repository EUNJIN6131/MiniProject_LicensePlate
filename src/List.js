import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import PaginationButtons from "./PaginationButtons";
import { API_BASE_URL } from "./api/api-config";
import Skeleton from '@mui/material/Skeleton';
import axios from "axios";
import './Slideshow.css';
import ImageModal from "./ImageModal";
// import Pagination from "@mui/material/Pagination";
// import Stack from "@mui/material/Stack";
// import { Box, Button, TextField, Snackbar } from "@mui/material";

const columns = [
  { field: "logId", type: "checkbox", headerName: "seq", width: 100, headerAlign: "center", align: "center" },
  { field: "modelType", headerName: "모델명", width: 100, headerAlign: "center", align: "center" },
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

export default function List({ rows, setRows, rowSelectionModel, setRowSelectionModel, fetchEditHistory, isRecord, isLoading }) {

  // const [rowSelectionModel, setRowSelectionModel] = useState([]);           // 선택 행 배열
  const [currentPage, setCurrentPage] = useState(1);                        // 현재 페이지
  const rowsPerPage = 20;                                                   // 페이지 당 20rows
  const [userEditedLicensePlate, setUserEditedLicensePlate] = useState(""); // 차량번호판 수정
  const [userId, setUserId] = useState("");
  const [showSkeleton, setShowSkeleton] = useState(isLoading);

  // rows 상태가 변경될 때마다 재랜더링 ([] <-종속성에 추가)
  useEffect(() => {
  }, [rows]);

  useEffect(() => {
    setShowSkeleton(isLoading);
  }, [isLoading]);


  // Pagination 함수
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const rowsToDisplay = Array.isArray(rows) ? rows.slice(startIndex, endIndex) : [];
  const pageCount = Math.ceil(rows.length / rowsPerPage);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleLicensePlateEdit = (event) => {
    setUserEditedLicensePlate(event.target.value);
    console.log("Edited License Plate:", event.target.value);
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };                           // ...newRow 새로운 복제본 객체 생성
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));    //이전 행과 새로운 행 식별 후 업데이트 else 기존 행 유지
    return updatedRow;
  };

  const handleRowSelection = (newRowSelectionModel) => {
    setRowSelectionModel(newRowSelectionModel);
  }

  // 7.로그 수정(admin)
  const handleEditClick = () => {
    console.log("Edit button clicked");

    const selectedSeqValues = rowSelectionModel.map((rowId) => ({
      logId: rowsToDisplay[rowId - 1].logId,
      licensePlate: rowsToDisplay[rowId - 1].licensePlate,
    }));

    if (selectedSeqValues.length === 0) {
      console.error("No rows selected for editing.");
      return;
    }

    console.log("Selected Rows:", selectedSeqValues[0]);
    // 수정한 licensePlate 값 출력

    const jsonData = selectedSeqValues.map((item) => ({ logId: item.logId, licensePlate: item.licensePlate }));

    axios
      .put(`${API_BASE_URL}/main/update`, jsonData, {
        headers: {
          Authorization: localStorage.getItem("ACCESS_TOKEN"),
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("수정 성공.", response.data);
        // const updatedRows = rows.filter((row) => !selectedSeqValues.some((selectedRow) => selectedRow.logId === row.logId));

        // 필터링된 행으로 'rows' 상태를 업데이트
        // setRows(updatedRows);
        fetchEditHistory();
      })
      .catch((error) => {
        console.error("수정 중 오류 발생", error);
      });
  }

  // 8.로그 삭제(admin)
  const handleDeleteClick = () => {
    const selectedSeqValues = rowSelectionModel.map((rowId) => rowsToDisplay[rowId - 1].logId);

    // "logId" 속성을 가진 객체 배열 생성
    const jsonData = selectedSeqValues.map((logId) => ({ logId }));
    console.log("jsonData", jsonData);
    axios
      .delete(`${API_BASE_URL}/main/delete`, {
        data: jsonData,
        headers: {
          Authorization: localStorage.getItem("ACCESS_TOKEN"),
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("삭제 성공.", response.data);
        const updatedRows = rows.filter((row) => !selectedSeqValues.includes(row.logId));

        // 필터링된 행으로 'rows' 상태를 업데이트
        setRows(updatedRows);
        fetchEditHistory();
      })
      .catch((error) => {
        console.error("삭제 중 오류 발생", error);
      });
  };

  const isRecordComponent = isRecord;
  const containerClassName = isRecordComponent ? "hide-checkbox" : "";

  // const modifiedColumns = columns.map((column) => {
  //   if (column.field === "logId") {
  //     return containerClassName ? { ...column, type: undefined } : column;
  //   }
  //   return column;
  // });

  const modifiedColumns = columns.map((column) => {
    if (column.field === "logId") {
      return containerClassName ? { ...column, type: undefined } : column;
    }


    if (column.field === "plateImage") {
      return {
        ...column,
        renderCell: (params) => {
          const plateImage = params.value;
          if (plateImage !== "인식 실패") {
            // Display the 🖼 emoji when plateImage is not "인식 실패"
            return (
              <div className="emoticon" onClick={() => handleImageClick(params.row.plateImage)}>
                <img src="./"></img>
              </div>
            );
          } else {
            // Display the actual value when plateImage is "인식 실패"
            return plateImage;
          }
        },
      };
    }

    if (column.field === "vehicleImage") {
      return {
        ...column,
        renderCell: (params) => {
          const vehicleImage = params.value;
          if (vehicleImage) {
            // Display the 🖼 emoji when there is a vehicleImage
            return (
              <div className="emoticon" onClick={() => handleImageClick(params.row.vehicleImage)}>
                <img src="./"></img>
              </div>
            );
          } else {
            // Display an empty cell when there is no vehicleImage
            return null;
          }
        },
      };
    }

    return column;
  });


  const [isImageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");

  const openImageModal = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
    setImageModalOpen(true);
  };

  const closeImageModal = () => {
    setSelectedImageUrl("");
    setImageModalOpen(false);
  };

  const handleImageClick = (imageUrl) => {
    openImageModal(imageUrl);
  };

  return (
    rows && (
      <div style={{ width: "100%", maxHeight: "100%", height: "100%", overflowY: "auto" }}>
        <DataGrid
          rows={rowsToDisplay}
          columns={modifiedColumns}
          loading={showSkeleton}
          pageSize={20}
          // checkboxSelection={true}
          checkboxSelection={!isRecord} // Conditionally enable checkboxes
          className={isRecord ? 'hide-checkbox' : ''}
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
          rowSelectionModel={rowSelectionModel}
          disableRowSelectionOnClick
          processRowUpdate={processRowUpdate}
          components={{
            Pagination: (props) => (
              <PaginationButtons
                {...props}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                pageCount={pageCount}
                onDeleteClick={handleDeleteClick}
                onEditClick={handleEditClick}
                hideButtons={isRecord}
              />
            ),
          }}
          // 행의 logId 수정, 삭제 추적 후 렌더링
          key={(row) => row.logId}
        />
        {isImageModalOpen && (
          <ImageModal isOpen={isImageModalOpen} imageUrl={selectedImageUrl} onClose={closeImageModal} />
        )}
      </div>
    )
  );
}
