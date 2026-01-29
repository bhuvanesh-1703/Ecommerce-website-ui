import React from 'react'
import '../css/accord-Ship.css'
import { TbTruckDelivery } from "react-icons/tb";
import { FaShippingFast } from "react-icons/fa";
import { MdOutlineLocalShipping } from "react-icons/md";
import { BiSolidOffer } from "react-icons/bi";
import { RiCustomerService2Fill } from "react-icons/ri";

const Ship = () => {
    return (
        <>
            <div className="ship-whole" style={{ border: "1px", borderColor: "black" }}>
                <div className="ship">
                    <h1 style={{ color: "black" }}>Free shipping</h1>
                    <p style={{ color: 'gray' }}>On All Above Rs.499</p>
                    <h1><MdOutlineLocalShipping style={{ color: "#be5d5dff" }} /></h1>
                </div>
                <div className="ship">
                    <h1 style={{ color: "black" }}>Fast Delivery</h1>
                    <p style={{ color: 'gray' }}>With In 24 hrs</p>
                    <h1><FaShippingFast style={{ color: "#be5d5dff" }} /></h1>
                </div>
                <div className="ship">
                    <h1 style={{ color: "black" }}>Exclusive Offers</h1>
                    <p style={{ color: 'gray' }}>Lowest Price In website</p>
                    <h1><BiSolidOffer style={{ color: "#be5d5dff" }} /></h1>
                </div>
                <div className="ship" >
                    <h1 style={{ color: "black" }}>Loved By 5+ Million Costomer</h1>
                    <p style={{ color: 'gray' }}>Rated 4.8/5 by thousands</p>
                    <h1><RiCustomerService2Fill style={{ color: "#be5d5dff" }} /></h1>
                </div>
            </div>
        </>

    )
}

export default Ship