import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "../css/orderconfirm.css";

const Checkout = () => {
  const [total, setTotal] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [qty, setQty] = useState(1);
  const [userDetails, setUserDetails] = useState({
    fullname: "",
    address: "",
    phonenumber: "",
    city: "",
    pincode: "",
    state: ""
  });
  const [paymentMethod, setPaymentMethod] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };


  const getCartTotal = async () => {
    try {
      const res = await axios.get("http://localhost:5100/cart");


      const validItems = res.data.data.filter(
        item => item.productId !== null
      );

      let sum = 0;
      validItems.forEach((item) => {
        sum += item.productId.price * item.quantity;
      });

      setCartItems(validItems);
      setQty(validItems.reduce((acc, item) => acc + item.quantity, 0));
      setShippingCharge(sum >= 499 ? 0 : 30);
      setTotal(sum);


    } catch (error) {
      console.log("Failed to fetch cart total", error);
    }
  };

  useEffect(() => {
    getCartTotal();
  }, []);


  const handleConfirmOrder = async () => {
    if (
      !userDetails.fullname ||
      !userDetails.address ||
      !userDetails.city ||
      !userDetails.state ||
      !userDetails.pincode ||
      !userDetails.phonenumber
    ) {
      Swal.fire("Error", "Enter complete delivery address", "warning");
      return;
    }

    if (!paymentMethod) {
      Swal.fire("Error", "Select a payment method", "warning");
      return;
    }

    try {
      const products = cartItems.map(item => ({
        productId: item.productId._id,
        quantity: item.quantity,
        price: item.productId.price
      }));

      const userData = localStorage.getItem("userId");
      const parsedUser = userData ? JSON.parse(userData) : null;

      const orderData = {
        userId: parsedUser?._id || parsedUser,
        products,
        deliveryAddress: userDetails,
        totalPrice: total,
        shippingCharge,
        qty,
        paymentMethod
      };

      await axios.post("http://localhost:5100/admin/order", orderData);

      Swal.fire("Success", "Order placed successfully!", "success").then(() => {

      });

      await axios.post("http://localhost:5100/ordersuccessmail", {
        toMail: parsedUser.email,
        order: {
          email: parsedUser.email,
          productname: cartItems.map(i => i.productId.productname).join(", ")
        }

      })

      navigate("/");
      setCartItems([]);

    } catch (error) {
      Swal.fire("Error", "Failed to place order", "error");
      console.error(error);
    }
  };

  return (
    <div className="whol">
      <h3 style={{ color: "#56021F", textAlign: "center" }}>Checkout</h3>

      <div style={{ display: "flex", marginTop: "5%", marginBottom: "5%" }}>
        <div className="cont">
          <h4>Delivery Address</h4>
          <input name="fullname" placeholder="Fullname" value={userDetails.fullname.toUpperCase()} onChange={handleChange} />
          <input name="address" placeholder="Address" value={userDetails.address.toUpperCase()} onChange={handleChange} />
          <input name="phonenumber" maxLength={10} placeholder="Phonenumber" value={userDetails.phonenumber} onChange={handleChange} />
          <input name="city" placeholder="City" value={userDetails.city.toUpperCase()} onChange={handleChange} />
          <input type="number" name="pincode" placeholder="Pincode" value={userDetails.pincode} onChange={handleChange} />
          <input name="state" placeholder="State" value={userDetails.state.toUpperCase()} onChange={handleChange} />
        </div>

        <div>
          <div className="summary">
            <h4>Order Summary</h4>
            <p>Shipping charge: <strong style={{ color: "green" }}>₹ {shippingCharge === 0 ? "Free" : shippingCharge}</strong></p>
            <p>Quantity: <strong >{qty}</strong></p>

            <p>Total Amount: <strong>₹ {total + shippingCharge}</strong></p>
          </div>

          <div className="payment-option">
            <h4>Payment Options</h4>
            <label>
              <input type="radio" value="Gpay" name="payment" onChange={(e) => setPaymentMethod(e.target.value)} />
              G pay
            </label>
            <label>
              <input type="radio" value="PhonePe" name="payment" onChange={(e) => setPaymentMethod(e.target.value)} />
              PhonePe
            </label>
            <label>
              <input type="radio" value="Paytm" name="payment" onChange={(e) => setPaymentMethod(e.target.value)} />
              Paytm
            </label>
            <label>
              <input type="radio" value="COD" name="payment" onChange={(e) => setPaymentMethod(e.target.value)} />
              Cash On Delivery
            </label>
          </div>

          <button className="bt" onClick={handleConfirmOrder}>
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
