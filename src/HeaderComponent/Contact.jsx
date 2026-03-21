import React, { useState, useContext, useEffect } from "react";
import "../css/contact.css";
import { authContext } from "../App";
import axios from "axios";
import Swal from "sweetalert2";

const Contact = () => {
  const { userData } = useContext(authContext);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setName(user.username || "");
        setEmail(user.email || "");
        setPhone(user.phonenumber || "");
        setIsLoggedIn(true);
      } catch (error) {
        console.error("user data", error);
      }
    }
  }, [userData]);

  const handledata = async () => {
    if (!name || !email || !phone) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "All fields are required",
        confirmButtonColor: "#56021F"
      });
      return;
    }

    try {
      const response = await axios.post("http://localhost:5100/contact", {
        name,
        email,
        phone
      });

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Your message has been sent successfully!",
          confirmButtonColor: "#56021F"
        });
        if (!isLoggedIn) {
          setName("");
          setEmail("");
          setPhone("");
        }
      }
    } catch (error) {
      console.error("Contact submission error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to send message. Please try again.",
        confirmButtonColor: "#56021F"
      });
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-info">
        <h1 className="contact-title">Contact Us</h1>
        <h2 className="contact-subtitle">DECON FURNITURE</h2>
        <div className="info-item">
          <p className="num">📍 Rajapalayam, Tamil Nadu</p>
          <p className="num">📞 +91 98347 69980</p>
          <p className="num">✉️ info.decon@gmail.com</p>
        </div>
      </div>

      <div className="touch">
        <h1 className="touch-title">Get In Touch</h1>
        <label>Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={name.toUpperCase()}
          onChange={(e) => setName(e.target.value)}
          readOnly={isLoggedIn}
          style={isLoggedIn ? { backgroundColor: "#f0f0f0"  } : {}}
        />
        <label>Phone No</label>
        <input
          type="text"
          placeholder="Enter mobile number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          maxLength={10}
        />
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          readOnly={isLoggedIn}
          style={isLoggedIn ? { backgroundColor: "#f0f0f0" } : {}}
        />
        <button className="csub" onClick={handledata} type="submit">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Contact;
