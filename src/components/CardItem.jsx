// src/components/CardItem.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CardItem.css';

function CardItem({ image, title, path }) {
  const navigate = useNavigate();

  return (
    <div className="card-item" onClick={() => navigate(path)}>
      <img src={image} alt={title} className="card-image" />
      <h3 className="card-title">{title}</h3>
    </div>
  );
}

export default CardItem;
