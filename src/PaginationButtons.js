import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


export default function PaginationButtons({ currentPage, onPageChange, pageCount, isAdmin, onEditClick, onDeleteClick, hideButtons  }) {
  return (
    <Stack spacing={2} direction="row" alignItems="center" >
        <div  style={{ marginRight: '10px' }}>
        {/* {isAdmin && ( */}
        {!hideButtons && ( 
          <>
            <button style={{ marginRight: '10px' }} onClick={onEditClick}>수정</button>
            <button onClick={onDeleteClick}>삭제</button>
          </>
       )} 
      </div>
      <Pagination count={pageCount} page={currentPage} onChange={onPageChange} showFirstButton showLastButton />
    </Stack>
  );
}
