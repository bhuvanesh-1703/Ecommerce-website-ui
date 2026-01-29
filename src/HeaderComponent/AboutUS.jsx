import React from "react";
import '../css/aboutus.css'

const AboutUs = () => {
  return (
    <div className="about-container">
      <section className="hero-section">
        <h1>About Us</h1>
        <p>Your trusted destination for quality products.</p>
      </section>

      <section className="story-section">
        <h2>Our Story</h2>
        <p>
          Founded in 2020, we started with a simple mission — to provide
          high-quality products at affordable prices. Today, we proudly serve
          thousands of customers with a seamless online shopping experience.
        </p>
      </section>

      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>
          To deliver exceptional value, quality, and service through innovation
          and customer-centric retail solutions.
        </p>
      </section>

      <section className="values-section">
        <h2>What We Value</h2>
        <ul>
          <li>✔ Customer Satisfaction First</li>
          <li>✔ Quality & Reliability</li>
          <li>✔ Transparency & Trust</li>
          <li>✔ Fast & Secure Delivery</li>
        </ul>
      </section>

      <section className="team-section">
        <h2>Our Team</h2>
        <p>
          We’re a passionate team of designers, developers, and creators
          dedicated to building the best online shopping experience.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
