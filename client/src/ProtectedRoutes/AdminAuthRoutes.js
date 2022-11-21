import React from 'react'
import { Navigate, Outlet } from "react-router-dom";

function AdminAuthRoutes() {
  const isAdminAuth = localStorage.getItem("adminInfo");

  return isAdminAuth ? <Outlet /> : <Navigate to="/admin" />;
}

export default AdminAuthRoutes