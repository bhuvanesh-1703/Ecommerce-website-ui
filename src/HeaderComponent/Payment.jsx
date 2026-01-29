import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "../css/payment.css";

const Payment = () => {
  const navigate = useNavigate();
 

  return (
    <div className="payment-container">
      <h2>Select Payment Method</h2>

      <div className="payment-options">
        <label>
          <input type="radio" name="payment"value="GPay"/>
          Google Pay
        </label>

        <label>
          <input type="radio" name="payment" value="PhonePe" />
          PhonePe
        </label>

        <label>
          <input type="radio" name="payment" value="COD" />
          Cash on Delivery
        </label>
      </div>

      <button className="confirm-btn" onClick={handlePayment}>
        Confirm Order
      </button>
    </div>
  );
};

export default Payment;
