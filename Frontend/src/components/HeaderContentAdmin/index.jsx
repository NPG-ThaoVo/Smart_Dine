import { Dialog } from "@radix-ui/react-dialog";
import React from "react";
import { DialogCreateOrEditTable } from "../DialogCreateOrEditTable";
import { Button } from "@/components/ui/button";

const HeaderContentAdmin = ({ onOpenChange }) => {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#e96523] to-purple-400 bg-clip-text text-transparent">
            Quản lý bàn
          </h1>
          <p className="text-muted-foreground mt-1">
            Tổng số: 8 bàn • Đang phục vụ: 2
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
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
              className="lucide lucide-search absolute z-10 left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
            <input
              className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm glass-card pl-9 w-full md:w-[200px]"
              placeholder="Tìm kiếm bàn..."
              value=""
            />
          </div>
          <Button
            onClick={() => onOpenChange(true)}
            className="bg-[#e96523] text-white hover:bg-[#e96523]/90 h-10 px-4 py-2"
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
              className="lucide lucide-plus w-4 h-4 mr-2"
            >
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
            Thêm bàn mới
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeaderContentAdmin;
