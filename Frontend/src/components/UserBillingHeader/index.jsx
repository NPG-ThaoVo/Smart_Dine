import React from "react";
import { useNavigate } from "react-router-dom";

const UserBillingHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="glass-header sticky top-0 z-10">
      <div className="px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="glass-button rounded-md h-10 w-10 flex items-center justify-center hover:bg-accent transition-colors"
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
              className="w-5 h-5"
            >
              <path d="m12 19-7-7 7-7"></path>
              <path d="M19 12H5"></path>
            </svg>
          </button>
          <div className="flex-1">
            <h1 className="font-bold text-foreground">Thanh toán</h1>
            <p className="text-sm text-muted-foreground">Bàn 1 - Bàn cửa sổ</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default UserBillingHeader;
