import React from 'react';
import '../css/showcase.css';

const Showcase = () => {
    return (
        <section className="showcase-section">
            <div className="showcase-grid">
                <div className="showcase-image-box">
                    <img
                        src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1000"
                        alt="Artisanal Collection"
                        className="showcase-img"
                    />
                </div>
                <div className="showcase-content-box">
                    <span className="showcase-badge">The Decon Shop</span>
                    <h2 className="showcase-title">Sculpted For Distinction</h2>
                    <p className="showcase-text">
                        Every piece in our new collection is a testament to timeless design
                        and meticulous craftsmanship. Experience furniture that doesn't
                        just fill a room, but defines it.
                    </p>
                    <div className="showcase-highlight-grid">
                        <div className="highlight-item">
                            <span className="highlight-number">01</span>
                            <span className="highlight-label">Handcrafted Excellence</span>
                        </div>
                        <div className="highlight-item">
                            <span className="highlight-number">02</span>
                            <span className="highlight-label">Premium Materials</span>
                        </div>
                        <div className="highlight-item">
                            <span className="highlight-number">03</span>
                            <span className="highlight-label">Timeless Aesthetic</span>
                        </div>
                    </div>
            
                </div>
            </div>
        </section>
    );
};

export default Showcase;
