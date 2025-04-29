import React, { useState } from "react";
import "./MeteorologiaPage.css";

function MeteorologiaPage() {
  const [tab, setTab] = useState("descripcion");

  return (
    <div className="page-container meteorologia-page">
      <h1 className="page-title">📡 Meteorología</h1>

      {/* Tabs */}
      <div className="tabs">
        <button onClick={() => setTab("descripcion")} className={tab === "descripcion" ? "active" : ""}>Descripción</button>
        <button onClick={() => setTab("estaciones")} className={tab === "estaciones" ? "active" : ""}>Estaciones</button>
        <button onClick={() => setTab("boletines")} className={tab === "boletines" ? "active" : ""}>Boletines</button>
        <button onClick={() => setTab("mapas")} className={tab === "mapas" ? "active" : ""}>Mapas</button>
      </div>

      {/* Contenido por tab */}
      <div className="tab-content">
        {tab === "descripcion" && (
          <div>
            <p>La meteorología es la ciencia que estudia los fenómenos atmosféricos. A través de estaciones automáticas y sensores, recopilamos información para generar alertas oportunas.</p>
            <div className="cards-container">
              <div className="card">
                <h3>📈 Datos diarios</h3>
                <p>Temperatura, humedad, viento, presión.</p>
              </div>
              <div className="card">
                <h3>🛰️ Sensores satelitales</h3>
                <p>Vigilancia constante de fenómenos extremos.</p>
              </div>
              <div className="card">
                <h3>🕒 Alertas a tiempo</h3>
                <p>Monitoreo en tiempo real y emisión de alertas.</p>
              </div>
            </div>
          </div>
        )}

        {tab === "estaciones" && (
          <p>Actualmente contamos con más de 150 estaciones meteorológicas distribuidas a lo largo del territorio boliviano.</p>
        )}

        {tab === "boletines" && (
          <p>Aquí se mostrarán los boletines climáticos semanales.</p>
        )}

        {tab === "mapas" && (
          <p>Próximamente: mapas interactivos con visualización de condiciones climáticas por región.</p>
        )}
      </div>
    </div>
  );
}

export default MeteorologiaPage;
