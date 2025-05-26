// src/components/Layout.jsx
import React from "react";
import { Outlet, Link } from "react-router-dom";
import Navbar from "./Navbar";
import "./Layout.css";

function Layout() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h3 className="footer-title">ALERTA ANDINA</h3>
            <p className="footer-description">
              Sistema de alerta temprana para condiciones meteorológicas e hidrológicas adversas en la región andina.
            </p>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Enlaces Rápidos</h3>
            <div className="quick-links-container">
              <ul className="footer-links">
                <li>
                  <Link to="/">
                    <i className="fas fa-chevron-right"></i> Inicio
                  </Link>
                </li>
                <li>
                  <Link to="/meteorologia">
                    <i className="fas fa-chevron-right"></i> Meteorología
                  </Link>
                </li>
                <li>
                  <Link to="/hidrologia">
                    <i className="fas fa-chevron-right"></i> Hidrología
                  </Link>
                </li>
                <li>
                  <Link to="/alerta-meteorologica">
                    <i className="fas fa-chevron-right"></i> Alertas Meteorológicas
                  </Link>
                </li>
                <li>
                  <Link to="/alerta-hidrologica">
                    <i className="fas fa-chevron-right"></i> Alertas Hidrológicas
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Institución</h3>
            <ul className="footer-links">
              <li>
                <Link to="/institucion/mision">
                  <i className="fas fa-chevron-right"></i> Misión
                </Link>
              </li>
              <li>
                <Link to="/institucion/vision">
                  <i className="fas fa-chevron-right"></i> Visión
                </Link>
              </li>
              <li>
                <Link to="/institucion/quienes-somos">
                  <i className="fas fa-chevron-right"></i> ¿Quiénes Somos?
                </Link>
              </li>
              <li>
                <Link to="/institucion/que-hacemos">
                  <i className="fas fa-chevron-right"></i> ¿Qué Hacemos?
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Contacto</h3>
            <div className="contact-info">
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>Dirección: Av. Principal 123, La Paz</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <span>Teléfono: +591 123 456 789</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <span>Email: info@alertaandina.bo</span>
              </div>
            </div>
            
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} ALERTA ANDINA. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;