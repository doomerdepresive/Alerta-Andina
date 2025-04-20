import React from "react";
import "./MisionPage.css";

function MeteorologiaPage() {
  return (
    <div className="page-container mision-page">
      <div className="side-decoration left-decoration"></div>

      <main className="main-content">
        <h1 className="page-title">METEOROLOGÍA</h1>
        <p className="page-text">
          El área de Meteorología del SENAMHI realiza el monitoreo continuo del estado del
          tiempo atmosférico, elaborando pronósticos diarios y alertas tempranas. Estos servicios
          apoyan la planificación en sectores como agricultura, salud, transporte y gestión de riesgos.
        </p>
      </main>

      <div className="side-decoration right-decoration"></div>
    </div>
  );
}

export default MeteorologiaPage;
