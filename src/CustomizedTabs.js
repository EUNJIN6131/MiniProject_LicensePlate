import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
  Tab,
  Tabs,
  Box,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    width: '100%',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 40,
    width: '100%',
    backgroundColor: '#635ee7',
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    fontWeight: "bold",
    display: 'flex',
    alignItems: 'center',
    fontSize: theme.typography.pxToRem(20),
    marginLeft: theme.spacing(1),
    color: 'rgba(255, 255, 255, 0.7)',
    '&.Mui-selected': {
      color: '#fff',
    },
    '&.Mui-focusVisible': {
      backgroundColor: 'rgba(100, 95, 228, 0.32)',
    },
  }),
);

export default function CustomizedTabs({ isLoggedIn, onTabChange, onLogout, onLogin }) {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    onTabChange(newValue);
  };

  // const handleLoginClick = () => {
  //   // 로그인 버튼을 클릭할 때 로그인 처리를 수행하고 탭을 변경합니다.
  //   onLogin();
  //   // onTabChange(1);
  // };

  const handleLogoutClick = () => {
    // 로그아웃 버튼을 클릭할 때 로그아웃 처리를 수행하고 탭을 변경합니다.
    onLogout();
    onTabChange(0); // 로그아웃 후 첫 번째 탭으로 이동
    navigate('/main/login');
  };


  return (
    <Box sx={{ width: '100%', }}>
      <Box sx={{ width: "100%", bgcolor: '#2e1534', display: 'flex', p: 3, }}>
        <StyledTabs value={value} onChange={handleChange} aria-label="styled tabs example">
          {!isLoggedIn ? (
            <StyledTab label="로그인" onClick={onLogin} />
          ) : (
            <StyledTab label="로그아웃" onClick={handleLogoutClick} />
          )}
         
            {!isLoggedIn ? (
              <><StyledTab label="차량 입출입 현황"disabled  /><StyledTab label="검색" disabled  /><StyledTab label="차량등록" disabled  /></>
            ) : (
              <><StyledTab label="차량 입출입 현황" onClick={() => { onTabChange(1); navigate('/main/record'); }} /><StyledTab label="검색" onClick={() => { onTabChange(2); navigate('/main/search'); }} /><StyledTab label="차량등록" onClick={() => { onTabChange(3); navigate('/main/enroll'); }} /></>
            )}
          
        </StyledTabs>
      </Box>
    </Box>
  );
}

{/* <Box sx={{ width: '100%' }}>
<Box sx={{ width: "100%", bgcolor: '#2e1534', display: 'flex', p: 3 }}>
  <StyledTabs value={value} onChange={handleChange} aria-label="styled tabs example">
    {!isLoggedIn ? (
      <>
        <StyledTab label="로그인" onClick={handleLoginClick} />
        <StyledTab label="차량 입출입 현황" disabled />
        <StyledTab label="검색" disabled />
        <StyledTab label="차량등록" disabled />
      </>
    ) : (
      <>
        <StyledTab label="로그아웃" onClick={handleLogoutClick} />
        <StyledTab label="차량 입출입 현황" onClick={() => { onTabChange(1); navigate('/main/record'); }} />
        <StyledTab label="검색" onClick={() => { onTabChange(2); navigate('/main/search'); }} />
        <StyledTab label="차량등록" onClick={() => { onTabChange(3); navigate('/main/enroll'); }} />
      </>
    )}
  </StyledTabs>
</Box>
</Box> */}
