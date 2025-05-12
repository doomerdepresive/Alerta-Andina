import React, { useState, useEffect } from "react";
import "./HidrologiaPage.css"; // Crearemos un CSS específico para esta página
import HydroStationInfo from "../components/HydroStationInfo";
import HydroMap from "../components/HydroMap";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Datos simulados - serán reemplazados por datos reales de la API/BD
const MOCK_HYDROLOGICAL_DATA = {
  stationData: [
    {
      id: 1,
      name: "Estación Max Paredes",
      location: "Río La Paz, Km 12",
      coordinates: [-16.4897, -68.1462],
      status: "normal", // normal, alerta, peligro
      waterLevel: 3.24, // metros
      flow: 125.7, // m³/s
      lastUpdate: "2025-05-10T08:45:23",
      precipitation24h: 12.5, // mm
      reservoirCapacity: null, // No aplica para esta estación
    },
    {
      id: 2,
      name: "Represa Milluni",
      location: "Cordillera Real",
      coordinates: [-16.3214, -68.1783],
      status: "alerta",
      waterLevel: 42.8, // metros
      flow: 38.5, // m³/s
      lastUpdate: "2025-05-10T09:12:45",
      precipitation24h: 28.7, // mm
      reservoirCapacity: 78, // % de capacidad
    },
    {
      id: 3,
      name: "Estación Río Irpavi",
      location: "Zona Sur, La Paz",
      coordinates: [-16.5343, -68.0847],
      status: "normal",
      waterLevel: 1.87, // metros
      flow: 43.2, // m³/s
      lastUpdate: "2025-05-10T09:05:12",
      precipitation24h: 8.4, // mm
      reservoirCapacity: null, // No aplica para esta estación
    }
  ],
  historicalData: {
    waterLevels: [
      { date: "2025-05-03", "Estación Max Paredes": 2.8, "Río Irpavi": 1.4, "Represa Milluni": 40.2 },
      { date: "2025-05-04", "Estación Max Paredes": 2.9, "Río Irpavi": 1.5, "Represa Milluni": 40.8 },
      { date: "2025-05-05", "Estación Max Paredes": 3.0, "Río Irpavi": 1.6, "Represa Milluni": 41.0 },
      { date: "2025-05-06", "Estación Max Paredes": 3.1, "Río Irpavi": 1.7, "Represa Milluni": 41.5 },
      { date: "2025-05-07", "Estación Max Paredes": 3.2, "Río Irpavi": 1.8, "Represa Milluni": 42.0 },
      { date: "2025-05-08", "Estación Max Paredes": 3.2, "Río Irpavi": 1.8, "Represa Milluni": 42.4 },
      { date: "2025-05-09", "Estación Max Paredes": 3.2, "Río Irpavi": 1.9, "Represa Milluni": 42.6 },
      { date: "2025-05-10", "Estación Max Paredes": 3.2, "Río Irpavi": 1.9, "Represa Milluni": 42.8 },
    ],
    precipitation: [
      { date: "2025-05-03", "Estación Max Paredes": 5.2, "Río Irpavi": 3.8, "Represa Milluni": 15.6 },
      { date: "2025-05-04", "Estación Max Paredes": 8.7, "Río Irpavi": 5.2, "Represa Milluni": 18.2 },
      { date: "2025-05-05", "Estación Max Paredes": 12.3, "Río Irpavi": 6.8, "Represa Milluni": 22.5 },
      { date: "2025-05-06", "Estación Max Paredes": 10.8, "Río Irpavi": 5.4, "Represa Milluni": 24.8 },
      { date: "2025-05-07", "Estación Max Paredes": 8.2, "Río Irpavi": 4.6, "Represa Milluni": 26.3 },
      { date: "2025-05-08", "Estación Max Paredes": 9.5, "Río Irpavi": 6.2, "Represa Milluni": 27.5 },
      { date: "2025-05-09", "Estación Max Paredes": 11.2, "Río Irpavi": 7.8, "Represa Milluni": 28.1 },
      { date: "2025-05-10", "Estación Max Paredes": 12.5, "Río Irpavi": 8.4, "Represa Milluni": 28.7 },
    ]
  },
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
  const [hydrologicalData, setHydrologicalData] = useState(MOCK_HYDROLOGICAL_DATA);
  const [selectedStation, setSelectedStation] = useState(MOCK_HYDROLOGICAL_DATA.stationData[0]);
  const [dataType, setDataType] = useState("waterLevels"); // waterLevels o precipitation

  // Simular carga de datos desde API (cuando esté disponible)
  useEffect(() => {
    // Cuando la API real esté lista, este es el lugar donde harías la llamada:
    // async function fetchData() {
    //   try {
    //     const response = await fetch('https://api.alerta-andina.org/hidrologia/data');
    //     const data = await response.json();
    //     setHydrologicalData(data);
    //     setSelectedStation(data.stationData[0]);
    //   } catch (error) {
    //     console.error("Error fetching hydrological data:", error);
    //   }
    // }
    // fetchData();
    
    // Por ahora, solo usamos los datos simulados
    console.log("Datos hidrológicos simulados cargados");
  }, []);

  // Formatear fecha/hora para mostrar
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

  // Obtener color según el estado
  const getStatusColor = (status) => {
    switch(status) {
      case 'normal': return '#28a745';
      case 'alerta': return '#ffc107';
      case 'peligro': return '#dc3545';
      default: return '#6c757d';
    }
  };

  // Etiqueta según el estado
  const getStatusLabel = (status) => {
    switch(status) {
      case 'normal': return 'Normal';
      case 'alerta': return '⚠️ Alerta';
      case 'peligro': return '🚨 Peligro';
      default: return 'Desconocido';
    }
  };

  return (
    <div className="hydrology-page">
      <header className="hydrology-header">
        <h1 className="page-title">Sistema de Monitoreo Hidrológico</h1>
        <p className="page-subtitle">
          Alerta Andina - Monitoreo en tiempo real de ríos, represas y cuerpos de agua
        </p>
      </header>

      <main className="hydrology-content">
        {/* Panel de indicadores principales */}
        <section className="hydrology-dashboard">
          <h2>Panel de Control Hidrológico</h2>
          
          <div className="station-selector">
            <h3>Estaciones de Monitoreo</h3>
            <div className="station-buttons">
              {hydrologicalData.stationData.map(station => (
                <button 
                  key={station.id}
                  className={`station-button ${selectedStation.id === station.id ? 'active' : ''}`}
                  style={{borderLeft: `4px solid ${getStatusColor(station.status)}`}}
                  onClick={() => setSelectedStation(station)}
                >
                  {station.name}
                  <span className="station-status" style={{color: getStatusColor(station.status)}}>
                    {getStatusLabel(station.status)}
                  </span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="station-details">
            <h3>{selectedStation.name}</h3>
            <div className="station-details-grid">
              <div className="detail-card">
                <div className="detail-title">Ubicación</div>
                <div className="detail-value">{selectedStation.location}</div>
              </div>
              <div className="detail-card">
                <div className="detail-title">Nivel de Agua</div>
                <div className="detail-value">{selectedStation.waterLevel} m</div>
              </div>
              <div className="detail-card">
                <div className="detail-title">Caudal</div>
                <div className="detail-value">{selectedStation.flow} m³/s</div>
              </div>
              <div className="detail-card">
                <div className="detail-title">Precipitación (24h)</div>
                <div className="detail-value">{selectedStation.precipitation24h} mm</div>
              </div>
              <div className="detail-card">
                <div className="detail-title">Estado</div>
                <div className="detail-value" style={{color: getStatusColor(selectedStation.status)}}>
                  {getStatusLabel(selectedStation.status)}
                </div>
              </div>
              <div className="detail-card">
                <div className="detail-title">Última Actualización</div>
                <div className="detail-value">{formatDateTime(selectedStation.lastUpdate)}</div>
              </div>
              {selectedStation.reservoirCapacity !== null && (
                <div className="detail-card capacity-card">
                  <div className="detail-title">Capacidad de Embalse</div>
                  <div className="capacity-indicator">
                    <div 
                      className="capacity-bar" 
                      style={{
                        width: `${selectedStation.reservoirCapacity}%`,
                        backgroundColor: selectedStation.reservoirCapacity > 75 ? '#ffc107' : '#28a745'
                      }}
                    ></div>
                    <span className="capacity-value">{selectedStation.reservoirCapacity}%</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Mapa hidrológico */}
        <section className="hydrology-map-section">
          <h2>Mapa de Monitoreo Hidrológico</h2>
          <div className="map-container">
            <HydroMap stations={hydrologicalData.stationData} onStationSelect={setSelectedStation} />
          </div>
        </section>

        {/* Gráficos históricos */}
        <section className="historical-data-section">
          <h2>Datos Históricos</h2>
          <div className="data-selector">
            <button 
              className={`data-button ${dataType === 'waterLevels' ? 'active' : ''}`}
              onClick={() => setDataType('waterLevels')}
            >
              Niveles de Agua
            </button>
            <button 
              className={`data-button ${dataType === 'precipitation' ? 'active' : ''}`}
              onClick={() => setDataType('precipitation')}
            >
              Precipitación
            </button>
          </div>
          <div className="chart-container">
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
          </div>
        </section>

        {/* Alertas activas */}
        <section className="alerts-section">
          <h2>Alertas Activas</h2>
          <div className="alerts-container">
            {hydrologicalData.alerts.length > 0 ? (
              hydrologicalData.alerts.map(alert => (
                <div 
                  key={alert.id} 
                  className={`alert-card alert-${alert.level}`}
                >
                  <div className="alert-header">
                    <h4>{alert.station}</h4>
                    <span className="alert-time">{formatDateTime(alert.timestamp)}</span>
                  </div>
                  <p className="alert-message">{alert.message}</p>
                </div>
              ))
            ) : (
              <p className="no-alerts">No hay alertas activas en este momento.</p>
            )}
          </div>
        </section>

        {/* Información adicional */}
        <section className="additional-info">
          <h2>Información del Sistema</h2>
          <div className="info-cards">
            <div className="info-card">
              <h3>Sobre el Monitoreo</h3>
              <p>
                La unidad de Hidrología del sistema Alerta Andina se encarga del monitoreo de ríos,
                represas y cuerpos de agua en tiempo real. Esto permite prevenir inundaciones, 
                desbordes y gestionar de forma sostenible los recursos hídricos del país.
              </p>
            </div>
            <div className="info-card">
              <h3>Metodología</h3>
              <p>
                Las estaciones de monitoreo utilizan sensores ultrasónicos, radares y pluviómetros 
                para medir niveles de agua, caudal y precipitación. Los datos se transmiten cada 15 minutos 
                mediante tecnología IoT y son analizados por nuestros sistemas.
              </p>
            </div>
            <div className="info-card">
              <h3>Interpretación de Datos</h3>
              <p>
                Los estados se clasifican en Normal (verde), Alerta (amarillo) y Peligro (rojo).
                El sistema genera alertas automáticas cuando se superan umbrales predefinidos
                basados en datos históricos y modelos predictivos.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="hydrology-footer">
        <p>© 2025 Sistema Alerta Andina - Unidad de Hidrología</p>
        <p>Datos actualizados en tiempo real. Última actualización del sistema: {new Date().toLocaleString('es-BO')}</p>
      </footer>
    </div>
  );
}

export default HidrologiaPage;