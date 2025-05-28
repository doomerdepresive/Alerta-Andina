import React, { useState } from "react";
import pronosticoData from "../data/pronostico.json";
import "./PronosticoRegional.css";

function PronosticoRegional() {
  const regiones = Object.keys(pronosticoData);
  const [regionSeleccionada, setRegionSeleccionada] = useState(regiones[0]);
  const pronostico = pronosticoData[regionSeleccionada];

  return (
    <div className="pronostico-container">
      <h2>🌦️ Pronóstico por Región</h2>

      <select
        value={regionSeleccionada}
        onChange={(e) => setRegionSeleccionada(e.target.value)}
      >
        {regiones.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>

      <div className="dias-pronostico">
        {pronostico.length > 0 ? (
          pronostico.map((dia, index) => (
            <div key={index} className="dia-pronostico">
              <h4>{dia.dia}</h4>
              <p>{dia.icono} {dia.estado}</p>
              <p>🌡️ Máx: {dia.max}°C</p>
              <p>🌡️ Mín: {dia.min}°C</p>
            </div>
          ))
        ) : (
          <p style={{ marginTop: "20px", color: "#666" }}>
            No hay datos disponibles aún para esta región.
          </p>
        )}
      </div>
    </div>
  );
}

export default PronosticoRegional;
