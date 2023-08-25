import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationButtons({ currentPage, onPageChange, pageCount }) {
  return (
    <Stack spacing={2}>
      <Pagination count={pageCount} page={currentPage} onChange={onPageChange} showFirstButton showLastButton />
    </Stack>
  );
}
