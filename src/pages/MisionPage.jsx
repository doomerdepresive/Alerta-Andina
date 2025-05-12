// src/pages/MisionPage.jsx

import React from 'react';
import './MisionPage.css';

function MisionPage() {
  return (
    <div className="page-container mision-page">
      {/* Decoración Lateral Izquierda con elementos decorativos */}
      <div className="side-decoration left-decoration">
        <div className="decoration-element"></div>
        <div className="decoration-element"></div>
        <div className="decoration-element"></div>
      </div>

      {/* Contenido Principal */}
      <main className="main-content">
        <div className="content-wrapper">
          <h1 className="page-title">
            <span className="title-decoration"></span>
            MISIÓN
            <span className="title-decoration"></span>
          </h1>
          
          <div className="divider">
            <span className="divider-icon"></span>
          </div>
          
          <p className="page-text">
            Entidad rectora de la actividad meteorológica, hidrológica y actividades afines;
            como institución técnico científica presta servicios especializados que contribuyen al
            desarrollo sostenible del Estado Plurinacional de Bolivia; proporciona información
            hidrometeorológica a todos los usuarios de la información, a los sistemas
            medioambientales para el cuidado de la Madre Tierra; en el ámbito nacional e internacional,
            participa en la vigilancia atmosférica mundial junto a entidades afines; a
            nivel nacional coadyuva en la gestión de riesgos para la prevención y mitigación de
            desastres; miembro de la Organización Meteorológica Mundial (OMM) con
            representación internacional en su actividad.
          </p>
        </div>
      </main>

      {/* Decoración Lateral Derecha con elementos decorativos */}
      <div className="side-decoration right-decoration">
        <div className="decoration-element"></div>
        <div className="decoration-element"></div>
        <div className="decoration-element"></div>
      </div>
    </div>
  );
}

export default MisionPage;