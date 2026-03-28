import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  MdDashboard,
  MdInventory,
  MdShoppingCart,
  MdPeople,
  MdAnalytics,
  MdReceipt,
  MdCalendarToday,
  MdSmartToy,
} from "react-icons/md";
import { FaBars } from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    if (windowWidth < 768) {
      setMobileOpen(!mobileOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  const menuItems = [
    { name: "Dashboard", icon: <MdDashboard />, path: "/dashboard" },
    { name: "Products", icon: <MdInventory />, path: "/products" },
    { name: "Orders", icon: <MdShoppingCart />, path: "/orders" },
    { name: "Users", icon: <MdPeople />, path: "/users" },
    { name: "Analytics", icon: <MdAnalytics />, path: "/analytics" },
    { name: "Billing", icon: <MdReceipt />, path: "/billing" },
    { name: "Calendar", icon: <MdCalendarToday />, path: "/calendar" },
    { name: "AI Assistant", icon: <MdSmartToy />, path: "/ai" },
  ];

  const sidebarWidth = collapsed ? "80px" : "250px";

  return (
    <>
      {/* Mobile Hamburger */}
      {windowWidth < 768 && (
        <button
          className="btn btn-warning mobile-hamburger"
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>
      )}

      <div
        className={`sidebar d-flex flex-column ${collapsed ? "collapsed" : ""} ${
          mobileOpen ? "mobile-open" : ""
        }`}
        style={{
          width: sidebarWidth,
          minHeight: "100vh",
          position: "fixed",
          top: 0,
          left: mobileOpen || windowWidth >= 768 ? 0 : "-260px",
          backgroundColor: "#222222",
          color: "#EBBE4D",
          transition: "all 0.3s",
          zIndex: 1050,
        }}
      >
        {/* Header */}
        <div className="sidebar-header d-flex align-items-center justify-content-between p-3 border-bottom border-secondary">
          {!collapsed && <h2 className="m-0">Crown Jewels</h2>}
          <button className="btn-toggle" onClick={toggleSidebar}>
            <FaBars />
          </button>
        </div>

        {/* Menu */}
        <ul className="list-unstyled flex-grow-1 mt-3">
          {menuItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className="sidebar-link d-flex align-items-center"
                onClick={() => windowWidth < 768 && setMobileOpen(false)}
              >
                <span className="sidebar-icon">{item.icon}</span>
                {!collapsed && <span className="ms-2">{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Footer */}
        {!collapsed && (
          <div className="sidebar-footer text-center py-3 text-muted">
            &copy; 2025 Crown Jewels
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
