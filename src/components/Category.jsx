import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/category.css";

const Category = () => {
  //const navigate = useNavigate();

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
      // console.log("Products:", response.data.data);
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

  useEffect(() => {
    getCat();
    getProduct();
  }, []);

  return (
    <>

      <ul className="category-list" style={{display:"flex",justifyContent:"space-around",}}>

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
              marginLeft:"30px",
           

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

      {showProducts && (
        <div className="products-wrapper" style={{ marginLeft: "23px" }}>
          {filterProducts.length > 0 ? (
            filterProducts.map((prod) => (
              <div className="card m-2" style={{ width: "288px" }} key={prod._id}>
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
                    <h4>{(prod.productname.slice(0, 1).toUpperCase() + prod.productname.slice(1, 15).toLowerCase())}</h4>
                  </Link>
                  <p className="card-text" style={{ color: "black" }}>{(prod.description.slice(0, 1).toUpperCase() + prod.description.slice(1, 100).toLowerCase() + "...")}</p>
                  <h5>Rs: {prod.price}</h5>
                  <button className="btn" onClick={() => postCart(pro)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-products" style={{ marginLeft: "20px", fontWeight: "bold" }}>
              No products found
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default Category;
