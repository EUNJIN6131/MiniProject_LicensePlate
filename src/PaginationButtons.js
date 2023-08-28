import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


export default function PaginationButtons({ currentPage, onPageChange, pageCount,isAdmin  }) {
  return (
    <Stack spacing={2} direction="row" alignItems="center" >
        <div  style={{ marginRight: '10px' }}>
        {isAdmin && (
          <>
            <button style={{ marginRight: '10px' }}>수정</button>
            <button>삭제</button>
          </>
        )}
      </div>
      <Pagination count={pageCount} page={currentPage} onChange={onPageChange} showFirstButton showLastButton />
    </Stack>
  );
}
