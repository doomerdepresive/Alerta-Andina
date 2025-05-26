import React from 'react';
import { Link } from 'react-router-dom';
import './CardItem.css';

function CardItem({ image, title, description, path }) {
  return (
    <Link to={path} className="card-item">
      <div className="card-image-container">
        <img src={image} alt={title} className="card-image" />
        <div className="card-overlay"></div>
      </div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
        <span className="card-link">
          Ver más <i className="fas fa-arrow-right"></i>
        </span>
      </div>
    </Link>
  );
}

export default CardItem;