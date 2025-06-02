import React, { useState, useEffect } from "react";
import styles from "./HidrologiaPage.module.css";
import HydroMap from "../components/HydroMap";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { db } from "../firebase-config";
import { collection, onSnapshot, getDocs } from "firebase/firestore";

// Datos mock como fallback
const MOCK_HYDROLOGICAL_DATA = {
  stationData: [
    {
      id: 1,
      name: "Estación Max Paredes",
      location: "Río La Paz, Km 12",
      coordinates: [-16.4897, -68.1462],
      status: "normal",
      waterLevel: 3.24,
      flow: 125.7,
      lastUpdate: "2025-05-10T08:45:23",
      precipitation24h: 12.5,
      reservoirCapacity: null,
    },
    {
      id: 2,
      name: "Represa Milluni",
      location: "Cordillera Real",
      coordinates: [-16.3214, -68.1783],
      status: "alerta",
      waterLevel: 42.8,
      flow: 38.5,
      lastUpdate: "2025-05-10T09:12:45",
      precipitation24h: 28.7,
      reservoirCapacity: 78,
    },
    {
      id: 3,
      name: "Estación Río Irpavi",
      location: "Zona Sur, La Paz",
      coordinates: [-16.5343, -68.0847],
      status: "normal",
      waterLevel: 1.87,
      flow: 43.2,
      lastUpdate: "2025-05-10T09:05:12",
      precipitation24h: 8.4,
      reservoirCapacity: null,
    }
  ],
  alerts: [
    {
      id: 1,
      station: "Represa Milluni",
      timestamp: "2025-05-10T07:15:00",
      level: "amarillo",
      message: "Nivel de agua por encima del 75% de capacidad. Monitoreo continuo requerido."
    },
    {
      id: 2,
      station: "Estación Max Paredes",
      timestamp: "2025-05-09T22:45:00",
      level: "verde",
      message: "Incremento de caudal observado pero dentro de parámetros normales."
    }
  ]
};

function HidrologiaPage() {
  const [hydrologicalData, setHydrologicalData] = useState({
    stationData: [],
    historicalData: { waterLevels: [], precipitation: [] },
    alerts: []
  });
  const [selectedStation, setSelectedStation] = useState(null);
  const [dataType, setDataType] = useState("waterLevels");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reportesClima, setReportesClima] = useState([]);
  const [usingMockData, setUsingMockData] = useState(false);

  // Función para cargar datos históricos
  const loadHistoricalData = async () => {
    try {
      console.log("🔍 Cargando datos históricos...");
      const querySnapshot = await getDocs(collection(db, "Hidrologia_Historico"));
      
      const waterLevels = [];
      const precipitation = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        waterLevels.push({
          date: doc.id,
          "Estación Max Paredes": data["Estación Max Paredes"]?.nivel_agua || 0,
          "Río Irpavi": data["Río Irpavi"]?.nivel_agua || 0,
          "Represa Milluni": data["Represa Milluni"]?.nivel_agua || 0
        });

        precipitation.push({
          date: doc.id,
          "Estación Max Paredes": data["Estación Max Paredes"]?.precipitacion || 0,
          "Río Irpavi": data["Río Irpavi"]?.precipitacion || 0,
          "Represa Milluni": data["Represa Milluni"]?.precipitacion || 0
        });
      });

      return {
        waterLevels: waterLevels.sort((a, b) => a.date.localeCompare(b.date)),
        precipitation: precipitation.sort((a, b) => a.date.localeCompare(b.date))
      };
    } catch (err) {
      console.error("❌ Error al cargar datos históricos:", err);
      return { waterLevels: [], precipitation: [] };
    }
  };

  // Conexión en tiempo real con Firestore
  useEffect(() => {
    let unsubscribeStations;
    let unsubscribeReportes;

    const setupRealtimeConnections = async () => {
      try {
        const historicalData = await loadHistoricalData();
        
        unsubscribeStations = onSnapshot(
          collection(db, "estaciones_monitoreo"), 
          (snapshot) => {
            console.log("📡 Actualizando estaciones en tiempo real...");
            const stationData = snapshot.docs.map(doc => {
              const data = doc.data();
              return {
                id: doc.id,
                name: data.name || data.nombre || `Estación ${doc.id}`,
                location: data.location || data.ubicacion || "Ubicación no especificada",
                coordinates: data.coordenadas 
                  ? [data.coordenadas.lat, data.coordenadas.lng]
                  : data.coordinates || [-16.4897, -68.1193],
                status: data.status || data.estado || "normal",
                waterLevel: data.waterLevel || data.nivel_agua || 0,
                flow: data.flow || data.caudal || 0,
                lastUpdate: data.lastUpdate || data.ultima_actualizacion || new Date().toISOString(),
                precipitation24h: data.precipitation24h || data.precipitacion_24h || 0,
                reservoirCapacity: data.reservoirCapacity || data.capacidad_embalse || null,
              };
            });

            setHydrologicalData(prev => ({
              ...prev,
              stationData,
              historicalData,
              alerts: prev.alerts.length > 0 ? prev.alerts : MOCK_HYDROLOGICAL_DATA.alerts
            }));
            
            if (!selectedStation && stationData.length > 0) {
              setSelectedStation(stationData[0]);
            }
            setLoading(false);
            setUsingMockData(false);
          },
          (error) => {
            console.error("❌ Error en conexión de estaciones:", error);
            setHydrologicalData({
              stationData: MOCK_HYDROLOGICAL_DATA.stationData,
              historicalData,
              alerts: MOCK_HYDROLOGICAL_DATA.alerts
            });
            setSelectedStation(MOCK_HYDROLOGICAL_DATA.stationData[0]);
            setError("Usando datos de prueba. Error de conexión con base de datos.");
            setUsingMockData(true);
            setLoading(false);
          }
        );

        unsubscribeReportes = onSnapshot(
          collection(db, "reportes_clima"), 
          (snapshot) => {
            const reportes = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            setReportesClima(reportes);
          },
          (error) => {
            console.log("ℹ️ No se pudieron cargar reportes de clima:", error.message);
          }
        );

      } catch (err) {
        console.error("❌ Error general al configurar conexiones:", err);
        setHydrologicalData({
          stationData: MOCK_HYDROLOGICAL_DATA.stationData,
          historicalData: { waterLevels: [], precipitation: [] },
          alerts: MOCK_HYDROLOGICAL_DATA.alerts
        });
        setSelectedStation(MOCK_HYDROLOGICAL_DATA.stationData[0]);
        setError("Error de conexión. Usando datos de demostración.");
        setUsingMockData(true);
        setLoading(false);
      }
    };

    setupRealtimeConnections();

    return () => {
      if (unsubscribeStations) unsubscribeStations();
      if (unsubscribeReportes) unsubscribeReportes();
    };
  }, [selectedStation]);

  // Funciones auxiliares
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('es-BO', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'normal': return '#28a745';
      case 'alerta': return '#ffc107';
      case 'peligro': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'normal': return 'Normal';
      case 'alerta': return '⚠️ Alerta';
      case 'peligro': return '🚨 Peligro';
      default: return 'Desconocido';
    }
  };

  if (loading) {
    return (
      <div className={styles.hydrologyPage}>
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner}></div>
          <h2>Cargando Sistema de Monitoreo Hidrológico...</h2>
          <p>Conectando con base de datos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.hydrologyPage}>
      <header className={styles.hydrologyHeader}>
        <h1 className={styles.pageTitle}>Sistema de Monitoreo Hidrológico</h1>
        <p className={styles.pageSubtitle}>
          Alerta Andina - Monitoreo en tiempo real de ríos, represas y cuerpos de agua
          {usingMockData && " (Modo Demostración)"}
        </p>
        {error && (
          <div className={styles.errorMessage}>
            ⚠️ {error}
          </div>
        )}
      </header>

      <main className={styles.hydrologyContent}>
        {/* Panel de indicadores principales */}
        <section className={styles.hydrologyDashboard}>
          <h2>Panel de Control Hidrológico</h2>
          
          <div className={styles.stationSelector}>
            <h3>Estaciones de Monitoreo ({hydrologicalData.stationData.length})</h3>
            <div className={styles.stationButtons}>
              {hydrologicalData.stationData.map(station => (
                <button 
                  key={station.id}
                  className={`${styles.stationButton} ${selectedStation?.id === station.id ? styles.active : ''}`}
                  style={{borderLeft: `4px solid ${getStatusColor(station.status)}`}}
                  onClick={() => setSelectedStation(station)}
                >
                  {station.name}
                  <span className={styles.stationStatus} style={{color: getStatusColor(station.status)}}>
                    {getStatusLabel(station.status)}
                  </span>
                </button>
              ))}
            </div>
          </div>
          
          {selectedStation && (
            <div className={styles.stationDetails}>
              <h3>{selectedStation.name}</h3>
              <div className={styles.stationDetailsGrid}>
                <div className={styles.detailCard}>
                  <div className={styles.detailTitle}>Ubicación</div>
                  <div className={styles.detailValue}>{selectedStation.location}</div>
                </div>
                <div className={styles.detailCard}>
                  <div className={styles.detailTitle}>Nivel de Agua</div>
                  <div className={styles.detailValue}>{selectedStation.waterLevel} m</div>
                </div>
                <div className={styles.detailCard}>
                  <div className={styles.detailTitle}>Caudal</div>
                  <div className={styles.detailValue}>{selectedStation.flow} m³/s</div>
                </div>
                <div className={styles.detailCard}>
                  <div className={styles.detailTitle}>Precipitación (24h)</div>
                  <div className={styles.detailValue}>{selectedStation.precipitation24h} mm</div>
                </div>
                <div className={styles.detailCard}>
                  <div className={styles.detailTitle}>Estado</div>
                  <div className={styles.detailValue} style={{color: getStatusColor(selectedStation.status)}}>
                    {getStatusLabel(selectedStation.status)}
                  </div>
                </div>
                <div className={styles.detailCard}>
                  <div className={styles.detailTitle}>Última Actualización</div>
                  <div className={styles.detailValue}>{formatDateTime(selectedStation.lastUpdate)}</div>
                </div>
                {selectedStation.reservoirCapacity !== null && (
                  <div className={`${styles.detailCard} ${styles.capacityCard}`}>
                    <div className={styles.detailTitle}>Capacidad de Embalse</div>
                    <div className={styles.capacityIndicator}>
                      <div 
                        className={styles.capacityBar} 
                        style={{
                          width: `${selectedStation.reservoirCapacity}%`,
                          backgroundColor: selectedStation.reservoirCapacity > 75 ? '#ffc107' : '#28a745'
                        }}
                      ></div>
                      <span className={styles.capacityValue}>{selectedStation.reservoirCapacity}%</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </section>

        {/* Mapa hidrológico */}
        <section className={styles.hydrologyMapSection}>
          <h2>Mapa de Monitoreo Hidrológico</h2>
          <div className={styles.mapContainer}>
            <HydroMap 
              stations={hydrologicalData.stationData} 
              onStationSelect={setSelectedStation} 
            />
          </div>
        </section>

        {/* Gráficos históricos */}
        <section className={styles.historicalDataSection}>
          <h2>Datos Históricos</h2>
          <div className={styles.dataSelector}>
            <button 
              className={`${styles.dataButton} ${dataType === 'waterLevels' ? styles.active : ''}`}
              onClick={() => setDataType('waterLevels')}
            >
              Niveles de Agua
            </button>
            <button 
              className={`${styles.dataButton} ${dataType === 'precipitation' ? styles.active : ''}`}
              onClick={() => setDataType('precipitation')}
            >
              Precipitación
            </button>
          </div>
          <div className={styles.chartContainer}>
            {hydrologicalData.historicalData[dataType]?.length > 0 ? (
              <ResponsiveContainer width="100%" height={400}>
                <LineChart
                  data={hydrologicalData.historicalData[dataType]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis 
                    label={{ 
                      value: dataType === 'waterLevels' ? 'Nivel (m)' : 'Precipitación (mm)', 
                      angle: -90, 
                      position: 'insideLeft' 
                    }} 
                  />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="Estación Max Paredes" 
                    stroke="#3498db" 
                    activeDot={{ r: 8 }} 
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="Río Irpavi" 
                    stroke="#2ecc71" 
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="Represa Milluni" 
                    stroke="#e74c3c" 
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className={styles.noDataMessage}>
                No hay datos históricos disponibles para mostrar
              </div>
            )}
          </div>
        </section>
        
        {/* Reportes en tiempo real desde Firebase */}
        {reportesClima.length > 0 && (
          <section className={styles.firebaseReportes}>
            <h2>Reportes en Tiempo Real</h2>
            <div className={styles.tableContainer}>
              <table className={styles.firebaseTable}>
                <thead>
                  <tr>
                    <th>Estación</th>
                    <th>Nivel Agua (m)</th>
                    <th>Caudal (m³/s)</th>
                    <th>Precipitación (24h)</th>
                    <th>Estado</th>
                    <th>Última Actualización</th>
                  </tr>
                </thead>
                <tbody>
                  {reportesClima.map((r) => (
                    <tr key={r.id}>
                      <td>{r.estacion || r.name || 'N/A'}</td>
                      <td>{r.nivel_agua || r.waterLevel || 'N/A'}</td>
                      <td>{r.caudal || r.flow || 'N/A'}</td>
                      <td>{r.precipitacion_24h || r.precipitation24h || 'N/A'}</td>
                      <td style={{ color: getStatusColor(r.estado || r.status) }}>
                        {getStatusLabel(r.estado || r.status)}
                      </td>
                      <td>{formatDateTime(r.ultima_actualizacion || r.lastUpdate || new Date().toISOString())}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Alertas activas */}
        <section className={styles.alertsSection}>
          <h2>Alertas Activas</h2>
          <div className={styles.alertsContainer}>
            {hydrologicalData.alerts.length > 0 ? (
              hydrologicalData.alerts.map(alert => (
                <div 
                  key={alert.id} 
                  className={`${styles.alertCard} ${styles[`alert${alert.level.charAt(0).toUpperCase() + alert.level.slice(1)}`]}`}
                >
                  <div className={styles.alertHeader}>
                    <h4>{alert.station}</h4>
                    <span className={styles.alertTime}>{formatDateTime(alert.timestamp)}</span>
                  </div>
                  <p className={styles.alertMessage}>{alert.message}</p>
                </div>
              ))
            ) : (
              <p className={styles.noAlerts}>No hay alertas activas en este momento.</p>
            )}
          </div>
        </section>

        {/* Información adicional */}
        <section className={styles.additionalInfo}>
          <h2>Información del Sistema</h2>
          <div className={styles.infoCards}>
            <div className={styles.infoCard}>
              <h3>Sobre el Monitoreo</h3>
              <p>
                La unidad de Hidrología del sistema Alerta Andina se encarga del monitoreo de ríos,
                represas y cuerpos de agua en tiempo real.
              </p>
            </div>
            <div className={styles.infoCard}>
              <h3>Metodología</h3>
              <p>
                Las estaciones de monitoreo utilizan sensores ultrasónicos, radares y pluviómetros 
                para medir niveles de agua, caudal y precipitación.
              </p>
            </div>
            <div className={styles.infoCard}>
              <h3>Interpretación de Datos</h3>
              <p>
                Los estados se clasifican en Normal (verde), Alerta (amarillo) y Peligro (rojo).
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.hydrologyFooter}>
        <p>© 2025 Sistema Alerta Andina - Unidad de Hidrología</p>
        <p>
          Datos actualizados en tiempo real. Última actualización del sistema: {new Date().toLocaleString('es-BO')}
          {usingMockData && " - Modo Demostración"}
        </p>
      </footer>
    </div>
  );
}

export default HidrologiaPage;