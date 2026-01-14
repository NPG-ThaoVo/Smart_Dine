import React from "react";
import { createContext } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
// import { getme } from "@/services/api/user";
import testLoginGoogle from "@/components/GoogleLogin"
const AuthContext = createContext();
export const AuthProvider  = ({ children }) => {
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInformation"))?.data?.user || null
  );
  const loginWithGoogle = async () => {
    try {
      const response = await testLoginGoogle();
      console.log("Google login success:", response);
      
      // Backend trả về { success: true, message: '...', data: { accessToken, user } }
      // Chuẩn hóa dữ liệu từ backend
      const userInformation = {
        data: {
          accessToken: response.data.accessToken,
          user: response.data.user
        }
      };
      // Cập nhật Context (chỉ user object)
      setUserInfo(response.data.user);
      // Lưu localStorage với key "userInformation" và cấu trúc data
      localStorage.setItem("userInformation", JSON.stringify(userInformation));
      toast.success("Đăng nhập Google thành công!");
      return response.data.user;
    } catch (error) {
      console.error("Google login failed:", error);
      toast.error("Đăng nhập Google thất bại!");
      throw error;
    }
  };
  return (
    <AuthContext.Provider
      value={{ userInfo, loginWithGoogle  }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;