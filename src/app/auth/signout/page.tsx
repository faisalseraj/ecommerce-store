"use client";

import "./style/style.css";

import { signOut } from "next-auth/react";
import { useEffect } from "react";

const LogoutPage = async () => {
  useEffect(() => {
    const logout = async () => {
          await signOut();
      window.location.href = "/auth";
    
    };
    logout();
  }, []);
  return (
    <div className="logout-container">
      <div className="text-container">
        <h1 className="heading">Goodbye!</h1>
        <p className="subheading">You are now logged out.</p>
      </div>
    </div>
  );
};

export default LogoutPage;
