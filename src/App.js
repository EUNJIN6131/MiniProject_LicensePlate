import { BrowserRouter, Route, Routes } from "react-router-dom";
import Join from "./Join";
import Login from "./Login";
import Main from "./Main";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/*" element={<Login />} />
      <Route path="/MiniProject_LicensePlate/*" element={<Login />} />
      <Route path="/MiniProject_LicensePlate/join" element={<Join />} />
      <Route path="/MiniProject_LicensePlate/main/*" element={<Main />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
