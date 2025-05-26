import React from "react";
import { Link } from "react-router-dom";
import "./AdminPage.css";
import UserManager from "../components/UserManager";

function AdminPage() {
    return (
        <div className="admin-container">
            <div className="admin-header">
                <h1>Bienvenido Administrador</h1>
                <Link to="/estadisticas" className="dashboard-link">
                    📊 Ver Dashboard de Estadísticas
                </Link>
            </div>
            <UserManager />
        </div>
    );
}

export default AdminPage;
