import { Outlet } from "react-router-dom";
import HeaderAdmin from "../HeaderAdmin";
import SidebarAdmin from "../SidebarAdmin";
import { SidebarProvider } from "../ui/sidebar";

const AdminLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <SidebarAdmin className="bg-[#ffffff]" />
        <div className="flex flex-1 flex-col min-w-0 animated-gradient">
          <HeaderAdmin />
          <div className="flex-1 p-3 md:p-6 overflow-auto bg-gradient-to-r from-[#f5f5f7] to-[#f5f2f2]">
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
