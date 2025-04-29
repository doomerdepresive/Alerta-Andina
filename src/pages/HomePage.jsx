import React from 'react';
import Slider from "../components/Slider";
import EmergencyAlert from '../components/EmergencyAlert';
import DisasterInfo from '../components/DisasterInfo';
import EmergencyContact from '../components/EmergencyContact';
import RiskMap from '../components/RiskMap';
import WeatherWidget from '../components/WeatherWidget'; // Añadir esta importación
import './HomePage.css';

function HomePage() {
  const currentAlerts = [
    {
      type: 'Deslizamiento',
      location: 'Zona Cotahuma',
      severity: 'alta',
      date: '2025-04-29',
      description: 'Riesgo de deslizamiento debido a lluvias intensas'
    },
    // Más alertas aquí
  ];

  const disasterTypes = [
    {
      type: 'Deslizamientos',
      icon: 'landslide',
      description: 'Común en laderas de La Paz durante la época de lluvias',
      affectedAreas: ['Cotahuma', 'Max Paredes', 'Periférica'],
      preventiveMeasures: [
        'Evitar construcciones en laderas inestables',
        'Mantener sistemas de drenaje',
        'Estar atento a grietas en el terreno'
      ]
    },
    {
      type: 'Inundaciones',
      icon: 'flood',
      description: 'Frecuentes en zonas bajas y cerca de ríos',
      affectedAreas: ['Centro', 'San Pedro', 'Zona Sur'],
      preventiveMeasures: [
        'Mantener limpios los sistemas de alcantarillado',
        'Evitar construir en zonas inundables',
        'Tener plan de evacuación'
      ]
    }
  ];

  return (
    <div className="home-page">
      <Slider />

      <div className="home-content">
        <div className="content-left">
          <WeatherWidget city="La Paz" />
        </div>

        <div className="content-right">
          <section className="emergency-section">
            <h2>Alertas Actuales</h2>
            <EmergencyAlert alerts={currentAlerts} />
          </section>

          <section className="info-section">
            <h2>Información sobre Desastres Naturales en La Paz</h2>
            <DisasterInfo disasters={disasterTypes} />
          </section>

          <section className="risk-map-section">
            <h2>Mapa de Zonas de Riesgo</h2>
            <RiskMap city="La Paz" />
          </section>

          <section className="contacts-section">
            <h2>Contactos de Emergencia</h2>
            <EmergencyContact />
          </section>

          <section className="preparation-section">
            <h2>Prepárate para Emergencias</h2>
            <div className="preparation-content">
              <h3>Kit de Emergencia Recomendado</h3>
              <ul className="emergency-kit-list">
                <li>Agua potable para 3 días</li>
                <li>Alimentos no perecederos</li>
                <li>Botiquín de primeros auxilios</li>
                <li>Radio portátil y baterías</li>
                <li>Linterna y baterías extra</li>
                <li>Documentos importantes en contenedor impermeable</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
export default HomePage;