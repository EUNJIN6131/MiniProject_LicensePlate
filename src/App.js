import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Join from './Join';
import Main from './Main';
import { useMediaQuery } from "react-responsive"

function App() {

  const isPc = useMediaQuery({
    query: "(min-width:1024px)"
  });
  const isTablet = useMediaQuery({
    query: "(min-width:768px) and (max-width:1023px)"
  });
  const isMobile = useMediaQuery({
    query: "(max-width:767px)"
  });


  return (
    <>
      <div>
        {isPc}
        {isTablet}
        {isMobile}
      </div>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          {/* <Route path="/MiniProject_LicensePlate/*" element={<Main />} /> */}
          <Route path="/user/signup" element={<Join />} />
          <Route path="/main/*" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
