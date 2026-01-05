import React from "react";

const HeaderMenu = () => {
  return (
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
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background hover:text-[#e9560c] h-9 rounded-md relative glass-button text-xs md:text-sm px-3 md:px-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-clipboard-list w-4 h-4 md:mr-1"
              >
                <rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect>
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                <path d="M12 11h4"></path>
                <path d="M12 16h4"></path>
                <path d="M8 11h.01"></path>
                <path d="M8 16h.01"></path>
              </svg>
              <span className="hidden md:inline">Đơn của bạn</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderMenu;
