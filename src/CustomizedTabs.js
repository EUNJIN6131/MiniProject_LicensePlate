import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
  Tab,
  Tabs,
  Box,
} from "@mui/material";
import { useState } from "react";
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

export default function CustomizedTabs({ isLoggedIn, onTabChange, onLogout }) {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    onTabChange(newValue);
  };

  return (
    <Box sx={{ width: '100%' , }}>
      <Box sx={{ width: "100%", bgcolor: '#2e1534', display: 'flex',  p:3 , }}>
        <StyledTabs value={value} onChange={handleChange} aria-label="styled tabs example">
          {isLoggedIn ? (
            <StyledTab label="로그아웃" onClick={onLogout} />
          ) : (
            <StyledTab label="로그인" onClick={() => {
              onTabChange(0);
              navigate('/users/signin'); // Append /login to the URL
            }} />
          )}

          <StyledTab label="차량 입출입 현황" onClick={() => {
            onTabChange(1);
            navigate('/main/record'); // Use navigate to go to the desired route
          }} />
          <StyledTab label="검색" onClick={() => { onTabChange(2); navigate('/main/search'); }} />
          <StyledTab label="차량등록" onClick={() => { onTabChange(3); navigate('/main/enroll'); }} />
        </StyledTabs>
      </Box>
          
    </Box>
  );
}
