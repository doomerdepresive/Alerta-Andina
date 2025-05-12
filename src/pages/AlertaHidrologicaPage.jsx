// src/pages/AlertaHidrologicaPage.jsx
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import "./AlertaHidrologicaPage.css";
import HydroRiskMap from "../components/HydroRiskMap";


const datosSimulados = [
  {
    id: "zona-1",
    region: "La Paz",
    localidad: "Río Choqueyapu",
    nivelRiesgo: "Alto",
    tipoRiesgo: "Crecida",
    ultimaActualizacion: "2025-05-10 15:45"
  },
  {
    id: "zona-2",
    region: "La Paz",
    localidad: "Achumani",
    nivelRiesgo: "Medio",
    tipoRiesgo: "Inundación",
    ultimaActualizacion: "2025-05-10 15:20"
  },
  {
    id: "zona-3",
    region: "Cochabamba",
    localidad: "Río Rocha",
    nivelRiesgo: "Bajo",
    tipoRiesgo: "Desborde",
    ultimaActualizacion: "2025-05-10 14:50"
  }
];

function AlertaHidrologicaPage() {
  const [zonas, setZonas] = useState([]);
  const [regiones, setRegiones] = useState([]);
  const [regionSeleccionada, setRegionSeleccionada] = useState("todas");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarZonas = async () => {
      try {
        const tipos = ["Inundación", "Desborde", "Crecida"];
        const snapshot = await getDocs(collection(db, "zonas_riesgo"));
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const zonasFiltradas = data.filter(z => tipos.includes(z.tipoRiesgo));

        if (zonasFiltradas.length > 0) {
          setZonas(zonasFiltradas);
          setRegiones([...new Set(zonasFiltradas.map(z => z.region))]);
        } else {
          setZonas(datosSimulados);
          setRegiones([...new Set(datosSimulados.map(z => z.region))]);
        }
      } catch (error) {
        console.error("Error al obtener zonas:", error);
        setZonas(datosSimulados);
        setRegiones([...new Set(datosSimulados.map(z => z.region))]);
      } finally {
        setCargando(false);
      }
    };

    cargarZonas();
  }, []);

  const zonasFiltradas = regionSeleccionada === "todas"
    ? zonas
    : zonas.filter(z => z.region === regionSeleccionada);

  return (
    <div className="alerta-hidrologica-page with-navbar">
      <div className="contenido-alerta">
        <h1>🚨 Alerta Hidrológica</h1>
        <p className="intro">
          Monitoreo de crecidas, inundaciones y desbordes por región.
        </p>

        <div className="filtro-region">
          <label htmlFor="region">Filtrar por región:</label>
          <select
            id="region"
            value={regionSeleccionada}
            onChange={(e) => setRegionSeleccionada(e.target.value)}
          >
            <option value="todas">Todas las regiones</option>
            {regiones.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        {cargando ? (
          <p className="cargando">Cargando zonas de riesgo...</p>
        ) : (
          <>
            <div className="tabla-container">
              <table className="tabla-zonas">
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
                    <tr key={zona.id} className={`nivel-${zona.nivelRiesgo.toLowerCase()}`}>
                      <td>{zona.region}</td>
                      <td>{zona.localidad}</td>
                      <td>{zona.nivelRiesgo}</td>
                      <td>{zona.tipoRiesgo}</td>
                      <td>{zona.ultimaActualizacion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {regionSeleccionada !== "todas" && (
              <div className="pronostico">
                <h2>🌊 Condiciones Hidrológicas en {regionSeleccionada}</h2>
                <ul>
                  <li>Estado de ríos: Normal</li>
                  <li>Precipitaciones recientes: 15 mm</li>
                  <li>Tendencia: Estable</li>
                </ul>
              </div>
            )}

            <div className="recomendaciones">
              <h2>🛡 Recomendaciones</h2>
              <ul>
                <li>Evite zonas cercanas a ríos en riesgo.</li>
                <li>Prepárese para una evacuación rápida.</li>
                <li>No cruce ríos crecidos.</li>
              </ul>
            </div>

            <div className="mapa">
              <h2>🗺 Mapa de zonas afectadas</h2>
              <HydroRiskMap />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AlertaHidrologicaPage;
