import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLoginPage from "./pages/AdminLoginPage";
import DetailsPage from "./pages/DetailsPage";
import Menu from "./pages/Menu";
import SmartDineLanding from "./pages/Smartdine-Landing-Page";
import TableManagement from "./pages/TableManagement";
import AdminLayout from "./components/AdminLayout";
import { Toaster } from "react-hot-toast";
import ConfirmPage from "./pages/ConfirmPage";
import DashboardPage from "./pages/DashboardPage";
import BillingPage from "./pages/BillingPage";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/order/1/item/item-1" element={<DetailsPage />} />
        <Route path="/smartdine" element={<SmartDineLanding />} />
        

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="table-management" element={<TableManagement />} />
          <Route path="billing" element={<BillingPage />} />
        </Route>
        <Route path="/order/confirm" element={<ConfirmPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
