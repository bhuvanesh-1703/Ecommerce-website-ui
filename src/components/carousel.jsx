import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import image1 from "../assets/baner3.jpg";
import image2 from "../assets/banners-protein.jpg";
import image3 from "../assets/bg.jpg";
import '../css/carousel.css'
function Carousels() {
  const [index, setIndex] = useState(0);

  return (
 
    <Carousel activeIndex={index} onSelect={(selectedIndex) => setIndex(selectedIndex)}>
      <Carousel.Item>
        <img className="d-block w-200" src={image1} alt="First slide" />
        <Carousel.Caption>
      
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-200" src={image3} alt="Second slide" />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img  className="d-block w-200" src={image2} alt="Third slide" />
        <Carousel.Caption>
        
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carousels;
