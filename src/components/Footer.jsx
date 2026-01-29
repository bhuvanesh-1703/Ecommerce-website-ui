import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import { NavLink, useNavigate } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import '../css/footer.css';
import log from '../assets/log.png'

function Footer() {
    const navigate = useNavigate();
    return (
        <footer className="footer ">
            <Container>
                <Row className="py-4">
                    <Col md={4} className="mb-3" style={{ display: "block" }}>
                        <img src={log} style={{ width: "50px", marginRight: "35%", position: "relative", top: "29px" }} />
                        <h3 className="footer-brand" style={{ marginBottom: "30px", position: "relative", bottom: "10px" }}>Decon</h3>
                        <h6 className="footer-text">
                            Building quality products with trust and innovation.   </h6>
                        <h5>Deserve rights</h5>


                    </Col>

                    <Col md={4} className="mb-3">
                        <h4 style={{ fontFamily: "fangsong", marginTop: "10px",color:"#d6c847" }}>Quick Links</h4>
                        <Nav className="flex-column mt-4 me-auto">
                            <Nav.Link as={NavLink} to="/" className="footer-link mt-2">Home</Nav.Link>
                            <Nav.Link as={NavLink} to="/products" className="footer-link mt-2">Products</Nav.Link>
                            <Nav.Link as={NavLink} to="/aboutus" className="footer-link mt-2" >About Us</Nav.Link>
                            <Nav.Link as={NavLink} to="/contact" className="footer-link mt-2">Contact</Nav.Link>
                            <Nav.Link className="footer-link mt-2">Contact</Nav.Link>

                        </Nav>
                    </Col>


                    <Col md={4} className="mb-3">
                        <h5 style={{ marginLeft: "20px", fontFamily: "fangsong", marginTop: "10px",color:"#d6c847" }}>GET IN TOUCH</h5>
                        <div className="social-icons">
                            <a style={{ color: "#acadad" }} aria-label="Facebook"><FaFacebook /></a>
                            <a style={{ color: "#acadad" }} aria-label="Twitter"><FaTwitter /></a>
                            <a style={{ color: "#acadad" }} aria-label="Instagram"><FaInstagram /></a>
                            <a style={{ color: "#acadad" }} aria-label="LinkedIn"><FaLinkedin /></a>
                        </div>
                        <div className="social-icons">
                            <h5 style={{ marginLeft: "20px", fontFamily: "fangsong", marginTop: "10px",color:"#d6c847" }}>ADDRESS</h5>
                            <p style={{ color: "#acadad" }}>72 Veda Street , Rajapalayam</p>
                        </div>
                        <div className="social-icons">
                            <h5 style={{ marginLeft: "20px", fontFamily: "fangsong", marginTop: "10px",color:"#d6c847" }}>EMAIL</h5>
                            <p style={{ color: "#acadad" }}>72 Veda Street , Rajapalayam</p>
                        </div>
                        <div className="social-icons">
                            <h5 style={{ marginLeft: "20px", fontFamily: "fangsong", marginTop: "10px" ,color:"#d6c847"}}>PHONE NUMBER</h5>
                            <p style={{ color: "#acadad" }}>72 Veda Street , Rajapalayam</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;
