import React, { useEffect, useRef, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import logo from "../assets/Logo_Clima.png";
import "./DashboardEstadisticas.css";
import "./DashboardEstadisticasPrint.css";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function DashboardEstadisticas() {
    const [usuarios, setUsuarios] = useState([]);
    const [reportesClima, setReportesClima] = useState([]);
    const [filtroRol, setFiltroRol] = useState("");
    const [filtroFecha, setFiltroFecha] = useState("");
    const [filtroZona, setFiltroZona] = useState("");
    const [verPlantilla, setVerPlantilla] = useState(false);
    const refPlantilla = useRef(null);

    useEffect(() => {
        const cargarUsuarios = async () => {
            const snapshot = await getDocs(collection(db, "users"));
            const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setUsuarios(data);
        };
        const cargarReportesClima = async () => {
            const snapshot = await getDocs(collection(db, "reportes_clima"));
            const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setReportesClima(data);
        };
        cargarUsuarios();
        cargarReportesClima();
    }, []);

    const handleDownloadPDF = async () => {
        setVerPlantilla(true);

        setTimeout(async () => {
            const input = refPlantilla.current;
            if (!input) return;

            const canvas = await html2canvas(input, { scale: 2 });
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");

            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save("Reporte_Usuarios_Clima.pdf");
        }, 500);
    };

    const usuariosFiltrados = usuarios.filter((u) =>
        filtroRol ? u.rol === filtroRol : true
    );

    const reportesFiltrados = reportesClima.filter((r) => {
        const cumpleFecha = filtroFecha
            ? new Date(r.fecha.toDate()).toLocaleDateString() === filtroFecha
            : true;
        const cumpleZona = filtroZona
            ? r.descripcion?.toLowerCase().includes(filtroZona.toLowerCase()) ||
            r.latitud?.toString().includes(filtroZona) ||
            r.longitud?.toString().includes(filtroZona)
            : true;
        return cumpleFecha && cumpleZona;
    });

    const contarPorRol = () => {
        const conteo = {};
        usuariosFiltrados.forEach((u) => {
            conteo[u.rol] = (conteo[u.rol] || 0) + 1;
        });
        return Object.entries(conteo).map(([rol, count]) => ({ name: rol, value: count }));
    };

    const contarPorEstado = () => {
        let activos = 0;
        let inactivos = 0;
        usuariosFiltrados.forEach((u) => {
            u.activo ? activos++ : inactivos++;
        });
        return [
            { name: "Activos", value: activos },
            { name: "Inactivos", value: inactivos }
        ];
    };

    return (
        <div className="dashboard-estadisticas">
            <h2>Estadísticas de Usuarios</h2>

            <div className="filtro-panel">
                <label>Filtrar por Rol:</label>
                <select value={filtroRol} onChange={(e) => setFiltroRol(e.target.value)}>
                    <option value="">Todos</option>
                    <option value="usuario">Usuario</option>
                    <option value="suscriptor">Suscriptor</option>
                    <option value="administrador">Administrador</option>
                </select>

                <label>Filtrar por Fecha:</label>
                <input
                    type="date"
                    value={filtroFecha}
                    onChange={(e) => setFiltroFecha(e.target.value)}
                />

                <label>Filtrar por Zona:</label>
                <input
                    type="text"
                    placeholder="Ej. av, -16.5, lluvia"
                    value={filtroZona}
                    onChange={(e) => setFiltroZona(e.target.value)}
                />

                <button onClick={() => setVerPlantilla(true)}>
                    📄 Vista previa de Reporte
                </button>
                <button onClick={handleDownloadPDF} className="no-print">
                    📥 Descargar Reporte PDF
                </button>
            </div>

            {verPlantilla && (
                <div ref={refPlantilla} className="plantilla-reporte">
                    <div className="reporte-encabezado">
                        <img src={logo} alt="Logo" className="logo-report" />
                        <div>
                            <h3>REPORTE GENERAL DEL SISTEMA</h3>
                            <p>Emitido: {new Date().toLocaleDateString()}</p>
                        </div>
                    </div>

                    <h4>Usuarios Registrados</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Rol</th>
                                <th>Activo</th>
                                <th>Ubicación</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuariosFiltrados.map((u) => (
                                <tr key={u.id}>
                                    <td>{u.displayName || "—"}</td>
                                    <td>{u.email}</td>
                                    <td>{u.rol}</td>
                                    <td>{u.activo ? "Sí" : "No"}</td>
                                    <td>{u.location || "—"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <h4>Gráficos de Distribución</h4>
                    <div className="charts-container">
                        <div className="chart-card">
                            <h5>Usuarios por Rol</h5>
                            <PieChart width={300} height={250}>
                                <Pie
                                    data={contarPorRol()}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    label
                                >
                                    {contarPorRol().map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </div>

                        <div className="chart-card">
                            <h5>Estado de Cuentas</h5>
                            <PieChart width={300} height={250}>
                                <Pie
                                    data={contarPorEstado()}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    label
                                >
                                    {contarPorEstado().map((entry, index) => (
                                        <Cell key={`estado-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </div>
                    </div>

                    <h4>Reportes Climáticos Registrados</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Descripción</th>
                                <th>Fecha</th>
                                <th>Latitud</th>
                                <th>Longitud</th>
                                <th>Temperatura</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportesFiltrados.map((r) => (
                                <tr key={r.id}>
                                    <td>{r.descripcion}</td>
                                    <td>{new Date(r.fecha.toDate()).toLocaleString()}</td>
                                    <td>{r.latitud}</td>
                                    <td>{r.longitud}</td>
                                    <td>{r.temperatura}°C</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default DashboardEstadisticas;
