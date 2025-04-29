import React from 'react';
import './EmergencyContact.css';

function EmergencyContact() {
    const emergencyContacts = [
        {
            name: 'Bomberos',
            number: '119',
            icon: 'fire-truck',
            available: '24/7'
        },
        {
            name: 'Policía',
            number: '110',
            icon: 'shield-alt',
            available: '24/7'
        },
        {
            name: 'Ambulancia',
            number: '165',
            icon: 'ambulance',
            available: '24/7'
        },
        {
            name: 'Defensa Civil',
            number: '114',
            icon: 'hard-hat',
            available: '24/7'
        }
    ];

    return (
        <div className="emergency-contacts">
            {emergencyContacts.map((contact, index) => (
                <div key={index} className="contact-card">
                    <div className="contact-icon">
                        <i className={`fas fa-${contact.icon}`}></i>
                    </div>
                    <h3>{contact.name}</h3>
                    <a href={`tel:${contact.number}`} className="phone-number">
                        {contact.number}
                    </a>
                    <p className="availability">{contact.available}</p>
                </div>
            ))}
        </div>
    );
}

export default EmergencyContact;