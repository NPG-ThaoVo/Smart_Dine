import {
  LayoutDashboard,
  TableProperties,
  UtensilsCrossed,
  ClipboardList,
  Receipt,
  Bell,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AuthContext from "@/contexts/authContext";
import { useContext } from "react";

// Menu items.
const menuItems = [
  {
    title: "Tổng quan",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Quản lý bàn",
    url: "/admin/table-management",
    icon: TableProperties,
  },
  {
    title: "Thực đơn",
    url: "/admin/menu",
    icon: UtensilsCrossed,
  },
  {
    title: "Đơn hàng",
    url: "/admin/order-management",
    icon: ClipboardList,
  },
  {
    title: "Hóa đơn",
    url: "/admin/billing",
    icon: Receipt,
  },
  {
    title: "Thông báo",
    url: "/admin/notification-management",
    icon: Bell,
    badge: 3,
  },
];

export function SidebarAdmin() {
  const { userInfo, AdminLogout } = useContext(AuthContext);

  return (
    <Sidebar>
      <SidebarContent className="bg-[#ffffff] backdrop-blur-0">
        <SidebarGroup>
          <div data-sidebar="header" className="flex flex-col gap-2 p-4 pb-2">
            <div className="flex items-center gap-3 px-1 py-1 group-data-[collapsible=icon]:justify-center transition-all duration-300">
              <div className="relative group cursor-pointer">
                <div className="w-10 h-10 rounded-2xl from-primary via-orange-400 to-orange-500 shadow-lg shadow-primary/25 flex items-center justify-center text-primary-foreground text-xl shrink-0 ring-4  transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3 overflow-hidden">
                  <span className="relative z-10 drop-shadow-md">🍜</span>
                  <div className="absolute inset-0 bg-gradient-to-r ring-1 ring-inset from-orange-400 to-transparent"></div>
                  <div className="absolute -inset-full top-0 block h-[200%] w-1/2 -rotate-12 bg-gradient-to-r from-transparent to-white/20 opacity-0 transition-all duration-500 group-hover:left-[120%] group-hover:opacity-100"></div>
                </div>
              </div>
              <div className="min-w-0 flex flex-col animate-in fade-in slide-in-from-left-2 duration-300">
                <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-sidebar-foreground to-sidebar-foreground/70 truncate tracking-tight">
                  SmartDine
                </h1>
                <p className="text-xs text-muted-foreground font-medium truncate tracking-wide">
                  MANAGER
                </p>
              </div>
            </div>
          </div>
          <SidebarGroupLabel>Menu Chính</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `group flex items-center gap-2 ${
                          isActive
                            ? "bg-primary/10 text-primary font-semibold shadow-sm"
                            : ""
                        }`
                      }
                    >
                      <item.icon className="h-[18px] w-[18px] text-[#51535b] hover:text-[#e9560c] " />
                      <span className="flex-1 truncate text-[#51535b] ">
                        {item.title}
                      </span>

                      {item.badge && (
                        <span className="ml-auto rounded-full  bg-[#e9560c] px-1.5 text-[10px] font-bold text-primary-foreground">
                          {item.badge}
                        </span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="rounded-2xl bg-[#D3D7DE4C] border border-border/40 p-1 backdrop-blur-sm">
          {/* User info */}
          <div className="flex items-center gap-3 p-2 mb-1">
            <img
              src="https://ui-avatars.com/api/?name=Admin+Demo&background=random"
              alt="Avatar"
              className="w-8 h-8 rounded-full ring-2 ring-background shadow-sm object-cover"
            />

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">
                {userInfo?.name || "Guest"}
              </p>
              <p className="text-[10px] text-muted-foreground truncate font-medium">
                {userInfo?.email || "admin@smartdine.com"}
              </p>
            </div>
          </div>

          {/* Logout */}
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-8 px-2"
            onClick={AdminLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Đăng xuất
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export default SidebarAdmin;
