import React, { useState } from "react";
import { FaBell, FaUserCircle, FaSearch } from "react-icons/fa";
import "./Navbar.css"; // optional for extra styling
import { loginUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";





const Navbar = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);


 

  return (
    <nav
      className="navbar"
      style={{
        backgroundColor: "#1c1c1c",
        color: "#EBBE4D",
        padding: "0.5rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 999,
        borderBottom: "1px solid #3b3b3b",
      }}
    >
      {/* Left Section: Page Title or Search */}
      <div className="navbar-left" style={{ display: "flex", alignItems: "center" }}>
        <div
          className="search-bar"
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#2a2a2a",
            padding: "0.3rem 0.6rem",
            borderRadius: "8px",
          }}
        >
          <FaSearch style={{ color: "#EBBE4D", marginRight: "0.5rem" }} />
          <input
            type="text"
            placeholder="Search..."
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#EBBE4D",
              width: "200px",
            }}
          />
        </div>
      </div>

      {/* Right Section: Icons & Profile */}
      <div className="navbar-right" style={{ display: "flex", alignItems: "center" }}>
        {/* Notifications */}
        <div
          className="navbar-icon"
          style={{
            position: "relative",
            marginRight: "1.5rem",
            cursor: "pointer",
          }}
        >
          <FaBell size={20} />
          <span
            style={{
              position: "absolute",
              top: "-5px",
              right: "-5px",
              backgroundColor: "#EBBE4D",
              color: "#222222",
              fontSize: "0.7rem",
              fontWeight: "bold",
              padding: "2px 5px",
              borderRadius: "50%",
            }}
          >
            3
          </span>
        </div>

        {/* Profile */}
        <div
          className="navbar-profile"
          style={{ position: "relative", cursor: "pointer" }}
          onClick={() => setShowProfileMenu(!showProfileMenu)}
        >
          <FaUserCircle size={28} />
          {showProfileMenu && (
            <div
              className="profile-menu"
              style={{
                position: "absolute",
                top: "35px",
                right: 0,
                backgroundColor: "#2a2a2a",
                color: "#EBBE4D",
                borderRadius: "8px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                width: "150px",
                padding: "0.5rem 0",
                zIndex: 1000,
              }}
            >
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                <li
                  style={{
                    padding: "0.5rem 1rem",
                    cursor: "pointer",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#3b3b3b")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                >
                  Profile
                </li>
                <li
                  style={{
                    padding: "0.5rem 1rem",
                    cursor: "pointer",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#3b3b3b")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                >
                  Settings
                </li>
                <li
                  style={{
                    padding: "0.5rem 1rem",
                    cursor: "pointer",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#3b3b3b")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                >
                  <button onClick={logout}>Logout</button>
                  </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
