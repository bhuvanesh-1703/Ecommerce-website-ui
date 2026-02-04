import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Orders from "../UserDashboard/Orders";
import "../css/userDashboard.css";
import { FiBox, FiLogOut, FiUser } from "react-icons/fi";

const UserDashboard = () => {
  const [userName, setUserName] = useState(null);
  const [activeTab, setActiveTab] = useState("orders");
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = () => {
      const storedUser = localStorage.getItem("userId");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          // Validate that parsed user has required fields
          if (parsedUser && typeof parsedUser === "object") {
            setUserName(parsedUser);
          } else {
            throw new Error("Invalid user data");
          }
        } catch (err) {
          console.error("Failed to parse user data:", err);
          // Clear invalid data
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
          <h2>Access Denied</h2>
          <p>Please log in to view your dashboard.</p>
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
        return <Orders user={userName} />;
      case "profile":
        return (
          <div className="profile-section">
            <div className="dashboard-header">
              <h1>My Profile</h1>
            </div>
            <div className="profile-details" style={{ marginTop: "20px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  marginBottom: "30px",
                }}
              >
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    background: "#eee",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2rem",
                  }}
                >
                  <FiUser />
                </div>
                <div>
                  <h2 style={{ margin: 0 }}>{userName?.username || "User"}</h2>
                  <p
                    style={{
                      color: "var(--secondary-text)",
                      margin: "5px 0 0 0",
                    }}
                  >
                    {userName?.email || "No email provided"}
                  </p>
                </div>
              </div>
              <div
                style={{
                  background: "#f9f9f9",
                  padding: "20px",
                  borderRadius: "8px",
                }}
              >
                <div style={{ marginBottom: "15px" }}>
                  <label
                    style={{
                      fontSize: "0.9rem",
                      color: "#666",
                      fontWeight: "600",
                    }}
                  >
                    Email:
                  </label>
                  <p style={{ margin: "5px 0 0 0" }}>
                    {userName?.email || "Not provided"}
                  </p>
                </div>
                <div style={{ marginBottom: "15px" }}>
                  <label
                    style={{
                      fontSize: "0.9rem",
                      color: "#666",
                      fontWeight: "600",
                    }}
                  >
                    Phone:
                  </label>
                  <p style={{ margin: "5px 0 0 0" }}>
                    {userName?.phone || "Not provided"}
                  </p>
                </div>
                <div style={{ marginBottom: "15px" }}>
                  <label
                    style={{
                      fontSize: "0.9rem",
                      color: "#666",
                      fontWeight: "600",
                    }}
                  >
                    Address:
                  </label>
                  <p style={{ margin: "5px 0 0 0" }}>
                    {userName?.address || "Not provided"}
                  </p>
                </div>
                <div>
                  <label
                    style={{
                      fontSize: "0.9rem",
                      color: "#666",
                      fontWeight: "600",
                    }}
                  >
                    Member Since:
                  </label>
                  <p style={{ margin: "5px 0 0 0" }}>
                    {userName?.createdAt
                      ? new Date(userName.createdAt).toLocaleDateString()
                      : "Unknown"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <Orders user={userName} />;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2>Dashboard</h2>
          <p style={{ fontSize: "0.85rem", color: "var(--secondary-text)" }}>
            Welcome back, {userName.username}
          </p>
        </div>

        <div
          className={`sidebar-nav-item ${activeTab === "orders" ? "active" : ""}`}
          onClick={() => setActiveTab("orders")}
        >
          <FiBox /> Orders
        </div>

        <div
          className={`sidebar-nav-item ${activeTab === "profile" ? "active" : ""}`}
          onClick={() => setActiveTab("profile")}
        >
          <FiUser /> Profile
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
