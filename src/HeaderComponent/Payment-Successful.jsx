import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FiCheckCircle, FiPackage, FiArrowRight } from "react-icons/fi";
import { authContext } from "../App";
import "../css/userDashboard.css";

const PaymentSuccess = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { setCart } = useContext(authContext);

  const getOrderDetails = async () => {
    try {
      const userData = localStorage.getItem("userId");
      if (!userData) {
        Swal.fire({
          title: "Error!",
          text: "User not logged in.",
          icon: "error",
          confirmButtonColor: "#56021F",
        });
        setLoading(false);
        return;
      }

      const parsedUser = JSON.parse(userData);
      const userId = parsedUser._id || parsedUser;

      const response = await axios.get(`http://localhost:5100/admin/order`);
      const allOrders = response.data.data;

      // Filter orders for this user with robust comparison
      const userOrders = allOrders.filter((o) => {
        const orderUserId = o.userId?._id || o.userId;
        return orderUserId && userId && String(orderUserId) === String(userId);
      });
      if (userOrders.length > 0) {
        // Show most recent order
        setOrder(userOrders[userOrders.length - 1]);

        // Clear cart after successful order
        setCart([]);
      }
    } catch (error) {
      console.error("Order fetch failed:", error);
      // Don't show modal error here to avoid interrupting the success feeling
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrderDetails();
  }, []);

  if (loading) {
    return (
      <div className="success-container">
        <p>Establishing secure connection and retrieving order details...</p>
      </div>
    );
  }

  return (
    <div className="success-container">
      <div className="success-card">
        <div className="success-icon-wrapper">
          <FiCheckCircle />
        </div>
        <h2>Order Successful!</h2>
        <p>Your order has been placed and is being processed.</p>

        {order ? (
          <div className="order-summary-box">
            <h3>Order Summary</h3>
            <div
              style={{
                display: "flex",
                gap: "15px",
                marginBottom: "20px",
                alignItems: "center",
                borderBottom: "1px solid #f0f0f0",
                paddingBottom: "15px",
              }}
            >
              <img
                src={`http://localhost:5100/uploads/${order.productId?.image || order.products?.[0]?.productId?.image}`}
                alt=""
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "8px",
                  objectFit: "contain",
                  background: "#f9f9f9",
                }}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/60?text=Product";
                }}
              />
              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.9rem",
                    color: "var(--secondary-text)",
                  }}
                >
                  Product
                </p>
                <p style={{ margin: 0, fontWeight: 600 }}>
                  {order.productId?.productname ||
                    order.products?.[0]?.productId?.productname ||
                    "E-commerce Product"}
                </p>
              </div>
            </div>
            <div className="summary-row">
              <span>Order ID</span>
              <span>#{order._id?.slice(-8).toUpperCase()}</span>
            </div>
            <div className="summary-row">
              <span>Total Amount</span>
              <span
                style={{ color: "var(--accent-color)", fontSize: "1.2rem" }}
              >
                ₹{order.totalPrice}
              </span>
            </div>
            <div className="summary-row">
              <span>Payment Method</span>
              <span>{order.paymentMethod}</span>
            </div>
            <div className="summary-row">
              <span>Status</span>
              <span
                className={`order-status status-${order.status?.toLowerCase() || "pending"}`}
                style={{ padding: "2px 10px", fontSize: "0.8rem" }}
              >
                {order.status || "Confirmed"}
              </span>
            </div>
          </div>
        ) : (
          <div className="order-summary-box" style={{ textAlign: "center" }}>
            <p>
              We couldn't retrieve the latest order summary, but your payment
              was confirmed.
            </p>
          </div>
        )}

        <div className="success-actions">
          <button
            className="btn-primary"
            onClick={() => navigate("/userdashboard")}
          >
            Go to Dashboard <FiArrowRight style={{ marginLeft: "10px" }} />
          </button>
          <button
            className="btn-secondary"
            onClick={() => navigate("/products")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
