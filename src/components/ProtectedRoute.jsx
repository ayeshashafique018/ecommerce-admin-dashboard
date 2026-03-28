// src/components/ProtectedRoute.jsx
import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ roleRequired }) {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (token && user?.role === roleRequired) {
      setIsAllowed(true);
    } else {
      setIsAllowed(false);
    }
    setAuthChecked(true);
  }, [roleRequired]);

  if (!authChecked) {
    // Show a loader while checking auth
    return (
      <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#141414", color: "#EBBE4D" }}>
        <h2>Checking authentication...</h2>
      </div>
    );
  }

  return isAllowed ? <Outlet /> : <Navigate to="/login" replace />;
}
