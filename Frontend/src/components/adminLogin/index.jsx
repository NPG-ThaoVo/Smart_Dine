import React from "react";
import { Spinner } from "../ui/spinner";
import { Button } from "../ui/button";
import { User } from "lucide-react";
import AuthContext from "@/contexts/authContext";
import { useContext } from "react";

const AdminLogin = ({ loading, handleGoogleLoginWrapper }) => {
  const { loginAsAdmin } = useContext(AuthContext);

  return (
    <div className="rounded-xl border border-border/30 bg-card/80 text-card-foreground backdrop-blur-xl shadow-md transition-all duration-300 hover:shadow-lg hover:border-border/50 w-full max-w-md">
      <div className="flex flex-col space-y-1.5 p-6 text-center">
        <div className="text-5xl mb-4">🍜</div>
        <h3 className="font-bold tracking-tight text-2xl">SmartDine Admin</h3>
        <p className="font-medium text-sm text-muted-foreground">
          Đăng nhập để quản lý nhà hàng của bạn
        </p>
      </div>
      <div className="p-6 pt-0 space-y-4">
        <Button
          variant="outline"
          disabled={loading}
          onClick={() => handleGoogleLoginWrapper()}
          className="w-full h-12 px-4 text-lg
    rounded-xl shadow-sm
    bg-white text-[#111827] border-[#E5E7EB]
    hover:bg-[#FFF4E5] hover:text-[#E9560C] hover:border-[#F6D4B8]
    focus-visible:ring-[#E9560C] cursor-pointer"
        >
          {loading ? (
            <span className="w-5 h-5">
              <Spinner />
            </span>
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          )}
          <span>Đăng nhập với Google</span>
        </Button>
        <div className="relative">
          <div className="shrink-0 bg-border h-[1px] w-full"></div>
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
            Hoặc
          </span>
        </div>
        <Button
          variant="default"
          className="w-full h-12 px-4 text-lg
    rounded-xl shadow-sm
    bg-[#E9560C] hover:bg-[#d94f0b]
    text-white
    focus-visible:ring-[#E9560C]cursor-pointer"
          onClick={() => loginAsAdmin()}
        >
          <User className="w-5 h-5 mr-2" />
          Đăng nhập Demo
        </Button>
        <p className="font-medium text-center text-sm text-muted-foreground mt-1">
          Chỉ dành cho quản trị viên nhà hàng
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
