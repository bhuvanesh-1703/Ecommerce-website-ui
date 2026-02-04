import React, { useState } from "react";
import "../css/contact.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handledata = () => {
    alert(`Name: ${name}\nPhone: ${phone}\nEmail: ${email}, 'Required ?'`);
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
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Phone No</label>
        <input
          type="number"
          placeholder="Enter mobile number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="csub" onClick={handledata} type="submit">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Contact;
