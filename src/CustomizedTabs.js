import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
  Tab,
  Tabs,
  Box,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StyledTabs = styled(Tabs)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,

  flexDirection: 'row',
  '& .MuiTabs-indicator': {
    backgroundColor: 'transparent',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    '& .MuiTabs-indicatorSpan': {
      maxWidth: 60,
      width: '100%',
      backgroundColor: '#635ee7',
    },
  },
});

const StyledTab = styled(Tab)(
  ({ theme }) => ({
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    textTransform: 'none',
    fontWeight: 'bold',
    fontSize: theme.typography.pxToRem(20),
    marginRight: theme.spacing(1),
    color: 'rgba(255, 255, 255, 0.7)',
    '&.Mui-selected': {
      color: '#fff',
    },
    '&.Mui-focusVisible': {
      backgroundColor: 'rgba(100, 95, 228, 0.32)',
    },
  }),
);

const RightBox = styled(Tab)(
  ({ theme }) => ({
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    textTransform: 'none',
    fontWeight: 'bold',
    fontSize: theme.typography.pxToRem(20),
    marginLeft: 'auto',
    color: 'rgba(255, 255, 255, 0.7)',
    '&.Mui-selected': {
      color: '#fff',
    },
    '&.Mui-focusVisible': {
      backgroundColor: 'rgba(100, 95, 228, 0.32)',
    },
  }),
);

export default function CustomizedTabs({ isLoggedIn, onTabChange, onLogout }) {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    onTabChange(newValue);
  };

  const handleLogoutClick = () => {
    onLogout();
    onTabChange(0); // 로그아웃 후 첫 번째 탭으로 이동
    navigate('/');
  };


  return (
    <Box sx={{ width: '100%', }}>
      <Box sx={{ bgcolor: '#2e1534', display: 'flex', p: 3, }}>
        <StyledTabs value={value} onChange={handleChange} aria-label="styled tabs example">
          {!isLoggedIn ? (
            [
              <StyledTab key="tab1" label="차량 입출입 현황" disabled />,
              <StyledTab key="tab2" label="검색" disabled />,
              <StyledTab key="tab3" label="차량등록" disabled />
            ]
          ) : (
            [
              <StyledTab key="tab1" label="차량 입출입 현황" onClick={() => { onTabChange(1); navigate('/main/record'); }} />,
              <StyledTab key="tab2" label="검색" onClick={() => { onTabChange(2); navigate('/main/search'); }} />,
              <StyledTab key="tab3" label="차량등록" onClick={() => { onTabChange(3); navigate('/main/enroll'); }} />
            ]
          )}
          {!isLoggedIn ? (
            <RightBox key="tab0" label="로그인" />
          ) : (
            <RightBox key="tab0" label="로그아웃" onClick={handleLogoutClick} />
          )}
        </StyledTabs>
      </Box>
    </Box>
  );
}