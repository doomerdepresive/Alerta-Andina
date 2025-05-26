import React from 'react';
import './EmergencyAlert.css';

function EmergencyAlert({ alerts }) {
    const getSeverityColor = (severity) => {
        switch (severity.toLowerCase()) {
            case 'alta': return 'high';
            case 'media': return 'medium';
            case 'baja': return 'low';
            default: return '';
        }
    };

    return (
        <div className="emergency-alerts">
            {alerts.map((alert, index) => (
                <div key={index} className={`alert-card ${getSeverityColor(alert.severity)}`}>
                    <div className="alert-header">
                        <h3>{alert.type}</h3>
                        <span className="severity-badge">{alert.severity.toUpperCase()}</span>
                    </div>
                    <div className="alert-content">
                        <p><i className="fas fa-map-marker-alt"></i> {alert.location}</p>
                        <p><i className="fas fa-calendar-alt"></i> {new Date(alert.date).toLocaleDateString()}</p>
                        <p className="alert-description"><i className="fas fa-info-circle"></i> {alert.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default EmergencyAlert;