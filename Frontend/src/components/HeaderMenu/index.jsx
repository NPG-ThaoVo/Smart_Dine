import React from "react";
import { Button } from "../ui/button";
import { ClipboardList } from "lucide-react";

const HeaderMenu = () => {
  return (
    // Header
    <header className="sticky top-0 bg-white/70 backdrop-blur-md border-b border-white/30 z-10">
      <div className="px-3 md:px-4 py-2 md:py-3">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <h1 className="text-lg md:text-xl font-bold text-foreground truncate">
              🍜 SmartDine
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground truncate">
              Bàn 1 - Bàn cửa sổ
            </p>
          </div>
          <div className="flex items-center gap-1 md:gap-2 shrink-0">
            <Button className="inline-flex items-center justify-center hover:cursor-pointer gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background hover:text-[#e9560c] h-9 rounded-md relative glass-button text-xs md:text-sm px-3 md:px-3">
              <ClipboardList className="w-4 h-4 md:mr-1" />
              <span className="hidden md:inline">Đơn của bạn</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderMenu;
