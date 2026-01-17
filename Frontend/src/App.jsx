import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
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
import UserBillingPage from "./pages/UserBillingPage";
import NotificationManagementPage from "./pages/notificationManagement";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/authContext";


import TrackingPage from "./pages/TrackingPage";
function App() {
 
  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
      <AuthProvider>
        <Routes>
          <Route path="/" element={<SmartDineLanding />} />
          <Route path="/order/:tableId" element={<Menu />} />
          <Route path="/admin/login" element={<LoginPage />} />
          <Route
            path="/order/:tableId/item/:itemId"
            element={<DetailsPage />}
          />
          <Route path="/tracking" element={<TrackingPage />} />
          <Route path="/smartdine" element={<SmartDineLanding />} />
          <Route path="/user/billing" element={<UserBillingPage />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="table-management" element={<TableManagement />} />
            <Route path="menu" element={<MenuAdminPage />} />
            <Route path="order-management" element={<OrderManagementPage />} />
            <Route path="billing" element={<BillingPage />} />
            <Route
              path="notification-management"
              element={<NotificationManagementPage />}
            />
          </Route>
          <Route path="/order/confirm" element={<ConfirmPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
