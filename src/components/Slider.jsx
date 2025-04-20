// src/components/Slider.jsx
import React from 'react';
import CardItem from './CardItem';
import './Slider.css';
function Slider() {
  const cards = [
    { image: '/images/clima1.jpg', title: 'Aplicación Móvil', path: '/app-movil' },
    { image: '/images/clima2.jpg', title: 'Balance Hídrico Agronómico', path: '/balance-hidrico' },
    { image: '/images/clima3.jpg', title: 'Observatorio Climático', path: '/observatorio' },
  ];
  
  return (
    <div className="slider-container">
      {cards.map((card, index) => (
        <CardItem key={index} {...card} />
      ))}
    </div>
  );
}

export default Slider;