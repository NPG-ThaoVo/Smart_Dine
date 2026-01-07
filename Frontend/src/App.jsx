import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLoginPage from "./pages/AdminLoginPage";
import DetailsPage from "./pages/DetailsPage";
import Menu from "./pages/Menu";
import SmartDineLanding from "./pages/Smartdine-Landing-Page";
import ConfirmOrder from "./pages/ConfirmPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/order/1/item/item-1" element={<DetailsPage />} />
        <Route path="/smartdine" element={<SmartDineLanding />} />
        <Route path="/order/confirm" element={<ConfirmOrder />} />
      </Routes>
    </Router>
  );
}
export default App;
