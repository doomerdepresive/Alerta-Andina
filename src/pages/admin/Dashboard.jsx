import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy, limit } from "firebase/firestore";
import { db } from "../../firebase-config";
import "./Dashboard.css";

import { Pie, Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

function Dashboard() {
    const [usuarios, setUsuarios] = useState([]);
    const [ultimos, setUltimos] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
            const lista = snapshot.docs.map((doc) => doc.data());
            setUsuarios(lista);
        });

        const q = query(collection(db, "users"), orderBy("updatedAt", "desc"), limit(5));
        const unsubUltimos = onSnapshot(q, (snapshot) => {
            const lista = snapshot.docs.map((doc) => doc.data());
            setUltimos(lista);
        });

        return () => {
            unsubscribe();
            unsubUltimos();
        };
    }, []);

    const total = usuarios.length;
    const porRol = {
        administrador: usuarios.filter((u) => u.role === "administrador").length,
        usuario: usuarios.filter((u) => u.role === "usuario").length,
        suscriptor: usuarios.filter((u) => u.role === "suscriptor").length
    };
    const activos = usuarios.filter((u) => u.activo !== false).length;
    const inactivos = total - activos;

    const graficoRoles = {
        labels: ["Administrador", "Usuario", "Suscriptor"],
        datasets: [
            {
                label: "Usuarios por rol",
                data: [porRol.administrador, porRol.usuario, porRol.suscriptor],
                backgroundColor: ["#8e44ad", "#3498db", "#2ecc71"],
                borderWidth: 1
            }
        ]
    };

    const graficoEstado = {
        labels: ["Usuarios Activos", "Usuarios Inactivos"],
        datasets: [
            {
                label: "Cantidad de usuarios",
                data: [activos, inactivos],
                backgroundColor: ["#27ae60", "#c0392b"],
                borderRadius: 6
            }
        ]
    };


    return (
        <div className="dashboard-page">
            <h2>📊 Dashboard de Usuarios</h2>

            <div className="tarjetas">
                <div className="tarjeta">👥 Total: {total}</div>
                <div className="tarjeta">🧑‍💼 Admins: {porRol.administrador}</div>
                <div className="tarjeta">🧑 Usuarios: {porRol.usuario}</div>
                <div className="tarjeta">📨 Suscriptores: {porRol.suscriptor}</div>
                <div className="tarjeta">✅ Activos: {activos}</div>
                <div className="tarjeta">🚫 Inactivos: {inactivos}</div>
            </div>

            <div className="graficas">
                <div className="grafica">
                    <h4>Distribución por Rol</h4>
                    <Pie data={graficoRoles} />
                </div>
                <div className="grafica">
                    <h4>Activos vs Inactivos</h4>
                    <Bar
                        data={graficoEstado}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    display: true,
                                    position: "top"
                                }
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    ticks: {
                                        stepSize: 1
                                    }
                                }
                            }
                        }}
                    />

                </div>
            </div>

            <div className="ultimos-registros">
                <h3>🕒 Últimos usuarios registrados</h3>
                <ul>
                    {ultimos.map((u, index) => (
                        <li key={index}>
                            <strong>{u.displayName || "Sin nombre"}</strong> – {u.email}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Dashboard;
