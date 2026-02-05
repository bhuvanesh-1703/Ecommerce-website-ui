import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Orders from "../UserDashboard/Orders";
import "../css/userDashboard.css";
import { FiBox, FiLogOut } from "react-icons/fi"; 

const UserDashboard = () => {
  const [userName, setUserName] = useState(null);
  const [activeTab, setActiveTab] = useState("orders");
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = () => {
      const storedUser = JSON.parse(localStorage.getItem("userId"));
      if (storedUser) {
        try {
          if (storedUser && typeof storedUser === "object") {
            setUserName(storedUser);
          } else {
            throw new Error("Invalid user data");
          }
        } catch (err) {
          console.error("Failed to parse user data:", err);
          localStorage.removeItem("userId");
          setUserName(null);
          navigate("/login");
        }
      }
    };

    getUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    setUserName(null);
    navigate("/login");
  };

  if (!userName) {
    return (
      <div
        className="dashboard-container"
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <div
          className="dashboard-content"
          style={{ textAlign: "center", maxWidth: "400px" }}
        >
        
          <p>Please log in </p>
          <button
            className="sidebar-nav-item active"
            onClick={() => navigate("/login")}
            style={{ width: "100%", border: "none", marginTop: "20px" }}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case "orders":
      default:
        return <Orders user={userName} />;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2>Dashboard</h2>
          <p style={{ fontSize: "0.85rem", color:'#56021f' }}>
            Welcome back, {userName.username}
          </p>
        </div>

        <div
          className={`sidebar-nav-item ${activeTab === "orders" ? "active" : ""}`}
          onClick={() => setActiveTab("orders")}
        >
          <FiBox /> Orders
        </div>

        <div className="sidebar-logout">
          <div className="sidebar-nav-item" onClick={handleLogout}>
            <FiLogOut /> Log Out
          </div>
        </div>
      </div>

      <div className="dashboard-content">{renderContent()}</div>
    </div>
  );
};

export default UserDashboard;
