import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">


      <div className="footer-content">
        <div className="footer-section about">
          <img src="/images/logo-senamhi-white.png" alt="SENAMHI" className="footer-logo" />
          <p className="about-text">
            Servicio Nacional de Meteorología e Hidrología de Bolivia,
            comprometidos con el desarrollo y bienestar de la sociedad.
          </p>
        </div>

        <div className="footer-section contact-info">
          <h4><i className="fas fa-map-marker-alt"></i> Ubicación</h4>
          <div className="contact-details">
            <p>
              <i className="fas fa-building"></i>
              Zona Central, Calle Reyes Ortiz Nro. 41
              <br />
              Piso 2 y 3, Edificio de la Fuerza Aérea
            </p>
            <p>
              <i className="fas fa-phone-alt"></i>
              <a href="tel:+59122365288">+591-2-2365288</a> /
              <a href="tel:+59122355824">+591-2-2355824</a>
            </p>
            <p>
              <i className="fas fa-envelope"></i>
              <a href="mailto:dirmethi@senamhi.gob.bo">dirmethi@senamhi.gob.bo</a>
            </p>
          </div>
        </div>

        <div className="footer-section quick-links">
          <h4><i className="fas fa-link"></i> Enlaces Rápidos</h4>
          <ul>
            <li><i className="fas fa-home"></i><Link to="/">Inicio</Link></li>
            <li><i className="fas fa-search"></i><Link to="/transparencia">Transparencia</Link></li>
            <li><i className="fas fa-phone"></i><Link to="/contacto">Contacto</Link></li>
            <li>
              <i className="fas fa-exclamation-triangle"></i>
              <Link to="/alerta-meteorologica">Alerta Meteorológica</Link>
            </li>
            <li>
              <i className="fas fa-water"></i>
              <Link to="/alerta-hidrologica">Alerta Hidrológica</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section social-media">
          <h4><i className="fas fa-share-alt"></i> Síguenos</h4>
          <div className="social-icons">
            <a href="https://www.facebook.com/senamhi" target="_blank" rel="noopener noreferrer" className="facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com/senamhi" target="_blank" rel="noopener noreferrer" className="twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.instagram.com/senamhi" target="_blank" rel="noopener noreferrer" className="instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.youtube.com/senamhi" target="_blank" rel="noopener noreferrer" className="youtube">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p className="copyright">
            © {new Date().getFullYear()} SENAMHI Bolivia | Todos los derechos reservados
          </p>
          <div className="footer-links">
            <Link to="/terminos">Términos de Uso</Link>
            <Link to="/privacidad">Política de Privacidad</Link>
            <Link to="/mapa-sitio">Mapa del Sitio</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;