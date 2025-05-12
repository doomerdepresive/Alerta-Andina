import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Datos simulados para la estación Max Paredes
const MOCK_STATION_DATA = {
  id: "max-paredes",
  name: "Estación Max Paredes",
  location: "Río La Paz, Km 12",
  coordinates: [-16.4897, -68.1462],
  status: "normal",
  waterLevel: {
    current: 3.24,
    min: 1.2,
    max: 5.8,
    alert: 4.5,
    danger: 5.2
  },
  flow: {
    current: 125.7,
    average: 118.3
  },
  rainfall: {
    daily: 12.5,
    monthly: 87.3,
    annual: 645.8
  },
  historicalData: {
    hourly: [
      { time: "00:00", waterLevel: 3.10, flow: 118.5 },
      { time: "01:00", waterLevel: 3.12, flow: 119.2 },
      { time: "02:00", waterLevel: 3.15, flow: 120.1 },
      { time: "03:00", waterLevel: 3.18, flow: 121.4 },
      { time: "04:00", waterLevel: 3.19, flow: 122.3 },
      { time: "05:00", waterLevel: 3.20, flow: 123.1 },
      { time: "06:00", waterLevel: 3.22, flow: 124.2 },
      { time: "07:00", waterLevel: 3.24, flow: 125.7 },
      { time: "08:00", waterLevel: 3.24, flow: 125.7 },
    ],
    daily: [
      { date: "04/05", waterLevel: 2.95, flow: 112.3, rainfall: 5.2 },
      { date: "05/05", waterLevel: 3.05, flow: 115.8, rainfall: 8.7 },
      { date: "06/05", waterLevel: 3.12, flow: 118.7, rainfall: 12.3 },
      { date: "07/05", waterLevel: 3.15, flow: 120.2, rainfall: 10.8 },
      { date: "08/05", waterLevel: 3.18, flow: 121.5, rainfall: 8.2 },
      { date: "09/05", waterLevel: 3.22, flow: 124.0, rainfall: 9.5 },
      { date: "10/05", waterLevel: 3.24, flow: 125.7, rainfall: 12.5 },
    ]
  },
  lastUpdate: "2025-05-10T08:45:23",
  sensors: {
    water: { status: "operational", battery: 92 },
    rainfall: { status: "operational", battery: 87 },
    camera: { status: "maintenance", battery: null }
  }
};

function HydroStationInfo({ stationData = MOCK_STATION_DATA }) {
  const [selectedTimeframe, setSelectedTimeframe] = useState("daily");
  const [selectedMetric, setSelectedMetric] = useState("waterLevel");

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

  // Obtener el color según el nivel de agua comparado con los umbrales
  const getWaterLevelColor = (level) => {
    const { alert, danger } = stationData.waterLevel;
    if (level >= danger) return "#dc3545"; // peligro - rojo
    if (level >= alert) return "#ffc107";  // alerta - amarillo
    return "#28a745"; // normal - verde
  };

  // Datos para el gráfico seleccionado
  const getChartData = () => {
    return stationData.historicalData[selectedTimeframe];
  };

  return (
    <section className="hydro-station-detail">
      <h2>Estación de Monitoreo: {stationData.name}</h2>
      
      <div className="station-dashboard">
        {/* Panel de métricas principales */}
        <div className="metrics-panel">
          <div className="metric-card main-metric">
            <div className="metric-header">
              <h3>Nivel de Agua</h3>
              <span 
                className="status-indicator" 
                style={{ 
                  backgroundColor: getWaterLevelColor(stationData.waterLevel.current),
                  display: 'inline-block',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%'
                }}
              ></span>
            </div>
            <div className="metric-value">{stationData.waterLevel.current} m</div>
            <div className="metric-range">
              <span>Mín: {stationData.waterLevel.min} m</span>
              <span>Máx: {stationData.waterLevel.max} m</span>
            </div>
            <div className="threshold-indicator">
              <div className="threshold-bar">
                <div 
                  className="threshold-marker" 
                  style={{ 
                    left: `${((stationData.waterLevel.current - stationData.waterLevel.min) / 
                           (stationData.waterLevel.max - stationData.waterLevel.min)) * 100}%` 
                  }}
                ></div>
                <div 
                  className="threshold-alert"
                  style={{ 
                    left: `${((stationData.waterLevel.alert - stationData.waterLevel.min) / 
                           (stationData.waterLevel.max - stationData.waterLevel.min)) * 100}%` 
                  }}
                ></div>
                <div 
                  className="threshold-danger"
                  style={{ 
                    left: `${((stationData.waterLevel.danger - stationData.waterLevel.min) / 
                           (stationData.waterLevel.max - stationData.waterLevel.min)) * 100}%` 
                  }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="secondary-metrics">
            <div className="metric-card">
              <h4>Caudal</h4>
              <div className="metric-value">{stationData.flow.current} m³/s</div>
              <div className="metric-subtext">Promedio: {stationData.flow.average} m³/s</div>
            </div>
            
            <div className="metric-card">
              <h4>Precipitación</h4>
              <div className="metric-value">{stationData.rainfall.daily} mm</div>
              <div className="metric-subtext">Mensual: {stationData.rainfall.monthly} mm</div>
            </div>
            
            <div className="metric-card">
              <h4>Última Actualización</h4>
              <div className="metric-value metric-time">{formatDateTime(stationData.lastUpdate)}</div>
              <div className="metric-subtext">Frecuencia: 15 min</div>
            </div>
          </div>
        </div>
        
        {/* Gráficos históricos */}
        <div className="historical-chart">
          <div className="chart-controls">
            <div className="control-group">
              <label>Periodo:</label>
              <div className="button-group">
                <button 
                  className={selectedTimeframe === "hourly" ? "active" : ""}
                  onClick={() => setSelectedTimeframe("hourly")}
                >
                  Horas
                </button>
                <button 
                  className={selectedTimeframe === "daily" ? "active" : ""}
                  onClick={() => setSelectedTimeframe("daily")}
                >
                  Días
                </button>
              </div>
            </div>
            
            <div className="control-group">
              <label>Métrica:</label>
              <div className="button-group">
                <button 
                  className={selectedMetric === "waterLevel" ? "active" : ""}
                  onClick={() => setSelectedMetric("waterLevel")}
                >
                  Nivel
                </button>
                <button 
                  className={selectedMetric === "flow" ? "active" : ""}
                  onClick={() => setSelectedMetric("flow")}
                >
                  Caudal
                </button>
                {selectedTimeframe === "daily" && (
                  <button 
                    className={selectedMetric === "rainfall" ? "active" : ""}
                    onClick={() => setSelectedMetric("rainfall")}
                  >
                    Lluvia
                  </button>
                )}
              </div>
            </div>
          </div>
          
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={getChartData()}
                margin={{ top: 10, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey={selectedTimeframe === "hourly" ? "time" : "date"} 
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  domain={['auto', 'auto']}
                  label={{ 
                    value: selectedMetric === "waterLevel" ? "Nivel (m)" : 
                           selectedMetric === "flow" ? "Caudal (m³/s)" : "Precipitación (mm)",
                    angle: -90,
                    position: 'insideLeft',
                    style: { fontSize: 12 }
                  }}
                />
                <Tooltip />
                <Legend verticalAlign="top" height={36} />
                <Line
                  type="monotone"
                  dataKey={selectedMetric}
                  stroke={selectedMetric === "waterLevel" ? "#3498db" : 
                          selectedMetric === "flow" ? "#2ecc71" : "#9b59b6"}
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                  name={
                    selectedMetric === "waterLevel" ? "Nivel de agua" : 
                    selectedMetric === "flow" ? "Caudal" : "Precipitación"
                  }
                />
                
                {/* Opcionalmente, agregar líneas de referencia para los umbrales si estamos viendo nivel de agua */}
                {selectedMetric === "waterLevel" && (
                  <>
                    {/* Aquí se agregarían las líneas de referencia para alertas */}
                  </>
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Estado de sensores */}
      <div className="sensor-status">
        <h3>Estado del sistema</h3>
        <div className="sensor-grid">
          <div className={`sensor-item ${stationData.sensors.water.status === "operational" ? "operational" : "maintenance"}`}>
            <div className="sensor-icon">💧</div>
            <div className="sensor-name">Sensor de nivel</div>
            <div className="sensor-detail">
              <span className="status-text">
                {stationData.sensors.water.status === "operational" ? "Operativo" : "En mantenimiento"}
              </span>
              {stationData.sensors.water.battery && (
                <span className="battery-level">
                  🔋 {stationData.sensors.water.battery}%
                </span>
              )}
            </div>
          </div>
          
          <div className={`sensor-item ${stationData.sensors.rainfall.status === "operational" ? "operational" : "maintenance"}`}>
            <div className="sensor-icon">🌧️</div>
            <div className="sensor-name">Pluviómetro</div>
            <div className="sensor-detail">
              <span className="status-text">
                {stationData.sensors.rainfall.status === "operational" ? "Operativo" : "En mantenimiento"}
              </span>
              {stationData.sensors.rainfall.battery && (
                <span className="battery-level">
                  🔋 {stationData.sensors.rainfall.battery}%
                </span>
              )}
            </div>
          </div>
          
          <div className={`sensor-item ${stationData.sensors.camera.status === "operational" ? "operational" : "maintenance"}`}>
            <div className="sensor-icon">📷</div>
            <div className="sensor-name">Cámara</div>
            <div className="sensor-detail">
              <span className="status-text">
                {stationData.sensors.camera.status === "operational" ? "Operativo" : "En mantenimiento"}
              </span>
              {stationData.sensors.camera.battery && (
                <span className="battery-level">
                  🔋 {stationData.sensors.camera.battery}%
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HydroStationInfo;