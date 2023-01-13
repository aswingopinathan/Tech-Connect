import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../Pages/Admin/HomePage";
import SignInPage from "../Pages/Admin/SignInPage";
import UsersPage from "../Pages/Admin/UsersPage";
import AdminAuthRoutes from "../ProtectedRoutes/AdminAuthRoutes";
import AdminUnauth from "../ProtectedRoutes/AdminUnauth";

function AdminRoutes() {
  return (
    <>
      <Router>
        <Routes>

        <Route element={<AdminUnauth/>}>
          <Route path="/admin" element={<SignInPage />} />
          </Route>

          <Route element={<AdminAuthRoutes/>}>
          <Route path="/admin/home" element={<UsersPage/>} />
          {/* <Route path="/admin/users" element={<UsersPage/>} /> */}

          </Route>

        </Routes>
      </Router>
    </>
  );
}

export default AdminRoutes;
