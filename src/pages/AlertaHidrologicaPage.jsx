import React from "react";
import "./MisionPage.css";

function AlertaHidrologicaPage() {
  return (
    <div className="page-container mision-page">
      <div className="side-decoration left-decoration"></div>

      <main className="main-content">
        <h1 className="page-title" style={{ color: "#1976d2" }}>
          ⚠ ALERTA HIDROLÓGICA
        </h1>
        <p className="page-text">
          Se reporta incremento significativo en el nivel del río Mamoré y sus afluentes,
          con riesgo de desborde en las comunidades cercanas a Trinidad (Beni).
        </p>
        <p className="page-text">
          <strong>Nivel de alerta:</strong> ROJA
        </p>
        <p className="page-text">
          <strong>Recomendaciones:</strong>
          <ul>
            <li>Evacúa las zonas de riesgo si es necesario.</li>
            <li>No cruces puentes o pasos anegados.</li>
            <li>Coordina con autoridades locales.</li>
          </ul>
        </p>
      </main>

      <div className="side-decoration right-decoration"></div>
    </div>
  );
}

export default AlertaHidrologicaPage;
