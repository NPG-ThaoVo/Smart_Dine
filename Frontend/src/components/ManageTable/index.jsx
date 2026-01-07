import React from "react";
import { Button } from "@/components/ui/button";
const ManageTable = ({ setOpenQRChange, setOpenDeleteChange, onEdit }) => {
  return (
    <div>
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        <div className="group relative flex flex-col justify-between rounded-3xl transition-all duration-300 overflow-hidden border h-[280px] bg-emerald-500/5 hover:bg-emerald-500/10 border-emerald-500/20 hover:border-emerald-500/40">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent"></div>
          <div className="p-6 relative z-10">
            <div className="flex justify-between items-start">
              <div className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                Bàn trống
              </div>
              <div className="w-3 h-3 rounded-full ring-4 ring-black/40 bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.6)] animate-pulse"></div>
            </div>
            <div className="mt-6 text-center">
              <span className="text-5xl font-black tracking-tighter text-emerald-500 drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                1
              </span>
              <p className="text-sm text-muted-foreground mt-2 font-medium">
                Bàn cửa sổ
              </p>
            </div>
          </div>
          <div className="p-4 bg-background/50 backdrop-blur-md border-t border-white/5 relative z-20">
            <div className="flex items-center justify-between gap-2">
              <div className="flex gap-1">
                <Button
                  onClick={() => setOpenQRChange(true)}
                  className="bg-transparent text-gray-400 hover:bg-white/10 hover:text-white "
                  title="QR Code"
                >
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
                    className="lucide lucide-qr-code w-4 h-4"
                  >
                    <rect width="5" height="5" x="3" y="3" rx="1"></rect>
                    <rect width="5" height="5" x="16" y="3" rx="1"></rect>
                    <rect width="5" height="5" x="3" y="16" rx="1"></rect>
                    <path d="M21 16h-3a2 2 0 0 0-2 2v3"></path>
                    <path d="M21 21v.01"></path>
                    <path d="M12 7v3a2 2 0 0 1-2 2H7"></path>
                    <path d="M3 12h.01"></path>
                    <path d="M12 3h.01"></path>
                    <path d="M12 16v.01"></path>
                    <path d="M16 12h1"></path>
                    <path d="M21 12v.01"></path>
                    <path d="M12 21v-1"></path>
                  </svg>
                </Button>
                <Button
                  onClick={() =>
                    onEdit({
                      id: 1,
                      number: "1",
                      name: "Bàn cửa sổ",
                    })
                  }
                  className="bg-transparent text-gray-400 hover:bg-white/10 hover:text-blue-400"
                  title="Chỉnh sửa"
                >
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
                    className="lucide lucide-pen-line w-4 h-4"
                  >
                    <path d="M12 20h9"></path>
                    <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"></path>
                  </svg>
                </Button>
                <Button
                  onClick={() => setOpenDeleteChange(true)}
                  className="bg-transparent text-gray-400 hover:bg-white/10 hover:text-red-400"
                  title="Xóa"
                >
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
                    className="lucide lucide-trash2 w-4 h-4"
                  >
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    <line x1="10" x2="10" y1="11" y2="17"></line>
                    <line x1="14" x2="14" y1="11" y2="17"></line>
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="group relative flex flex-col justify-between rounded-3xl transition-all duration-300 overflow-hidden border h-[280px] bg-rose-500/5 hover:bg-rose-500/10 border-rose-500/20 hover:border-rose-500/40">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-rose-500/10 via-transparent to-transparent"></div>
          <div className="p-6 relative z-10">
            <div className="flex justify-between items-start">
              <div className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border bg-rose-500/10 text-rose-500 border-rose-500/20">
                Có khách
              </div>
              <div className="w-3 h-3 rounded-full ring-4 ring-black/40 bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.6)]"></div>
            </div>
            <div className="mt-6 text-center">
              <span className="text-5xl font-black tracking-tighter text-rose-500 drop-shadow-[0_0_15px_rgba(244,63,94,0.4)]">
                2
              </span>
              <p className="text-sm text-muted-foreground mt-2 font-medium">
                Bàn VIP
              </p>
            </div>
          </div>
          <div className="p-4 bg-background/50 backdrop-blur-md border-t border-white/5 relative z-20">
            <div className="flex items-center justify-between gap-2">
              <div className="flex gap-1">
                <Button
                  className="bg-transparent text-gray-400 hover:bg-white/10 hover:text-white"
                  title="QR Code"
                >
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
                    className="lucide lucide-qr-code w-4 h-4"
                  >
                    <rect width="5" height="5" x="3" y="3" rx="1"></rect>
                    <rect width="5" height="5" x="16" y="3" rx="1"></rect>
                    <rect width="5" height="5" x="3" y="16" rx="1"></rect>
                    <path d="M21 16h-3a2 2 0 0 0-2 2v3"></path>
                    <path d="M21 21v.01"></path>
                    <path d="M12 7v3a2 2 0 0 1-2 2H7"></path>
                    <path d="M3 12h.01"></path>
                    <path d="M12 3h.01"></path>
                    <path d="M12 16v.01"></path>
                    <path d="M16 12h1"></path>
                    <path d="M21 12v.01"></path>
                    <path d="M12 21v-1"></path>
                  </svg>
                </Button>
                <Button
                  className="bg-transparent text-gray-400 hover:bg-white/10 hover:text-blue-400"
                  title="Chỉnh sửa"
                >
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
                    className="lucide lucide-pen-line w-4 h-4"
                  >
                    <path d="M12 20h9"></path>
                    <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"></path>
                  </svg>
                </Button>
                <Button
                  className="bg-transparent text-gray-400 hover:bg-white/10 hover:text-red-400"
                  title="Xóa"
                >
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
                    className="lucide lucide-trash2 w-4 h-4"
                  >
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    <line x1="10" x2="10" y1="11" y2="17"></line>
                    <line x1="14" x2="14" y1="11" y2="17"></line>
                  </svg>
                </Button>
              </div>
              <Button className="rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 text-white border border-white/10 shadow-lg shadow-rose-500/20">
                Chi tiết
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
                  className="lucide lucide-arrow-right w-3 h-3 ml-1 opacity-70"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageTable;
