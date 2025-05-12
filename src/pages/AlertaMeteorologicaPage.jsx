// src/pages/AlertaMeteorologicaPage.jsx
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import "./AlertaMeteorologicaPage.css";

function AlertaMeteorologicaPage() {
  const [zonasRiesgo, setZonasRiesgo] = useState([]);
  const [regiones, setRegiones] = useState([]);
  const [regionSeleccionada, setRegionSeleccionada] = useState("todas");
  const [cargando, setCargando] = useState(true);
  const [mostrarMock, setMostrarMock] = useState(false);

  const datosMock = [
    {
      id: "mock1",
      region: "La Paz",
      localidad: "Zona Sur",
      nivelRiesgo: "Alto",
      tipoRiesgo: "Tormenta",
      ultimaActualizacion: "2025-05-10"
    },
    {
      id: "mock2",
      region: "Cochabamba",
      localidad: "Tiquipaya",
      nivelRiesgo: "Medio",
      tipoRiesgo: "Vientos Fuertes",
      ultimaActualizacion: "2025-05-10"
    },
    {
      id: "mock3",
      region: "Santa Cruz",
      localidad: "Montero",
      nivelRiesgo: "Bajo",
      tipoRiesgo: "Helada",
      ultimaActualizacion: "2025-05-10"
    }
  ];

  useEffect(() => {
    const obtenerZonasRiesgo = async () => {
      if (mostrarMock) {
        setZonasRiesgo(datosMock);
        setRegiones([...new Set(datosMock.map(z => z.region))]);
        setCargando(false);
        return;
      }

      try {
        const tiposMeteorologicos = ["Tormenta", "Helada", "Sequía", "Granizo", "Vientos Fuertes"];
        const zonasCollection = collection(db, "zonas_riesgo");
        const zonasSnapshot = await getDocs(zonasCollection);

        let zonasData = zonasSnapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(zona => tiposMeteorologicos.includes(zona.tipoRiesgo));

        // Si no hay datos en Firebase, usar los falsos
        if (zonasData.length === 0) {
          zonasData = datosMock;
        }

        setZonasRiesgo(zonasData);
        const regionesUnicas = [...new Set(zonasData.map(zona => zona.region))];
        setRegiones(regionesUnicas);
        setCargando(false);
      } catch (error) {
        console.error("Error al obtener zonas de riesgo:", error);
        setCargando(false);
      }
    };

    obtenerZonasRiesgo();
  }, [mostrarMock]);

  const zonasFiltradas =
    regionSeleccionada === "todas"
      ? zonasRiesgo
      : zonasRiesgo.filter(zona => zona.region === regionSeleccionada);

  return (
    <div className="alerta-page with-navbar">
      <div className="alerta-header">
        <h1>Alerta Meteorológica</h1>
        <p className="descripcion">
          Sistema de alerta temprana para condiciones meteorológicas adversas. 
          Identifique zonas de riesgo y consulte pronósticos específicos por región.
        </p>
        <button onClick={() => setMostrarMock(true)} style={{ marginTop: "1rem" }}>
          Mostrar Datos de Prueba
        </button>
      </div>

      <div className="filtro-seccion">
        <h2>Zonas de Riesgo Meteorológico</h2>
        <div className="filtro-region">
          <label htmlFor="region-select">Filtrar por región:</label>
          <select
            id="region-select"
            value={regionSeleccionada}
            onChange={(e) => setRegionSeleccionada(e.target.value)}
          >
            <option value="todas">Todas las regiones</option>
            {regiones.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>
      </div>

      {cargando ? (
        <div className="cargando">Cargando datos de alertas meteorológicas...</div>
      ) : (
        <div className="zonas-content">
          <div className="zonas-table-container">
            <table className="zonas-table">
              <thead>
                <tr>
                  <th>Región</th>
                  <th>Localidad</th>
                  <th>Nivel de Riesgo</th>
                  <th>Tipo de Riesgo</th>
                  <th>Última Actualización</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {zonasFiltradas.length > 0 ? (
                  zonasFiltradas.map(zona => (
                    <tr key={zona.id} className={`nivel-${zona.nivelRiesgo.toLowerCase()}`}>
                      <td>{zona.region}</td>
                      <td>{zona.localidad}</td>
                      <td>{zona.nivelRiesgo}</td>
                      <td>{zona.tipoRiesgo}</td>
                      <td>{zona.ultimaActualizacion}</td>
                      <td>
                        <button className="btn-detalles">Ver Detalles</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="no-data">
                      No hay alertas meteorológicas activas
                      {regionSeleccionada !== "todas" && ` para la región ${regionSeleccionada}`}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {regionSeleccionada !== "todas" && (
            <div className="pronostico-container">
              <h2>Pronóstico Meteorológico para {regionSeleccionada}</h2>
              <div className="pronostico-grid">
                <div className="pronostico-detalle">
                  <div className="pronostico-info">
                    <div className="pronostico-indicadores">
                      <div className="indicador">
                        <h4>Precipitaciones</h4>
                        <p>Probabilidad: 70%</p>
                        <p>Intensidad: Moderada</p>
                      </div>
                      <div className="indicador">
                        <h4>Temperaturas</h4>
                        <p>Mínima: 8°C</p>
                        <p>Máxima: 22°C</p>
                      </div>
                      <div className="indicador">
                        <h4>Vientos</h4>
                        <p>Velocidad: 15 km/h</p>
                        <p>Dirección: Noreste</p>
                      </div>
                    </div>
                    <div className="pronostico-recomendaciones">
                      <h4>Recomendaciones de Prevención</h4>
                      <ul>
                        <li>Manténgase informado a través de los canales oficiales</li>
                        <li>Asegure objetos que puedan ser arrastrados por el viento</li>
                        <li>Evite actividades al aire libre durante condiciones adversas</li>
                        <li>Tenga preparado un kit de emergencia</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="recursos-adicionales">
            <h3>Recursos Adicionales</h3>
            <div className="recursos-links">
              <a href="#" className="recurso-link">
                <i className="fas fa-file-pdf"></i>
                Manual de Prevención ante Fenómenos Meteorológicos
              </a>
              <a href="#" className="recurso-link">
                <i className="fas fa-map-marked-alt"></i>
                Mapa Interactivo de Riesgos
              </a>
              <a href="#" className="recurso-link">
                <i className="fas fa-phone-alt"></i>
                Números de Emergencia
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AlertaMeteorologicaPage;
