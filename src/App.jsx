import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

// Layout
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

// Pages
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import Analytics from "./pages/Analytics";
import Billing from "./pages/Billing";
import Calendar from "./pages/Calendar";
import AI from "./pages/AI";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import SignUp from "./pages/Signup"

// Admin layout
const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(window.innerWidth >= 992);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setSidebarOpen(window.innerWidth >= 992);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarWidth = 250;

  return (
    <div className="d-flex" style={{ backgroundColor: "#141414", color: "#EBBE4D" }}>
      <div
        className="position-fixed h-100"
        style={{
          width: sidebarWidth,
          transform: sidebarOpen ? "translateX(0)" : `translateX(-${sidebarWidth}px)`,
          transition: "transform 0.3s ease",
          backgroundColor: "#222222",
          zIndex: 1000,
        }}
      >
        <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      </div>

      {sidebarOpen && windowWidth < 992 && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="position-fixed w-100 h-100"
          style={{ top: 0, left: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 999 }}
        />
      )}

      <div
        style={{
          marginLeft: sidebarOpen && windowWidth >= 992 ? sidebarWidth : 0,
          transition: "margin-left 0.3s ease",
          minHeight: "100vh",
          width: "100%",
          overflowX: "auto",
        }}
      >
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="content p-2 p-md-4" style={{ maxWidth: "100%" }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/users" element={<Users />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/ai" element={<AI />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signup" element = {<SignUp />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />

    </Routes>
  );
}

export default App;
