// src/components/MeteoCards.jsx
import React from "react";
import "./MeteoCards.css";

function MeteoCards({ datosClima = {} }) {
  // Valores por defecto en caso de que no se pasen datos
  const {
    temperatura = "N/A",
    humedad = "N/A",
    viento = "N/A",
    presion = "N/A",
    uv = "N/A",
    direccionViento = "N/A",
    sensacionTermica = "N/A",
    pronostico = "N/A"
  } = datosClima;

  // Determinar la dirección del viento en formato de flecha
  const obtenerFlechaDireccion = (direccion) => {
    if (!direccion) return "↑";
    
    direccion = direccion.toLowerCase();
    if (direccion.includes("norte")) return "↑";
    if (direccion.includes("sur")) return "↓";
    if (direccion.includes("este")) return "→";
    if (direccion.includes("oeste")) return "←";
    if (direccion.includes("noreste")) return "↗";
    if (direccion.includes("noroeste")) return "↖";
    if (direccion.includes("sureste")) return "↘";
    if (direccion.includes("suroeste")) return "↙";
    return "↑";
  };

  // Obtener icono según condición climática
  const obtenerIconoClima = (condicion) => {
    if (!condicion || condicion === "N/A") return "🌡️";
    
    condicion = condicion.toLowerCase();
    if (condicion.includes("nuboso") || condicion.includes("nublado")) return "☁️";
    if (condicion.includes("lluvia")) return "🌧️";
    if (condicion.includes("soleado")) return "☀️";
    if (condicion.includes("despejado")) return "🌤️";
    if (condicion.includes("tormenta")) return "⛈️";
    return "🌡️";
  };

  // Convertir velocidad del viento en formato legible (asumiendo que es un rango como "5 - 26 km/h")
  const formatearViento = (viento) => {
    if (!viento || viento === "N/A") return "N/A";
    
    // Si ya está formateado como rango, devolverlo tal cual
    if (viento.includes("-")) return viento;
    
    // Si es solo un número, convertirlo a un rango estimado
    const velocidad = parseInt(viento);
    if (isNaN(velocidad)) return viento;
    
    return `${Math.max(1, velocidad - 5)} - ${velocidad + 5} km/h`;
  };

  // Tarjetas informativas de clima
  const tarjetas = [
    {
      titulo: "Temperatura",
      icono: "🌡️",
      valor: temperatura,
      descripcion: `Sensación de ${sensacionTermica}`,
      fondo: "#ffccbc"
    },
    {
      titulo: "Viento",
      icono: obtenerFlechaDireccion(direccionViento),
      valor: formatearViento(viento),
      descripcion: direccionViento,
      fondo: "#c8e6c9"
    },
    {
      titulo: "Humedad",
      icono: "💧",
      valor: humedad,
      descripcion: "Nivel relativo",
      fondo: "#b3e5fc"
    },
    {
      titulo: "Presión",
      icono: "⚖️",
      valor: presion,
      descripcion: "Atmosférica",
      fondo: "#f3e5f5"
    },
    {
      titulo: "Índice UV",
      icono: "🔆",
      valor: uv,
      descripcion: "Protección recomendada",
      fondo: "#ffe082"
    },
    {
      titulo: "Condición",
      icono: obtenerIconoClima(pronostico),
      valor: pronostico,
      descripcion: "Estado del cielo",
      fondo: "#e3f2fd"
    }
  ];

  return (
    <div className="meteo-cards-container">
      <div className="meteo-cards">
        {tarjetas.map((item, i) => (
          <div className="meteo-card" key={i} style={{ backgroundColor: item.fondo }}>
            <div className="card-header">
              <span className="card-titulo">{item.titulo}</span>
              <span className="card-icono">{item.icono}</span>
            </div>
            <div className="card-valor">{item.valor}</div>
            <div className="card-descripcion">{item.descripcion}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MeteoCards;