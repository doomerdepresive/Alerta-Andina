// src/pages/MisionPage.jsx

import React from 'react';
import { 
  FaBullseye, 
  FaGlobe, 
  FaLeaf, 
  FaShieldAlt 
} from 'react-icons/fa';
import './MisionPage.css';

// Datos separados para mejor mantenibilidad
const MISSION_STATEMENT = `Entidad rectora de la actividad meteorológica, hidrológica y actividades afines; 
como institución técnico científica presta servicios especializados que contribuyen al 
desarrollo sostenible del Estado Plurinacional de Bolivia; proporciona información 
hidrometeorológica a todos los usuarios de la información, a los sistemas 
medioambientales para el cuidado de la Madre Tierra; en el ámbito nacional e internacional, 
participa en la vigilancia atmosférica mundial junto a entidades afines; a 
nivel nacional coadyuva en la gestión de riesgos para la prevención y mitigación de 
desastres; miembro de la Organización Meteorológica Mundial (OMM) con 
representación internacional en su actividad.`;

const MISSION_PILLARS = [
  {
    id: 'services',
    icon: FaBullseye,
    title: 'Servicios Especializados',
    description: 'Institución técnico científica que contribuye al desarrollo sostenible'
  },
  {
    id: 'environment',
    icon: FaLeaf,
    title: 'Cuidado de la Madre Tierra',
    description: 'Información para sistemas medioambientales y sostenibilidad'
  },
  {
    id: 'international',
    icon: FaGlobe,
    title: 'Alcance Internacional',
    description: 'Participación en vigilancia atmosférica mundial y OMM'
  },
  {
    id: 'risk-management',
    icon: FaShieldAlt,
    title: 'Gestión de Riesgos',
    description: 'Prevención y mitigación de desastres naturales'
  }
];

// Componente para las tarjetas de pilares
const MissionPillar = ({ icon: Icon, title, description, id }) => (
  <div className="mission-pillar" role="article" aria-labelledby={`pillar-title-${id}`}>
    <div className="pillar-icon" aria-hidden="true">
      <Icon />
    </div>
    <h3 id={`pillar-title-${id}`}>{title}</h3>
    <p>{description}</p>
  </div>
);

// Componente para elementos decorativos
const DecorationElement = ({ index, side }) => (
  <div 
    className={`decoration-element decoration-${index}`} 
    aria-hidden="true"
    role="presentation"
  />
);

// Componente principal mejorado
function MisionPage() {
  return (
    <div className="page-container mision-page with-navbar">
      {/* Decoración Lateral Izquierda */}
      <aside className="side-decoration left-decoration" aria-hidden="true">
        {[1, 2, 3].map(index => (
          <DecorationElement key={`left-${index}`} index={index} side="left" />
        ))}
      </aside>

      {/* Contenido Principal */}
      <main className="main-content" role="main">
        <div className="content-wrapper">
          {/* Header con título */}
          <header className="page-header">
            <h1 className="page-title" id="mission-title">
              <span className="title-decoration" aria-hidden="true"></span>
              MISIÓN
              <span className="title-decoration" aria-hidden="true"></span>
            </h1>
            
            <div className="divider" role="separator" aria-hidden="true">
              <span className="divider-icon"></span>
            </div>
          </header>
          
          {/* Sección principal de la misión */}
          <section className="mission-statement-section" aria-labelledby="mission-title">
            <p className="mission-text" role="text">
              {MISSION_STATEMENT}
            </p>
          </section>

          {/* Sección de pilares de la misión */}
          <section className="mission-pillars-section" aria-labelledby="pillars-title">
            <h2 id="pillars-title" className="pillars-title">
              Nuestros Pilares Fundamentales
            </h2>
            <div className="mission-pillars" role="list">
              {MISSION_PILLARS.map((pillar) => (
                <MissionPillar
                  key={pillar.id}
                  id={pillar.id}
                  icon={pillar.icon}
                  title={pillar.title}
                  description={pillar.description}
                />
              ))}
            </div>
          </section>

          {/* Sección de compromiso */}
          <section className="commitment-section" aria-labelledby="commitment-title">
            <div className="commitment-card">
              <h2 id="commitment-title">Nuestro Compromiso</h2>
              <blockquote>
                <p>
                  "Dedicados a proteger vidas y el medio ambiente a través de 
                  la ciencia meteorológica y la innovación tecnológica."
                </p>
              </blockquote>
              <p className="commitment-text">
                Como institución rectora, nos comprometemos a brindar información 
                precisa y oportuna que permita a Bolivia enfrentar los desafíos 
                climáticos con conocimiento y preparación.
              </p>
            </div>
          </section>
        </div>
      </main>

      {/* Decoración Lateral Derecha */}
      <aside className="side-decoration right-decoration" aria-hidden="true">
        {[1, 2, 3].map(index => (
          <DecorationElement key={`right-${index}`} index={index} side="right" />
        ))}
      </aside>
    </div>
  );
}

export default MisionPage;