import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Función general para navegar y hacer scroll arriba
  const handleNavigate = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false); // cierra menú en mobile
  };

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">

        {/* Logo izquierdo */}
        <button onClick={() => handleNavigate('/')} className="logo-link" style={{ background: 'none', border: 'none' }}>
          <img src="src/assets/Logo_Clima-remove.png" alt="SENAMHI" className="logo" />
        </button>

        {/* Logo del medio */}
        <button onClick={() => handleNavigate('/')} className="logo-link" style={{ background: 'none', border: 'none' }}>
          <img src="src/assets/Logo_Alerta_Andina.png" alt="ALERTA ANDINA" className="site-title" />
        </button>

        {/* Logo derecho */}
        <button onClick={() => handleNavigate('/')} className="logo-link" style={{ background: 'none', border: 'none' }}>
          <img src="src/assets/Logo_Clima-remove.png" alt="Bolivia" className="logo" />
        </button>

        {/* Botón menú mobile */}
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
          <button className="nav-link" onClick={() => handleNavigate('/')}>
            <i className="fas fa-home"></i>
            <span className="link-content">Inicio</span>
          </button>

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
              <button className="dropdown-link" onClick={() => handleNavigate('/institucion/mision')}>
                <i className="fas fa-bullseye"></i> Misión
              </button>
              <button className="dropdown-link" onClick={() => handleNavigate('/institucion/vision')}>
                <i className="fas fa-eye"></i> Visión
              </button>
              <button className="dropdown-link" onClick={() => handleNavigate('/institucion/quienes-somos')}>
                <i className="fas fa-users"></i> ¿Quiénes Somos?
              </button>
              <button className="dropdown-link" onClick={() => handleNavigate('/institucion/que-hacemos')}>
                <i className="fas fa-tasks"></i> ¿Qué Hacemos?
              </button>
            </div>
          </div>

          <button className="nav-link" onClick={() => handleNavigate('/transparencia')}>
            <i className="fas fa-search"></i>
            <span className="link-content">Transparencia</span>
          </button>

          <button className="nav-link" onClick={() => handleNavigate('/meteorologia')}>
            <i className="fas fa-cloud-sun"></i>
            <span className="link-content">Meteorología</span>
          </button>

          <button className="nav-link" onClick={() => handleNavigate('/hidrologia')}>
            <i className="fas fa-water"></i>
            <span className="link-content">Hidrología</span>
          </button>
        </div>

        <div className="alerts-container">
          <button onClick={() => handleNavigate('/alerta-meteorologica')} className="alert meteorologica">
            <i className="fas fa-exclamation-triangle"></i>
            <span>ALERTA METEOROLÓGICA</span>
          </button>
          <button onClick={() => handleNavigate('/alerta-hidrologica')} className="alert hidrologica">
            <i className="fas fa-exclamation-triangle"></i>
            <span>ALERTA HIDROLÓGICA</span>
          </button>
        </div>
      </nav>

      <div className="login-button-wrapper">
        <button onClick={() => handleNavigate('/login')} className="login-button">
          <i className="fas fa-user"></i>
          <span>Admin</span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;