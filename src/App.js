import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Join from './Join';
import Main from './Main';

function App() {


  return (

    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Main />} />
        {/* <Route path="/MiniProject_LicensePlate/*" element={<Main />} /> */}
        <Route path="/users/signup" element={<Join />} />
        <Route path="/main/*" element={<Main />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;