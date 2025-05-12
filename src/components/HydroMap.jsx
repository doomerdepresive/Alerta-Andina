import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Solucionar problema con íconos de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png"
});

function HydroMap({ stations = [], onStationSelect }) {
  // Centro predeterminado en La Paz, Bolivia
  const defaultCenter = [-16.5, -68.15];
  const defaultZoom = 11;

  // Obtener el color según el estado
  const getStatusColor = (status) => {
    switch(status) {
      case 'normal': return '#28a745';
      case 'alerta': return '#ffc107';
      case 'peligro': return '#dc3545';
      default: return '#6c757d';
    }
  };
  
  // Renderizar los marcadores de estaciones
  const renderStations = () => {
    return stations.map(station => (
      <CircleMarker
        key={station.id}
        center={station.coordinates}
        radius={10}
        pathOptions={{
          fillColor: getStatusColor(station.status),
          color: "white",
          weight: 2,
          opacity: 1,
          fillOpacity: 0.8
        }}
        eventHandlers={{
          click: () => {
            if (onStationSelect) onStationSelect(station);
          }
        }}
      >
        <Popup>
          <div className="map-popup">
            <h4>{station.name}</h4>
            <p>Nivel de agua: {station.waterLevel} m</p>
            <p>Caudal: {station.flow} m³/s</p>
            <p>Estado: {station.status}</p>
            <button 
              onClick={() => onStationSelect && onStationSelect(station)}
              style={{
                padding: '5px 10px',
                backgroundColor: '#3498db',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Ver detalles
            </button>
          </div>
        </Popup>
      </CircleMarker>
    ));
  };

  // Renderizar información de la leyenda
  const renderLegend = () => {
    return (
      <div 
        className="map-legend" 
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          backgroundColor: 'white',
          padding: '10px',
          borderRadius: '6px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          zIndex: 1000
        }}
      >
        <h4 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>Leyenda</h4>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
          <span 
            style={{ 
              display: 'inline-block', 
              width: '12px', 
              height: '12px', 
              borderRadius: '50%', 
              backgroundColor: '#28a745',
              marginRight: '5px'
            }}
          ></span>
          <span style={{ fontSize: '12px' }}>Normal</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
          <span 
            style={{ 
              display: 'inline-block', 
              width: '12px', 
              height: '12px', 
              borderRadius: '50%', 
              backgroundColor: '#ffc107',
              marginRight: '5px'
            }}
          ></span>
          <span style={{ fontSize: '12px' }}>Alerta</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span 
            style={{ 
              display: 'inline-block', 
              width: '12px', 
              height: '12px', 
              borderRadius: '50%', 
              backgroundColor: '#dc3545',
              marginRight: '5px'
            }}
          ></span>
          <span style={{ fontSize: '12px' }}>Peligro</span>
        </div>
      </div>
    );
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <MapContainer 
        center={defaultCenter} 
        zoom={defaultZoom} 
        style={{ height: '100%', width: '100%', borderRadius: '6px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Simulación de ríos principales - En producción, usarías GeoJSON real */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/hot/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">HOT</a>'
          opacity={0.5}
        />
        
        {renderStations()}
      </MapContainer>
      {renderLegend()}
      
      <div 
        className="map-info"
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          backgroundColor: 'rgba(255,255,255,0.8)',
          padding: '8px',
          borderRadius: '4px',
          fontSize: '12px',
          zIndex: 1000
        }}
      >
        <strong>Monitoreo Hidrológico</strong>
        <p style={{ margin: '5px 0 0 0', fontSize: '11px' }}>Haga clic en los marcadores para más información</p>
      </div>
    </div>
  );
}

export default HydroMap;