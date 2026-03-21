import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { HiShoppingCart } from "react-icons/hi";
import "../css/header.css";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/log.png";
import NavbarText from "react-bootstrap/esm/NavbarText";
import { useContext } from "react";
import { authContext } from "../App";

function Header() {
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(authContext);
  const localData = userData ? JSON.parse(userData) : null;
  const { cart } = useContext(authContext);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    setUserData(null);
    navigate("/login");
  };

  return (
    <>
      <Navbar className="header" variant="dark" expand="lg">
        <Container className="header-container">
          <Navbar.Brand
            className="brand-icon"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            <img
              src={logo}
              style={{ width: "50px", fontWeight: "bold" }}
              alt="Logo"
            />

            <NavbarText className="brand">Decon</NavbarText>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="list">
            <Nav className="mx-auto">
              <Nav.Link as={NavLink} to="/" className="ilist">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/products" className="ilist">
                Products
              </Nav.Link>
              <Nav.Link as={NavLink} to="/aboutus" className="ilist">
                About Us
              </Nav.Link>
              <Nav.Link as={NavLink} to="/contact" className="ilist">
                Contact
              </Nav.Link>
            </Nav>
            <Nav className="ms-auto right-nav">
              <Nav.Link
                onClick={() => navigate("/cart")}
                className="cart-icon-link"
                aria-label="Shopping Cart"
              >
                <HiShoppingCart className="cart-icon" />
                <span className="cart-badge">{cart.length}</span>
              </Nav.Link>

              {localData ? (
                <NavDropdown
                  title={localData.username.toUpperCase()}
                  id="user-dropdown"
                  className="username-dropdown"
                >
                  <NavDropdown.Item onClick={() => navigate("/userdashboard")}>
                    Dashboard
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => navigate("/orders")}>
                    Orders
                  </NavDropdown.Item>
                  {localData.role === "admin" && (
                    <>
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={() => navigate("/admin")}>
                        Admin Panel
                      </NavDropdown.Item>
                    </>
                  )}
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link
                  onClick={() => navigate("/login")}
                  className="login-link"
                >
                  Login / Register
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
