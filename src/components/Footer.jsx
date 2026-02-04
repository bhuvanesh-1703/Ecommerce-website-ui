import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import { NavLink, useNavigate } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import '../css/footer.css';
import log from '../assets/log.png';

function Footer() {
    const navigate = useNavigate();
    return (
        <footer className="footer">
            <Container>
                <Row>
                    <Col md={4} className="mb-4">
                        <div className="d-flex align-items-center mb-3">
                            <img src={log} style={{ width: "40px", filter: "brightness(1.5)" }} alt="Decon Logo" />
                            <h3 className="footer-brand mb-0 ml-2" style={{ marginLeft: '15px' }}>Decon</h3>
                        </div>
                        <p className="footer-text">
                            Crafting high-quality, artisanal furniture that brings comfort and timeless style to every corner of your home.
                        </p>
                        <div className="social-icons">
                            <a href="#" aria-label="Facebook"><FaFacebook /></a>
                            <a href="#" aria-label="Twitter"><FaTwitter /></a>
                            <a href="#" aria-label="Instagram"><FaInstagram /></a>
                            <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
                        </div>
                    </Col>

                    <Col md={4} className="mb-4 d-flex justify-content-md-center">
                        <div>
                            <h4 className="footer-section-title">Quick Links</h4>
                            <Nav className="flex-column mt-3">
                                <Nav.Link as={NavLink} to="/" className="footer-link">Home</Nav.Link>
                                <Nav.Link as={NavLink} to="/products" className="footer-link">Products</Nav.Link>
                                <Nav.Link as={NavLink} to="/aboutus" className="footer-link">About Us</Nav.Link>
                                <Nav.Link as={NavLink} to="/contact" className="footer-link">Contact</Nav.Link>
                            </Nav>
                        </div>
                    </Col>

                    <Col md={4} className="mb-4">
                        <h4 className="footer-section-title">Get In Touch</h4>
                        <div className="footer-contact-item mt-3">
                            <span className="footer-contact-label">Address</span>
                            <p className="footer-contact-value">72 Veda Street, Rajapalayam, TN</p>
                        </div>
                        <div className="footer-contact-item">
                            <span className="footer-contact-label">Email</span>
                            <p className="footer-contact-value">info.decon@gmail.com</p>
                        </div>
                        <div className="footer-contact-item">
                            <span className="footer-contact-label">Call Us</span>
                            <p className="footer-contact-value">+91 98347 69980</p>
                        </div>
                    </Col>
                </Row>

                <div className="footer-bottom">
                    <p>© {new Date().getFullYear()} DECON . ALL RIGHTS RESERVED.</p>
                </div>
            </Container>
        </footer>
    );
}

export default Footer;
