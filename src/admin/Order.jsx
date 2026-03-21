import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import { MdDeleteForever } from "react-icons/md";
import Swal from 'sweetalert2';
import "./Order.css";

const Order = () => {
  const [orders, setOrders] = useState([]);

  const getOrder = async () => {
    try {
      const usedata = JSON.parse(localStorage.getItem('userId'))
      console.log('userId', usedata)
      const response = await axios.get(`${API_URL}/admin/order`);
      setOrders(response.data.data);
      console.log(response.data.data);
      
    } catch (error) {
      console.log('Failed to fetch orders', error);
    }
  };

  const deleteOrder = async (orderId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`${API_URL}/admin/order/${orderId}`);
          if (response.data.success) {
            Swal.fire(
              'Deleted!',
              'Order has been deleted.',
              'success'
            );
            getOrder(); 
          }
        } catch (error) {
          console.log('Failed to delete order', error);
          Swal.fire(
            'Error!',
            'Failed to delete order.',
            'error'
          );
        }
      }
    });
  };

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <div className="admin-content order-container">
      <h2>Recent Orders</h2>
      <div className="admin-table-wrapper">
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Customer</th>
              <th>Products</th>
              <th>Address</th>
              <th>Total</th>
              <th>Date</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1}</td>
                <td className="product-name-cell">{order.deliveryAddress.fullname}</td>
                <td>
                  <div className="order-items-list">
                    {order.products.map((product, i) => (
                      <div key={i} className="order-item-row">
                        <img
                          src={`${API_URL}/uploads/${product.productId?.image}`}
                          alt=""
                        />
                        <div className="order-item-info">
                          <span className="order-item-name">{product.productId?.productname}</span>
                          <span className="order-item-qty">Qty: {product.quantity}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </td>
                <td style={{ maxWidth: '200px', fontSize: '0.85rem' }}>
                  {order.deliveryAddress.address}, {order.deliveryAddress.city} - {order.deliveryAddress.pincode}
                </td>
                <td className="price-cell">₹{order.totalPrice}</td>
                <td>{new Date(order.date).toLocaleDateString()}</td>
                <td>
                  <span className={`status-badge ${order.status?.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>
                <td>{order.paymentMethod}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteOrder(order._id)}
                  >
                    <MdDeleteForever size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
