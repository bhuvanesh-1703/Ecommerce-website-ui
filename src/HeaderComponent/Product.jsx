import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Product.css";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

const Product = () => {
  const navigate = useNavigate();

  // States
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest");

  // Fetch products
  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5100/admin/products");
      setProducts(response.data.data);
    } catch (error) {
      console.error("Failed to fetch products", error);
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Failed to load products.",
      });
    } finally {
      setLoading(false);
    }
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

  // Filtering + sorting
  let filteredProducts = products.filter((pro) =>
    pro.productname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (sortBy === "price-low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === "newest") {
    filteredProducts.reverse();
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <h1
        className="head"
        style={{ textAlign: "center", marginTop: "30px", marginBottom: "30px" }}
      >
        Our Products
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "20px",
          gap: "15px",
          flexWrap: "wrap",
        }}
      >
        <input
          type="search"
          placeholder="Search Product"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ paddingLeft: "10px", padding: "10px", minWidth: "200px" }}
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            cursor: "pointer",
            minWidth: "160px",
          }}
        >
          <option value="newest">Newest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      {loading ? (
        <p style={{ textAlign: "center", color: "gray" }}>
          Loading products...
        </p>
      ) : (
        <div
          className="whole"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "50px",
            marginLeft: "5%",
          }}
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((pro) => (
              <div
                className="card"
                key={pro._id}
                style={{
                  width: "18rem",
                  backgroundColor: "rgb(255, 255, 255)",
                }}
              >
                <img
                  src={`http://localhost:5100/uploads/${pro.image}`}
                  alt={pro.productname}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title" style={{ color: "black" }}>
                    <Link to={`/product/${pro._id}`}>
                      <h4>
                        {pro.productname.slice(0, 1).toUpperCase() + pro.productname.slice(1, 15).toLowerCase()}
                      </h4>
                    </Link>
                  </h5>

                  <p className="card-text" style={{ color: "black" }}>
                    {pro.description.slice(0, 1).toUpperCase() +
                      pro.description.slice(1, 100).toLowerCase() +
                      "..."}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <h5>Rs: {pro.price}</h5>
                    <button className="btn" onClick={() => postCart(pro)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p style={{ marginLeft: "5%", color: "gray" }}>No products found</p>
          )}
        </div>
      )}
    </>
  );
};

export default Product;
