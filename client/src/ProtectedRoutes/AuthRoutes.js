import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoutes = () => {
  const isAuth = localStorage.getItem("userInfo");

  return isAuth ? <Outlet /> : <Navigate to="/signin" />;
};

export default AuthRoutes;
