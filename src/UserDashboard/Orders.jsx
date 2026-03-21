import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";
import "../css/order.css";
import { FiMapPin, FiTruck } from "react-icons/fi";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/order`);

      const storedUser = JSON.parse(localStorage.getItem("userId"));
      const currentUserId = storedUser._id;

      console.log(storedUser);

      console.log(currentUserId);

      const userOrders = response.data.data.filter(
        (order) => order.userId._id.toString() === currentUserId,
      );

      setOrders(userOrders);
      console.log(userOrders);
    } catch (error) {
      console.error("fetching orders:", error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      {orders.length > 0 ? (
        <div className="orders-section">
          <div className="dashboard-header">
            <h1>My Orders</h1>
          </div>

          <div className="orders-list">
            {orders.map((order, index) => (
              <div key={order._id || index} className="order-card">
                <div className="order-header">
                  <span className="order-date">
                    {new Date(order.date).toLocaleDateString()}
                  </span>
                </div>

                <div className="order-detail">
                  <div className="order-info">
                    <h3 className="order-title" style={{ color: "black" }}>
                      Product Name:{" "}
                      <strong style={{ color: "#56021f" }}>
                        {order.products?.[0].productId.productname || "Product"}
                      </strong>
                    </h3>

                    <p className="order-text">
                      <FiMapPin size={14} style={{ marginRight: "2px" }} />
                      {order.deliveryAddress.city},{" "}
                      {order.deliveryAddress.state}
                    </p>

                    <p className="order-text">
                      <FiTruck size={14} style={{ marginRight: "2px" }} />
                      {order.paymentMethod}
                    </p>

                    <p className="order-text">
                      Qty: {order.products?.[0]?.quantity}
                    </p>

                    <p className="order-text">
                      Status: <strong>{order.status}</strong>
                    </p>
                  </div>

                  <div className="order-price">₹{order.totalPrice}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="no-orders">
          <h2>No orders found</h2>
        </div>
      )}
    </>
  );
};

export default Orders;
