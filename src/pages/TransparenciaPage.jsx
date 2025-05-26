// src/pages/TransparenciaPage.jsx
import React, { useState, useEffect } from "react";
import "./TransparenciaPage.css";
import {
  FaShieldAlt,
  FaBalanceScale,
  FaHandshake,
  FaLock,
  FaChartBar,
  FaCog,
  FaEye,
  FaUsers,
  FaCloudSun,
  FaExclamationTriangle,
  FaClock,
  FaDownload,
  FaGithub,
  FaFileAlt,
  FaLightbulb,
  FaRocket,
  FaTrophy,
  FaGraduationCap
} from "react-icons/fa";

function TransparenciaPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [visibleCards, setVisibleCards] = useState([]);

  // Animación de aparición de las tarjetas
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleCards(prev => [...prev, 0]);
    }, 200);

    const intervals = [1, 2, 3].map((index, i) => 
      setTimeout(() => {
        setVisibleCards(prev => [...prev, index]);
      }, 400 + (i * 200))
    );

    return () => {
      clearTimeout(timer);
      intervals.forEach(clearTimeout);
    };
  }, []);

  const tabs = [
    { id: 'overview', label: 'Visión General', icon: FaEye },
    { id: 'data', label: 'Datos y Fuentes', icon: FaChartBar },
    { id: 'methodology', label: 'Metodología', icon: FaCog },
    { id: 'metrics', label: 'Métricas', icon: FaTrophy }
  ];

  const metricsData = [
    { label: 'Precisión de Alertas', value: '94.7%', trend: '+2.3%', color: '#28a745' },
    { label: 'Tiempo Respuesta', value: '2.3min', trend: '-0.5min', color: '#007bff' },
    { label: 'Usuarios Activos', value: '12,847', trend: '+1,203', color: '#fd7e14' },
    { label: 'Alertas Enviadas', value: '45,692', trend: '+8,234', color: '#6f42c1' }
  ];

  const dataSourcesDetailed = [
    {
      name: 'SENAMHI Bolivia',
      description: 'Servicio Nacional de Meteorología e Hidrología',
      dataTypes: ['Temperatura', 'Precipitación', 'Humedad', 'Presión atmosférica'],
      updateFrequency: 'Cada 3 horas',
      reliability: '99.2%',
      icon: FaCloudSun
    },
    {
      name: 'Defensa Civil',
      description: 'Información de emergencias y zonas de riesgo',
      dataTypes: ['Alertas históricas', 'Zonas vulnerables', 'Reportes de campo'],
      updateFrequency: 'Tiempo real',
      reliability: '97.8%',
      icon: FaExclamationTriangle
    },
    {
      name: 'Reportes Ciudadanos',
      description: 'Sistema colaborativo de la comunidad',
      dataTypes: ['Reportes visuales', 'Confirmaciones', 'Feedback local'],
      updateFrequency: 'Continuo',
      reliability: '89.4%',
      icon: FaUsers
    }
  ];

  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <div className="tab-content">
            <div className="hero-stats">
              <div className="hero-stat">
                <div className="stat-icon"><FaRocket /></div>
                <div className="stat-info">
                  <h3>3 Años</h3>
                  <p>En desarrollo</p>
                </div>
              </div>
              <div className="hero-stat">
                <div className="stat-icon"><FaGraduationCap /></div>
                <div className="stat-info">
                  <h3>EMI La Paz</h3>
                  <p>Proyecto académico</p>
                </div>
              </div>
              <div className="hero-stat">
                <div className="stat-icon"><FaLightbulb /></div>
                <div className="stat-info">
                  <h3>Open Source</h3>
                  <p>Código abierto</p>
                </div>
              </div>
            </div>

            <div className="transparency-grid">
              {[
                {
                  icon: FaShieldAlt,
                  title: 'Protección de Datos',
                  description: 'Implementamos protocolos de seguridad de grado empresarial. Todos los datos se cifran en tránsito y en reposo. Cumplimos con estándares internacionales de privacidad.',
                  features: ['Cifrado AES-256', 'Auditorías de seguridad', 'Acceso controlado']
                },
                {
                  icon: FaBalanceScale,
                  title: 'Metodología Científica',
                  description: 'Nuestros algoritmos están basados en machine learning y métodos estadísticos validados. Cada predicción pasa por múltiples capas de verificación.',
                  features: ['Peer review', 'Validación cruzada', 'Documentación completa']
                },
                {
                  icon: FaHandshake,
                  title: 'Colaboración Abierta',
                  description: 'Trabajamos en conjunto con instituciones locales e internacionales. Nuestra red de colaboradores crece constantemente.',
                  features: ['Partnerships estratégicos', 'Red de expertos', 'Comunidad activa']
                },
                {
                  icon: FaLock,
                  title: 'Transparencia Total',
                  description: 'Publicamos reportes regulares sobre nuestro desempeño, metodología y impacto. La transparencia es uno de nuestros valores fundamentales.',
                  features: ['Reportes mensuales', 'Código abierto', 'Auditorías públicas']
                }
              ].map((card, index) => (
                <div 
                  key={index}
                  className={`transparency-card enhanced ${visibleCards.includes(index) ? 'visible' : ''}`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="card-header">
                    <div className="transparency-icon">
                      <card.icon />
                    </div>
                    <h3>{card.title}</h3>
                  </div>
                  <p className="card-description">{card.description}</p>
                  <div className="card-features">
                    {card.features.map((feature, idx) => (
                      <span key={idx} className="feature-badge">{feature}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'data':
        return (
          <div className="tab-content">
            <div className="data-sources-grid">
              {dataSourcesDetailed.map((source, index) => (
                <div key={index} className="data-source-card">
                  <div className="source-header">
                    <div className="source-icon">
                      <source.icon />
                    </div>
                    <div className="source-info">
                      <h3>{source.name}</h3>
                      <p>{source.description}</p>
                    </div>
                  </div>
                  <div className="source-details">
                    <div className="detail-item">
                      <strong>Tipos de datos:</strong>
                      <div className="data-types">
                        {source.dataTypes.map((type, idx) => (
                          <span key={idx} className="data-type-tag">{type}</span>
                        ))}
                      </div>
                    </div>
                    <div className="detail-row">
                      <div className="detail-item">
                        <strong>Frecuencia:</strong> {source.updateFrequency}
                      </div>
                      <div className="detail-item">
                        <strong>Confiabilidad:</strong> 
                        <span className="reliability-badge">{source.reliability}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'methodology':
        return (
          <div className="tab-content">
            <div className="methodology-timeline">
              <div className="timeline-item">
                <div className="timeline-marker">1</div>
                <div className="timeline-content">
                  <h3>Recolección de Datos</h3>
                  <p>Agregamos datos de múltiples fuentes confiables en tiempo real, aplicando filtros de calidad y validación automática.</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker">2</div>
                <div className="timeline-content">
                  <h3>Procesamiento y Análisis</h3>
                  <p>Utilizamos algoritmos de machine learning para identificar patrones y anomalías en los datos meteorológicos.</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker">3</div>
                <div className="timeline-content">
                  <h3>Generación de Alertas</h3>
                  <p>Sistema inteligente que evalúa múltiples variables para determinar el nivel de riesgo y generar alertas precisas.</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker">4</div>
                <div className="timeline-content">
                  <h3>Distribución y Feedback</h3>
                  <p>Las alertas se envían a través de múltiples canales y recopilamos feedback para mejorar continuamente.</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'metrics':
        return (
          <div className="tab-content">
            <div className="metrics-dashboard">
              <div className="metrics-grid">
                {metricsData.map((metric, index) => (
                  <div key={index} className="metric-card">
                    <div className="metric-header">
                      <h4>{metric.label}</h4>
                      <span className="metric-trend" style={{ color: metric.color }}>
                        {metric.trend}
                      </span>
                    </div>
                    <div className="metric-value" style={{ color: metric.color }}>
                      {metric.value}
                    </div>
                    <div className="metric-progress">
                      <div 
                        className="progress-bar" 
                        style={{ backgroundColor: metric.color, width: '75%' }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="additional-metrics">
                <div className="metric-detail">
                  <div className="metric-icon"><FaClock /></div>
                  <div>
                    <h4>Tiempo Promedio de Detección</h4>
                    <p>Desde la ocurrencia del evento hasta la emisión de la alerta</p>
                    <strong>2.3 minutos</strong>
                  </div>
                </div>
                <div className="metric-detail">
                  <div className="metric-icon"><FaUsers /></div>
                  <div>
                    <h4>Alcance de Alertas</h4>
                    <p>Porcentaje de población objetivo que recibe las alertas</p>
                    <strong>87.2%</strong>
                  </div>
                </div>
                <div className="metric-detail">
                  <div className="metric-icon"><FaChartBar /></div>
                  <div>
                    <h4>Efectividad de Respuesta</h4>
                    <p>Usuarios que toman acción preventiva tras recibir una alerta</p>
                    <strong>71.8%</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="page-container transparencia-page with-navbar">
      <div className="side-decoration left-decoration"></div>

      {/* Header mejorado */}
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">TRANSPARENCIA</h1>
          <p className="page-subtitle">
            Comprometidos con la transparencia total en nuestro proyecto de alertas climatológicas
          </p>
        </div>
        <div className="header-actions">
          <button className="action-btn primary">
            <FaDownload /> Descargar Reporte
          </button>
          <button className="action-btn secondary">
            <FaGithub /> Ver Código
          </button>
        </div>
      </div>

      {/* Navegación por pestañas */}
      <div className="tabs-navigation">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Contenido de las pestañas */}
      {renderTabContent()}

      {/* Footer de contacto mejorado */}
      <div className="contact-section enhanced">
        <div className="contact-header">
          <h2>¿Necesitas más información?</h2>
          <p>Estamos aquí para responder todas tus preguntas sobre transparencia y metodología</p>
        </div>
        <div className="contact-cards">
          <div className="contact-card">
            <FaFileAlt />
            <h4>Documentación</h4>
            <p>Accede a nuestra documentación técnica completa</p>
          </div>
          <div className="contact-card">
            <FaUsers />
            <h4>Comunidad</h4>
            <p>Únete a nuestra comunidad de desarrolladores</p>
          </div>
          <div className="contact-card">
            <FaGraduationCap />
            <h4>Académico</h4>
            <p>Colaboraciones e investigación académica</p>
          </div>
        </div>
        <div className="disclaimer enhanced">
          <strong>Proyecto Académico EMI La Paz</strong> • Desarrollado con fines educativos y de servicio comunitario • Código abierto bajo licencia MIT
        </div>
      </div>

      <div className="side-decoration right-decoration"></div>
    </div>
  );
}

export default TransparenciaPage;