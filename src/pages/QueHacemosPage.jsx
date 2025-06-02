// src/pages/QueHacemosPage.jsx
import React from "react";
import PropTypes from "prop-types";
import styles from "./QueHacemosPage.module.css";
import {
  FaMapMarkerAlt, FaBell, FaMobileAlt, FaChartLine, FaShieldAlt,
  FaCloud, FaLeaf, FaUsers, FaGraduationCap, FaDatabase, FaSatellite,
  FaRocket, FaStar, FaHeart, FaMagic, FaQuoteLeft
} from "react-icons/fa";

// Configuración de datos
const CONFIG = {
  services: [
    {
      id: 'geolocation',
      icon: FaMapMarkerAlt,
      title: "Alertas Geolocalizadas",
      description: "Pronósticos hiperlocales por barrios y comunidades, adaptados a tu ubicación exacta."
    },
    {
      id: 'notifications',
      icon: FaBell,
      title: "Notificaciones en Tiempo Real",
      description: "Alertas instantáneas con niveles de riesgo sobre eventos climatológicos inminentes."
    },
    {
      id: 'mobile',
      icon: FaMobileAlt,
      title: "Aplicación Móvil",
      description: "Acceso completo desde Android e iOS. Lleva la protección en tu bolsillo."
    },
    {
      id: 'reports',
      icon: FaChartLine,
      title: "Reportes Especializados",
      description: "Modo rural para alertas agrícolas e historial de eventos para planificación preventiva."
    },
    {
      id: 'protection',
      icon: FaShieldAlt,
      title: "Guías de Acción",
      description: "Recomendaciones claras sobre qué hacer antes, durante y después de eventos adversos."
    }
  ],

  dataSources: [
    { icon: FaSatellite, name: "SENAMHI", description: "Servicio Nacional de Meteorología" },
    { icon: FaShieldAlt, name: "Defensa Civil", description: "Coordinación de emergencias" },
    { icon: FaDatabase, name: "Datos Abiertos", description: "Bases climáticas públicas" },
    { icon: FaUsers, name: "Reportes Ciudadanos", description: "Información colaborativa" }
  ],

  impacts: [
    { icon: FaShieldAlt, title: "Prevención", description: "Reducción de pérdidas humanas y materiales" },
    { icon: FaRocket, title: "Resiliencia", description: "Mejora en la capacidad de respuesta" },
    { icon: FaLeaf, title: "Agricultura", description: "Apoyo a agricultores con pronósticos especializados" },
    { icon: FaGraduationCap, title: "Educación", description: "Concientización ambiental comunitaria" }
  ]
};

/**
 * Página ¿Qué Hacemos? - Versión corregida para coincidir con CSS Modules
 */
function QueHacemosPage({ withNavbar = true }) {
  return (
    <div className={styles.queHacemosPage}>
      <div className={`${styles.pageContainer} ${withNavbar ? styles.withNavbar : ''}`}>

        {/* Header principal */}
        <header className={styles.pageHeader}>
          <div className={styles.headerContent}>
            <h1 className={styles.pageTitle}>
              ¿QUÉ HACEMOS?
            </h1>
            <p className={styles.pageSubtitle}>
              Transformamos datos climáticos en protección real para tu comunidad
            </p>
          </div>
          <div className={styles.headerStats}>
            <div className={styles.statItem}>
              <FaStar />
              <span>24/7 Monitoreo</span>
            </div>
            <div className={styles.statItem}>
              <FaHeart />
              <span>Precisión Total</span>
            </div>
            <div className={styles.statItem}>
              <FaShieldAlt />
              <span>Protección Real</span>
            </div>
          </div>
        </header>

        {/* Sección de introducción */}
        <section className={styles.introSection}>
          <div className={styles.introCard}>
            <div className={styles.introIcon}>
              <FaMagic />
            </div>
            <h2 className={styles.introTitle}>
              Protegemos vidas con <span className={styles.highlight}>tecnología</span>
            </h2>
            <p className={styles.introText}>
              En <strong>Alerta Andina</strong>, desarrollamos tecnología de vanguardia para proteger vidas
              a través de alertas climatológicas precisas y oportunas. Combinamos inteligencia artificial,
              datos meteorológicos avanzados y geolocalización para brindarte información personalizada
              según tu ubicación en La Paz.
            </p>
            <div className={styles.introStats}>
              <div className={styles.stat}>
                <FaStar />
                <span>24/7 Monitoreo</span>
              </div>
              <div className={styles.stat}>
                <FaHeart />
                <span>100% Precisión</span>
              </div>
            </div>
          </div>
        </section>

        {/* Sección de servicios */}
        <section className={styles.servicesSection}>
          <h2 className={styles.sectionTitle}>Nuestros Servicios</h2>
          <div className={styles.servicesGrid}>
            {CONFIG.services.map((service) => (
              <div key={service.id} className={styles.serviceCard}>
                <div className={styles.cardIcon}>
                  <service.icon />
                </div>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDescription}>{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sección de fuentes de datos */}
        <section className={styles.dataSourcesSection}>
          <h2 className={styles.sectionTitle}>Nuestras Fuentes de Datos</h2>
          <p className={styles.sourcesDescription}>
            Integramos información de múltiples fuentes oficiales complementada con reportes
            ciudadanos en tiempo real para mejorar la precisión y cobertura de nuestras alertas.
          </p>
          <div className={styles.sourcesGrid}>
            {CONFIG.dataSources.map((source, index) => (
              <div key={index} className={styles.sourceCard}>
                <div className={styles.cardIcon}>
                  <source.icon />
                </div>
                <h3 className={styles.cardTitle}>{source.name}</h3>
                <p className={styles.cardDescription}>{source.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sección de impacto */}
        <section className={styles.impactSection}>
          <h2 className={styles.sectionTitle}>Nuestro Impacto</h2>
          <div className={styles.impactGrid}>
            {CONFIG.impacts.map((impact, index) => (
              <div key={index} className={styles.impactCard}>
                <div className={styles.cardIcon}>
                  <impact.icon />
                </div>
                <h3 className={styles.cardTitle}>{impact.title}</h3>
                <p className={styles.cardDescription}>{impact.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sección del motto */}
        <section className={styles.mottoSection}>
          <div className={styles.mottoCard}>
            <div className={styles.quoteIcon}>
              <FaQuoteLeft />
            </div>
            <blockquote className={styles.mottoText}>
              "El clima avisa. Tú decides actuar."
            </blockquote>
            <cite className={styles.mottoAuthor}>— Alerta Andina</cite>
          </div>
        </section>

      </div>
    </div>
  );
}

QueHacemosPage.propTypes = {
  withNavbar: PropTypes.bool
};

export default QueHacemosPage;