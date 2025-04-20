// src/pages/MisionPage.jsx

import React from 'react';
import './MisionPage.css'; // Importamos los estilos específicos

function MisionPage() {
  return (
    // Usamos un div contenedor con clases para estilos generales y específicos
    <div className="page-container mision-page">

      {/* Decoración Lateral Izquierda (Placeholder) */}
      <div className="side-decoration left-decoration">
        {/* El estilo/imagen de fondo se aplicará vía CSS */}
      </div>

      {/* Contenido Principal */}
      <main className="main-content">
        <h1 className="page-title">MISIÓN</h1>
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
      </main>

      {/* Decoración Lateral Derecha (Placeholder) */}
      <div className="side-decoration right-decoration">
        {/* El estilo/imagen de fondo se aplicará vía CSS */}
      </div>

    </div>
  );
}

export default MisionPage;
