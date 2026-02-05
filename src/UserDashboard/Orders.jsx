import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/order.css';
import { FiMapPin, FiTruck } from 'react-icons/fi';

const Orders = () => {
  const [orders, setOrders] = useState([]);


  const getOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5100/admin/order");
      console.log(response.data.data);

      const currentUserId = localStorage.getItem("userId");
      console.log(currentUserId);

      const userOrders = response.data.data.filter(order => {
        const orderUserId = order.userId._id;
        console.log(orderUserId);

        if (currentUserId && orderUserId === currentUserId) {
          return true
        }
      });
 
      setOrders(userOrders);
      console.log("userOrders", userOrders);

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
            <div key={index} className="order-card">
              <div className="order-header">
                <span style={{ color: '#56021f', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  {new Date(order.date).toLocaleDateString()}
                </span>
              </div>

              <div className="order-details">
                <div className="order-info">
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 400, color: '#56021f' }}>Product Name: </span>
                    {order.productId?.productname || order.products?.[0]?.productId?.productname || 'E-commerce Product'}
                  </h3>
                  <p style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <FiMapPin size={14} /> {order.deliveryAddress?.city}, {order.deliveryAddress?.state}
                  </p>
                  <p style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <FiTruck size={14} /> {order.paymentMethod}
                  </p>
                  {order.products && order.products.length > 0 && (
                    <p style={{ fontSize: '0.85rem' }}>
                      Qty: {order.products[0].quantity}
                    </p>
                  )}
                  <p>Status: <strong>{order.status || 'Pending'}</strong></p>
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
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2 style={{ marginTop: '20px', color: '#56021f' }}>No orders found</h2>
      </div>
    )}
  </>
);

};

export default Orders;
