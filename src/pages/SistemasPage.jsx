import React from "react";
import "./SistemasPage.css";

function SistemasPage() {
  return (
    <div className="page-container sistemas-page">
      <h1 className="page-title">💻 Sistemas de Información</h1>
      <p className="intro">
        Estos son los sistemas digitales que apoyan el monitoreo, análisis y difusión de información climatológica e hidrológica.
      </p>

      <div className="sistemas-grid">
        <div className="sistema-card">
          <h3>🛰️ Sat-Clim</h3>
          <p>Sistema de visualización de imágenes satelitales en tiempo real para análisis meteorológico.</p>
        </div>

        <div className="sistema-card">
          <h3>🌊 HidroTrack</h3>
          <p>Monitorea el comportamiento de los ríos y cuencas con sensores de caudal y altura.</p>
        </div>

        <div className="sistema-card">
          <h3>📡 GeoAlert</h3>
          <p>Emite alertas geolocalizadas a través de mapas interactivos a la población en riesgo.</p>
        </div>
      </div>
    </div>
  );
}

export default SistemasPage;
