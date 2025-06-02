// src/pages/AlertaHidrologicaPage.jsx
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import styles from "./AlertaHidrologicaPage.module.css";
import HydroRiskMap from "../components/HydroRiskMap";

// Datos falsos más completos
const datosSimulados = [
  {
    id: "zona-1",
    region: "La Paz",
    localidad: "Río Choqueyapu - Centro",
    nivelRiesgo: "Alto",
    tipoRiesgo: "Crecida",
    ultimaActualizacion: "28/05/2025 15:45",
    coordenadas: { lat: -16.5000, lng: -68.1333 }
  },
  {
    id: "zona-2",
    region: "La Paz",
    localidad: "Achumani - Zona Sur",
    nivelRiesgo: "Medio",
    tipoRiesgo: "Inundación",
    ultimaActualizacion: "28/05/2025 15:20",
    coordenadas: { lat: -16.5397, lng: -68.1193 }
  },
  {
    id: "zona-3",
    region: "Cochabamba",
    localidad: "Río Rocha - Cercado",
    nivelRiesgo: "Alto",
    tipoRiesgo: "Desborde",
    ultimaActualizacion: "28/05/2025 14:50",
    coordenadas: { lat: -17.3895, lng: -66.1568 }
  },
  {
    id: "zona-4",
    region: "Santa Cruz",
    localidad: "Río Pirai - Norte",
    nivelRiesgo: "Medio",
    tipoRiesgo: "Crecida",
    ultimaActualizacion: "28/05/2025 16:10",
    coordenadas: { lat: -17.8146, lng: -63.1560 }
  },
  {
    id: "zona-5",
    region: "La Paz",
    localidad: "El Alto - Río Seco",
    nivelRiesgo: "Bajo",
    tipoRiesgo: "Inundación",
    ultimaActualizacion: "28/05/2025 13:30",
    coordenadas: { lat: -16.5000, lng: -68.1500 }
  },
  {
    id: "zona-6",
    region: "Oruro",
    localidad: "Río Desaguadero",
    nivelRiesgo: "Alto",
    tipoRiesgo: "Desborde",
    ultimaActualizacion: "28/05/2025 14:15",
    coordenadas: { lat: -17.9647, lng: -67.1059 }
  },
  {
    id: "zona-7",
    region: "Potosí",
    localidad: "Río Pilcomayo",
    nivelRiesgo: "Medio",
    tipoRiesgo: "Crecida",
    ultimaActualizacion: "28/05/2025 12:45",
    coordenadas: { lat: -19.5723, lng: -65.7550 }
  },
  {
    id: "zona-8",
    region: "Tarija",
    localidad: "Río Guadalquivir",
    nivelRiesgo: "Bajo",
    tipoRiesgo: "Inundación",
    ultimaActualizacion: "28/05/2025 11:20",
    coordenadas: { lat: -21.5355, lng: -64.7296 }
  }
];

function AlertaHidrologicaPage() {
  const [zonas, setZonas] = useState([]);
  const [regiones, setRegiones] = useState([]);
  const [regionSeleccionada, setRegionSeleccionada] = useState("todas");
  const [cargando, setCargando] = useState(true);
  const [usandoDatosFalsos, setUsandoDatosFalsos] = useState(false);

  useEffect(() => {
    const cargarZonas = async () => {
      try {
        console.log("Intentando cargar datos de Firebase...");
        
        // Simular tiempo de carga
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const tipos = ["Inundación", "Desborde", "Crecida"];
        const snapshot = await getDocs(collection(db, "Alerta_Hidrologico_Tabla"));
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const zonasFiltradas = data.filter(z => tipos.includes(z.tipoRiesgo));

        if (zonasFiltradas.length > 0) {
          console.log("Datos cargados desde Firebase:", zonasFiltradas.length);
          setZonas(zonasFiltradas);
          setRegiones([...new Set(zonasFiltradas.map(z => z.region))]);
          setUsandoDatosFalsos(false);
        } else {
          console.log("No hay datos en Firebase, usando datos simulados");
          setZonas(datosSimulados);
          setRegiones([...new Set(datosSimulados.map(z => z.region))]);
          setUsandoDatosFalsos(true);
        }
      } catch (error) {
        console.error("Error al obtener zonas de Firebase:", error);
        console.log("Fallback: Usando datos simulados");
        setZonas(datosSimulados);
        setRegiones([...new Set(datosSimulados.map(z => z.region))]);
        setUsandoDatosFalsos(true);
      } finally {
        setCargando(false);
      }
    };

    cargarZonas();
  }, []);

  const zonasFiltradas = regionSeleccionada === "todas"
    ? zonas
    : zonas.filter(z => z.region === regionSeleccionada);

  // Obtener colores para los niveles de riesgo
  const obtenerColorNivel = (nivel) => {
    switch(nivel) {
      case 'Alto': return '#e74c3c';
      case 'Medio': return '#f39c12';
      case 'Bajo': return '#27ae60';
      default: return '#7f8c8d';
    }
  };

  // Obtener colores para los tipos de riesgo
  const obtenerColorTipo = (tipo) => {
    switch(tipo) {
      case 'Inundación': return '#2980b9';
      case 'Desborde': return '#e74c3c';
      case 'Crecida': return '#f39c12';
      default: return '#7f8c8d';
    }
  };

  // Obtener clase CSS para nivel de riesgo
  const obtenerClaseNivel = (nivel) => {
    switch(nivel) {
      case 'Alto': return styles.nivelAlto;
      case 'Medio': return styles.nivelMedio;
      case 'Bajo': return styles.nivelBajo;
      default: return '';
    }
  };

  const tieneAlertasAltas = zonasFiltradas.some(z => z.nivelRiesgo === 'Alto');

  return (
    <div className={styles.alertaHidrologicaPage}>
      <div className={styles.contenidoAlerta}>
        <h1>🚨 Alerta Hidrológica</h1>
        <p className={styles.intro}>
          Monitoreo de crecidas, inundaciones y desbordes por región.
          {usandoDatosFalsos && (
            <span style={{color: '#f39c12', fontSize: '0.9em'}}>
              {' '}(Mostrando datos de demostración)
            </span>
          )}
        </p>

        <div className={styles.filtroRegion}>
          <label htmlFor="region">Filtrar por región:</label>
          <select
            id="region"
            value={regionSeleccionada}
            onChange={(e) => setRegionSeleccionada(e.target.value)}
          >
            <option value="todas">Todas las regiones ({zonas.length} alertas)</option>
            {regiones.map(r => {
              const cantidadPorRegion = zonas.filter(z => z.region === r).length;
              return (
                <option key={r} value={r}>{r} ({cantidadPorRegion})</option>
              );
            })}
          </select>
        </div>

        {cargando ? (
          <div className={styles.cargando}>
            <div className={styles.spinnerCarga}></div>
            <p>Cargando zonas de riesgo...</p>
          </div>
        ) : (
          <>
            <div className={styles.tablaContainer}>
              <table className={styles.tablaZonas}>
                <thead>
                  <tr>
                    <th>Región</th>
                    <th>Localidad</th>
                    <th>Nivel de Riesgo</th>
                    <th>Tipo</th>
                    <th>Última Actualización</th>
                  </tr>
                </thead>
                <tbody>
                  {zonasFiltradas.map(zona => (
                    <tr key={zona.id} className={obtenerClaseNivel(zona.nivelRiesgo)}>
                      <td>{zona.region}</td>
                      <td>{zona.localidad}</td>
                      <td>
                        <span 
                          className={styles.badgeNivel}
                          style={{ 
                            backgroundColor: obtenerColorNivel(zona.nivelRiesgo)
                          }}
                        >
                          {zona.nivelRiesgo}
                        </span>
                      </td>
                      <td>
                        <span 
                          className={styles.badgeTipo}
                          style={{ 
                            backgroundColor: obtenerColorTipo(zona.tipoRiesgo)
                          }}
                        >
                          {zona.tipoRiesgo === 'Inundación' && '🌊 '}
                          {zona.tipoRiesgo === 'Desborde' && '⚠️ '}
                          {zona.tipoRiesgo === 'Crecida' && '🚨 '}
                          {zona.tipoRiesgo}
                        </span>
                      </td>
                      <td>{zona.ultimaActualizacion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {regionSeleccionada !== "todas" && (
              <div className={styles.pronostico}>
                <h2>🌊 Condiciones Hidrológicas en {regionSeleccionada}</h2>
                <div className={styles.pronosticoGrid}>
                  <div className={styles.pronosticoCard}>
                    <h4>Estado de ríos</h4>
                    <p style={{color: zonasFiltradas.some(z => z.nivelRiesgo === 'Alto') ? '#e74c3c' : '#27ae60'}}>
                      {zonasFiltradas.some(z => z.nivelRiesgo === 'Alto') ? 'Crítico' : 'Normal'}
                    </p>
                  </div>
                  <div className={styles.pronosticoCard}>
                    <h4>Precipitaciones recientes</h4>
                    <p>15-25 mm</p>
                  </div>
                  <div className={styles.pronosticoCard}>
                    <h4>Tendencia</h4>
                    <p style={{color: '#f39c12'}}>En monitoreo</p>
                  </div>
                </div>
              </div>
            )}

            <div className={styles.recomendaciones}>
              <h2>🛡 Recomendaciones</h2>
              
              {tieneAlertasAltas && (
                <div className={styles.alertaRoja}>
                  <h3>⚠️ ALERTA ROJA - Acción Inmediata</h3>
                  <ul>
                    <li>Evacue inmediatamente las zonas de riesgo alto</li>
                    <li>Siga las instrucciones de Defensa Civil</li>
                    <li>Diríjase a zonas elevadas y seguras</li>
                  </ul>
                </div>
              )}

              <div className={styles.recomendacionesGrid}>
                <div className={`${styles.tarjetaRecomendacion} ${styles.tarjetaPreventiva}`}>
                  <h3>🌊 Medidas Preventivas</h3>
                  <ul>
                    <li>Evite zonas cercanas a ríos en riesgo</li>
                    <li>No cruce ríos crecidos</li>
                    <li>Mantenga kit de emergencia preparado</li>
                  </ul>
                </div>

                <div className={`${styles.tarjetaRecomendacion} ${styles.tarjetaEmergencia}`}>
                  <h3>📱 Contactos de Emergencia</h3>
                  <ul>
                    <li>Emergencias: 911</li>
                    <li>Defensa Civil: 800-10-4417</li>
                    <li>Bomberos: 119</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.mapa}>
              <h2>🗺 Mapa de zonas afectadas</h2>
              <HydroRiskMap alertas={zonasFiltradas} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AlertaHidrologicaPage;