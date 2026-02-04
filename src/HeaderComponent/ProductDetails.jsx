import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/productDetail.css'
import { TfiCup } from "react-icons/tfi";
import { BsCashCoin } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import { GrSecure } from "react-icons/gr";
import { LuIndianRupee } from "react-icons/lu";
import Swal from 'sweetalert2';

export default function ProductDetails() {
  const id = useParams();
  // console.log(id.product_id);

  const [product, setProduct] = useState([]);

  const getProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:5100/admin/products/${id.product_id}`);
      setProduct(response.data.data);
      // console.log(response.data.data);
    } catch (error) {
      console.log('failed', error);
    }
  };


  const postCart = async (product) => {
    try {
      const userData = localStorage.getItem('userId');
      if (!userData) {
        Swal.fire({ title: "Login First", confirmButtonColor: "#56021F" });
        navigate("/login");
        return;
      }

      const userId = JSON.parse(userData);

      const cart = {
        productId: product._id,
        userId: userId._id || userId,
        quantity: 1
      };

      const response = await axios.post("http://localhost:5100/cart", cart);

      if (response.data.success) {
        Swal.fire({
          toast: true,
          position: "top",
          icon: "success",
          title: response.data.message,
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true
        });

        navigate('/cart');
      }
    } catch (error) {
      console.error("Failed to add cart", error);
    }
  };


  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    getProduct();

    // Tracking recently viewed
    if (id.product_id) {
      const saveRecentlyViewed = () => {
        const stored = localStorage.getItem('recentlyViewed');
        let list = stored ? JSON.parse(stored) : [];

        // Remove if already exists to move to top
        list = list.filter(item => item !== id.product_id);

        // Add to front
        list.unshift(id.product_id);

        // Keep only last 10
        if (list.length > 10) list = list.slice(0, 10);

        localStorage.setItem('recentlyViewed', JSON.stringify(list));
      };
      saveRecentlyViewed();
    }
  }, [id.product_id]);

  return (
    <>
      <div style={{ marginTop: "30px" }}>
        <h1>Product Details</h1>
        <div className='who'>

          <div className='cards'>
            <img src={`http://localhost:5100/uploads/${product.image}`} alt="" />
          </div>
          <div className="detail">
            <h2>{product.productname}</h2>
            <h4>{product.description}</h4>
            <h4><LuIndianRupee size={25} />{product.price}</h4>
            <div className="qty-controls">
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
              <input type="number" value={quantity} readOnly />
              <button onClick={() => quantity > 1 && setQuantity(quantity - 1)}>-</button>
            </div>
            <button style={{ marginTop: "80px" }} className='add-btns' onClick={() => postCart(product)}>
              Add To Cart
            </button>

            <div style={{ display: "flex", marginTop: "50px" }}>
              <div style={{ display: "flex" }}>
                <TfiCup size={38} /><label style={{ marginLeft: "10px" }} htmlFor="">Top Brand</label></div>
              <div style={{ display: "flex" }}><BsCashCoin size={38} style={{ marginTop: "5px", marginLeft: "5px" }} /><label style={{ marginLeft: "10px" }} htmlFor="">Cash On Delivery</label></div>
              <div style={{ display: "flex" }}> <TbTruckDelivery size={38} /><label style={{ marginLeft: "10px" }} htmlFor="">Secure Delivery</label></div>
              <div style={{ display: "flex" }}> <GrSecure size={38} style={{ marginTop: "5px" }} /><label style={{ marginLeft: "10px" }} htmlFor="">Secure Transaction</label></div>
            </div>
          </div>

          <p> <strong>Product Highlights : </strong> {product.productdetails}</p></div>

      </div>
    </>
  );
}
