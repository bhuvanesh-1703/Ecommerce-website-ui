import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "../css/userdetails.css";

const UserDetails = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [total, setTotal] = useState(0);

  // Fetch cart total
  const getCartTotal = async () => {
    try {
      const res = await axios.get("http://localhost:5100/cart");
      let sum = 0;
      res.data.data.forEach(item => {
        sum += item.productId.price * item.quantity;
      });
      setTotal(sum);
    } catch (err) {
      console.log("Failed to fetch total", err);
    }
  };

  useEffect(() => {
    getCartTotal();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5100/order", {
        ...formData,
        totalAmount: total,
        userId: localStorage.getItem("userId"),
      });

      Swal.fire({
        icon: "success",
        title: "Order placed successfully!",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/ordersuccess");
    } catch (error) {
      console.log("Order failed", error);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div className="checkout-container">
      <h2>Shipping Details</h2>

      <form onSubmit={handlePlaceOrder} className="checkout-form">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          onChange={handleChange}
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          required
          onChange={handleChange}
        />

        <textarea
          name="address"
          placeholder="Full Address"
          required
          onChange={handleChange}
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          required
          onChange={handleChange}
        />

        <input
          type="number"
          name="pincode"
          placeholder="Pincode"
          required
          onChange={handleChange}
        />

        <div className="checkout-total">
          <h3>Total Amount: Rs {total}</h3>
        </div>

        <button type="submit" className="place-order-btn">
          Place Order
        </button>
      </form>
    </div>
  );
};

export default UserDetails;
