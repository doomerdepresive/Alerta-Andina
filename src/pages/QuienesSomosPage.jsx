// src/pages/QuienesSomosPage.jsx
import React from "react";
import "./MisionPage.css"; // Reutilizamos el mismo estilo

function QuienesSomosPage() {
  return (
    <div className="page-container mision-page">
      <div className="side-decoration left-decoration"></div>

      <main className="main-content">
        <h1 className="page-title">¿QUIÉNES SOMOS?</h1>
        <p className="page-text">
          El SENAMHI es una entidad técnica y científica del Estado Plurinacional de Bolivia,
          encargada de generar y brindar servicios meteorológicos e hidrológicos,
          con el objetivo de contribuir al bienestar de la población y al desarrollo sostenible
          del país mediante la observación, análisis y difusión de información climática
          confiable, oportuna y accesible para todos los sectores.
        </p>
      </main>

      <div className="side-decoration right-decoration"></div>
    </div>
  );
}

export default QuienesSomosPage;
