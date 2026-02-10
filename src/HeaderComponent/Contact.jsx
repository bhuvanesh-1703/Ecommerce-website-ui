import React, { useState, useEffect } from "react";
import "../css/contact.css";
import Swal from "sweetalert2";
import axios from "axios";

const Contact = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

-




  const postContact = async () => {
    if (!name || !phone || !email) {
      Swal.fire({
        title: "Error!",
        text: "Please fill in all fields.",
        icon: "error",
        confirmButtonColor: "#56021F",
      });
      return;
    }

    try {
      const contactData = { name, phone, email };

      const response = await axios.post("http://localhost:5100/contact", contactData
      );

      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Contact details submitted successfully.",
          icon: "success",
          confirmButtonColor: "#56021F",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to submit contact details.",
          icon: "error",
          confirmButtonColor: "#56021F",
        });
      }
    } catch (error) {
      console.error("Error submitting contact details:", error);
      Swal.fire({
        title: "Error!",
        text: error.message || "An error occurred while submitting contact details.",
        icon: "error",
        confirmButtonColor: "#56021F",
      });
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="contact-container">
      <div className="contact-info">
        <h1 className="contact-title">Contact Us</h1>
        <h2 className="contact-subtitle">DECON FURNITURE</h2>
        <div className="info-item">
          <p className="num">📍 Rajapalayam, Tamil Nadu</p>
          <p className="num">📞 +91 98347 69980</p>
          <p className="num">✉️ info.decon</p>
        </div>
      </div>

      <div className="contact-form" >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter your phone number"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <div className="btn-group">
        
          <button onClick={postContact}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
