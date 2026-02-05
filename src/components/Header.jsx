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
            <Nav className="mx-auto">
              <Nav.Link as={NavLink} to="/" className='ilist'>Home</Nav.Link>
              <Nav.Link as={NavLink} to="/products" className='ilist'>Products</Nav.Link>
              <Nav.Link as={NavLink} to="/aboutus" className='ilist'>About Us</Nav.Link>
              <Nav.Link as={NavLink} to="/contact" className='ilist'>Contact</Nav.Link>
            </Nav>
            <Nav className="ms-auto right-nav">
              <Nav.Link onClick={() => navigate('/cart')} className="cart-icon-link" aria-label="Shopping Cart">
                <HiShoppingCart className="cart-icon" />
                <span className="cart-badge">{cart.length}</span>
              </Nav.Link>

              {localData ?(
                <Nav.Link onClick={() => navigate('/userdashboard')} className="username-link">
                  {localData.username}
                </Nav.Link>
             ):(

              <Nav.Link onClick={() => navigate('/login')} className="login-link">
                Login / Register
              </Nav.Link> )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    </>
  );
}

export default Header;
