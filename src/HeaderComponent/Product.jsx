import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Product.css';
import { BsFilterLeft } from "react-icons/bs";
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Product = () => {
  const navigate = useNavigate();

  // States
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 6;

  // Fetch products
  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5100/admin/products");
      setProducts(response.data.data);
    } catch (error) {
      console.error('Failed to fetch products', error);
      Swal.fire({ icon: "error", title: "Oops!", text: "Failed to load products." });
    } finally {
      setLoading(false);
    }
  };

  // Add to cart
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
      Swal.fire({ icon: "error", title: "Oops!", text: "Failed to add product to cart." });
    }
  };

  // Filter products
  const filteredProducts = products.filter((pro) =>
    pro.productname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <h1 className='head' style={{ textAlign: "center", marginTop: "30px", marginBottom: "30px" }}>
        Our Products
      </h1>

      <div style={{ display: "flex", justifyContent: "space-around", margin: "20px" }}>
        <input
          type="search"
          placeholder="Search Product"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ paddingLeft: "10px" }}
        />
        <h3 className='head3' style={{ border: "1px solid black", padding: "5px", cursor: "pointer" }}>
          filter <BsFilterLeft />
        </h3>
      </div>

      {loading ? (
        <p style={{ textAlign: "center", color: "gray" }}>Loading products...</p>
      ) : (
        <div className='whole' style={{ display: 'flex', flexWrap: 'wrap', gap: "50px", marginLeft: "5%" }}>
          {filteredProducts.length > 0 ? (
            currentProducts.map((pro) => (
              <div className="card" key={pro._id} style={{ width: "18rem", backgroundColor: "rgb(253, 253, 253)" }}>
                <img
                  src={`http://localhost:5100/uploads/${pro.image}`}
                  alt={pro.productname}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title" style={{ color: "black" }}>
                    <Link to={`/product/${pro._id}`}>
                      <h4>{pro.productname}</h4>
                    </Link>
                  </h5>

                  <p className="card-text" style={{ color: "black" }}>{pro.description}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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

      {totalPages > 1 && (
        <nav>
          <ul className="pagination"  style={{justifyContent:'center'}}>
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>&laquo;</button>
            </li>
            {[...Array(totalPages)].map((_, i) => (
              <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>&raquo;</button>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default Product;
