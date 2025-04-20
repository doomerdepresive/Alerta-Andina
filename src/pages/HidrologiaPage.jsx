import React from "react";
import "./MisionPage.css";

function HidrologiaPage() {
  return (
    <div className="page-container mision-page">
      <div className="side-decoration left-decoration"></div>

      <main className="main-content">
        <h1 className="page-title">HIDROLOGÍA</h1>
        <p className="page-text">
          La unidad de Hidrología monitorea ríos, lagos y otros cuerpos de agua
          mediante estaciones hidrométricas. Genera alertas por crecidas o inundaciones
          y contribuye con estudios para el manejo sostenible de recursos hídricos.
        </p>
      </main>

      <div className="side-decoration right-decoration"></div>
    </div>
  );
}

export default HidrologiaPage;
