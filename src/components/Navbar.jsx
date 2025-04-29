import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <Link to="/" className="logo-link">
          <img src="/images/logo-senamhi.png" alt="SENAMHI" className="logo" />
        </Link>

        <h1 className="site-title">
          SERVICIO NACIONAL DE METEOROLOGÍA E HIDROLOGÍA
        </h1>

        <img src="/images/logo-bolivia.png" alt="Bolivia" className="logo" />

        <button
          className={`mobile-menu-button ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <nav className={`main-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="menu-items">
          <Link to="/" className="nav-link">
            <i className="fas fa-home"></i>
            <span className="link-content">Inicio</span>
          </Link>

          <div
            className={`dropdown ${dropdownOpen ? 'active' : ''}`}
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className="dropdown-btn">
              <i className="fas fa-university"></i>
              <span>Institución</span>
              <i className={`fas fa-chevron-down ${dropdownOpen ? 'rotate' : ''}`}></i>
            </button>
            <div className="dropdown-content">
              <Link to="/institucion/mision" className="dropdown-link">
                <i className="fas fa-bullseye"></i>
                Misión
              </Link>
              <Link to="/institucion/vision" className="dropdown-link">
                <i className="fas fa-eye"></i>
                Visión
              </Link>
              <Link to="/institucion/quienes-somos" className="dropdown-link">
                <i className="fas fa-users"></i>
                ¿Quiénes Somos?
              </Link>
              <Link to="/institucion/que-hacemos" className="dropdown-link">
                <i className="fas fa-tasks"></i>
                ¿Qué Hacemos?
              </Link>
            </div>
          </div>

          <Link to="/transparencia" className="nav-link">
            <i className="fas fa-search"></i>
            <span className="link-content">Transparencia</span>
          </Link>

          <Link to="/meteorologia" className="nav-link">
            <i className="fas fa-cloud-sun"></i>
            <span className="link-content">Meteorología</span>
          </Link>

          <Link to="/hidrologia" className="nav-link">
            <i className="fas fa-water"></i>
            <span className="link-content">Hidrología</span>
          </Link>
        </div>

        <div className="alerts-container">
          <Link to="/alerta-meteorologica" className="alert meteorologica">
            <i className="fas fa-exclamation-triangle"></i>
            <span>ALERTA METEOROLÓGICA</span>
          </Link>
          <Link to="/alerta-hidrologica" className="alert hidrologica">
            <i className="fas fa-exclamation-triangle"></i>
            <span>ALERTA HIDROLÓGICA</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;  