import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLoginPage from "./pages/AdminLoginPage";
import DetailsPage from "./pages/DetailsPage";
import Menu from "./pages/Menu";
import SmartDineLanding from "./pages/Smartdine-Landing-Page";
import TableManagement from "./pages/TableManagement";
import AdminLayout from "./components/AdminLayout";
import MenuAdminPage from "./pages/MenuAdminPage";
import { Toaster } from "react-hot-toast";
import ConfirmPage from "./pages/ConfirmPage";
import OrderManagementPage from "./pages/OrderManagement";
import DashboardPage from "./pages/DashboardPage";
import BillingPage from "./pages/BillingPage";
import NotificationManagementPage from "./pages/notificationManagement";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/authContext";
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

function App() {
  useEffect(() => {
    // Kết nối đến Server Backend (PHẢI nằm TRONG useEffect)
    const socket = io("http://localhost:3001");

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);
    });

    // Lắng nghe sự kiện "NEW_USER_LOGIN" từ Backend
    socket.on("NEW_USER_LOGIN", (data) => {
      console.log("📩 Nhận được thông báo đăng nhập:", data);
      
      // Hiển thị Alert
      alert(`🔔 Thông báo: ${data.message}`);
    });

    // Dọn dẹp khi component unmount
    return () => {
      socket.off("connect");
      socket.off("NEW_USER_LOGIN");
      socket.off("disconnect");
      socket.disconnect();
      console.log("🔌 Socket connection closed");
    };
  }, []);

  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
      <AuthProvider>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/order/:tableId/item/:itemId" element={<DetailsPage />} />
        <Route path="/smartdine" element={<SmartDineLanding />} />
        
          
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="table-management" element={<TableManagement />} />
          <Route path="menu" element={<MenuAdminPage />} />
          <Route path="order-management" element={<OrderManagementPage />} />
          <Route path="billing" element={<BillingPage />} />
          <Route path="notification-management" element={<NotificationManagementPage />} />
        </Route>
        <Route path="/order/confirm" element={<ConfirmPage />} />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;