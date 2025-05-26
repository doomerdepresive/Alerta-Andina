import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CardItem from './CardItem';
import './Slider.css';

function Slider() {
  const [activeIndex, setActiveIndex] = useState(0);

  const cards = [
    {
      image: '/images/clima1.jpg',
      title: 'Aplicación Móvil',
      description: 'Accede a información meteorológica desde tu dispositivo móvil',
      path: '/app-movil'
    },
    {
      image: '/images/clima2.jpg',
      title: 'Balance Hídrico Agronómico',
      description: 'Monitoreo y análisis de recursos hídricos para la agricultura',
      path: '/balance-hidrico'
    },
    {
      image: '/images/clima3.jpg',
      title: 'Observatorio Climático',
      description: 'Datos y estadísticas climáticas en tiempo real',
      path: '/observatorio'
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % cards.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="slider-section">
      <div className="slider-container">
        <div className="cards-wrapper">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`card-slide ${index === activeIndex ? 'active' : ''}`}
            >
              <CardItem {...card} />
            </div>
          ))}
        </div>

        <div className="slider-controls">
          {cards.map((_, index) => (
            <button
              key={index}
              className={`slider-dot ${index === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Slider;