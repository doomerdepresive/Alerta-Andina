// src/pages/MisionPage.jsx

import React from 'react';
import { 
  FaBullseye, 
  FaGlobe, 
  FaLeaf, 
  FaShieldAlt 
} from 'react-icons/fa';
import styles from './MisionPage.module.css';

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
  <div className={styles.missionPillar} role="article" aria-labelledby={`pillar-title-${id}`}>
    <div className={styles.pillarIcon} aria-hidden="true">
      <Icon />
    </div>
    <h3 id={`pillar-title-${id}`}>{title}</h3>
    <p>{description}</p>
  </div>
);

// Componente para elementos decorativos
const DecorationElement = ({ index, side }) => (
  <div 
    className={`${styles.decorationElement} ${styles[`decoration${index}`]}`}
    aria-hidden="true"
    role="presentation"
  />
);

// Componente para decoraciones del footer
const FooterDecorationElement = ({ index, side }) => (
  <div 
    className={`${styles.footerDecorationElement} ${styles[`footerDecoration${index}`]}`}
    aria-hidden="true"
    role="presentation"
  />
);

// Componente principal corregido para CSS Modules
function MisionPage() {
  return (
    <div className={`${styles.pageContainer} ${styles.misionPage} ${styles.withNavbar}`}>
      {/* Decoración Lateral Izquierda */}
      <aside className={`${styles.sideDecoration} ${styles.leftDecoration}`} aria-hidden="true">
        {[1, 2, 3].map(index => (
          <DecorationElement key={`left-${index}`} index={index} side="left" />
        ))}
      </aside>

      {/* Contenido Principal */}
      <main className={styles.mainContent} role="main">
        <div className={styles.contentWrapper}>
          {/* Header con título */}
          <header className={styles.pageHeader}>
            <h1 className={styles.pageTitle} id="mission-title">
              <span className={styles.titleDecoration} aria-hidden="true"></span>
              MISIÓN
              <span className={styles.titleDecoration} aria-hidden="true"></span>
            </h1>
            
            <div className={styles.divider} role="separator" aria-hidden="true">
              <span className={styles.dividerIcon}></span>
            </div>
          </header>
          
          {/* Sección principal de la misión */}
          <section className={styles.missionStatementSection} aria-labelledby="mission-title">
            <p className={styles.missionText} role="text">
              {MISSION_STATEMENT}
            </p>
          </section>

          {/* Sección de pilares de la misión */}
          <section className={styles.missionPillarsSection} aria-labelledby="pillars-title">
            <h2 id="pillars-title" className={styles.pillarsTitle}>
              Nuestros Pilares Fundamentales
            </h2>
            <div className={styles.missionPillars} role="list">
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
          <section className={styles.commitmentSection} aria-labelledby="commitment-title">
            <div className={styles.commitmentCard}>
              <h2 id="commitment-title" className={styles.commitmentTitle}>
                Nuestro Compromiso
              </h2>
              <blockquote className={styles.commitmentQuote}>
                "Dedicados a proteger vidas y el medio ambiente a través de 
                la ciencia meteorológica y la innovación tecnológica."
              </blockquote>
              <p className={styles.commitmentText}>
                Como institución rectora, nos comprometemos a brindar información 
                precisa y oportuna que permita a Bolivia enfrentar los desafíos 
                climáticos con conocimiento y preparación.
              </p>
            </div>
          </section>
        </div>
      </main>

      {/* Decoración Lateral Derecha */}
      <aside className={`${styles.sideDecoration} ${styles.rightDecoration}`} aria-hidden="true">
        {[1, 2, 3].map(index => (
          <DecorationElement key={`right-${index}`} index={index} side="right" />
        ))}
      </aside>

      {/* Decoraciones del Footer */}
      <div className={styles.footerDecorations}>
        <div className={`${styles.footerStripeLeft}`}>
          {[1, 2, 3].map(index => (
            <FooterDecorationElement key={`footer-left-${index}`} index={index} side="left" />
          ))}
        </div>
        <div className={`${styles.footerStripeRight}`}>
          {[1, 2, 3].map(index => (
            <FooterDecorationElement key={`footer-right-${index}`} index={index} side="right" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MisionPage;