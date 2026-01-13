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
function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
      <AuthProvider>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/order/1/item/item-1" element={<DetailsPage />} />
        <Route path="/smartdine" element={<SmartDineLanding />} />
        
          
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<ProtectedRoute><Navigate to="dashboard" replace /></ProtectedRoute>} />
          <Route path="dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="table-management" element={<ProtectedRoute><TableManagement /></ProtectedRoute>} />
          <Route path="menu" element={<ProtectedRoute><MenuAdminPage /></ProtectedRoute>} />
          <Route path="order-management" element={<ProtectedRoute><OrderManagementPage /></ProtectedRoute>} />
          <Route path="billing" element={<ProtectedRoute><BillingPage /></ProtectedRoute>} />
          <Route path="notification-management" element={<ProtectedRoute><NotificationManagementPage /></ProtectedRoute>} />
        </Route>
        <Route path="/order/confirm" element={<ConfirmPage />} />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
