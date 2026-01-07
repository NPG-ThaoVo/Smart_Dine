import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLoginPage from "./pages/AdminLoginPage";
import Menu from "./pages/Menu";
import SmartDineLanding from "./pages/Smartdine-Landing-Page";
import TableManagement from "./pages/TableManagement";
import AdminLayout from "./components/AdminLayout";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/smartdine" element={<SmartDineLanding />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="table-management" element={<TableManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
