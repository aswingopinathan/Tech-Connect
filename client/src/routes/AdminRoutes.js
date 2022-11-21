import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminHomePage from "../Pages/Admin/AdminHomePage";
import AdminSignInPage from "../Pages/Admin/AdminSignInPage";
import AdminAuthRoutes from "../ProtectedRoutes/AdminAuthRoutes";
import AdminUnauth from "../ProtectedRoutes/AdminUnauth";

function AdminRoutes() {
  return (
    <>
      <Router>
        <Routes>

        <Route element={<AdminUnauth/>}>
          <Route path="/admin" element={<AdminSignInPage />} />
          </Route>

          <Route element={<AdminAuthRoutes/>}>
          <Route path="/admin/home" element={<AdminHomePage/>} />
          </Route>

        </Routes>
      </Router>
    </>
  );
}

export default AdminRoutes;
