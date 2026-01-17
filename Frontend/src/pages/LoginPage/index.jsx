import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AdminLogin from "../../components/AdminLogin";
import AuthContext from "../../contexts/authContext";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { loginWithGoogle } = useContext(AuthContext);

  const handleGoogleLoginWrapper = async () => {
    try {
      setLoading(true);
      const data = await loginWithGoogle();
      console.log("Login success:", data);
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

export default LoginPage;
