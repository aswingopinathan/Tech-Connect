import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const UnauthRoutes = () => {
  const unAuth = localStorage.getItem("userInfo");

  return unAuth ? <Navigate to="/user" /> : <Outlet />;
};

export default UnauthRoutes;
