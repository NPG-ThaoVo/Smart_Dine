import React from "react";
import { createContext } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import { getme } from "@/services/api/user";
import testLoginGoogle from "@/components/GoogleLogin";
const authContext = createContext();
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInformation"))?.data?.user || null,
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
          user: response.data.user,
        },
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

  //tạo function AdminLogout
  const AdminLogout = () => {
    setUserInfo(null);
    localStorage.removeItem("userInformation");
    toast.success("Đăng xuất Admin thành công!");
    navigate("/admin/login");
  };

  return (
    <authContext.Provider value={{ userInfo, loginWithGoogle, AdminLogout }}>
      {children}
    </authContext.Provider>
  );
};
export default authContext;
