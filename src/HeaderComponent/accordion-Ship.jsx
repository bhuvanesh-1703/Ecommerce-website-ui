import React from 'react'
import '../css/accord-Ship.css'
import { FaShippingFast } from "react-icons/fa";
import { MdOutlineLocalShipping } from "react-icons/md";
import { BiSolidOffer } from "react-icons/bi";
import { RiCustomerService2Fill } from "react-icons/ri";

const Ship = () => {
    return (
        <div className="ship-whole">
            <div className="ship">
                <div className="ship-icon-wrapper">
                    <MdOutlineLocalShipping />
                </div>
                <h1>Free shipping</h1>
                <p>On All Above Rs.499</p>
            </div>

            <div className="ship">
                <div className="ship-icon-wrapper">
                    <FaShippingFast />
                </div>
                <h1>Fast Delivery</h1>
                <p>Within 24 Hours</p>
            </div>

            <div className="ship">
                <div className="ship-icon-wrapper">
                    <BiSolidOffer />
                </div>
                <h1>Exclusive Offers</h1>
                <p>Lowest Price Online</p>
            </div>

            <div className="ship">
                <div className="ship-icon-wrapper">
                    <RiCustomerService2Fill />
                </div>
                <h1>Loved By Millions</h1>
                <p>Rated 4.8/5 by thousands</p>
            </div>
        </div>
    )
}

export default Ship