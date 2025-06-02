// src/pages/MisionPage.jsx
import React from "react";
import PropTypes from "prop-types";
import styles from "./MisionPage.module.css";
import { 
  FaBullseye, FaGlobe, FaLeaf, FaShieldAlt, FaHeart, 
  FaStar, FaMagic, FaQuoteLeft, FaEye, FaHandshake,
  FaRocket, FaUsers, FaGraduationCap
} from "react-icons/fa";

// Configuración de datos
const CONFIG = {
  missionStatement: `Somos la entidad rectora de la actividad meteorológica, hidrológica y actividades afines; 
como institución técnico científica prestamos servicios especializados que contribuyen al 
desarrollo sostenible del Estado Plurinacional de Bolivia; proporcionamos información 
hidrometeorológica a todos los usuarios, a los sistemas medioambientales para el cuidado de la Madre Tierra.`,

  pillars: [
    { 
      id: 'services', 
      icon: FaBullseye, 
      title: "Servicios Especializados", 
      description: "Institución técnico científica que contribuye al desarrollo sostenible del país"
    },
    { 
      id: 'environment', 
      icon: FaLeaf, 
      title: "Cuidado de la Madre Tierra", 
      description: "Información para sistemas medioambientales y sostenibilidad integral"
    },
    { 
      id: 'international', 
      icon: FaGlobe, 
      title: "Alcance Internacional", 
      description: "Participación en vigilancia atmosférica mundial y OMM"
    },
    { 
      id: 'risk-management', 
      icon: FaShieldAlt, 
      title: "Gestión de Riesgos", 
      description: "Prevención y mitigación de desastres naturales"
    }
  ],

  values: [
    { icon: FaEye, title: "Transparencia", description: "Información clara y accesible para todos" },
    { icon: FaHandshake, title: "Compromiso", description: "Dedicación constante con la sociedad" },
    { icon: FaRocket, title: "Innovación", description: "Tecnología avanzada al servicio del país" },
    { icon: FaUsers, title: "Colaboración", description: "Trabajo conjunto con instituciones nacionales" }
  ]
};

/**
 * Página Misión - Rediseño moderno inspirado en QueHacemosPage
 */
function MisionPage({ withNavbar = true }) {
  return (
    <div className={styles.misionPage}>
      <div className={`${styles.pageContainer} ${withNavbar ? styles.withNavbar : ''}`}>
        
        {/* Header principal */}
        <header className={styles.pageHeader}>
          <div className={styles.headerContent}>
            <h1 className={styles.pageTitle}>
              NUESTRA MISIÓN
            </h1>
            <p className={styles.pageSubtitle}>
              Protegiendo Bolivia a través de la ciencia meteorológica
            </p>
          </div>
          <div className={styles.headerStats}>
            <div className={styles.statItem}>
              <FaStar />
              <span>Excelencia Científica</span>
            </div>
            <div className={styles.statItem}>
              <FaHeart />
              <span>Servicio a la Patria</span>
            </div>
            <div className={styles.statItem}>
              <FaShieldAlt />
              <span>Protección Total</span>
            </div>
          </div>
        </header>

        {/* Sección de declaración de misión */}
        <section className={styles.missionSection}>
          <div className={styles.missionCard}>
            <div className={styles.missionIcon}>
              <FaMagic />
            </div>
            <h2 className={styles.missionTitle}>
              Al servicio de <span className={styles.highlight}>Bolivia</span>
            </h2>
            <p className={styles.missionText}>
              {CONFIG.missionStatement}
            </p>
            <div className={styles.missionStats}>
              <div className={styles.stat}>
                <FaGlobe />
                <span>Alcance Nacional</span>
              </div>
              <div className={styles.stat}>
                <FaLeaf />
                <span>Sostenibilidad</span>
              </div>
            </div>
          </div>
        </section>

        {/* Sección de pilares */}
        <section className={styles.pillarsSection}>
          <h2 className={styles.sectionTitle}>Nuestros Pilares Fundamentales</h2>
          <div className={styles.pillarsGrid}>
            {CONFIG.pillars.map((pillar) => (
              <div key={pillar.id} className={styles.pillarCard}>
                <div className={styles.cardIcon}>
                  <pillar.icon />
                </div>
                <h3 className={styles.cardTitle}>{pillar.title}</h3>
                <p className={styles.cardDescription}>{pillar.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sección de valores */}
        <section className={styles.valuesSection}>
          <h2 className={styles.sectionTitle}>Nuestros Valores</h2>
          <p className={styles.valuesDescription}>
            Los principios que guían nuestro trabajo diario y nuestro compromiso 
            con la excelencia en el servicio meteorológico nacional.
          </p>
          <div className={styles.valuesGrid}>
            {CONFIG.values.map((value, index) => (
              <div key={index} className={styles.valueCard}>
                <div className={styles.cardIcon}>
                  <value.icon />
                </div>
                <h3 className={styles.cardTitle}>{value.title}</h3>
                <p className={styles.cardDescription}>{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sección de compromiso */}
        <section className={styles.commitmentSection}>
          <div className={styles.commitmentCard}>
            <div className={styles.quoteIcon}>
              <FaQuoteLeft />
            </div>
            <blockquote className={styles.commitmentText}>
              "Dedicados a proteger vidas y el medio ambiente a través de 
              la ciencia meteorológica y la innovación tecnológica al servicio de Bolivia."
            </blockquote>
            <cite className={styles.commitmentAuthor}>— SENAMHI Bolivia</cite>
          </div>
        </section>

      </div>
    </div>
  );
}

MisionPage.propTypes = {
  withNavbar: PropTypes.bool
};

export default MisionPage;