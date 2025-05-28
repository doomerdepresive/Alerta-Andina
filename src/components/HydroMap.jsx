import React, { useState, useEffect, useMemo } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase-config";
import "./HydroMap.css"; // Asegúrate de que este CSS coincida con el que mejoramos antes

// --- CONSTANTES ---
const LEAFLET_ICON_CONFIG = {
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png"
};

const MAP_DEFAULTS = {
  center: [-16.4897, -68.1193], // La Paz
  zoom: 12,
  tileLayerUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  tileLayerAttribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
};

const STATUS_COLORS = {
  normal: '#28a745', // Verde (éxito)
  alerta: '#ffc107', // Amarillo (advertencia)
  peligro: '#dc3545', // Rojo (peligro)
  default: '#6c757d'  // Gris (por defecto o desconocido)
};

// --- UTILIDADES ---
// Solucionar problema con íconos de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions(LEAFLET_ICON_CONFIG);

const getStatusColor = (status) => {
  return STATUS_COLORS[status] || STATUS_COLORS.default;
};

// --- COMPONENTES HIJOS ---

// Componente para la Leyenda (Memoizado para evitar re-renderizados innecesarios)
const MapLegend = React.memo(() => (
  <div className="map-legend">
    <h4>Leyenda</h4>
    {Object.entries(STATUS_COLORS)
      .filter(([key]) => key !== 'default') // No mostrar el color 'default' en la leyenda
      .map(([statusKey, color]) => (
        <div className="legend-item" key={statusKey}>
          <span className="legend-color" style={{ backgroundColor: color }}></span>
          <span>{statusKey.charAt(0).toUpperCase() + statusKey.slice(1)}</span>
        </div>
    ))}
  </div>
));
MapLegend.displayName = 'MapLegend'; // Para mejor debugging

// Componente para cada Marcador de Estación (Memoizado)
const StationMarker = React.memo(({ station, onStationSelect }) => {
  const fillColor = getStatusColor(station.status);

  const pathOptions = useMemo(() => ({
    fillColor: fillColor,
    color: "#fff", // Color del borde del círculo
    weight: 2,     // Grosor del borde
    opacity: 1,    // Opacidad del borde
    fillOpacity: 0.8 // Opacidad del relleno
  }), [fillColor]);

  const eventHandlers = useMemo(() => ({
    click: () => {
      if (onStationSelect) {
        onStationSelect(station);
      }
    },
  }), [onStationSelect, station]);

  return (
    <CircleMarker
      center={station.coordinates}
      radius={10}
      pathOptions={pathOptions}
      eventHandlers={eventHandlers}
    >
      <Popup>
        {/* Usar las clases CSS que definimos antes para el popup */}
        <h4>{station.name}</h4>
        <p>💧 Nivel: {station.waterLevel} m</p>
        <p>🌊 Caudal: {station.flow} m³/s</p>
        <p>Estado: <span style={{ color: fillColor, fontWeight: "bold" }}>
            {station.status.toUpperCase()}
          </span>
        </p>
      </Popup>
    </CircleMarker>
  );
});
StationMarker.displayName = 'StationMarker';

// --- COMPONENTE PRINCIPAL ---
function HydroMap({ onStationSelect }) {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    const stationsCollection = collection(db, "estaciones_monitoreo");
    const unsubscribe = onSnapshot(stationsCollection, (snapshot) => {
      const stationData = snapshot.docs.map(doc => {
        const data = doc.data();
        // Validación más robusta para coordenadas
        const lat = data.coordenadas?.lat;
        const lng = data.coordenadas?.lng;

        return {
          id: doc.id,
          name: data.nombre || "Estación Desconocida",
          status: data.estado || "normal", // Podrías tener un estado 'unknown'
          waterLevel: data.nivel_agua ?? 0, // Usar ?? para permitir 0 como valor válido
          flow: data.caudal ?? 0,
          // Si las coordenadas no son válidas, podrías filtrarlas o asignar un valor nulo
          // para manejarlas de forma diferente en el renderizado (ej. no mostrar el marcador).
          // Por ahora, se mantiene la lógica de usar el centro por defecto si no hay coords.
          coordinates: (typeof lat === 'number' && typeof lng === 'number')
            ? [lat, lng]
            : MAP_DEFAULTS.center
        };
      });
      // Podrías filtrar aquí estaciones sin coordenadas válidas si lo prefieres:
      // const validStations = stationData.filter(s => s.coordinates !== MAP_DEFAULTS.center || s.name !== "Estación Desconocida");
      setStations(stationData);
    });

    // Función de limpieza para desuscribirse cuando el componente se desmonte
    return () => unsubscribe();
  }, []); // El array de dependencias vacío asegura que esto solo se ejecute al montar/desmontar

  // Memoizar la lista de marcadores para evitar re-cálculos si `stations` o `onStationSelect` no cambian
  const stationMarkers = useMemo(() => {
    return stations.map(station => (
      <StationMarker
        key={station.id}
        station={station}
        onStationSelect={onStationSelect}
      />
    ));
  }, [stations, onStationSelect]);

  return (
    <div className="hydro-map-container">
      <MapContainer
        center={MAP_DEFAULTS.center}
        zoom={MAP_DEFAULTS.zoom}
        style={{ height: "100%", width: "100%" }} // Estilos necesarios para Leaflet
      >
        <TileLayer
          url={MAP_DEFAULTS.tileLayerUrl}
          attribution={MAP_DEFAULTS.tileLayerAttribution}
        />
        {stationMarkers}
      </MapContainer>

      <MapLegend />

      <div className="map-info">
        <strong>Monitoreo Hidrológico</strong>
        <p>Haga clic en los marcadores para más información.</p>
      </div>
    </div>
  );
}

export default HydroMap;