import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdOutlineCancel } from "react-icons/md";
import Swal from 'sweetalert2';
import '../css/cart.css';
import { useNavigate } from 'react-router-dom';
import { LuIndianRupee } from "react-icons/lu";

const AddCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();


  const getCart = async () => {
    try {
      const userData = localStorage.getItem('userId');
      if (!userData) {
        setCartItems([]);
        setTotal(0);
        return;
      }

      const response = await axios.get("http://localhost:5100/cart");

     
      const validItems = response.data.data.filter(
        item => item.productId !== null
      );

      setCartItems(validItems);
      calculateTotal(validItems);
    } catch (error) {
      console.log('Failed to fetch cart', error);
    }
  };

  const handleQtyChange = async (id, qty) => {
    if (qty < 1) return;

    try {
      await axios.put(`http://localhost:5100/cart/${id}`, { quantity: qty });
      getCart();
    } catch (error) {
      console.log("Failed to update quantity", error);
    }


  const calculateTotal = (cart) => {
    let sum = 0;

    cart.forEach(item => {
      if (item.productId) {
        sum += item.productId.price * item.quantity;
      }
    });

    setTotal(sum);

  };


  const handleDeleteProduct = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this product!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#56021F",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`http://localhost:5100/cart/${id}`);
        getCart();
        Swal.fire({
          icon: "success",
          title: "Product deleted successfully",
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <div className="cart-container">
      {cartItems.length === 0 ? (
        <h1 className="empty-cart">No Product Found</h1>
      ) : (
        <table className="cart-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th>Remove</th>
            </tr>
          </thead>

          <tbody>
            {cartItems.map((pro) => (
              <tr key={pro._id}>
                <td>
                  <img
                    src={`http://localhost:5100/uploads/${pro.productId.image}`}
                    alt={pro.productId.productname}
                    className="cart-img"
                  />
                </td>

                <td>{pro.productId.productname}</td>

                <td>
                  <div className="qty-controls">
                    <button onClick={() => handleQtyChange(pro._id, pro.quantity + 1)}>+</button>
                    <input type="number" value={pro.quantity} readOnly />
                    <button onClick={() => handleQtyChange(pro._id, pro.quantity - 1)}>-</button>
                  </div>
                </td>

                <td>Rs: {pro.productId.price}</td>
                <td>Rs: {pro.productId.price * pro.quantity}</td>

                <td>
                  <MdOutlineCancel
                    className="delete-icon"
                    onClick={() => handleDeleteProduct(pro._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {cartItems.length > 0 && (
        <div className="cart-total">
          <h3>Total Amount: <LuIndianRupee size={25} /> {total}</h3>
          <button
            onClick={() => navigate('/userdetails')}
            className="continue-btn"
          >
            Check Out
          </button>
        </div>
      )}
    </div>
  );
};
}

export default AddCart;
