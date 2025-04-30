import React, { useEffect, useRef, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import { useReactToPrint } from "react-to-print";
import "./UserReport.css";

function UserReport() {
    const [usuarios, setUsuarios] = useState([]);
    const [filtroRol, setFiltroRol] = useState("");
    const [filtroActivo, setFiltroActivo] = useState("");
    const [filtroUbicacion, setFiltroUbicacion] = useState("");
    const reporteRef = useRef();

    useEffect(() => {
        const cargarUsuarios = async () => {
            const snapshot = await getDocs(collection(db, "users"));
            const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setUsuarios(data);
        };
        cargarUsuarios();
    }, []);

    const usuariosFiltrados = usuarios.filter((u) => {
        return (
            (!filtroRol || u.rol === filtroRol) &&
            (!filtroActivo || u.activo === (filtroActivo === "activo")) &&
            (!filtroUbicacion || (u.location || "").toLowerCase().includes(filtroUbicacion.toLowerCase()))
        );
    });

    const imprimirReporte = useReactToPrint({
        content: () => reporteRef.current,
        documentTitle: "Reporte de Usuarios",
    });

    return (
        <div className="user-report">
            <h2>Reporte de Usuarios</h2>

            <div className="report-filtros">
                <select value={filtroRol} onChange={(e) => setFiltroRol(e.target.value)}>
                    <option value="">Todos los roles</option>
                    <option value="usuario">Usuario</option>
                    <option value="suscriptor">Suscriptor</option>
                    <option value="administrador">Administrador</option>
                </select>

                <select value={filtroActivo} onChange={(e) => setFiltroActivo(e.target.value)}>
                    <option value="">Todos</option>
                    <option value="activo">Activos</option>
                    <option value="inactivo">Inactivos</option>
                </select>

                <input
                    type="text"
                    placeholder="Buscar ubicación..."
                    value={filtroUbicacion}
                    onChange={(e) => setFiltroUbicacion(e.target.value)}
                />

                <button onClick={imprimirReporte}>📥 Generar Reporte PDF</button>
            </div>

            <div ref={reporteRef} className="reporte-contenido">
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Rol</th>
                            <th>Estado</th>
                            <th>Ubicación</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuariosFiltrados.map((u) => (
                            <tr key={u.id}>
                                <td>{u.displayName || "—"}</td>
                                <td>{u.email}</td>
                                <td>{u.rol}</td>
                                <td>{u.activo ? "Activo" : "Inactivo"}</td>
                                <td>{u.location || "—"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {usuariosFiltrados.length === 0 && <p>No se encontraron usuarios con los filtros seleccionados.</p>}
            </div>
        </div>
    );
}

export default UserReport;
