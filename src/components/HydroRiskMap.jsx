// src/components/HydroRiskMap.jsx
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Icono personalizado
const iconoRiesgo = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/535/535239.png",
  iconSize: [30, 30],
});

const datosSimulados = [
  {
    id: "1",
    nombre: "Río Choqueyapu",
    tipo: "Crecida",
    region: "La Paz",
    nivel: "Alto",
    coords: [-16.5, -68.13],
  },
  {
    id: "2",
    nombre: "Achumani",
    tipo: "Inundación",
    region: "La Paz",
    nivel: "Medio",
    coords: [-16.55, -68.12],
  },
  {
    id: "3",
    nombre: "Río Rocha",
    tipo: "Desborde",
    region: "Cochabamba",
    nivel: "Bajo",
    coords: [-17.39, -66.15],
  },
];

function HydroRiskMap() {
  const [zonas, setZonas] = useState([]);

  useEffect(() => {
    const cargarZonas = async () => {
      try {
        const snapshot = await getDocs(collection(db, "zonas_riesgo"));
        const tipos = ["Inundación", "Desborde", "Crecida"];
        const data = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(z => tipos.includes(z.tipoRiesgo));

        if (data.length > 0) {
          const conCoords = data.filter(z => z.lat && z.lng);
          setZonas(conCoords);
        } else {
          setZonas(datosSimulados);
        }
      } catch (error) {
        console.error("Error cargando zonas hidrológicas:", error);
        setZonas(datosSimulados);
      }
    };

    cargarZonas();
  }, []);

  return (
    <div style={{ height: "450px", width: "100%", marginTop: "1rem" }}>
      <MapContainer center={[-16.5, -68.15]} zoom={6} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {zonas.map(zona => (
          <Marker key={zona.id} position={[zona.lat || zona.coords[0], zona.lng || zona.coords[1]]} icon={iconoRiesgo}>
            <Popup>
              <strong>{zona.nombre}</strong><br />
              Tipo: {zona.tipo || zona.tipoRiesgo}<br />
              Región: {zona.region}<br />
              Nivel: {zona.nivel || zona.nivelRiesgo}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default HydroRiskMap;
