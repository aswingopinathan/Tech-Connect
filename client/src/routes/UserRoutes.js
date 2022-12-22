import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../Pages/Client/HomePage";
import SignInPage from "../Pages/Client/SignInPage";
import SignUpPage from "../Pages/Client/SignUpPage";
import AboutPage from "../Pages/Client/AboutPage";
import UserPage from "../Pages/Client/UserPage";
import AuthRoutes from "../ProtectedRoutes/AuthRoutes";
import UnauthRoutes from "../ProtectedRoutes/UnauthRoutes";
import OtpPage from "../Pages/Client/OtpPage";
import ProfilePage from "../Pages/Client/ProfilePage";
import ChatPage from "../Pages/Chat/Chat"
import ViewProfilePage from "../Pages/Client/ViewProfilePage";

function UserRoutes() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<UnauthRoutes />}>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/otp" element={<OtpPage/>} />

            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Route>

          <Route element={<AuthRoutes />}>
            <Route path="/user" element={<UserPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/viewprofile" element={<ViewProfilePage />} />


            <Route path="/chat" element={<ChatPage />} />

          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default UserRoutes;
