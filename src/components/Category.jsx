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

  // Fetch categories
  const getCat = async () => {
    try {
      const response = await axios.get("http://localhost:5100/admin/category");
      setCategories(response.data.categories);
    } catch (error) {
      console.log("Category fetch failed", error);
    }
  };

  // Fetch products
  const getProduct = async () => {
    try {
      const response = await axios.get("http://localhost:5100/admin/products");
      setProducts(response.data.data);
    } catch (error) {
      console.log("Failed to fetch products", error);
    }
  };

  // Filter products by category
  const filter = (category) => {
    setActiveCategory(category);
    setShowProducts(true);

    const filtered = products.filter(
      (product) =>
        product.category?.categoryname?.toLowerCase() === category.toLowerCase()
    );

    setFilterProducts(filtered);
  };

  // Add product to cart
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
          title: response.data.message,
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });

        navigate("/cart");
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
    <>
      {/* Category List */}
      <ul
        className="category-list"
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "25px",
        }}
      >
        {categories.map((cat) => (
          <li
            key={cat._id}
            style={{
              backgroundColor:
                activeCategory === cat.categoryname ? "#333" : "#56021F",
              color: "white",
              cursor: "pointer",
              marginBottom: "8px",
              padding: "10px",
              borderRadius: "5px",
              display: "flex",
              alignItems: "center",
              marginLeft: "30px",
            }}
            onClick={() => filter(cat.categoryname)}
          >
            <img
              src={`http://localhost:5100/uploads/${cat.image}`}
              alt={cat.categoryname}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                marginRight: "10px",
              }}
            />
            {cat.categoryname}
          </li>
        ))}
      </ul>

      {/* Products */}
      {showProducts && (
        <div className="products-wrapper" style={{ marginLeft: "60px" }}>
          {filterProducts.length > 0 ? (
            filterProducts.map((prod) => (
              <div
                className="card m-2"
                style={{ width: "288px" }}
                key={prod._id}
              >
                {prod.image && (
                  <img
                    src={`http://localhost:5100/uploads/${prod.image}`}
                    className="card-img-top"
                    alt={prod.productname}
                  />
                )}
                <div
                  className="card-body"
                  style={{ backgroundColor: "#eee1e1ff" }}
                >
                  <Link to={`/product/${prod._id}`}>
                    <h4>
                      {prod.productname.charAt(0).toUpperCase() +
                        prod.productname.slice(1)}
                    </h4>
                  </Link>
                  <p className="card-text" style={{ color: "black" }}>
                    {prod.description.length > 100
                      ? prod.description.substring(0, 100) + "..."
                      : prod.description}
                  </p>
                  <h5>Rs: {prod.price}</h5>
                  <button className="btn" onClick={() => postCart(prod)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p
              className="no-products"
              style={{ marginLeft: "20px", fontWeight: "bold" }}
            >
              No products found
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default Category;
