import React from "react";
import '../css/aboutus.css'

const AboutUs = () => {
  return (
    <div className="about-container">
      <section className="hero-section">
        <h1>About Decon</h1>
        <p>Your destination for quality, comfort, and style.</p>
      </section>

      <section className="story-section">
        <h2>Our Story</h2>
        <p>
          Founded in 2020, Decon started with a simple goal: to make premium furniture accessible
          to everyone. Over the years, we have grown from a small local store into a leading
          online destination, known for our commitment to quality and customer satisfaction.
        </p>
      </section>

      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>
          We aim to provide exceptional value and timeless designs that transform your
          living spaces into homes you love.
        </p>
      </section>

      <section className="values-section">
        <h2>Core Values</h2>
        <ul>
          <li>Quality Craftsmanship</li>
          <li>Customer Integrity</li>
          <li>Transparent Pricing</li>
          <li>Reliable Delivery</li>
        </ul>
      </section>

      <section className="team-section">
        <h2>Our Team</h2>
        <p>
          We are a dedicated group of professionals passionate about interior design and
          bringing the best home solutions to our community.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
