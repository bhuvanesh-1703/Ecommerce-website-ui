import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaOpencart } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { HiShoppingCart } from "react-icons/hi";
import '../css/header.css';
import { NavLink, useNavigate } from "react-router-dom";
import logo from '../assets/log.png';
import NavbarText from 'react-bootstrap/esm/NavbarText';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { authContext } from '../App';

function Header() {
  const navigate = useNavigate();

  // const [localData] = useState(JSON.parse(localStorage.getItem('userId')));

  const { userData } = useContext(authContext);
  const localData = JSON.parse(userData);
  // console.log("LOcall", JSON.parse(userData));
  const { cart } = useContext(authContext);
  

  // useEffect(()=>{
  //   localData
  // },[])

  return (
    <>
      <Navbar className='header' variant="dark" expand="lg">
        <Container className='header-container'>
          <Navbar.Brand className='brand-icon' onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
          >
            <img src={logo} style={{ width: "50px", fontWeight: "bold" }} alt="Logo" />

            <NavbarText className='brand'>Decon</NavbarText>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className='list'>
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/" className='ilist'>Home</Nav.Link>
              <Nav.Link as={NavLink} to="/products" className='ilist'>Products</Nav.Link>
              <Nav.Link as={NavLink} to="/aboutus" className='ilist'>About Us</Nav.Link>
              <Nav.Link as={NavLink} to="/contact" className='ilist'>Contact</Nav.Link>
              <Nav.Link as={NavLink} to="/userdashboard" className='ilist'>userdashboard</Nav.Link>

            </Nav>
            <Nav className="ms-auto">
              <Nav.Link onClick={() => navigate('/cart')} aria-label="Shopping Cart">
                <HiShoppingCart style={{ color: "#FFD41D", fontSize: "30px" }} />
                <NavbarText style={{ position: "relative", right: "4px", bottom: "5px", backgroundColor: "black", borderRadius: "15px", padding: "1px", color: "white" }}>
                  {cart.length}
                </NavbarText>
              </Nav.Link>
              <Nav.Link onClick={() => navigate('/login')} aria-label="User Profile">

                <NavbarText style={{ color: "white" }}>
                  {localData ? localData.username : "Register / Login"}
                </NavbarText>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
