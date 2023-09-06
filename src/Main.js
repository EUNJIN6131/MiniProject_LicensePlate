import { Box } from "@mui/material";
import CustomizedTabs from "./CustomizedTabs.js";
import Login from "./Login.js";
import Record from "./Record.js";
import Search from "./Search.js";
import Enroll from "./Enroll.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
 
  const navigate = useNavigate();

  const handleTabChange = (tabIndex) => {
    setSelectedTab(tabIndex);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setSelectedTab(0);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    handleTabChange(1);
    navigate("/main/record");
    // handleTabChange(1);
    // setSelectedTab(1);
  };

  return (
    <Box sx={{ width: '100%', height: '100vh' }}>
      <CustomizedTabs
        isLoggedIn={isLoggedIn}
        onTabChange={handleTabChange}
        onLogout={handleLogout}
        onLogin={handleLogin}
      />
      {selectedTab === 0 && <Login onLogin={handleLogin} onTabChange={handleTabChange} onLogout={handleLogout} isLoggedIn={isLoggedIn}
      setIsLoggedIn={setIsLoggedIn} selectedTab={selectedTab}/>}
      {selectedTab === 1 && <Record />}
      {selectedTab === 2 && <Search selectedTab={selectedTab} />}
      {selectedTab === 3 && <Enroll />}
    </Box>
  );
}