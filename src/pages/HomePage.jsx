import React from 'react';
import Slider from "../components/Slider";
import EmergencyAlert from '../components/EmergencyAlert';
import DisasterInfo from '../components/DisasterInfo';
import EmergencyContact from '../components/EmergencyContact';
import RiskMap from '../components/RiskMap';
import WeatherWidget from '../components/WeatherWidget';
import styles from './HomePage.module.css';

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
    <div className={`${styles.homePageContainer} with-navbar`}>
      <div className={styles.sliderWrapper}>
        <Slider />
      </div>

      <div className={styles.homeContent}>
        <div className={styles.contentLeft}>
          <div className={styles.weatherWidgetWrapper}>
            <WeatherWidget city="La Paz" />
          </div>
        </div>

        <div className={styles.contentRight}>
          <section className={styles.emergencySection}>
            <h2 className={styles.sectionTitle}>Alertas Actuales</h2>
            <div className={styles.emergencyAlertWrapper}>
              <EmergencyAlert alerts={currentAlerts} />
            </div>
          </section>

          <section className={styles.infoSection}>
            <h2 className={styles.sectionTitle}>Información sobre Desastres Naturales en La Paz</h2>
            <div className={styles.disasterInfoWrapper}>
              <DisasterInfo disasters={disasterTypes} />
            </div>
          </section>

          <section className={styles.riskMapSection}>
            <h2 className={styles.sectionTitle}>Mapa de Zonas de Riesgo</h2>
            <div className={styles.riskMapWrapper}>
              <RiskMap city="La Paz" />
            </div>
          </section>

          <section className={styles.contactsSection}>
            <h2 className={styles.sectionTitle}>Contactos de Emergencia</h2>
            <div className={styles.emergencyContactWrapper}>
              <EmergencyContact />
            </div>
          </section>

          <section className={styles.preparationSection}>
            <h2 className={styles.sectionTitle}>Prepárate para Emergencias</h2>
            <div className={styles.preparationContent}>
              <h3 className={styles.kitTitle}>Kit de Emergencia Recomendado</h3>
              <ul className={styles.emergencyKitList}>
                <li>💧 Agua potable para 3 días</li>
                <li>🥫 Alimentos no perecederos</li>
                <li>🩹 Botiquín de primeros auxilios</li>
                <li>📻 Radio portátil y baterías</li>
                <li>🔦 Linterna y baterías extra</li>
                <li>📄 Documentos importantes en contenedor impermeable</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
