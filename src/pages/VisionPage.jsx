// src/pages/VisionPage.jsx
import React from "react";
import "./VisionPage.css"; // Crearemos un archivo CSS específico
import { FaBinoculars, FaMapMarked, FaHandsHelping, FaGlobeAmericas } from "react-icons/fa";

function VisionPage() {
  return (
    <div className="page-container vision-page with-navbar">
      <div className="side-decoration left-decoration"></div>

      <main className="main-content">
        <h1 className="page-title">VISIÓN</h1>
        
        <div className="hero-section">
          <div className="vision-icon">
            <FaBinoculars />
          </div>
          <p className="vision-statement">
            "Posicionar a <strong>Alerta Andina</strong> como el sistema de referencia 
            en alertas climatológicas para regiones andinas, salvando vidas y protegiendo 
            comunidades a través de la tecnología y la prevención."
          </p>
        </div>
        
        <div className="vision-cards">
          <div className="vision-card">
            <div className="card-icon">
              <FaMapMarked />
            </div>
            <h3>Expansión Geográfica</h3>
            <p>
              Consolidarnos primero en La Paz y expandirnos progresivamente 
              a otras regiones de Bolivia y países de la región andina, 
              adaptando nuestras soluciones a cada contexto local.
            </p>
          </div>
          
          <div className="vision-card">
            <div className="card-icon">
              <FaHandsHelping />
            </div>
            <h3>Impacto Social</h3>
            <p>
              Convertirnos en una herramienta esencial para la prevención de riesgos, 
              logrando una reducción significativa en pérdidas humanas y materiales 
              causadas por eventos climatológicos extremos.
            </p>
          </div>
          
          <div className="vision-card">
            <div className="card-icon">
              <FaGlobeAmericas />
            </div>
            <h3>Innovación Continua</h3>
            <p>
              Evolucionar constantemente nuestra tecnología para incorporar 
              nuevos modelos predictivos, inteligencia artificial y análisis 
              de datos que mejoren la precisión y el tiempo de respuesta.
            </p>
          </div>
        </div>
        
        <div className="future-section">
          <h2>Nuestra Visión a Futuro</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>Corto Plazo (1-2 años)</h4>
                <p>
                  Implementar y consolidar el sistema en La Paz, estableciendo 
                  una red confiable de sensores y alcanzando una comunidad 
                  activa de usuarios comprometidos con la prevención.
                </p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>Mediano Plazo (3-5 años)</h4>
                <p>
                  Expandir la cobertura a las principales ciudades de Bolivia 
                  y desarrollar módulos especializados para sectores críticos 
                  como agricultura, transporte y gestión de emergencias.
                </p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>Largo Plazo (5+ años)</h4>
                <p>
                  Convertirnos en un referente internacional en sistemas de alerta 
                  temprana para regiones montañosas, colaborando con instituciones 
                  académicas y gubernamentales en toda la región andina.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="quote-section">
          <blockquote>
            "El clima avisa. Tú decides actuar."
          </blockquote>
          <p className="attribution">— Lema de Alerta Andina</p>
        </div>
      </main>

      <div className="side-decoration right-decoration"></div>
    </div>
  );
}

export default VisionPage;