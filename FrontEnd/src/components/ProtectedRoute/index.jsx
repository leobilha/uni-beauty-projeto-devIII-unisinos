import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { alertaErro } from "../../functions/functions";

const ProtectedRoute = ({ allowedTypes }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  const userType = localStorage.getItem('userType');

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (allowedTypes && !allowedTypes.includes(userType)) {
    alertaErro({ message: "Não autorizado." });
    return <Navigate to="*" />; 
  }

  return <Outlet />;
};

export default ProtectedRoute;
