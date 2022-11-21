import React from 'react'
import { Navigate, Outlet } from "react-router-dom";

function AdminUnauth() {
  const adminUnauth = localStorage.getItem("adminInfo");

  return adminUnauth ? <Navigate to="/admin/home" /> : <Outlet />;
  
}

export default AdminUnauth