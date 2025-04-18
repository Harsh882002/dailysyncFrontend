 import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthRoute = ({ children, type }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (type === "private" && (!token || !user)) {
    return <Navigate to="/" replace />;
  }

  if (type === "public" && token && user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AuthRoute;
