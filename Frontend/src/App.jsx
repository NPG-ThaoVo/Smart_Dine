import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AdminLoginPage from "./pages/AdminLoginPage";
import SmartDineLanding from "./pages/Smartdine-Landing-Page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/" element={<SmartDineLanding />} />
      </Routes>
    </Router>
  );
}

export default App;
