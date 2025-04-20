import React from "react";
import "./MisionPage.css";

function ClimaPage() {
  return (
    <div className="page-container mision-page">
      <div className="side-decoration left-decoration"></div>

      <main className="main-content">
        <h1 className="page-title">CLIMA</h1>
        <p className="page-text">
          La sección de Clima proporciona información estadística sobre las condiciones
          atmosféricas a largo plazo. Genera reportes climatológicos históricos,
          estudios de variabilidad y escenarios futuros para la adaptación al cambio climático.
        </p>
      </main>

      <div className="side-decoration right-decoration"></div>
    </div>
  );
}

export default ClimaPage;
