import React from 'react';
import './DisasterInfo.css';

function DisasterInfo({ disasters }) {
    return (
        <div className="disaster-info">
            {disasters.map((disaster, index) => (
                <div key={index} className="disaster-card">
                    <div className="disaster-icon">
                        <i className={`fas fa-${disaster.icon}`}></i>
                    </div>
                    <h3>{disaster.type}</h3>
                    <p className="disaster-description">{disaster.description}</p>

                    <div className="affected-areas">
                        <h4>Zonas Afectadas:</h4>
                        <ul>
                            {disaster.affectedAreas.map((area, idx) => (
                                <li key={idx}>{area}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="preventive-measures">
                        <h4>Medidas Preventivas:</h4>
                        <ul>
                            {disaster.preventiveMeasures.map((measure, idx) => (
                                <li key={idx}>{measure}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default DisasterInfo;