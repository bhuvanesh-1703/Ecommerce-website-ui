import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/category.css";
import Swal from "sweetalert2";

const Category = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [showProducts, setShowProducts] = useState(false);

  const getCat = async () => {
    try {
      const response = await axios.get("http://localhost:5100/admin/category");
      setCategories(response.data.categories);
    } catch (error) {
      console.log("Category fetch failed", error);
    }
  };

  const getProduct = async () => {
    try {
      const response = await axios.get("http://localhost:5100/admin/products");
      setProducts(response.data.data);
    } catch (error) {
      console.log("Failed to fetch products", error);
    }
  };

  const filter = (category) => {
    setActiveCategory(category);
    setShowProducts(true);

    const filtered = products.filter(
      (product) =>
        product.category?.categoryname?.toLowerCase() === category.toLowerCase()
    );

    setFilterProducts(filtered);
  };

  const postCart = async (product) => {
    try {
      const userData = localStorage.getItem("userId");
      if (!userData) {
        Swal.fire({ title: "Login First", confirmButtonColor: "#56021F" });
        navigate("/login");
        return;
      }

      const userId = JSON.parse(userData);
      const cart = {
        productId: product._id,
        userId: userId._id || userId,
        quantity: 1,
      };

      const response = await axios.post("http://localhost:5100/cart", cart);

      if (response.data.success) {
        Swal.fire({
          toast: true,
          position: "top",
          icon: "success",
          title: "Added to Cart!",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      console.error("Failed to add cart", error);
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Failed to add product to cart.",
      });
    }
  };

  useEffect(() => {
    getCat();
    getProduct();
  }, []);

  return (
    <div className="category-section">
      {/* Category Pills */}
      <ul className="category-list">
        {categories.map((cat) => (
          <li
            key={cat._id}
            className={`category-item ${activeCategory === cat.categoryname ? 'active' : ''}`}
            onClick={() => filter(cat.categoryname)}
          >
            <img
              src={`http://localhost:5100/uploads/${cat.image}`}
              alt={cat.categoryname}
            />
            <span>{cat.categoryname}</span>
          </li>
        ))}
      </ul>

      {/* Products Grid */}
      {showProducts && (
        <div className="products-wrapper">
          {filterProducts.length > 0 ? (
            filterProducts.map((prod) => (
              <div className="product-card" key={prod._id}>
                <div className="product-image-container">
                  {prod.image && (
                    <img
                      src={`http://localhost:5100/uploads/${prod.image}`}
                      className="product-image"
                      alt={prod.productname}
                    />
                  )}
                
                </div>

                <div className="product-details">
                  <Link to={`/product/${prod._id}`} className="product-title">
                    {prod.productname.charAt(0).toUpperCase() + prod.productname.slice(1)}
                  </Link>
                  <p className="product-desc">
                    {prod.description}
                  </p>
                  <div className="price-row">
                    <span className="price-tag">₹{prod.price}</span>
                    <button className="add-btn" onClick={() => postCart(prod)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-products">
              <p>No products found in this category yet.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Category;
