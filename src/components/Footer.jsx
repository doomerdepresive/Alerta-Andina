import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        {/* Información de contacto */}
        <div className="footer-section contact-info">
          <h4>Contacto</h4>
          <p>Zona Central, Calle Reyes Ortiz Nro. 41</p>
          <p>Piso 2 y 3, Edificio de la Fuerza Aérea</p>
          <p>Tel: +591-2-2365288 / +591-2-2355824</p>
          <p>Email: dirmethi@senamhi.gob.bo</p>
        </div>

        {/* Enlaces rápidos */}
        <div className="footer-section quick-links">
          <h4>Enlaces Rápidos</h4>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/transparencia">Transparencia</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
            <li><Link to="/alerta-meteorologica">Alerta Meteorológica</Link></li>
            <li><Link to="/alerta-hidrologica">Alerta Hidrológica</Link></li>
          </ul>
        </div>

        {/* Redes sociales */}
        <div className="footer-section social-media">
          <h4>Síguenos</h4>
          <a href="https://www.facebook.com/senamhi" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i> Facebook
          </a>
          {/* Puedes agregar más redes sociales aquí */}
        </div>

      </div>

      {/* Derechos reservados */}
      <div className="footer-bottom">
        <p>© 2025 SENAMHI Bolivia | Todos los derechos reservados</p>
      </div>
    </footer>
  );
}

export default Footer;
