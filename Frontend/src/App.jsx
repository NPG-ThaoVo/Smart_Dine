import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLoginPage from "./pages/AdminLoginPage";
import Menu from "./pages/Menu";
import SmartDineLanding from "./pages/Smartdine-Landing-Page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/smartdine" element={<SmartDineLanding />} />
      </Routes>
    </Router>
  );
}
export default App;
