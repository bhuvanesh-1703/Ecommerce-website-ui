import React from "react";
import '../css/accordian.css'
import { TbTruckDelivery } from "react-icons/tb";
import { FaShippingFast } from "react-icons/fa";
import { MdOutlineLocalShipping } from "react-icons/md";
import { BiSolidOffer } from "react-icons/bi";
import { RiCustomerService2Fill } from "react-icons/ri";
import Ship from "../HeaderComponent/accordion-Ship";
function Flip() {
    return (
        <>
            <div >
               <Ship/>
                <div className="accordion accordion-flush " id="accordionFlushExample">
                    <div className="accordion-item" style={{ backgroundColor: "#d6c847" }}>
                        <h2 className="accordion-header" id="headingOne">
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseOne"
                                aria-expanded="false"
                                aria-controls="flush-collapseOne"
                            >
                                Our advices
                            </button>
                        </h2>
                        <div
                            id="flush-collapseOne"
                            className="accordion-collapse collapse"
                            data-bs-parent="#accordionFlushExample"
                        >
                            <div className="accordion-body">
                                Keep Shopping Any time
                            </div>
                        </div>
                    </div>
                </div>
                <div className="caution-notice" style={{ border: "none" }}>
                    <h2> CAUTION NOTICE</h2>
                    <p>Decon is committed to your security and satisfaction. We never ask for your OTP, password, or personal details via phone or unsolicited communication.

                        If you receive such a request, do not share any information. We also do not require payments for contests, lucky draws, or promotions outside our official platform.

                        For accurate information, refer to our official website or verified social media. This message is for your safety and public interest.</p>
                </div>
            </div>
        </>
    );
}

export default Flip;
