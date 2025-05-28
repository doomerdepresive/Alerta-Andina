// src/pages/VisionPage.jsx
import React from "react";
import { 
  FaBinoculars, 
  FaMapMarked, 
  FaHandsHelping, 
  FaGlobeAmericas 
} from "react-icons/fa";
import styles from "./VisionPage.module.css";

// Datos separados para mejor mantenibilidad
const VISION_STATEMENT = `Posicionar a Alerta Andina como el sistema de referencia 
en alertas climatológicas para regiones andinas, salvando vidas y protegiendo 
comunidades a través de la tecnología y la prevención.`;

const VISION_CARDS_DATA = [
  {
    id: 'expansion',
    icon: FaMapMarked,
    title: 'Expansión Geográfica',
    description: `Consolidarnos primero en La Paz y expandirnos progresivamente 
    a otras regiones de Bolivia y países de la región andina, 
    adaptando nuestras soluciones a cada contexto local.`
  },
  {
    id: 'impact',
    icon: FaHandsHelping,
    title: 'Impacto Social',
    description: `Convertirnos en una herramienta esencial para la prevención de riesgos, 
    logrando una reducción significativa en pérdidas humanas y materiales 
    causadas por eventos climatológicos extremos.`
  },
  {
    id: 'innovation',
    icon: FaGlobeAmericas,
    title: 'Innovación Continua',
    description: `Evolucionar constantemente nuestra tecnología para incorporar 
    nuevos modelos predictivos, inteligencia artificial y análisis 
    de datos que mejoren la precisión y el tiempo de respuesta.`
  }
];

const TIMELINE_DATA = [
  {
    id: 'short-term',
    period: 'Corto Plazo (1-2 años)',
    description: `Implementar y consolidar el sistema en La Paz, estableciendo 
    una red confiable de sensores y alcanzando una comunidad 
    activa de usuarios comprometidos con la prevención.`
  },
  {
    id: 'medium-term',
    period: 'Mediano Plazo (3-5 años)',
    description: `Expandir la cobertura a las principales ciudades de Bolivia 
    y desarrollar módulos especializados para sectores críticos 
    como agricultura, transporte y gestión de emergencias.`
  },
  {
    id: 'long-term',
    period: 'Largo Plazo (5+ años)',
    description: `Convertirnos en un referente internacional en sistemas de alerta 
    temprana para regiones montañosas, colaborando con instituciones 
    académicas y gubernamentales en toda la región andina.`
  }
];

// Componente para las tarjetas de visión
const VisionCard = ({ icon: Icon, title, description, id }) => (
  <div className={styles.visionCard} role="article" aria-labelledby={`card-title-${id}`}>
    <div className={styles.cardIcon} aria-hidden="true">
      <Icon />
    </div>
    <h3 id={`card-title-${id}`}>{title}</h3>
    <p>{description}</p>
  </div>
);

// Componente para los elementos del timeline
const TimelineItem = ({ period, description, id }) => (
  <div className={styles.timelineItem} role="listitem">
    <div className={styles.timelineDot} aria-hidden="true"></div>
    <div className={styles.timelineContent}>
      <h4 id={`timeline-${id}`}>{period}</h4>
      <p aria-describedby={`timeline-${id}`}>{description}</p>
    </div>
  </div>
);

// Componente principal
function VisionPage() {
  return (
    <div className={`${styles.pageContainer} ${styles.visionPage} ${styles.withNavbar}`}>
      {/* Decoraciones laterales */}
      <div className={`${styles.sideDecoration} ${styles.leftDecoration}`} aria-hidden="true">
        <div className={`${styles.decorationElement} ${styles.decoration1}`}></div>
        <div className={`${styles.decorationElement} ${styles.decoration2}`}></div>
        <div className={`${styles.decorationElement} ${styles.decoration3}`}></div>
      </div>
      
      <main className={styles.mainContent} role="main">
        {/* Encabezado principal */}
        <header className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>VISIÓN</h1>
        </header>
        
        {/* Divisor decorativo */}
        <div className={styles.divider}>
          <div className={styles.dividerIcon}></div>
        </div>
        
        {/* Sección hero con declaración de visión */}
        <section className={styles.heroSection} aria-labelledby="vision-statement">
          <div className={styles.visionIcon} aria-hidden="true">
            <FaBinoculars />
          </div>
          <p className={styles.visionStatement} id="vision-statement">
            {VISION_STATEMENT}
          </p>
        </section>
        
        {/* Sección de tarjetas de visión */}
        <section className={styles.visionCardsSection} aria-labelledby="vision-cards-title">
          <h2 id="vision-cards-title">
            Pilares de Nuestra Visión
          </h2>
          <div className={styles.visionCards} role="list">
            {VISION_CARDS_DATA.map((card) => (
              <VisionCard
                key={card.id}
                id={card.id}
                icon={card.icon}
                title={card.title}
                description={card.description}
              />
            ))}
          </div>
        </section>
        
        {/* Sección de visión a futuro */}
        <section className={styles.futureSection} aria-labelledby="future-title">
          <h2 id="future-title">Nuestra Visión a Futuro</h2>
          <div className={styles.timeline} role="list" aria-label="Cronograma de objetivos">
            {TIMELINE_DATA.map((item) => (
              <TimelineItem
                key={item.id}
                id={item.id}
                period={item.period}
                description={item.description}
              />
            ))}
          </div>
        </section>
        
        {/* Sección de cita */}
        <section className={styles.quoteSection} aria-labelledby="company-motto">
          <blockquote>
            "El clima avisa. Tú decides actuar."
          </blockquote>
          <p className={styles.attribution} id="company-motto">
            — Lema de Alerta Andina
          </p>
        </section>
      </main>

      {/* Decoración lateral derecha */}
      <div className={`${styles.sideDecoration} ${styles.rightDecoration}`} aria-hidden="true">
        <div className={`${styles.decorationElement} ${styles.decoration1}`}></div>
        <div className={`${styles.decorationElement} ${styles.decoration2}`}></div>
        <div className={`${styles.decorationElement} ${styles.decoration3}`}></div>
      </div>
    </div>
  );
}

export default VisionPage;