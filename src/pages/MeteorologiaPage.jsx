// src/pages/MeteorologiaPage.jsx
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import "./MeteorologiaPage.css";
import MeteoCards from "../components/MeteoCards";

// Datos de simulación para el pronóstico semanal
const pronosticoSemanal = [
  {
    dia: "Hoy",
    fecha: "6 May",
    icono: "🌩️",
    probabilidadLluvia: "80%",
    precipitacion: "3.9 mm",
    tempMax: "14°",
    tempMin: "2°",
    vientoVelocidad: "7 - 27 km/h",
    vientoDireccion: "sur"
  },
  {
    dia: "Mañana",
    fecha: "7 May",
    icono: "🌩️",
    probabilidadLluvia: "80%",
    precipitacion: "2.3 mm",
    tempMax: "15°",
    tempMin: "3°",
    vientoVelocidad: "7 - 29 km/h",
    vientoDireccion: "sur"
  },
  {
    dia: "Jueves",
    fecha: "8 May",
    icono: "🌩️",
    probabilidadLluvia: "80%",
    precipitacion: "1.9 mm",
    tempMax: "15°",
    tempMin: "3°",
    vientoVelocidad: "10 - 34 km/h",
    vientoDireccion: "sureste"
  },
  {
    dia: "Viernes",
    fecha: "9 May",
    icono: "🌤️",
    probabilidadLluvia: "",
    precipitacion: "",
    tempMax: "16°",
    tempMin: "3°",
    vientoVelocidad: "7 - 26 km/h",
    vientoDireccion: "noreste"
  },
  {
    dia: "Sábado",
    fecha: "10 May",
    icono: "🌧️",
    probabilidadLluvia: "90%",
    precipitacion: "1.5 mm",
    tempMax: "13°",
    tempMin: "0°",
    vientoVelocidad: "8 - 28 km/h",
    vientoDireccion: "noreste"
  },
  {
    dia: "Domingo",
    fecha: "11 May",
    icono: "🌧️",
    probabilidadLluvia: "60%",
    precipitacion: "0.2 mm",
    tempMax: "14°",
    tempMin: "2°",
    vientoVelocidad: "8 - 27 km/h",
    vientoDireccion: "sureste"
  },
  {
    dia: "Lunes",
    fecha: "12 May",
    icono: "🌤️",
    probabilidadLluvia: "",
    precipitacion: "",
    tempMax: "14°",
    tempMin: "0°",
    vientoVelocidad: "8 - 31 km/h",
    vientoDireccion: "sureste"
  }
];

// Datos simulados centralizados
const datosSimulados = [
  {
    id: "la-paz",
    region: "La Paz",
    temperatura: "10°",
    humedad: "65%",
    viento: "5 - 26 km/h",
    direccionViento: "Suroeste",
    precipitaciones: "5 mm",
    pronostico: "Parcialmente nuboso",
    sensacionTermica: "10°",
    presion: "1015 hPa",
    uv: "Moderado",
    hora: "16:15",
    dia: "Martes"
  },
  {
    id: "cochabamba",
    region: "Cochabamba",
    temperatura: "22°",
    humedad: "45%",
    viento: "8 km/h",
    direccionViento: "Norte",
    precipitaciones: "1 mm",
    pronostico: "Soleado",
    sensacionTermica: "23°",
    presion: "1013 hPa",
    uv: "Alto",
    hora: "16:15",
    dia: "Martes"
  },
  {
    id: "santa-cruz",
    region: "Santa Cruz",
    temperatura: "28°",
    humedad: "60%",
    viento: "12 km/h",
    direccionViento: "Este",
    precipitaciones: "0 mm",
    pronostico: "Despejado",
    sensacionTermica: "30°",
    presion: "1010 hPa",
    uv: "Alto",
    hora: "16:15",
    dia: "Martes"
  }
];

function MeteorologiaPage() {
  const [datosClima, setDatosClima] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState("La Paz");
  
  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const ref = collection(db, "clima_diario");
        const snapshot = await getDocs(ref);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        if (data.length > 0) {
          console.log("Datos reales obtenidos de Firebase:", data);
          setDatosClima(data);
        } else {
          console.log("No hay datos en Firebase, usando datos simulados");
          setDatosClima(datosSimulados);
        }
      } catch (error) {
        console.error("Error al obtener datos climáticos:", error);
        console.log("Usando datos simulados debido al error");
        setDatosClima(datosSimulados);
      } finally {
        setCargando(false);
      }
    };

    obtenerDatos();
  }, []);

  // Encontrar los datos para la ciudad seleccionada
  const climaCiudadSeleccionada = datosClima.find(
    item => item.region.toLowerCase() === ciudadSeleccionada.toLowerCase()
  ) || datosSimulados[0];

  // Manejador para cambiar la ciudad seleccionada
  const cambiarCiudad = (ciudad) => {
    setCiudadSeleccionada(ciudad);
  };

  // Función para mostrar ícono según condición climática
  const obtenerIconoClima = (condicion) => {
    condicion = condicion.toLowerCase();
    if (condicion.includes("nuboso") || condicion.includes("nublado")) return "☁️";
    if (condicion.includes("lluvia")) return "🌧️";
    if (condicion.includes("soleado")) return "☀️";
    if (condicion.includes("despejado")) return "🌤️";
    if (condicion.includes("tormenta")) return "⛈️";
    return "🌡️";
  };

  return (
    <div className="meteorologia-page with-navbar">
      <div className="contenido">
        <h1 className="titulo">Tiempo en {ciudadSeleccionada}</h1>
        <p className="subtitulo">{climaCiudadSeleccionada.hora} | {climaCiudadSeleccionada.dia}</p>

        {/* Selector de ciudades */}
        <div className="selector-ciudades">
          {datosClima.map(item => (
            <button 
              key={item.id}
              className={`boton-ciudad ${item.region === ciudadSeleccionada ? 'seleccionada' : ''}`}
              onClick={() => cambiarCiudad(item.region)}
            >
              {item.region}
            </button>
          ))}
        </div>

        {cargando ? (
          <p className="cargando">Cargando datos meteorológicos...</p>
        ) : (
          <>
            {/* Tarjeta principal del clima actual */}
            <div className="clima-actual-card">
              <div className="clima-info">
                <div className="clima-condicion">{climaCiudadSeleccionada.pronostico}</div>
                <div className="clima-temperatura">
                  <div className="icono-clima">{obtenerIconoClima(climaCiudadSeleccionada.pronostico)}</div>
                  <div className="temperatura-actual">{climaCiudadSeleccionada.temperatura}</div>
                </div>
                <div className="clima-detalles">
                  <div className="detalle">
                    <span>Sensación de {climaCiudadSeleccionada.sensacionTermica}</span>
                  </div>
                  <div className="detalle">
                    <span>{climaCiudadSeleccionada.direccionViento}</span>
                    <span>{climaCiudadSeleccionada.viento}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pronóstico semanal */}
            <div className="pronostico-semanal">
              {pronosticoSemanal.map((dia, index) => (
                <div key={index} className={`dia-pronostico ${index === 0 ? 'dia-actual' : ''}`}>
                  <div className="dia-header">
                    <div className="dia-nombre">{dia.dia}</div>
                    <div className="dia-fecha">{dia.fecha}</div>
                  </div>
                  <div className="dia-icono">{dia.icono}</div>
                  {dia.probabilidadLluvia && (
                    <div className="dia-lluvia">
                      <span>{dia.probabilidadLluvia}</span>
                      <span>{dia.precipitacion}</span>
                    </div>
                  )}
                  <div className="dia-temperatura">
                    <span className="temp-max">{dia.tempMax}</span>
                    <span className="separador"> / </span>
                    <span className="temp-min">{dia.tempMin}</span>
                  </div>
                  <div className="dia-viento">
                    <div className="viento-direccion">
                      {dia.vientoDireccion === 'sur' && <span className="flecha">↓</span>}
                      {dia.vientoDireccion === 'norte' && <span className="flecha">↑</span>}
                      {dia.vientoDireccion === 'este' && <span className="flecha">→</span>}
                      {dia.vientoDireccion === 'oeste' && <span className="flecha">←</span>}
                      {dia.vientoDireccion === 'noreste' && <span className="flecha">↗</span>}
                      {dia.vientoDireccion === 'noroeste' && <span className="flecha">↖</span>}
                      {dia.vientoDireccion === 'sureste' && <span className="flecha">↘</span>}
                      {dia.vientoDireccion === 'suroeste' && <span className="flecha">↙</span>}
                    </div>
                    <div className="viento-velocidad">{dia.vientoVelocidad}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MeteorologiaPage;