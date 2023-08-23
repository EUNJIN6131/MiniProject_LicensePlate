import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
  Tab,
  Tabs,
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "./api/api-config";
import AlertError from "./alert/AlertError";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Login from "./Login";

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
    display: 'flex', // 세로 중앙 정렬을 위해 flex 설정
    alignItems: 'center', // 세로 중앙 정렬을 위해 align-items 설정
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


export default function CustomizedTabs({onLoginTabClick,onOtherTabClick,onLogout }) {
  const [value, setValue] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ bgcolor: '#2e1534', display: 'flex', p: 3 }}>
          <StyledTabs
            value={value}
            onChange={handleChange}
            aria-label="styled tabs example"
          >
             {isLoggedIn ? (
          <StyledTab label="로그아웃" onClick={onLogout} />
        ) : (
          <StyledTab label="로그인" onClick={onLoginTabClick} />
        )}
            <StyledTab label="차량 입출입 현황" onClick={onOtherTabClick} />
            <StyledTab label="검색" onClick={onOtherTabClick}/>
          </StyledTabs>

        </Box>
        {isLoggedIn && value === 0 && <Login />}
      </Box>
    );
  }