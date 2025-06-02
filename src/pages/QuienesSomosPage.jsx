// src/pages/QuienesSomosPage.jsx
import React from "react";
import PropTypes from "prop-types";
import styles from "./QuienesSomosPage.module.css";
import {
  FaGraduationCap,
  FaLaptopCode,
  FaSchool,
  FaUsers,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaStar,
  FaHeart,
  FaShieldAlt,
  FaMagic,
  FaQuoteLeft,
  FaUniversity,
  FaCode,
  FaHandsHelping,
  FaRocket
} from "react-icons/fa";

// Configuración de datos
const CONFIG = {
  teamMembers: [
    {
      id: 'brayaan',
      initials: 'BG',
      name: 'Brayaan Gutierrez Morales',
      role: 'Estudiante de Ingeniería de Sistemas',
      institution: 'EMI - La Paz',
      gradientClass: 'gradientBg1'
    },
    {
      id: 'norman',
      initials: 'NT',
      name: 'Norman Lisandro Tintaya Mollinedo',
      role: 'Estudiante de Ingeniería de Sistemas',
      institution: 'A26047-9',
      gradientClass: 'gradientBg2'
    }
  ],

  pillars: [
    {
      id: 'academic',
      icon: FaUniversity,
      title: "Respaldo Académico",
      description: "Este proyecto se desarrolla como parte de nuestra formación académica en la EMI, institución de prestigio en la formación de ingenieros en Bolivia."
    },
    {
      id: 'innovation',
      icon: FaCode,
      title: "Innovación Tecnológica",
      description: "Combinamos conocimientos de desarrollo de software, meteorología y geolocalización para crear una solución tecnológica adaptada a las necesidades de La Paz."
    },
    {
      id: 'social',
      icon: FaHandsHelping,
      title: "Compromiso Social",
      description: "Buscamos generar un impacto positivo en nuestra comunidad, especialmente en zonas vulnerables ante eventos climatológicos adversos."
    },
    {
      id: 'research',
      icon: FaRocket,
      title: "Investigación Aplicada",
      description: "Aplicamos metodologías de investigación científica para el desarrollo de soluciones tecnológicas a problemas reales de nuestra sociedad."
    }
  ],

  projectDetails: [
    { label: "Carrera", value: "Ingeniería de Sistemas" },
    { label: "Paralelo", value: "8vo \"A\"" },
    { label: "Semestre", value: "I / 2025" },
    { label: "Grupo", value: "1" }
  ]
};

/**
 * Página ¿Quiénes Somos? - Rediseño con estilo moderno
 */
function QuienesSomosPage({ withNavbar = true }) {
  return (
    <div className={styles.quienesSomosPage}>
      <div className={`${styles.pageContainer} ${withNavbar ? styles.withNavbar : ''}`}>
        
        {/* Header principal */}
        <header className={styles.pageHeader}>
          <div className={styles.headerContent}>
            <h1 className={styles.pageTitle}>
              ¿QUIÉNES SOMOS?
            </h1>
            <p className={styles.pageSubtitle}>
              Estudiantes comprometidos con la innovación y la protección de nuestra comunidad
            </p>
          </div>
          <div className={styles.headerStats}>
            <div className={styles.statItem}>
              <FaMapMarkerAlt />
              <span>La Paz, Bolivia</span>
            </div>
            <div className={styles.statItem}>
              <FaCalendarAlt />
              <span>2025</span>
            </div>
            <div className={styles.statItem}>
              <FaUniversity />
              <span>EMI</span>
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
              <span className={styles.highlight}>Alerta Andina</span> nace de la pasión estudiantil
            </h2>
            <p className={styles.introText}>
              Es un proyecto innovador desarrollado por estudiantes de <strong>Ingeniería de Sistemas</strong> de la 
              Escuela Militar de Ingeniería "Mcal. Antonio José de Sucre" (EMI) de La Paz, Bolivia. 
              Nuestro objetivo es crear un sistema de alerta temprana climatológica geolocalizada 
              que contribuya a la prevención de riesgos en nuestra ciudad.
            </p>
            <div className={styles.introStats}>
              <div className={styles.stat}>
                <FaStar />
                <span>Excelencia Académica</span>
              </div>
              <div className={styles.stat}>
                <FaHeart />
                <span>Compromiso Social</span>
              </div>
            </div>
          </div>
        </section>

        {/* Sección del equipo */}
        <section className={styles.teamSection}>
          <h2 className={styles.sectionTitle}>Nuestro Equipo</h2>
          <div className={styles.teamGrid}>
            {CONFIG.teamMembers.map((member) => (
              <div key={member.id} className={styles.teamCard}>
                <div className={`${styles.memberAvatar} ${styles[member.gradientClass]}`}>
                  <span>{member.initials}</span>
                </div>
                <div className={styles.memberInfo}>
                  <h3 className={styles.memberName}>{member.name}</h3>
                  <p className={styles.memberRole}>{member.role}</p>
                  <p className={styles.memberInstitution}>{member.institution}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sección de pilares */}
        <section className={styles.pillarsSection}>
          <h2 className={styles.sectionTitle}>Nuestros Pilares</h2>
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

        {/* Sección de visión */}
        <section className={styles.visionSection}>
          <div className={styles.visionCard}>
            <div className={styles.quoteIcon}>
              <FaQuoteLeft />
            </div>
            <h2 className={styles.visionTitle}>Nuestra Visión</h2>
            <p className={styles.visionText}>
              Aspiramos a que <strong>Alerta Andina</strong> se convierta en una herramienta esencial 
              para la prevención de riesgos climatológicos, comenzando en La Paz, pero con potencial 
              de expansión a otras regiones de Bolivia y Sudamérica. Creemos firmemente que la 
              tecnología puede y debe ponerse al servicio de la seguridad y bienestar de las personas.
            </p>
          </div>
        </section>

        {/* Sección de detalles del proyecto */}
        <section className={styles.projectDetailsSection}>
          <h2 className={styles.sectionTitle}>Detalles del Proyecto</h2>
          <div className={styles.detailsGrid}>
            {CONFIG.projectDetails.map((detail, index) => (
              <div key={index} className={styles.detailCard}>
                <div className={styles.detailLabel}>{detail.label}</div>
                <div className={styles.detailValue}>{detail.value}</div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

QuienesSomosPage.propTypes = {
  withNavbar: PropTypes.bool
};

export default QuienesSomosPage;