import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLogin from "../../components/AdminLogin";
import testLoginGoogle from "../../components/GoogleLogin";

const AdminLoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLoginWrapper = async () => {
    try {
      setLoading(true);
      const data = await testLoginGoogle();
      console.log("Login success:", data);
      localStorage.setItem("userInformation", JSON.stringify(data));
      if (data.data?.accessToken) {
        localStorage.setItem("accessToken", data.data.accessToken);
      }
      navigate("/admin/dashboard");
    } catch (error) {
      console.log("Google login flow failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <AdminLogin
        loading={loading}
        handleGoogleLoginWrapper={handleGoogleLoginWrapper}
      />
    </div>
  );
};

export default AdminLoginPage;
