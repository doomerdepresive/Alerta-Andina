// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="navbar">
      {/* Encabezado con logo y título */}
      <div className="header-container">
        <img src="/images/logo-senamhi.png" alt="SENAMHI" className="logo" />
        <h1>SERVICIO NACIONAL DE METEOROLOGÍA E HIDROLOGÍA</h1>
        <img src="/images/logo-bolivia.png" alt="Bolivia" className="logo" />
      </div>

      {/* Menú principal */}
      <nav className="main-menu">
        <div className="menu-items">
          <Link to="/">Inicio</Link>

          {/* Menú desplegable: Institución */}
          <div
            className="dropdown"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className="dropdown-btn">
              <i className="fas fa-university"></i> Institución <i className="fas fa-chevron-down"></i>
            </button>
            {dropdownOpen && (
              <div className="dropdown-content">
                <a
                  href="/institucion/mision"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setDropdownOpen(false)}
                >
                  Misión
                </a>
                <a
                  href="/institucion/vision"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setDropdownOpen(false)}
                >
                  Visión
                </a>
                <a
                  href="/institucion/quienes-somos"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setDropdownOpen(false)}
                >
                  ¿Quiénes Somos?
                </a>
                <a
                  href="/institucion/que-hacemos"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setDropdownOpen(false)}
                >
                  ¿Qué Hacemos?
                </a>
              </div>
            )}
          </div>

          {/* Secciones principales */}
          <Link to="/transparencia"><i className="fas fa-search"></i> Transparencia</Link>
          <Link to="/meteorologia"><i className="fas fa-cloud-sun"></i> Meteorología</Link>
          <Link to="/clima"><i className="fas fa-temperature-high"></i> Clima</Link>
          <Link to="/hidrologia"><i className="fas fa-water"></i> Hidrología</Link>
          <Link to="/sistemas"><i className="fas fa-database"></i> Sistemas</Link>
          <Link to="/contacto"><i className="fas fa-phone-alt"></i> Contacto</Link>
        </div>

        {/* Sección de Alertas */}
        <div className="alerts">
          <Link to="/alerta-meteorologica" className="alert meteorologica">
            <i className="fas fa-exclamation-triangle"></i> ALERTA METEOROLÓGICA
          </Link>
          <Link to="/alerta-hidrologica" className="alert hidrologica">
            <i className="fas fa-exclamation-triangle"></i> ALERTA HIDROLÓGICA
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
