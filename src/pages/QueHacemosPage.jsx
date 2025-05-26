// src/pages/QueHacemosPage.jsx
import React from "react";
import "./QueHacemosPage.css";
import { 
  FaMapMarkerAlt, 
  FaBell, 
  FaMobileAlt, 
  FaChartLine, 
  FaShieldAlt,
  FaCloud,
  FaLeaf,
  FaUsers,
  FaGraduationCap,
  FaDatabase,
  FaSatellite
} from "react-icons/fa";

function QueHacemosPage() {
  const services = [
    {
      icon: FaMapMarkerAlt,
      title: "Alertas Geolocalizadas",
      description: "Proporcionamos pronósticos hiperlocales detallados por barrios, distritos y comunidades, adaptados a tu ubicación exacta.",
      color: "geolocation"
    },
    {
      icon: FaBell,
      title: "Notificaciones en Tiempo Real",
      description: "Recibe alertas visuales y auditivas con niveles de riesgo (bajo, medio, alto) sobre eventos climatológicos inminentes.",
      color: "notifications"
    },
    {
      icon: FaMobileAlt,
      title: "Aplicación Móvil",
      description: "Accede a nuestros servicios desde cualquier lugar a través de nuestra aplicación disponible para Android e iOS.",
      color: "mobile"
    },
    {
      icon: FaChartLine,
      title: "Reportes Especializados",
      description: "Ofrecemos modo rural para alertas agrícolas, historial y estadísticas de eventos pasados por zona para planificación preventiva.",
      color: "reports"
    },
    {
      icon: FaShieldAlt,
      title: "Guías de Acción",
      description: "Proporcionamos recomendaciones claras sobre qué hacer antes, durante y después de cada evento climatológico adverso.",
      color: "protection"
    }
  ];

  const dataSources = [
    { icon: FaSatellite, name: "SENAMHI", description: "Servicio Nacional de Meteorología" },
    { icon: FaShieldAlt, name: "Defensa Civil", description: "Coordinación de emergencias" },
    { icon: FaDatabase, name: "Datos Abiertos", description: "Bases climáticas públicas" },
    { icon: FaUsers, name: "Reportes Ciudadanos", description: "Información colaborativa" }
  ];

  const impactItems = [
    {
      icon: FaShieldAlt,
      title: "Prevención",
      description: "Reducción de pérdidas humanas y materiales ante eventos extremos",
      color: "prevention"
    },
    {
      icon: FaCloud,
      title: "Resiliencia",
      description: "Mejora en la capacidad de respuesta de la población",
      color: "resilience"
    },
    {
      icon: FaLeaf,
      title: "Agricultura",
      description: "Apoyo a agricultores mediante pronósticos especializados",
      color: "agriculture"
    },
    {
      icon: FaGraduationCap,
      title: "Educación",
      description: "Concientización ambiental y climática para la comunidad",
      color: "education"
    }
  ];

  return (
    <div className="que-hacemos-container">
      <div className="animated-background">
        <div className="floating-icon icon-1"><FaCloud /></div>
        <div className="floating-icon icon-2"><FaBell /></div>
        <div className="floating-icon icon-3"><FaMapMarkerAlt /></div>
        <div className="floating-icon icon-4"><FaShieldAlt /></div>
      </div>

      <div className="side-decoration left-decoration"></div>

      <main className="main-content">
        <div className="hero-section">
          <h1 className="page-title">¿QUÉ HACEMOS?</h1>
          <div className="title-decoration">
            <div className="decoration-line"></div>
            <FaCloud className="title-icon" />
            <div className="decoration-line"></div>
          </div>
        </div>
        
        <div className="intro-section">
          <div className="intro-card">
            <div className="intro-icon">
              <FaShieldAlt />
            </div>
            <div className="intro-content">
              <h2>Protegemos vidas con tecnología</h2>
              <p>
                En <strong>Alerta Andina</strong>, desarrollamos tecnología para proteger 
                vidas a través de alertas climatológicas precisas y oportunas.
                Combinamos datos meteorológicos avanzados con geolocalización para
                brindarte información personalizada según tu ubicación en La Paz.
              </p>
            </div>
          </div>
        </div>

        <div className="services-section">
          <h2 className="section-title">Nuestros Servicios</h2>
          <div className="services-grid">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div key={index} className={`service-card ${service.color}`}>
                  <div className="service-icon">
                    <IconComponent />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <div className="card-glow"></div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="data-sources-section">
          <h2 className="section-title">Nuestras Fuentes de Datos</h2>
          <div className="data-sources-content">
            <div className="sources-text">
              <p>
                Integramos información de fuentes oficiales complementada con reportes ciudadanos
                para mejorar la precisión y cobertura de nuestras alertas.
              </p>
            </div>
            <div className="sources-grid">
              {dataSources.map((source, index) => {
                const IconComponent = source.icon;
                return (
                  <div key={index} className="source-item">
                    <div className="source-icon">
                      <IconComponent />
                    </div>
                    <div className="source-info">
                      <h4>{source.name}</h4>
                      <p>{source.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="impact-section">
          <h2 className="section-title">Nuestro Impacto</h2>
          <div className="impact-grid">
            {impactItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className={`impact-card ${item.color}`}>
                  <div className="impact-icon">
                    <IconComponent />
                  </div>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="motto-section">
          <div className="motto-card">
            <div className="motto-icon">
              <FaCloud />
            </div>
            <p className="motto">
              <em>"El clima avisa. Tú decides actuar."</em>
            </p>
            <div className="motto-author">
              - Alerta Andina
            </div>
          </div>
        </div>
      </main>

      <div className="side-decoration right-decoration"></div>
    </div>
  );
}

export default QueHacemosPage;