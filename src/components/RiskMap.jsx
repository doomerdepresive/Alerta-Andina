import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './RiskMap.css';

function RiskMap({ city }) {
    // Coordenadas de La Paz
    const position = [-16.5000, -68.1500];

    // Zonas de riesgo en La Paz
    const riskZones = [
        {
            position: [-16.4955, -68.1336],
            name: 'Zona Cotahuma',
            riskLevel: 'Alto',
            type: 'Deslizamiento'
        },
        {
            position: [-16.5089, -68.1223],
            name: 'Max Paredes',
            riskLevel: 'Medio',
            type: 'Deslizamiento'
        },
        // Añade más zonas según sea necesario
    ];

    return (
        <div className="risk-map-container">
            <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {riskZones.map((zone, index) => (
                    <Marker key={index} position={zone.position}>
                        <Popup>
                            <h3>{zone.name}</h3>
                            <p>Nivel de Riesgo: {zone.riskLevel}</p>
                            <p>Tipo: {zone.type}</p>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}

export default RiskMap;