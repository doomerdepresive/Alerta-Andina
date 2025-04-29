import React, { useState } from "react";
import "./ClimaPage.css";

function ClimaPage() {
  const [tab, setTab] = useState("descripcion");

  return (
    <div className="page-container clima-page">
      <h1 className="page-title">🌡️ Clima</h1>

      <div className="tabs">
        <button onClick={() => setTab("descripcion")} className={tab === "descripcion" ? "active" : ""}>Descripción</button>
        <button onClick={() => setTab("zonas")} className={tab === "zonas" ? "active" : ""}>Zonas Climáticas</button>
        <button onClick={() => setTab("variabilidad")} className={tab === "variabilidad" ? "active" : ""}>Variabilidad</button>
      </div>

      <div className="tab-content">
        {tab === "descripcion" && (
          <div>
            <p>El clima en Bolivia presenta una gran variedad, influenciado por la altitud, latitud y topografía. Aquí mostramos características generales y datos relevantes por zonas.</p>
            <div className="cards-container">
              <div className="card">
                <h3>🗻 Altiplano</h3>
                <p>Frío seco, grandes variaciones térmicas entre día y noche.</p>
              </div>
              <div className="card">
                <h3>🌴 Trópico</h3>
                <p>Alta humedad, lluvias abundantes y temperaturas cálidas.</p>
              </div>
              <div className="card">
                <h3>⛰️ Valles</h3>
                <p>Clima templado con estaciones más marcadas.</p>
              </div>
            </div>
          </div>
        )}

        {tab === "zonas" && (
          <p>Aquí podrás explorar las zonas climáticas de Bolivia: tropical, templado, árido, húmedo, entre otros.</p>
        )}

        {tab === "variabilidad" && (
          <p>Información sobre la variabilidad y cambio climático: eventos extremos, calentamiento global y sus efectos regionales.</p>
        )}
      </div>
    </div>
  );
}

export default ClimaPage;
