import React from "react";
import '../css/accordian.css'
import Ship from "../HeaderComponent/accordion-Ship";

function Flip() {
    return (
        <div className="accordion-page-container">
            <Ship />

            <div className="accordion accordion-flush" id="accordionFlushExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseOne"
                            aria-expanded="false"
                            aria-controls="flush-collapseOne"
                        >
                            Exclusive Design Advice
                        </button>
                    </h2>
                    <div
                        id="flush-collapseOne"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingOne"
                        data-bs-parent="#accordionFlushExample"
                    >
                        <div className="accordion-body">
                            Our designers recommend pairing dark wood textures with neutral walls to create a
                            timeless, premium atmosphere. Keep your shopping experience smooth and inspired.
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseTwo"
                            aria-expanded="false"
                            aria-controls="flush-collapseTwo"
                        >
                            Quality Guarantee
                        </button>
                    </h2>
                    <div
                        id="flush-collapseTwo"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingTwo"
                        data-bs-parent="#accordionFlushExample"
                    >
                        <div className="accordion-body">
                            Every piece of furniture from DECON undergoes rigorous quality testing to ensure
                            durability and aesthetic perfection for your home.
                        </div>
                    </div>
                </div>
            </div>

            <div className="caution-notice">
                <h2>Caution Notice</h2>
                <p>
                    Decon is committed to your security. We never ask for your OTP, password, or
                    personal details via phone. Payments are only processed through our official
                    encrypted platform. Stay safe and shop with confidence.
                </p>
            </div>
        </div>
    );
}

export default Flip;
