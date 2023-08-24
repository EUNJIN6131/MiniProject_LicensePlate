import { Box } from "@mui/material";
import CustomizedTabs from "./CustomizedTabs.js";
import Login from "./Login.js";
import MainSub1 from "./MainSub1.js";
import { useState } from "react";

export default function Main() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleTabChange = (tabIndex) => {
    setSelectedTab(tabIndex);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setSelectedTab(0); // Reset the selected tab to "로그인" after logout
  };

  const handleLogin = () => {
    // Perform login logic here
    // After successful login, set isLoggedIn to true
    setIsLoggedIn(true);
    // Also, update the tab to "로그아웃"
    setSelectedTab(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <CustomizedTabs
        isLoggedIn={isLoggedIn}
        onTabChange={handleTabChange}
        onLogout={handleLogout}
      />
      {selectedTab === 0 && !isLoggedIn && <Login onLogin={handleLogin} />}
      {selectedTab === 1 && <MainSub1 />}
    </Box>
  );
}