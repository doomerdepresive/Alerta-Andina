// src/pages/AlertaMeteorologicaPage.jsx
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import styles from "./AlertaMeteorologicaPage.module.css";

function AlertaMeteorologicaPage() {
  const [zonasRiesgo, setZonasRiesgo] = useState([]);
  const [regiones, setRegiones] = useState([]);
  const [regionSeleccionada, setRegionSeleccionada] = useState("todas");
  const [cargando, setCargando] = useState(true);
  const [mostrarMock, setMostrarMock] = useState(false);

  // Debug temporal - eliminar después
  console.log("Estilos cargados:", styles);
  useEffect(() => {
    console.log("Clases CSS disponibles:", Object.keys(styles));
  }, []);

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

  // Función para obtener la clase CSS según el nivel de riesgo
  const obtenerClaseNivel = (nivel) => {
    switch (nivel.toLowerCase()) {
      case 'alto':
        return styles.nivelAlto;
      case 'medio':
        return styles.nivelMedio;
      case 'bajo':
        return styles.nivelBajo;
      default:
        return '';
    }
  };

  return (
    <div className={`${styles.alertaPage} ${styles.withNavbar}`}>
      <div className={styles.alertaHeader}>
        <h1>Alerta Meteorológica</h1>
        <p className={styles.descripcion}>
          Sistema de alerta temprana para condiciones meteorológicas adversas. 
          Identifique zonas de riesgo y consulte pronósticos específicos por región.
        </p>
        <button 
          onClick={() => setMostrarMock(true)} 
          className={styles.btnMock}
        >
          Mostrar Datos de Prueba
        </button>
      </div>

      <div className={styles.filtroSeccion}>
        <h2>Zonas de Riesgo Meteorológico</h2>
        <div className={styles.filtroRegion}>
          <label htmlFor="region-select">Filtrar por región:</label>
          <select
            id="region-select"
            value={regionSeleccionada}
            onChange={(e) => setRegionSeleccionada(e.target.value)}
            className={styles.selectRegion}
          >
            <option value="todas">Todas las regiones</option>
            {regiones.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>
      </div>

      {cargando ? (
        <div className={styles.cargando}>Cargando datos de alertas meteorológicas...</div>
      ) : (
        <div className={styles.zonasContent}>
          <div className={styles.zonasTableContainer}>
            <table className={styles.zonasTable}>
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
                    <tr key={zona.id} className={obtenerClaseNivel(zona.nivelRiesgo)}>
                      <td>{zona.region}</td>
                      <td>{zona.localidad}</td>
                      <td>{zona.nivelRiesgo}</td>
                      <td>{zona.tipoRiesgo}</td>
                      <td>{zona.ultimaActualizacion}</td>
                      <td>
                        <button className={styles.btnDetalles}>Ver Detalles</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className={styles.noData}>
                      No hay alertas meteorológicas activas
                      {regionSeleccionada !== "todas" && ` para la región ${regionSeleccionada}`}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {regionSeleccionada !== "todas" && (
            <div className={styles.pronosticoContainer}>
              <h2>Pronóstico Meteorológico para {regionSeleccionada}</h2>
              <div className={styles.pronosticoGrid}>
                <div className={styles.pronosticoDetalle}>
                  <div className={styles.pronosticoInfo}>
                    <div className={styles.pronosticoIndicadores}>
                      <div className={styles.indicador}>
                        <h4>Precipitaciones</h4>
                        <p>Probabilidad: 70%</p>
                        <p>Intensidad: Moderada</p>
                      </div>
                      <div className={styles.indicador}>
                        <h4>Temperaturas</h4>
                        <p>Mínima: 8°C</p>
                        <p>Máxima: 22°C</p>
                      </div>
                      <div className={styles.indicador}>
                        <h4>Vientos</h4>
                        <p>Velocidad: 15 km/h</p>
                        <p>Dirección: Noreste</p>
                      </div>
                    </div>
                    <div className={styles.pronosticoRecomendaciones}>
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

          <div className={styles.recursosAdicionales}>
            <h3>Recursos Adicionales</h3>
            <div className={styles.recursosLinks}>
              <a href="#" className={styles.recursoLink}>
                <i className="fas fa-file-pdf"></i>
                Manual de Prevención ante Fenómenos Meteorológicos
              </a>
              <a href="#" className={styles.recursoLink}>
                <i className="fas fa-map-marked-alt"></i>
                Mapa Interactivo de Riesgos
              </a>
              <a href="#" className={styles.recursoLink}>
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