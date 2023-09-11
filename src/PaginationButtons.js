import React, { useState, useEffect } from "react";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import jwt_decode from "jwt-decode";


export default function PaginationButtons({ currentPage, onPageChange, pageCount, onEditClick, onDeleteClick, hideButtons }) {

  const [isAdmin, setIsAdmin] = useState(false);    

  useEffect(() => {
    findIsAdmin(); // 컴포넌트가 처음 렌더링 될 때 isAdmin 값을 설정
  }, []);

  const findIsAdmin = () => {
    const jwtToken = localStorage.getItem("ACCESS_TOKEN");
    if (jwtToken) {
      // JWT 토큰이 존재한다면 디코딩하여 Role을 확인
      const decodedToken = jwt_decode(jwtToken);
      if (decodedToken.auth === "ROLE_ADMIN") {
        setIsAdmin(true);

      } else {
        setIsAdmin(false);
      }
    } else {
      setIsAdmin(false);
    }
  }
  return (
    <Stack spacing={2} direction="row" alignItems="center" >
        <div  style={{ marginRight: '10px' }}>
        { !hideButtons && isAdmin && ( 
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
