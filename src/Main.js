import {
    Box,
} from "@mui/material";
import CustomizedTabs from "./CustomizedTabs.js";
import Login from "./Login.js";
import { useState } from "react";

export default function Main() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginTabClick = () => {
    setIsLoggedIn(true);
  };
  const handleOtherTabClick = () => {
    setIsLoggedIn(false); // 다른 탭 클릭 시 로그인 컴포넌트 숨김
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

    return (
        <Box sx={{ width: '100%' }}> {/* 가로폭을 100%로 설정 */}
        <CustomizedTabs onLoginTabClick={handleLoginTabClick}    onOtherTabClick={handleOtherTabClick} onLogout={handleLogout} />
      {/* {isLoggedIn && <Login />} */}
      {isLoggedIn ? <Login onLogout={handleLogout} /> : null}
        </Box>
    )
}