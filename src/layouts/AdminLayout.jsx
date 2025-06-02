import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import "./AdminLayout.css";

function AdminLayout() {
    const [sidebarActive, setSidebarActive] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                navigate("/login");
            })
            .catch((error) => {
                console.error("Error al cerrar sesión:", error);
            });
    };

    return (
        <div className="admin-layout">
            <button
                className="sidebar-toggle"
                onClick={() => setSidebarActive(!sidebarActive)}
            >
                ☰
            </button>

            <div
                className={`sidebar-overlay ${sidebarActive ? "active" : ""}`}
                onClick={() => setSidebarActive(false)}
            ></div>

            <aside className={`sidebar ${sidebarActive ? "active" : ""}`}>
                <h2 className="logo">Alerta Andina</h2>
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/admin" end onClick={() => setSidebarActive(false)}>
                                Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/usuarios" onClick={() => setSidebarActive(false)}>
                                Usuarios
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/reportes" onClick={() => setSidebarActive(false)}>
                                Reportes
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/alertas" onClick={() => setSidebarActive(false)}>
                                Alertas
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/contenido" onClick={() => setSidebarActive(false)}>
                                Contenido
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/perfil" onClick={() => setSidebarActive(false)}>
                                Mi perfil
                            </NavLink>
                        </li>
                        <li>
                            <button className="logout-btn" onClick={handleLogout}>
                                Cerrar sesión
                            </button>
                        </li>
                    </ul>
                </nav>
            </aside>

            <main className="content">
                <header>
                    <h1>Panel Administrativo</h1>
                </header>
                <section>
                    <Outlet />
                </section>
            </main>
        </div>
    );
}

export default AdminLayout;
