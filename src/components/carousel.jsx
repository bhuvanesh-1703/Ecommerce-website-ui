import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import '../css/carousel.css';

// Using the generated image and high-quality placeholders for a premium feel
import generatedHero from "../assets/carousel_furniture_2.png";

function Carousels() {
  const [index, setIndex] = useState(0);

  const slides = [
    {
      image: generatedHero,
      title: "Artisanal Elegance",
      description: "Experience the perfect blend of craftsmanship and modern design with our exclusive dining collections."
    },
    {
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1920&q=80",
      title: "Luxurious Comfort",
      description: "Transform your living space with our premium velvet sofas and artisanal coffee tables."
    },
    {
      image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1920&q=80",
      title: "Work with Style",
      description: "Elevate your productivity with our minimalist ergonomic desks and designer office chairs."
    }
  ];

  return (
    <Carousel
      activeIndex={index}
      onSelect={(selectedIndex) => setIndex(selectedIndex)}
      interval={null}
      pause="hover"
    >
      {slides.map((slide, i) => (
        <Carousel.Item key={i}>
          <img
            className="d-block w-100"
            src={slide.image}
            alt={slide.title}
          />
          <Carousel.Caption>
            <h3>{slide.title}</h3>
            <p>{slide.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Carousels;
