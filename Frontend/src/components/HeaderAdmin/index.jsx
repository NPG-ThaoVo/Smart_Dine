import React from "react";
import { Button } from "../ui/button";
import { PanelLeft } from "lucide-react";
import AuthContext from "@/contexts/authContext";
import { useContext } from "react";

const HeaderAdmin = () => {
  const { userInfo } = useContext(AuthContext);
  
  return (
    <div>
      <header className="bg-[#f9f9f9] sticky top-0 z-10 px-3 md:px-6 py-3 md:py-4 shadow-sm border-border flex items-center justify-between">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 md:gap-4 min-w-0">
            <Button
              className="inline-flex items-center justify-center hover:cursor-pointer gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-[#f5f5f6] hover:text-accent-foreground h-7 w-7 lg:hidden glass-button shrink-0"
              data-sidebar="trigger"
            >
              <PanelLeft className="w-4 h-4" />
              <span className="sr-only">Toggle Sidebar</span>
            </Button>
            <div className="min-w-0">
              <h2 className="text-sm md:text-lg font-semibold text-foreground truncate">
                Xin chào, {userInfo?.name || "Admin Demo"} 👋
              </h2>
              <p className="text-xs md:text-sm text-muted-foreground hidden sm:block">
                Chúc bạn một ngày làm việc hiệu quả
              </p>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default HeaderAdmin;
