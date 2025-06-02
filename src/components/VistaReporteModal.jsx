import React from "react";
import "./VistaReporteModal.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Icono personalizado para marcador
const customIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
    iconSize: [30, 30]
});

function VistaReporteModal({ reporte, onClose }) {
    if (!reporte) return null;

    const { userName, categoria, descripcion, lat, lng, timestamp, fotoUrl } = reporte;
    const fecha = timestamp?.toDate().toLocaleString("es-BO") || "—";

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
                <button className="modal-cerrar" onClick={onClose}>✖</button>
                <h3>📍 Detalles del Reporte</h3>
                <p><strong>Usuario:</strong> {userName}</p>
                <p><strong>Categoría:</strong> {categoria}</p>
                <p><strong>Fecha:</strong> {fecha}</p>
                <p><strong>Descripción:</strong> {descripcion}</p>

                {fotoUrl && (
                    <div className="imagen-reporte">
                        <img src={fotoUrl} alt="Foto del reporte" />
                    </div>
                )}

                {lat && lng && (
                    <div className="mapa-reporte">
                        <MapContainer center={[lat, lng]} zoom={14} scrollWheelZoom={false} style={{ height: "250px", borderRadius: "8px" }}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; OpenStreetMap contributors'
                            />
                            <Marker position={[lat, lng]} icon={customIcon}>
                                <Popup>
                                    {categoria}<br />{userName}
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                )}
            </div>
        </div>
    );
}

export default VistaReporteModal;
