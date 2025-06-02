import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase-config";
import "./Reportes.css";
import VistaReporteModal from "../../components/VistaReporteModal";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Importar logos desde archivos locales
import logoClima from "../../assets/Logo_Clima-remove.png";
import logoAndina from "../../assets/Logo_Alerta_Andina.png";

function Reportes() {
    const [reportes, setReportes] = useState([]);
    const [filtroCategoria, setFiltroCategoria] = useState("todos");
    const [filtroTexto, setFiltroTexto] = useState("");
    const [modalAbierto, setModalAbierto] = useState(null);

    useEffect(() => {
        const q = query(collection(db, "reportes"), orderBy("timestamp", "desc"));
        const unsub = onSnapshot(q, (snapshot) => {
            const lista = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setReportes(lista);
        });
        return () => unsub();
    }, []);

    const formatearFecha = (ts) => {
        if (!ts || !ts.toDate) return "—";
        const fecha = ts.toDate();
        return fecha.toLocaleDateString("es-BO") + " " + fecha.toLocaleTimeString("es-BO", { hour: "2-digit", minute: "2-digit" });
    };

    const eliminarReporte = async (id) => {
        const confirmar = window.confirm("¿Estás seguro de eliminar este reporte?");
        if (!confirmar) return;
        try {
            await deleteDoc(doc(db, "reportes", id));
        } catch (err) {
            console.error("Error al eliminar reporte:", err);
        }
    };

    const reportesFiltrados = reportes.filter((r) => {
        const coincideCategoria = filtroCategoria === "todos" || r.categoria === filtroCategoria;
        const coincideTexto =
            r.descripcion?.toLowerCase().includes(filtroTexto.toLowerCase()) ||
            r.userName?.toLowerCase().includes(filtroTexto.toLowerCase());
        return coincideCategoria && coincideTexto;
    });

    const exportarPDF = () => {
        const docPDF = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
        const pageWidth = docPDF.internal.pageSize.getWidth();

        const imgClima = new Image();
        const imgAndina = new Image();
        imgClima.src = logoClima;
        imgAndina.src = logoAndina;

        imgClima.onload = () => {
            imgAndina.onload = () => {
                docPDF.addImage(imgClima, "PNG", 10, 10, 30, 30);
                docPDF.addImage(imgAndina, "PNG", pageWidth - 40, 10, 30, 30);

                docPDF.setFontSize(16);
                docPDF.setFont("helvetica", "bold");
                docPDF.text("REPORTE DE REPORTES CIUDADANOS", pageWidth / 2, 20, { align: "center" });

                docPDF.setFontSize(10);
                docPDF.setFont("helvetica", "normal");
                docPDF.text("Fecha de exportación: " + new Date().toLocaleString("es-BO"), 10, 45);

                const columnas = ["Usuario", "Categoría", "Descripción", "Fecha", "Coordenadas"];
                const filas = reportesFiltrados.map((r) => [
                    r.userName,
                    r.categoria,
                    r.descripcion?.slice(0, 50) || "—",
                    formatearFecha(r.timestamp),
                    r.lat && r.lng ? `${r.lat.toFixed(4)}, ${r.lng.toFixed(4)}` : "—"
                ]);

                autoTable(docPDF, {
                    startY: 50,
                    head: [columnas],
                    body: filas,
                    styles: { fontSize: 9, cellPadding: 2 },
                    headStyles: { fillColor: [22, 160, 133] },
                    margin: { top: 50, left: 10, right: 10 }
                });

                const pageCount = docPDF.internal.getNumberOfPages();
                for (let i = 1; i <= pageCount; i++) {
                    docPDF.setPage(i);
                    docPDF.setFontSize(8);
                    docPDF.text(`Página ${i} de ${pageCount}`, pageWidth - 20, 290, { align: "right" });
                }

                docPDF.save("reportes_alerta_andina.pdf");
            };
        };
    };

    const categoriasUnicas = [...new Set(reportes.map((r) => r.categoria))];

    return (
        <div className="reportes-page">
            <h2>📥 Reportes Ciudadanos</h2>

            <div className="filtros-reportes">
                <select value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)}>
                    <option value="todos">Todas las categorías</option>
                    {categoriasUnicas.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>

                <input
                    type="text"
                    placeholder="Buscar por usuario o descripción"
                    value={filtroTexto}
                    onChange={(e) => setFiltroTexto(e.target.value)}
                />

                <button onClick={exportarPDF}>📄 Exportar PDF</button>
            </div>

            <table className="tabla-reportes">
                <thead>
                    <tr>
                        <th>Usuario</th>
                        <th>Categoría</th>
                        <th>Descripción</th>
                        <th>Fecha</th>
                        <th>Ubicación</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {reportesFiltrados.map((r) => (
                        <tr key={r.id}>
                            <td>{r.userName}</td>
                            <td>{r.categoria}</td>
                            <td>{r.descripcion?.slice(0, 60)}{r.descripcion?.length > 60 && "..."}</td>
                            <td>{formatearFecha(r.timestamp)}</td>
                            <td>{r.lat && r.lng ? `${r.lat.toFixed(4)}, ${r.lng.toFixed(4)}` : "—"}</td>
                            <td className="acciones-reportes">
                                <button onClick={() => setModalAbierto(r)}>👁 Ver</button>
                                <button onClick={() => eliminarReporte(r.id)}>🗑 Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <VistaReporteModal reporte={modalAbierto} onClose={() => setModalAbierto(null)} />
        </div>
    );
}

export default Reportes;
