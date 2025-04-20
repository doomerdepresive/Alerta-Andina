// src/pages/VisionPage.jsx
import React from "react";
import "./MisionPage.css"; // Reutilizamos los estilos de misión

function VisionPage() {
  return (
    <div className="page-container mision-page">
      <div className="side-decoration left-decoration"></div>

      <main className="main-content">
        <h1 className="page-title">VISIÓN</h1>
        <p className="page-text">
          El SENAMHI es una institución técnico científica de excelencia,
          reconocida nacional e internacionalmente, líder en servicios meteorológicos e hidrológicos,
          moderna, integrada a la planificación nacional, con una gestión institucional
          transparente, eficaz y eficiente, con talento humano altamente calificado
          y comprometido con el desarrollo sostenible y la protección de la vida.
        </p>
      </main>

      <div className="side-decoration right-decoration"></div>
    </div>
  );
}

export default VisionPage;
