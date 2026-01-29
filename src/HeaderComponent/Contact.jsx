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
        <h2 className="contact-subtitle">DECON</h2>
        <p className="num">Phone : 983476998</p>
        <p className="num">Rajapalayam</p>
        <p className="num">Decon@gmail.com</p>
      </div>

      <div className="touch">
        <h1 className="touch-title">Get In Touch</h1>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Phone No</label>
        <input
          type="number"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
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
