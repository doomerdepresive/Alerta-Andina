// src/pages/admin/Alertas.jsx
import React from "react";
import "./Alertas.css";

function Alertas() {
    return (
        <div className="alertas-page">
            <h2>🔔 Gestión de Alertas Meteorológicas e Hidrológicas</h2>
            <p>Aquí podrás crear, editar o visualizar alertas activas y su historial.</p>
            <div className="alertas-placeholder">
                <p>🚧 Módulo en construcción. Próximamente se integrará con el sistema de alertas y API del clima.</p>
            </div>
        </div>
    );
}

export default Alertas;