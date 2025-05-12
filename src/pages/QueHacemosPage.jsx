// src/pages/QueHacemosPage.jsx
import React from "react";
import "./QueHacemosPage.css"; // Crearemos un archivo CSS específico
import { FaMapMarkerAlt, FaBell, FaMobileAlt, FaChartLine, FaShieldAlt } from "react-icons/fa"; // Necesitarás instalar react-icons

function QueHacemosPage() {
  return (
    <div className="page-container que-hacemos-page">
      <div className="side-decoration left-decoration"></div>

      <main className="main-content">
        <h1 className="page-title">¿QUÉ HACEMOS?</h1>
        
        <div className="intro-section">
          <p className="intro-text">
            En <strong>Alerta Andina</strong>, desarrollamos tecnología para proteger 
            vidas a través de alertas climatológicas precisas y oportunas.
            Combinamos datos meteorológicos avanzados con geolocalización para
            brindarte información personalizada según tu ubicación en La Paz.
          </p>
        </div>

        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">
              <FaMapMarkerAlt />
            </div>
            <h3>Alertas Geolocalizadas</h3>
            <p>
              Proporcionamos pronósticos hiperlocales detallados por barrios, 
              distritos y comunidades, adaptados a tu ubicación exacta.
            </p>
          </div>

          <div className="service-card">
            <div className="service-icon">
              <FaBell />
            </div>
            <h3>Notificaciones en Tiempo Real</h3>
            <p>
              Recibe alertas visuales y auditivas con niveles de riesgo 
              (bajo, medio, alto) sobre eventos climatológicos inminentes.
            </p>
          </div>

          <div className="service-card">
            <div className="service-icon">
              <FaMobileAlt />
            </div>
            <h3>Aplicación Móvil</h3>
            <p>
              Accede a nuestros servicios desde cualquier lugar a través de
              nuestra aplicación disponible para Android e iOS.
            </p>
          </div>

          <div className="service-card">
            <div className="service-icon">
              <FaChartLine />
            </div>
            <h3>Reportes Especializados</h3>
            <p>
              Ofrecemos modo rural para alertas agrícolas, historial y estadísticas
              de eventos pasados por zona para planificación preventiva.
            </p>
          </div>

          <div className="service-card">
            <div className="service-icon">
              <FaShieldAlt />
            </div>
            <h3>Guías de Acción</h3>
            <p>
              Proporcionamos recomendaciones claras sobre qué hacer antes, durante
              y después de cada evento climatológico adverso.
            </p>
          </div>
        </div>

        <div className="data-sources-section">
          <h2>Nuestras Fuentes de Datos</h2>
          <p>
            Integramos información de fuentes oficiales como SENAMHI, Defensa Civil
            y bases de datos climáticos abiertos, complementada con reportes ciudadanos
            para mejorar la precisión y cobertura de nuestras alertas.
          </p>
        </div>

        <div className="impact-section">
          <h2>Impacto</h2>
          <div className="impact-items">
            <div className="impact-item">
              <h4>Prevención</h4>
              <p>Reducción de pérdidas humanas y materiales ante eventos extremos</p>
            </div>
            <div className="impact-item">
              <h4>Resiliencia</h4>
              <p>Mejora en la capacidad de respuesta de la población</p>
            </div>
            <div className="impact-item">
              <h4>Agricultura</h4>
              <p>Apoyo a agricultores mediante pronósticos especializados</p>
            </div>
            <div className="impact-item">
              <h4>Educación</h4>
              <p>Concientización ambiental y climática para la comunidad</p>
            </div>
          </div>
        </div>

        <div className="motto-section">
          <p className="motto">
            <em>"El clima avisa. Tú decides actuar."</em>
          </p>
        </div>
      </main>

      <div className="side-decoration right-decoration"></div>
    </div>
  );
}

export default QueHacemosPage;