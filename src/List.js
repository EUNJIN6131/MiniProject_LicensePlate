import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import PaginationButtons from './PaginationButtons'; 

const columns = [

  { field: 'seq', type: 'checkbox', headerName: 'seq', width: 100  , headerAlign: 'center', align: 'center' },
  { field: 'carNumber', headerName: '차량번호', width: 180, headerAlign: 'center', align: 'center' },
  {
    field: 'time',
    headerName: '시간',
    width: 250,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'inAndOut',
    headerName: '입출차',
    width: 100,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'accuracy',
    headerName: '인식률',
    width: 100,
    headerAlign: 'center',
    align: 'center',
    valueFormatter: (params) => (params.value !== null ? params.value.toFixed(2) : ''),
  },
  {
    field: 'img',
    headerName: '이미지',
    width: 100,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'dist',
    headerName: '분류',
    width: 100,
    headerAlign: 'center',
    align: 'center',
  },
];



const rows = [
  { id: 1, seq: 1, carNumber: 'AB 1234', time: '2023-08-25 10:00:00', inAndOut: '입차', accuracy: 0.95, img: '이미지1', dist: '분류1' },
  { id: 2, seq: 2, carNumber: 'CD 5678', time: '2023-08-25 11:00:00', inAndOut: '출차', accuracy: 0.85, img: '이미지2', dist: '분류2' },
  { id: 3, seq: 3, carNumber: 'CD 5678', time: '2023-08-25 11:00:00', inAndOut: '출차', accuracy: 0.85, img: '이미지2', dist: '분류2' },
  { id: 4, seq: 4, carNumber: 'CD 5678', time: '2023-08-25 11:00:00', inAndOut: '출차', accuracy: 0.85, img: '이미지2', dist: '분류2' },
  { id: 5, seq: 5, carNumber: 'CD 5678', time: '2023-08-25 11:00:00', inAndOut: '출차', accuracy: 0.85, img: '이미지2', dist: '분류2' },
  { id: 6, seq: 6, carNumber: 'CD 5678', time: '2023-08-25 11:00:00', inAndOut: '출차', accuracy: 0.85, img: '이미지2', dist: '분류2' },
  { id: 7, seq: 7, carNumber: 'CD 5678', time: '2023-08-25 11:00:00', inAndOut: '출차', accuracy: 0.85, img: '이미지2', dist: '분류2' },
  { id: 8, seq: 8, carNumber: 'CD 5678', time: '2023-08-25 11:00:00', inAndOut: '출차', accuracy: 0.85, img: '이미지2', dist: '분류2' },
  { id: 9, seq: 9, carNumber: 'CD 5678', time: '2023-08-25 11:00:00', inAndOut: '출차', accuracy: 0.85, img: '이미지2', dist: '분류2' },
  { id: 10, seq: 10, carNumber: 'CD 5678', time: '2023-08-25 11:00:00', inAndOut: '출차', accuracy: 0.85, img: '이미지2', dist: '분류2' },
  { id: 11, seq: 11, carNumber: 'CD 5678', time: '2023-08-25 11:00:00', inAndOut: '출차', accuracy: 0.85, img: '이미지2', dist: '분류2' }, 

  // 나머지 데이터도 유사하게 추가
];

export default function List() {
  return (
    <div style={{width: '100%', maxHeight: '100%', height: '100%', overflowY: 'auto' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
      />
       <PaginationButtons />
    </div>
  );
}
