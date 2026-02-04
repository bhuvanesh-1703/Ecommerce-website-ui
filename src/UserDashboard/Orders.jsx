import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiPackage, FiCalendar, FiMapPin, FiTruck } from 'react-icons/fi';

const Orders = ({ user }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5100/admin/order");
      // Filter orders for the current user with robust comparison
      const userOrders = response.data.data.filter(order => {
        const orderUserId = order.userId?._id || order.userId;
        const currentUserId = user?._id || (typeof user === 'string' ? user : null);

        return orderUserId && currentUserId && String(orderUserId) === String(currentUserId);
      });
      setOrders(userOrders.reverse()); // Show newest first
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      getOrders();
    }
  }, [user]);

  if (loading) {
    return <p>Loading orders...</p>;
  }

  if (orders.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <FiPackage size={48} color="#ccc" />
        <h2 style={{ marginTop: '20px', color: 'var(--secondary-text)' }}>No orders found</h2>
        <p>You haven't placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div className="orders-section">
      <div className="dashboard-header">
        <h1>My Orders</h1>
      </div>

      <div className="orders-list">
        {orders.map((order, index) => (
          <div key={index} className="order-card">
            <div className="order-header">
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <span style={{ fontWeight: 600 }}>Order #{order._id?.slice(-8).toUpperCase()}</span>
                <span style={{ color: 'var(--secondary-text)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <FiCalendar /> {new Date(order.date).toLocaleDateString()}
                </span>
              </div>
              <span className={`order-status status-${order.status?.toLowerCase() || 'pending'}`}>
                {order.status || 'Pending'}
              </span>
            </div>

            <div className="order-details">
              <img
                className="order-image"
                src={`http://localhost:5100/uploads/${order.productId?.image || order.products?.[0]?.productId?.image}`}
                alt={order.productId?.productname || order.products?.[0]?.productId?.productname}
                onError={(e) => { e.target.src = 'https://via.placeholder.com/100?text=Product'; }}
              />

              <div className="order-info">
                <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 400, color: 'var(--secondary-text)' }}>Product Name: </span>
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
              </div>

              <div className="order-price">
                ₹{order.totalPrice}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
