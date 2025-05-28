// src/pages/QueHacemosPage.jsx
import React from "react";
import PropTypes from "prop-types";
import styles from "./QueHacemosPage.module.css";
import { 
  FaMapMarkerAlt, FaBell, FaMobileAlt, FaChartLine, FaShieldAlt,
  FaCloud, FaLeaf, FaUsers, FaGraduationCap, FaDatabase, FaSatellite,
  FaRocket, FaStar, FaHeart, FaMagic
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

// Componente de tarjeta reutilizable
const Card = ({ icon: Icon, title, description, className = "" }) => (
  <div className={`${styles.card} ${className}`}>
    <div className={styles.cardIcon}>
      <Icon />
    </div>
    <h3 className={styles.cardTitle}>{title}</h3>
    <p className={styles.cardDescription}>{description}</p>
  </div>
);

Card.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  className: PropTypes.string
};

// Componente de sección
const Section = ({ title, children, className = "" }) => (
  <section className={`${styles.section} ${className}`}>
    {title && (
      <h2 className={styles.sectionTitle}>
        {title}
      </h2>
    )}
    {children}
  </section>
);

Section.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

// Hero principal
const Hero = () => (
  <div className={styles.hero}>
    <div className={styles.heroBackground}>
      <div className={styles.floatingIcons}>
        <FaCloud className={`${styles.floatingIcon} ${styles.icon1}`} />
        <FaBell className={`${styles.floatingIcon} ${styles.icon2}`} />
        <FaShieldAlt className={`${styles.floatingIcon} ${styles.icon3}`} />
        <FaStar className={`${styles.floatingIcon} ${styles.icon4}`} />
      </div>
    </div>
    
    <div className={styles.heroContent}>
      <h1 className={styles.heroTitle}>
        ¿QUÉ <span className={styles.highlight}>HACEMOS</span>?
      </h1>
      <p className={styles.heroSubtitle}>
        Transformamos datos climáticos en protección real para tu comunidad
      </p>
    </div>
  </div>
);

// Introducción
const Intro = () => (
  <Section className={styles.introSection}>
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
  </Section>
);

// Servicios
const Services = () => (
  <Section title="Nuestros Servicios" className={styles.servicesSection}>
    <div className={styles.servicesGrid}>
      {CONFIG.services.map((service) => (
        <Card
          key={service.id}
          icon={service.icon}
          title={service.title}
          description={service.description}
          className={styles.serviceCard}
        />
      ))}
    </div>
  </Section>
);

// Fuentes de datos
const DataSources = () => (
  <Section title="Nuestras Fuentes de Datos" className={styles.dataSourcesSection}>
    <p className={styles.sourcesDescription}>
      Integramos información de múltiples fuentes oficiales complementada con reportes 
      ciudadanos en tiempo real para mejorar la precisión y cobertura de nuestras alertas.
    </p>
    <div className={styles.sourcesGrid}>
      {CONFIG.dataSources.map((source, index) => (
        <Card
          key={index}
          icon={source.icon}
          title={source.name}
          description={source.description}
          className={styles.sourceCard}
        />
      ))}
    </div>
  </Section>
);

// Impacto
const Impact = () => (
  <Section title="Nuestro Impacto" className={styles.impactSection}>
    <div className={styles.impactGrid}>
      {CONFIG.impacts.map((impact, index) => (
        <Card
          key={index}
          icon={impact.icon}
          title={impact.title}
          description={impact.description}
          className={styles.impactCard}
        />
      ))}
    </div>
  </Section>
);

// Motto final
const Motto = () => (
  <Section className={styles.mottoSection}>
    <div className={styles.mottoCard}>
      <div className={styles.quoteIcon}>
        <FaCloud />
      </div>
      <blockquote className={styles.mottoText}>
        "El clima avisa. Tú decides actuar."
      </blockquote>
      <cite className={styles.mottoAuthor}>— Alerta Andina</cite>
    </div>
  </Section>
);

/**
 * Página ¿Qué Hacemos? - Versión optimizada con CSS Modules
 * Diseño limpio, creativo y directo
 */
function QueHacemosPage() {
  return (
    <div className={styles.pageContainer}>
      <main className={styles.mainContent}>
        <Hero />
        <Intro />
        <Services />
        <DataSources />
        <Impact />
        <Motto />
      </main>
    </div>
  );
}

export default QueHacemosPage;