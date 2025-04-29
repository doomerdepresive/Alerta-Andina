import React, { useState } from "react";
import "./HidrologiaPage.css";

function HidrologiaPage() {
  const [tab, setTab] = useState("descripcion");

  return (
    <div className="page-container hidrologia-page">
      <h1 className="page-title">💧 Hidrología</h1>

      <div className="tabs">
        <button onClick={() => setTab("descripcion")} className={tab === "descripcion" ? "active" : ""}>Descripción</button>
        <button onClick={() => setTab("cuencas")} className={tab === "cuencas" ? "active" : ""}>Cuencas</button>
        <button onClick={() => setTab("alertas")} className={tab === "alertas" ? "active" : ""}>Alertas Hidrológicas</button>
      </div>

      <div className="tab-content">
        {tab === "descripcion" && (
          <div>
            <p>La hidrología analiza los cuerpos de agua en superficie como ríos y lagos. Aquí monitoreamos niveles, caudales y eventos de crecida que podrían representar riesgo.</p>
            <div className="cards-container">
              <div className="card">
                <h3>🌊 Monitoreo de ríos</h3>
                <p>Sensores miden caudal, nivel y velocidad de corrientes.</p>
              </div>
              <div className="card">
                <h3>🧪 Calidad del agua</h3>
                <p>Estudios periódicos de sedimentos, turbidez y pH.</p>
              </div>
              <div className="card">
                <h3>🚨 Alertas</h3>
                <p>Detección temprana de crecidas y desbordes.</p>
              </div>
            </div>
          </div>
        )}

        {tab === "cuencas" && (
          <p>Descripción y ubicación de las principales cuencas hidrográficas de Bolivia.</p>
        )}

        {tab === "alertas" && (
          <p>Historial de alertas hidrológicas emitidas por zonas críticas.</p>
        )}
      </div>
    </div>
  );
}

export default HidrologiaPage;
