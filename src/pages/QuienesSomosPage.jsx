// src/pages/QuienesSomosPage.jsx
import React from "react";
import styles from "./QuienesSomosPage.module.css";
import {
  FaGraduationCap,
  FaLaptopCode,
  FaSchool,
  FaUsers,
  FaMapMarkerAlt,
  FaCalendarAlt
} from "react-icons/fa";

function QuienesSomosPage() {
  return (
    <div className={styles.quienesSomosContainer}>
      <div className={`${styles.sideDecoration} ${styles.leftDecoration}`}></div>

      <main className={styles.mainContent}>
        <div className={styles.heroSection}>
          <h1 className={styles.pageTitle}>¿QUIÉNES SOMOS?</h1>
          <div className={styles.titleUnderline}></div>
        </div>

        <div className={styles.introSection}>
          <div className={styles.introContent}>
            <div className={styles.introText}>
              <h2>Alerta Andina</h2>
              <p>
                Es un proyecto innovador desarrollado por estudiantes de Ingeniería de Sistemas de la <strong>Escuela Militar de Ingeniería "Mcal. Antonio José de Sucre" (EMI)</strong> de La Paz, Bolivia. Nuestro objetivo es crear un sistema de alerta temprana climatológica geolocalizada que contribuya a la prevención de riesgos en nuestra ciudad.
              </p>
            </div>
            <div className={styles.introStats}>
              <div className={styles.statItem}>
                <FaMapMarkerAlt className={styles.statIcon} />
                <span>La Paz, Bolivia</span>
              </div>
              <div className={styles.statItem}>
                <FaCalendarAlt className={styles.statIcon} />
                <span>2025</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.teamSection}>
          <h2 className={styles.sectionTitle}>Nuestro Equipo</h2>
          <div className={styles.teamMembers}>
            <div className={styles.teamMember}>
              <div className={`${styles.memberAvatar} ${styles.gradientBg1}`}>
                <span>BG</span>
              </div>
              <div className={styles.memberInfo}>
                <h3>Brayaan Gutierrez Morales</h3>
                <p className={styles.memberRole}>Estudiante de Ingeniería de Sistemas</p>
                <p className={styles.memberInstitution}>EMI - La Paz</p>
              </div>
            </div>
            <div className={styles.teamMember}>
              <div className={`${styles.memberAvatar} ${styles.gradientBg2}`}>
                <span>NT</span>
              </div>
              <div className={styles.memberInfo}>
                <h3>Norman Lisandro Tintaya Mollinedo</h3>
                <p className={styles.memberRole}>Estudiante de Ingeniería de Sistemas</p>
                <p className={styles.memberInstitution}>A26047-9</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.infoCardsSection}>
          <h2 className={styles.sectionTitle}>Nuestros Pilares</h2>
          <div className={styles.infoCards}>
            <div className={styles.infoCard}>
              <div className={`${styles.infoIcon} ${styles.schoolIcon}`}>
                <FaSchool />
              </div>
              <h3>Respaldo Académico</h3>
              <p>
                Este proyecto se desarrolla como parte de nuestra formación académica en la EMI, institución de prestigio en la formación de ingenieros en Bolivia.
              </p>
            </div>

            <div className={styles.infoCard}>
              <div className={`${styles.infoIcon} ${styles.techIcon}`}>
                <FaLaptopCode />
              </div>
              <h3>Innovación Tecnológica</h3>
              <p>
                Combinamos conocimientos de desarrollo de software, meteorología y geolocalización para crear una solución tecnológica adaptada a las necesidades de La Paz.
              </p>
            </div>

            <div className={styles.infoCard}>
              <div className={`${styles.infoIcon} ${styles.socialIcon}`}>
                <FaUsers />
              </div>
              <h3>Compromiso Social</h3>
              <p>
                Buscamos generar un impacto positivo en nuestra comunidad, especialmente en zonas vulnerables ante eventos climatológicos adversos.
              </p>
            </div>

            <div className={styles.infoCard}>
              <div className={`${styles.infoIcon} ${styles.researchIcon}`}>
                <FaGraduationCap />
              </div>
              <h3>Investigación Aplicada</h3>
              <p>
                Aplicamos metodologías de investigación científica para el desarrollo de soluciones tecnológicas a problemas reales de nuestra sociedad.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.visionMissionSection}>
          <div className={styles.visionCard}>
            <h2>Nuestra Visión</h2>
            <p>
              Aspiramos a que Alerta Andina se convierta en una herramienta esencial para la prevención de riesgos climatológicos, comenzando en La Paz, pero con potencial de expansión a otras regiones de Bolivia y Sudamérica. Creemos firmemente que la tecnología puede y debe ponerse al servicio de la seguridad y bienestar de las personas.
            </p>
          </div>
        </div>

        <div className={styles.projectDetails}>
          <h2 className={styles.sectionTitle}>Detalles del Proyecto</h2>
          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <strong>Carrera:</strong>
              <span>Ingeniería de Sistemas</span>
            </div>
            <div className={styles.detailItem}>
              <strong>Paralelo:</strong>
              <span>8vo "A"</span>
            </div>
            <div className={styles.detailItem}>
              <strong>Semestre:</strong>
              <span>I / 2025</span>
            </div>
            <div className={styles.detailItem}>
              <strong>Grupo:</strong>
              <span>1</span>
            </div>
          </div>
        </div>
      </main>

      <div className={`${styles.sideDecoration} ${styles.rightDecoration}`}></div>
    </div>
  );
}

export default QuienesSomosPage;
