import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Layout
import AdminLayout from "./layouts/AdminLayout";

// Pages (optional if you want direct access, but usually inside layout)
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import Analytics from "./pages/Analytics";
import Billing from "./pages/Billing";
import Calendar from "./pages/Calendar";
import AI from "./pages/AI";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      {/* Root → redirect to dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Admin Layout Wrapper */}
      <Route path="/" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<Orders />} />
        <Route path="users" element={<Users />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="billing" element={<Billing />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="ai" element={<AI />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;