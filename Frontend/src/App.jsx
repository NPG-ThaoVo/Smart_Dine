import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLoginPage from "./pages/AdminLoginPage";
import DetailsPage from "./pages/DetailsPage";
import Menu from "./pages/Menu";
import SmartDineLanding from "./pages/Smartdine-Landing-Page";
import TableManagement from "./pages/TableManagement";
import AdminLayout from "./components/AdminLayout";
import { Toaster } from "react-hot-toast";
import ConfirmPage from "./pages/ConfirmPage";
import OrderManagementPage from "./pages/OrderManagement";
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
          <Route path="table-management" element={<TableManagement />} />
          <Route path="order-management" element={<OrderManagementPage />} />
        </Route>
        <Route path="/order/confirm" element={<ConfirmPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
