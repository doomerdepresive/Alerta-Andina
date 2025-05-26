// src/components/MeteoMap.jsx
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix del ícono (Leaflet no carga por defecto)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

function MeteoMap() {
  return (
    <div style={{ height: "400px", width: "100%", margin: "2rem 0" }}>
      <MapContainer center={[-16.5, -68.15]} zoom={6} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Marcador simulado */}
        <Marker position={[-16.5, -68.15]}>
          <Popup>
            Zona de riesgo en La Paz: posibles lluvias intensas ⚠️
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default MeteoMap;
