import React from "react";
import { useContext } from "react";
import AuthContext from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const { userInfo } = useContext(AuthContext);
  if (!userInfo) {
    return <Navigate to="/admin/login" />;
  }
  return children;
};
export default ProtectedRoute;