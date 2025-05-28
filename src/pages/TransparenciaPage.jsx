// src/pages/TransparenciaPage.jsx
import React, { useState, useEffect } from "react";
import styles from "./TransparenciaPage.module.css";
import {
  FaShieldAlt,
  FaChartBar,
  FaCog,
  FaEye,
  FaUsers,
  FaCloudSun,
  FaExclamationTriangle,
  FaDownload,
  FaGithub,
  FaGraduationCap,
  FaRocket,
  FaLightbulb
} from "react-icons/fa";

function TransparenciaPage() {
  const [visibleCards, setVisibleCards] = useState([]);

  // Animación simple de aparición
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleCards([0, 1, 2, 3]);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const projectInfo = [
    {
      icon: FaRocket,
      title: 'Sobre el Proyecto',
      description: 'Sistema de alertas tempranas para fenómenos climatológicos extremos en Bolivia, desarrollado como proyecto académico en la EMI La Paz.',
      details: ['3 años de desarrollo', 'Enfoque en La Paz', 'Tecnología moderna']
    },
    {
      icon: FaChartBar,
      title: 'Fuentes de Datos',
      description: 'Utilizamos datos oficiales y confiables para generar alertas precisas y oportunas para la población.',
      details: ['SENAMHI Bolivia', 'Defensa Civil', 'Reportes ciudadanos']
    },
    {
      icon: FaCog,
      title: 'Metodología',
      description: 'Procesamiento de datos meteorológicos en tiempo real usando algoritmos de machine learning para detección temprana.',
      details: ['Análisis en tiempo real', 'Machine Learning', 'Validación múltiple']
    },
    {
      icon: FaLightbulb,
      title: 'Código Abierto',
      description: 'Nuestro código es completamente abierto y transparente, disponible para la comunidad académica y de desarrollo.',
      details: ['Licencia MIT', 'GitHub público', 'Documentación completa']
    }
  ];

  const dataSourcesInfo = [
    {
      name: 'SENAMHI Bolivia',
      description: 'Datos meteorológicos oficiales',
      icon: FaCloudSun,
      frequency: 'Cada 3 horas'
    },
    {
      name: 'Defensa Civil',
      description: 'Información de emergencias',
      icon: FaExclamationTriangle,
      frequency: 'Tiempo real'
    },
    {
      name: 'Reportes Ciudadanos',
      description: 'Colaboración comunitaria',
      icon: FaUsers,
      frequency: 'Continuo'
    }
  ];

  return (
    <div className={`${styles.pageContainer} ${styles.transparenciaPage} ${styles.withNavbar}`}>
      
      {/* Header principal */}
      <div className={styles.pageHeader}>
        <div className={styles.headerContent}>
          <h1 className={styles.pageTitle}>Sobre Nuestro Proyecto</h1>
          <p className={styles.pageSubtitle}>
            Sistema de Alertas Climatológicas para Bolivia - Proyecto Académico EMI La Paz
          </p>
        </div>
        <div className={styles.headerStats}>
          <div className={styles.statItem}>
            <FaGraduationCap />
            <span>EMI La Paz</span>
          </div>
          <div className={styles.statItem}>
            <FaRocket />
            <span>3 Años Desarrollo</span>
          </div>
          <div className={styles.statItem}>
            <FaLightbulb />
            <span>Open Source</span>
          </div>
        </div>
      </div>

      {/* Información principal del proyecto */}
      <div className={styles.projectGrid}>
        {projectInfo.map((card, index) => (
          <div 
            key={index}
            className={`${styles.projectCard} ${visibleCards.includes(index) ? styles.visible : ''}`}
          >
            <div className={styles.cardIcon}>
              <card.icon />
            </div>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <div className={styles.cardDetails}>
              {card.details.map((detail, idx) => (
                <span key={idx} className={styles.detailTag}>{detail}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Sección de fuentes de datos */}
      <div className={styles.dataSection}>
        <h2>Fuentes de Información</h2>
        <p className={styles.sectionDescription}>
          Trabajamos con fuentes oficiales y confiables para garantizar la precisión de nuestras alertas
        </p>
        
        <div className={styles.dataSourcesGrid}>
          {dataSourcesInfo.map((source, index) => (
            <div key={index} className={styles.dataSourceCard}>
              <div className={styles.sourceIcon}>
                <source.icon />
              </div>
              <h4>{source.name}</h4>
              <p>{source.description}</p>
              <div className={styles.sourceFrequency}>
                Actualización: {source.frequency}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Proceso simple */}
      <div className={styles.processSection}>
        <h2>¿Cómo Funciona?</h2>
        <div className={styles.processSteps}>
          <div className={styles.processStep}>
            <div className={styles.stepNumber}>1</div>
            <h4>Recolección</h4>
            <p>Obtenemos datos de fuentes oficiales</p>
          </div>
          <div className={styles.processStep}>
            <div className={styles.stepNumber}>2</div>
            <h4>Análisis</h4>
            <p>Procesamos con algoritmos inteligentes</p>
          </div>
          <div className={styles.processStep}>
            <div className={styles.stepNumber}>3</div>
            <h4>Alerta</h4>
            <p>Enviamos avisos oportunos</p>
          </div>
          <div className={styles.processStep}>
            <div className={styles.stepNumber}>4</div>
            <h4>Respuesta</h4>
            <p>La comunidad toma acción preventiva</p>
          </div>
        </div>
      </div>

      {/* Métricas básicas */}
      <div className={styles.metricsSection}>
        <h2>Nuestro Impacto</h2>
        <div className={styles.simpleMetrics}>
          <div className={styles.metricBox}>
            <div className={styles.metricValue}>94.7%</div>
            <div className={styles.metricLabel}>Precisión de Alertas</div>
          </div>
          <div className={styles.metricBox}>
            <div className={styles.metricValue}>2.3min</div>
            <div className={styles.metricLabel}>Tiempo de Respuesta</div>
          </div>
          <div className={styles.metricBox}>
            <div className={styles.metricValue}>12,847</div>
            <div className={styles.metricLabel}>Usuarios Registrados</div>
          </div>
          <div className={styles.metricBox}>
            <div className={styles.metricValue}>45,692</div>
            <div className={styles.metricLabel}>Alertas Enviadas</div>
          </div>
        </div>
      </div>

      {/* Acciones y recursos */}
      <div className={styles.actionsSection}>
        <h2>Recursos y Documentación</h2>
        <div className={styles.actionButtons}>
          <button className={`${styles.actionBtn} ${styles.primary}`}>
            <FaDownload />
            <span>Descargar Documentación</span>
          </button>
          <button className={`${styles.actionBtn} ${styles.secondary}`}>
            <FaGithub />
            <span>Ver Código Fuente</span>
          </button>
          <button className={`${styles.actionBtn} ${styles.secondary}`}>
            <FaEye />
            <span>Metodología Detallada</span>
          </button>
        </div>
      </div>

      {/* Footer académico */}
      <div className={styles.academicFooter}>
        <div className={styles.footerContent}>
          <h3>Proyecto Académico - EMI La Paz</h3>
          <p>
            Desarrollado con fines educativos y de servicio a la comunidad boliviana. 
            Este sistema busca contribuir a la prevención de desastres naturales 
            mediante tecnología accesible y código abierto.
          </p>
          <div className={styles.footerTags}>
            <span>Educativo</span>
            <span>Código Abierto</span>
            <span>Servicio Comunitario</span>
            <span>Licencia MIT</span>
          </div>
        </div>
      </div>

    </div>
  );
}

export default TransparenciaPage;