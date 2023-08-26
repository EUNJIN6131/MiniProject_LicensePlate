import { Box } from "@mui/material";
import CustomizedTabs from "./CustomizedTabs.js";
import Login from "./Login.js";
import MainSub1 from "./MainSub1.js";
import Search from "./Search.js";
import Enroll from "./Enroll.js";
import { useState } from "react";

export default function Main() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleTabChange = (tabIndex) => {
    setSelectedTab(tabIndex);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setSelectedTab(0);
  };

  const handleLogin = () => {

    setIsLoggedIn(true);
    setSelectedTab(0);
  };

  return (
    <Box sx={{ width: '100%' , height:'100%'}}>
      <CustomizedTabs
        isLoggedIn={isLoggedIn}
        onTabChange={handleTabChange}
        onLogout={handleLogout}
      />
      {selectedTab === 0 && !isLoggedIn && <Login onLogin={handleLogin} />}
      {selectedTab === 1 && <MainSub1 />}
      {selectedTab === 2 && <Search />}
      {selectedTab === 3 && <Enroll />}
    </Box>
  );
}