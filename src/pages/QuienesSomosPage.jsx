// src/pages/QuienesSomosPage.jsx
import React from "react";
import "./QuienesSomosPage.css";
import { FaGraduationCap, FaLaptopCode, FaSchool, FaUsers, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

function QuienesSomosPage() {
  return (
    <div className="quienes-somos-container">
      <div className="side-decoration left-decoration"></div>

      <main className="main-content">
        <div className="hero-section">
          <h1 className="page-title">¿QUIÉNES SOMOS?</h1>
          <div className="title-underline"></div>
        </div>
        
        <div className="intro-section">
          <div className="intro-content">
            <div className="intro-text">
              <h2>Alerta Andina</h2>
              <p>
                Es un proyecto innovador desarrollado por estudiantes de Ingeniería de Sistemas 
                de la <strong>Escuela Militar de Ingeniería "Mcal. Antonio José de Sucre" (EMI)</strong> 
                de La Paz, Bolivia. Nuestro objetivo es crear un sistema de alerta temprana 
                climatológica geolocalizada que contribuya a la prevención de riesgos en nuestra ciudad.
              </p>
            </div>
            <div className="intro-stats">
              <div className="stat-item">
                <FaMapMarkerAlt className="stat-icon" />
                <span>La Paz, Bolivia</span>
              </div>
              <div className="stat-item">
                <FaCalendarAlt className="stat-icon" />
                <span>2025</span>
              </div>
            </div>
          </div>
        </div>

        <div className="team-section">
          <h2 className="section-title">Nuestro Equipo</h2>
          <div className="team-members">
            <div className="team-member">
              <div className="member-avatar gradient-bg-1">
                <span>BG</span>
              </div>
              <div className="member-info">
                <h3>Brayaan Gutierrez Morales</h3>
                <p className="member-role">Estudiante de Ingeniería de Sistemas</p>
                <p className="member-institution">EMI - La Paz</p>
              </div>
            </div>
            <div className="team-member">
              <div className="member-avatar gradient-bg-2">
                <span>NT</span>
              </div>
              <div className="member-info">
                <h3>Norman Lisandro Tintaya Mollinedo</h3>
                <p className="member-role">Estudiante de Ingeniería de Sistemas</p>
                <p className="member-institution">A26047-9</p>
              </div>
            </div>
          </div>
        </div>

        <div className="info-cards-section">
          <h2 className="section-title">Nuestros Pilares</h2>
          <div className="info-cards">
            <div className="info-card">
              <div className="info-icon school-icon">
                <FaSchool />
              </div>
              <h3>Respaldo Académico</h3>
              <p>
                Este proyecto se desarrolla como parte de nuestra formación académica
                en la EMI, institución de prestigio en la formación de ingenieros en Bolivia.
              </p>
            </div>

            <div className="info-card">
              <div className="info-icon tech-icon">
                <FaLaptopCode />
              </div>
              <h3>Innovación Tecnológica</h3>
              <p>
                Combinamos conocimientos de desarrollo de software, meteorología y 
                geolocalización para crear una solución tecnológica adaptada a las 
                necesidades de La Paz.
              </p>
            </div>

            <div className="info-card">
              <div className="info-icon social-icon">
                <FaUsers />
              </div>
              <h3>Compromiso Social</h3>
              <p>
                Buscamos generar un impacto positivo en nuestra comunidad, especialmente 
                en zonas vulnerables ante eventos climatológicos adversos.
              </p>
            </div>

            <div className="info-card">
              <div className="info-icon research-icon">
                <FaGraduationCap />
              </div>
              <h3>Investigación Aplicada</h3>
              <p>
                Aplicamos metodologías de investigación científica para el desarrollo
                de soluciones tecnológicas a problemas reales de nuestra sociedad.
              </p>
            </div>
          </div>
        </div>

        <div className="vision-mission-section">
          <div className="vision-card">
            <h2>Nuestra Visión</h2>
            <p>
              Aspiramos a que Alerta Andina se convierta en una herramienta esencial 
              para la prevención de riesgos climatológicos, comenzando en La Paz, 
              pero con potencial de expansión a otras regiones de Bolivia y Sudamérica.
              Creemos firmemente que la tecnología puede y debe ponerse al servicio 
              de la seguridad y bienestar de las personas.
            </p>
          </div>
        </div>

        <div className="project-details">
          <h2 className="section-title">Detalles del Proyecto</h2>
          <div className="details-grid">
            <div className="detail-item">
              <strong>Carrera:</strong>
              <span>Ingeniería de Sistemas</span>
            </div>
            <div className="detail-item">
              <strong>Paralelo:</strong>
              <span>8vo "A"</span>
            </div>
            <div className="detail-item">
              <strong>Semestre:</strong>
              <span>I / 2025</span>
            </div>
            <div className="detail-item">
              <strong>Grupo:</strong>
              <span>1</span>
            </div>
          </div>
        </div>
      </main>

      <div className="side-decoration right-decoration"></div>
    </div>
  );
}

export default QuienesSomosPage;