import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'

const PaymentSuccess = () => {
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(true)

    const getOrderDetails = async () => {
        try {
            const userData = JSON.parse(localStorage.getItem('userId'))
            if (!userData) {
                Swal.fire({
                    title: "Error!",
                    text: "User not logged in.",
                    icon: "error",
                    confirmButtonColor: "#56021F"
                })
                setLoading(false)
                return
            }

            const response = await axios.get(
                `http://localhost:5100/admin/order?userId=${userData}`,userData
            )
            setOrder(response.data.data)
            // console.log(response.data.data)

        } catch (error) {
            console.error("Order fetch failed:", error)
            Swal.fire({
                title: "Error!",
                text: "Failed to fetch order details.",
                icon: "error",
                confirmButtonColor: "#56021F"
            })
            
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getOrderDetails()
    }, [])

    if (loading) {
        return <p>Loading your order details...</p>
    }

    if (!order) {
        return <p>No order details found.</p>
    }

    

    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <h2>Payment Successful!</h2>
            <p>Thank you for your purchase.</p>
            <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "15px" }}>
                <h3>Order Summary</h3>
                <p><strong>Order ID:</strong> {order._id}</p>
                <p><strong>Total Amount:</strong> ₹{order.totalPrice}</p>
                <p><strong>Status:</strong> {order.status}</p>
                
                <ul>
                    {order.products?.map((item, index) => (
                        <li key={index}>
                            Product ID: {item.productId} - {item.quantity} × ₹{item.price}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default PaymentSuccess
