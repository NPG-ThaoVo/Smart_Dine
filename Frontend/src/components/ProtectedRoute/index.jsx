import React from "react";
import { useContext } from "react";
import authContext from "@/contexts/authContext";
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const { userInfo } = useContext(authContext);
  if (!userInfo) {
    return <Navigate to="/admin/login" />;
  }
  return children;
};

export default ProtectedRoute;
