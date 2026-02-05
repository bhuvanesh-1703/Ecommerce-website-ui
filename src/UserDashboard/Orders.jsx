import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/order.css';
import { FiMapPin, FiTruck } from 'react-icons/fi';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5100/admin/order");

      const storedUser = JSON.parse(localStorage.getItem("userId"));
      const currentUserId = storedUser._id;

      const userOrders = response.data.data.filter(
        order => order.userId?._id?.toString() === currentUserId
      );

      setOrders(userOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
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

                <div className="order-details">
                  <div className="order-info">
                    <h3 className="order-title">
                      <span>Product Name: </span>
                      {order.products?.[0]?.productId?.productname || 'Product'}
                    </h3>

                    <p className="order-text">
                      <FiMapPin size={14} />
                      {order.deliveryAddress?.city}, {order.deliveryAddress?.state}
                    </p>

                    <p className="order-text">
                      <FiTruck size={14} />
                      {order.paymentMethod}
                    </p>

                    <p className="order-text">
                      Qty: {order.products?.[0]?.quantity}
                    </p>

                    <p className="order-text">
                      Status: <strong>{order.status}</strong>
                    </p>
                  </div>

                  <div className="order-price">
                    ₹{order.totalPrice}
                  </div>
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
