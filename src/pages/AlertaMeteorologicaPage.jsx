import React from "react";
import "./MisionPage.css"; // Reutilizamos base + agregamos estilo visual

function AlertaMeteorologicaPage() {
  return (
    <div className="page-container mision-page">
      <div className="side-decoration left-decoration"></div>

      <main className="main-content">
        <h1 className="page-title" style={{ color: "#d32f2f" }}>
          ⚠ ALERTA METEOROLÓGICA
        </h1>
        <p className="page-text">
          Se pronostican lluvias intensas acompañadas de tormentas eléctricas para las regiones del norte de La Paz,
          Beni y el trópico de Cochabamba durante las próximas 48 horas.
        </p>
        <p className="page-text">
          <strong>Nivel de alerta:</strong> NARANJA
        </p>
        <p className="page-text">
          <strong>Recomendaciones:</strong>
          <ul>
            <li>Evita transitar por ríos o zonas propensas a deslizamientos.</li>
            <li>Mantente informado por medios oficiales.</li>
            <li>Prepara un kit de emergencia.</li>
          </ul>
        </p>
      </main>

      <div className="side-decoration right-decoration"></div>
    </div>
  );
}

export default AlertaMeteorologicaPage;
