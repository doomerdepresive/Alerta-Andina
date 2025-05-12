// src/pages/TransparenciaPage.jsx
import React from "react";
import "./TransparenciaPage.css";
import {
  FaShieldAlt,
  FaBalanceScale,
  FaHandshake,
  FaLock,
  FaChartBar,
} from "react-icons/fa";

function TransparenciaPage() {
  return (
    <div className="page-container transparencia-page with-navbar">
      <div className="side-decoration left-decoration"></div>

      <h1 className="page-title">TRANSPARENCIA</h1>

      <div className="intro-section">
        <p className="intro-text">
          En <strong>Alerta Andina</strong> consideramos fundamental la
          transparencia en todos los aspectos de nuestro proyecto. Como
          iniciativa académica desarrollada en la EMI, nos comprometemos a
          proporcionar información clara sobre nuestros métodos, fuentes de
          datos y procesos.
        </p>
      </div>

      <div className="transparency-grid">
        <div className="transparency-card">
          <div className="transparency-icon">
            <FaShieldAlt />
          </div>
          <h3>Protección de Datos</h3>
          <p>
            Garantizamos la privacidad y seguridad de los datos de nuestros
            usuarios. La información geolocalizada se utiliza exclusivamente
            para proporcionar alertas personalizadas y nunca se comparte con
            terceros.
          </p>
        </div>

        <div className="transparency-card">
          <div className="transparency-icon">
            <FaBalanceScale />
          </div>
          <h3>Metodología</h3>
          <p>
            Nuestros algoritmos y sistemas de predicción están basados en
            métodos científicos verificables. Documentamos nuestras fuentes y
            procesos para garantizar resultados confiables.
          </p>
        </div>

        <div className="transparency-card">
          <div className="transparency-icon">
            <FaHandshake />
          </div>
          <h3>Colaboraciones</h3>
          <p>
            Detallamos todas las colaboraciones con instituciones,
            organizaciones y fuentes de datos que hacen posible nuestro sistema
            de alertas climatológicas. Reconocemos y agradecemos sus
            contribuciones.
          </p>
        </div>

        <div className="transparency-card">
          <div className="transparency-icon">
            <FaLock />
          </div>
          <h3>Términos de Uso</h3>
          <p>
            Expresamos claramente las condiciones de uso de nuestra aplicación,
            los límites de responsabilidad y los compromisos que asumimos con
            nuestros usuarios.
          </p>
        </div>
      </div>

      <div className="sources-section">
        <h2>Nuestras Fuentes de Datos</h2>
        <ul className="sources-list">
          <li>
            <strong>SENAMHI Bolivia:</strong> Datos oficiales meteorológicos e
            hidrológicos del Servicio Nacional de Meteorología e Hidrología.
          </li>
          <li>
            <strong>Defensa Civil:</strong> Información histórica sobre
            desastres naturales y zonas de riesgo en La Paz.
          </li>
          <li>
            <strong>Datos climatológicos abiertos:</strong> Repositorios
            internacionales de información meteorológica de acceso libre.
          </li>
          <li>
            <strong>Reportes ciudadanos:</strong> Sistema de reporte
            comunitario que complementa y verifica la información institucional.
          </li>
        </ul>
      </div>

      <div className="metrics-section">
        <h2>Métricas y Resultados</h2>
        <div className="metrics-container">
          <div className="metric-item">
            <div className="metric-icon">
              <FaChartBar />
            </div>
            <div className="metric-info">
              <h4>Precisión de Pronósticos</h4>
              <p>
                Publicamos periódicamente los índices de precisión de nuestros
                pronósticos y alertas, identificando áreas de mejora continua.
              </p>
            </div>
          </div>
          <div className="metric-item">
            <div className="metric-icon">
              <FaChartBar />
            </div>
            <div className="metric-info">
              <h4>Tiempos de Respuesta</h4>
              <p>
                Monitoreamos y compartimos los tiempos promedio entre la
                detección de un evento climatológico y la emisión de alertas.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-section">
        <h2>Contacto para Información Adicional</h2>
        <p>
          Si necesitas información adicional sobre nuestro proyecto,
          metodología o tienes preguntas relacionadas con la transparencia,
          puedes contactarnos a través de los canales disponibles en la sección
          de contacto.
        </p>
        <p className="disclaimer">
          <em>
            Este proyecto se desarrolla en el marco académico de la EMI La Paz y
            tiene fines educativos y de servicio a la comunidad.
          </em>
        </p>
      </div>

      <div className="side-decoration right-decoration"></div>
    </div>
  );
}

export default TransparenciaPage;
