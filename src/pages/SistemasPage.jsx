import React from "react";
import "./MisionPage.css";

function SistemasPage() {
  return (
    <div className="page-container mision-page">
      <div className="side-decoration left-decoration"></div>

      <main className="main-content">
        <h1 className="page-title">SISTEMAS DE INFORMACIÓN</h1>
        <p className="page-text">
          El SENAMHI implementa plataformas digitales para la recolección, procesamiento
          y visualización de datos hidrometeorológicos. Sus sistemas permiten el acceso
          público a información confiable, fomentando la toma de decisiones basadas en evidencias.
        </p>
      </main>

      <div className="side-decoration right-decoration"></div>
    </div>
  );
}

export default SistemasPage;
