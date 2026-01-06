import React from "react";
import AdminLogin from "../../components/AdminLogin";
import { useState } from "react";

const adminLoginPage = () => {
  const [loading, setLoading] = useState(false);
  const handleLogin = () => {
    setLoading(true);
  };
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <AdminLogin loading={loading} handleLogin={handleLogin} />
    </div>
  );
};

export default adminLoginPage;
