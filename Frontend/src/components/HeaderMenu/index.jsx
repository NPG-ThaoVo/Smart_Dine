import { useState } from "react";
import { Button } from "../ui/button";
import OrderSidebar from "@/components/OrderSidebar";
import { ClipboardList } from "lucide-react";

const HeaderMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 bg-white/70 backdrop-blur-md border-b border-white/30">
      <div className="px-3 md:px-4 py-2 md:py-3">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <h1 className="text-lg md:text-xl font-bold truncate">
              🍜 SmartDine
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground truncate">
              Bàn 1 - Bàn cửa sổ
            </p>
          </div>

          <div className="flex items-center gap-1 md:gap-2 shrink-0">
            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              size="sm"
              className="gap-2 text-xs md:text-sm glass-button hover:text-[#e9560c]"
            >
              <ClipboardList className="h-4 w-4 md:mr-1" />
              <span className="hidden md:inline">Đơn của bạn</span>
            </Button>
            <OrderSidebar open={open} onOpenChange={setOpen} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderMenu;
