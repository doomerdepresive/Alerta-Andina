// src/pages/QuienesSomosPage.jsx
import React from "react";
import "./QuienesSomosPage.css"; // Crearemos un archivo CSS específico
import { FaGraduationCap, FaLaptopCode, FaSchool, FaUsers } from "react-icons/fa"; // Necesitarás react-icons

function QuienesSomosPage() {
  return (
    <div className="page-container quienes-somos-page">
      <div className="side-decoration left-decoration"></div>

      <main className="main-content">
        <h1 className="page-title">¿QUIÉNES SOMOS?</h1>
        
        <div className="intro-section">
          <p className="intro-text">
            <strong>Alerta Andina</strong> es un proyecto innovador desarrollado por estudiantes 
            de Ingeniería de Sistemas de la Escuela Militar de Ingeniería "Mcal. Antonio Jose de Sucre" 
            (EMI) de La Paz, Bolivia. Nuestro objetivo es crear un sistema de alerta temprana 
            climatológica geolocalizada que contribuya a la prevención de riesgos en nuestra ciudad.
          </p>
        </div>

        <div className="team-section">
          <h2>Nuestro Equipo</h2>
          <div className="team-members">
            <div className="team-member">
              <div className="member-avatar">BG</div>
              <h3>Brayaan Gutierrez Morales</h3>
              <p>Estudiante de Ingeniería de Sistemas</p>
              <p>EMI - La Paz</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">NT</div>
              <h3>Norman Lisandro Tintaya Mollinedo</h3>
              <p>Estudiante de Ingeniería de Sistemas</p>
              <p>A26047-9</p>
            </div>
          </div>
        </div>

        <div className="info-cards">
          <div className="info-card">
            <div className="info-icon">
              <FaSchool />
            </div>
            <h3>Respaldo Académico</h3>
            <p>
              Este proyecto se desarrolla como parte de nuestra formación académica
              en la EMI, institución de prestigio en la formación de ingenieros en Bolivia.
            </p>
          </div>

          <div className="info-card">
            <div className="info-icon">
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
            <div className="info-icon">
              <FaUsers />
            </div>
            <h3>Compromiso Social</h3>
            <p>
              Buscamos generar un impacto positivo en nuestra comunidad, especialmente 
              en zonas vulnerables ante eventos climatológicos adversos.
            </p>
          </div>

          <div className="info-card">
            <div className="info-icon">
              <FaGraduationCap />
            </div>
            <h3>Investigación Aplicada</h3>
            <p>
              Aplicamos metodologías de investigación científica para el desarrollo
              de soluciones tecnológicas a problemas reales de nuestra sociedad.
            </p>
          </div>
        </div>

        <div className="vision-section">
          <h2>Nuestra Visión</h2>
          <p>
            Aspiramos a que Alerta Andina se convierta en una herramienta esencial 
            para la prevención de riesgos climatológicos, comenzando en La Paz, 
            pero con potencial de expansión a otras regiones de Bolivia y Sudamérica.
            Creemos firmemente que la tecnología puede y debe ponerse al servicio 
            de la seguridad y bienestar de las personas.
          </p>
        </div>

        <div className="project-details">
          <h2>Detalles del Proyecto</h2>
          <ul>
            <li><strong>Carrera:</strong> Ingeniería de Sistemas</li>
            <li><strong>Paralelo:</strong> 8vo "A"</li>
            <li><strong>Semestre:</strong> I / 2025</li>
            <li><strong>Grupo:</strong> 1</li>
          </ul>
        </div>
      </main>

      <div className="side-decoration right-decoration"></div>
    </div>
  );
}

export default QuienesSomosPage;