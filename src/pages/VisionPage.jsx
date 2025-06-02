// src/pages/VisionPage.jsx
import React, { useState, useEffect } from "react";
import styles from "./VisionPage.module.css";
import {
  FaBinoculars,
  FaMapMarked,
  FaHandsHelping,
  FaGlobeAmericas,
  FaRocket,
  FaLightbulb,
  FaHeart,
  FaChartLine,
  FaClock,
  FaUsers,
  FaStar,
  FaEye
} from "react-icons/fa";

function VisionPage() {
  const [visibleCards, setVisibleCards] = useState([]);

  // Animación simple de aparición
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleCards([0, 1, 2]);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const visionPillars = [
    {
      icon: FaMapMarked,
      title: 'Expansión Geográfica',
      description: 'Consolidarnos primero en La Paz y expandirnos progresivamente a otras regiones de Bolivia y países de la región andina, adaptando nuestras soluciones a cada contexto local.',
      details: ['Bolivia completa', 'Región Andina', 'Adaptación local']
    },
    {
      icon: FaHandsHelping,
      title: 'Impacto Social',
      description: 'Convertirnos en una herramienta esencial para la prevención de riesgos, logrando una reducción significativa en pérdidas humanas y materiales.',
      details: ['Salvar vidas', 'Proteger comunidades', 'Prevención efectiva']
    },
    {
      icon: FaGlobeAmericas,
      title: 'Innovación Continua',
      description: 'Evolucionar constantemente nuestra tecnología incorporando nuevos modelos predictivos, inteligencia artificial y análisis de datos avanzados.',
      details: ['IA Avanzada', 'Modelos predictivos', 'Mejora continua']
    }
  ];

  const timelineData = [
    {
      period: '1-2 años',
      title: 'Consolidación Local',
      description: 'Implementar y consolidar el sistema en La Paz, estableciendo una red confiable de sensores y alcanzando una comunidad activa de usuarios.',
      icon: FaRocket,
      phase: 'Corto Plazo'
    },
    {
      period: '3-5 años',
      title: 'Expansión Nacional',
      description: 'Expandir la cobertura a las principales ciudades de Bolivia y desarrollar módulos especializados para sectores críticos.',
      icon: FaChartLine,
      phase: 'Mediano Plazo'
    },
    {
      period: '5+ años',
      title: 'Liderazgo Regional',
      description: 'Convertirnos en referente internacional en sistemas de alerta temprana para regiones montañosas en toda la región andina.',
      icon: FaStar,
      phase: 'Largo Plazo'
    }
  ];

  const impactMetrics = [
    {
      value: '50K+',
      label: 'Vidas Protegidas',
      icon: FaUsers
    },
    {
      value: '15',
      label: 'Ciudades Objetivo',
      icon: FaMapMarked
    },
    {
      value: '98%',
      label: 'Precisión Meta',
      icon: FaChartLine
    },
    {
      value: '24/7',
      label: 'Monitoreo Continuo',
      icon: FaClock
    }
  ];

  return (
    <div className={`${styles.pageContainer} ${styles.visionPage} ${styles.withNavbar}`}>
      
      {/* Header principal */}
      <div className={styles.pageHeader}>
        <div className={styles.headerContent}>
          <h1 className={styles.pageTitle}>Nuestra Visión</h1>
          <p className={styles.pageSubtitle}>
            El futuro de las alertas climatológicas en la región andina
          </p>
        </div>
        <div className={styles.headerIcon}>
          <FaBinoculars />
        </div>
      </div>

      {/* Declaración de visión principal */}
      <div className={styles.visionStatement}>
        <div className={styles.statementIcon}>
          <FaEye />
        </div>
        <blockquote>
          "Posicionar a Alerta Andina como el sistema de referencia en alertas climatológicas para regiones andinas, salvando vidas y protegiendo comunidades a través de la tecnología y la prevención."
        </blockquote>
        <div className={styles.statementFooter}>
          <div className={styles.motto}>
            "El clima avisa. Tú decides actuar."
          </div>
        </div>
      </div>

      {/* Pilares de la visión */}
      <div className={styles.pillarsSection}>
        <h2>Pilares de Nuestra Visión</h2>
        <p className={styles.sectionDescription}>
          Los tres fundamentos que guían nuestro camino hacia el futuro
        </p>
        
        <div className={styles.pillarsGrid}>
          {visionPillars.map((pillar, index) => (
            <div 
              key={index}
              className={`${styles.pillarCard} ${visibleCards.includes(index) ? styles.visible : ''}`}
            >
              <div className={styles.cardIcon}>
                <pillar.icon />
              </div>
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
              <div className={styles.cardDetails}>
                {pillar.details.map((detail, idx) => (
                  <span key={idx} className={styles.detailTag}>{detail}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline de objetivos */}
      <div className={styles.timelineSection}>
        <h2>Nuestra Hoja de Ruta</h2>
        <p className={styles.sectionDescription}>
          El camino estratégico para alcanzar nuestra visión
        </p>
        
        <div className={styles.timelineContainer}>
          {timelineData.map((item, index) => (
            <div key={index} className={styles.timelineItem}>
              <div className={styles.timelineIcon}>
                <item.icon />
              </div>
              <div className={styles.timelineContent}>
                <div className={styles.timelinePhase}>{item.phase}</div>
                <div className={styles.timelinePeriod}>{item.period}</div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Métricas de impacto proyectado */}
      <div className={styles.impactSection}>
        <h2>Impacto Proyectado</h2>
        <div className={styles.impactGrid}>
          {impactMetrics.map((metric, index) => (
            <div key={index} className={styles.impactCard}>
              <div className={styles.impactIcon}>
                <metric.icon />
              </div>
              <div className={styles.impactValue}>{metric.value}</div>
              <div className={styles.impactLabel}>{metric.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to action */}
      <div className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <div className={styles.ctaIcon}>
            <FaHeart />
          </div>
          <h2>Únete a Nuestra Visión</h2>
          <p>
            Cada alerta temprana es una oportunidad de salvar vidas. 
            Juntos estamos construyendo un futuro más seguro para Bolivia.
          </p>
          <div className={styles.ctaButtons}>
            <button className={`${styles.ctaBtn} ${styles.primary}`}>
              <FaRocket />
              <span>Conoce Más</span>
            </button>
            <button className={`${styles.ctaBtn} ${styles.secondary}`}>
              <FaLightbulb />
              <span>Colabora Con Nosotros</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer inspiracional */}
      <div className={styles.inspirationFooter}>
        <div className={styles.footerContent}>
          <h3>Tecnología al Servicio de la Vida</h3>
          <p>
            Nuestra visión va más allá de la tecnología: buscamos crear 
            un impacto positivo y duradero en las comunidades andinas, 
            donde cada segundo cuenta y cada alerta puede marcar la diferencia.
          </p>
          <div className={styles.footerTags}>
            <span>Innovación</span>
            <span>Impacto Social</span>
            <span>Prevención</span>
            <span>Comunidad</span>
          </div>
        </div>
      </div>

    </div>
  );
}

export default VisionPage;