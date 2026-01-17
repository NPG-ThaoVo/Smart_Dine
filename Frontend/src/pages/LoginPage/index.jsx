import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import FormLogin from "../../components/FormLogin";
import authContext from "../../contexts/authContext";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { loginWithGoogle } = useContext(authContext);

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
      <FormLogin
        loading={loading}
        handleGoogleLoginWrapper={handleGoogleLoginWrapper}
      />
    </div>
  );
};

export default LoginPage;
