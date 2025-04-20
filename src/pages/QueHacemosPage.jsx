// src/pages/QueHacemosPage.jsx
import React from "react";
import "./MisionPage.css"; // Reutilizamos el mismo estilo

function QueHacemosPage() {
  return (
    <div className="page-container mision-page">
      <div className="side-decoration left-decoration"></div>

      <main className="main-content">
        <h1 className="page-title">¿QUÉ HACEMOS?</h1>
        <p className="page-text">
          El SENAMHI realiza el monitoreo, análisis y pronóstico de las condiciones
          meteorológicas e hidrológicas en el país. Proporciona alertas tempranas sobre fenómenos
          extremos, emite informes climáticos y desarrolla herramientas tecnológicas
          para la gestión de riesgos. Además, apoya a instituciones públicas y privadas
          en la toma de decisiones basadas en datos científicos.
        </p>
      </main>

      <div className="side-decoration right-decoration"></div>
    </div>
  );
}

export default QueHacemosPage;
