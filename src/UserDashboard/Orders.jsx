import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);

  const getOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5100/admin/order");
      setOrders(response.data.data); 
      console.log(response.data.data);
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    
    const storedUser = localStorage.getItem('userId');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
       return <p>login first</p>
      }
    }

   
    getOrders();
  }, []);

  if (orders.length === 0) {
    return <p>No orders found</p>;
  }

  return (
    <div>
      <h2>Orders</h2>
      {user && <h1>Hello, {user.username}</h1>}
      <ul>
      <ul>
  {orders.map((order, index) => (
    <li key={index}>
        <img src={`http://localhost:5100/uploads/${order._Id?.image}`} alt="" />
        <p>Product Name:{order.productId?.productname}</p>
      <p>Order Date: {new Date(order.date).toLocaleString()}</p>
      <p>Status: <strong>{order.status}</strong></p>
      <p>Customer: {order.deliveryAddress.fullname}</p>
      <p>Address: {order.deliveryAddress.address}, {order.deliveryAddress.city}, {order.deliveryAddress.state} - {order.deliveryAddress.pincode}</p>
      <p>Phone: {order.deliveryAddress.phonenumber}</p>
      <p>Payment Method: {order.paymentMethod}</p>
      <p>Total Price: ₹{order.totalPrice}</p>

      <h4>Products:</h4>
      <ul>
        {order.products.map((product, i) => (
          <li key={i}>
            <p>Quantity: {product.quantity}</p>
            <p>Price: ₹{product.price}</p>
          </li>
        ))}
      </ul>
    </li>
  ))}
</ul>

      </ul>
    </div>
  );
};

export default Orders;
