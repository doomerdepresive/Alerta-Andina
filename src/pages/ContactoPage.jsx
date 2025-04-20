import React from "react";
import "./MisionPage.css";

function ContactoPage() {
  return (
    <div className="page-container mision-page">
      <div className="side-decoration left-decoration"></div>

      <main className="main-content">
        <h1 className="page-title">CONTACTO</h1>
        <p className="page-text">
          Puedes comunicarte con el SENAMHI a través de los siguientes medios:
        </p>
        <ul className="page-text">
          <li><strong>Dirección:</strong> Calle Juan de la Riva Nº 716, La Paz, Bolivia</li>
          <li><strong>Teléfono:</strong> (591) 2 2314802 - 2314884</li>
          <li><strong>Email:</strong> info@senamhi.gob.bo</li>
          <li><strong>Horario de atención:</strong> Lunes a Viernes de 08:00 a 16:00</li>
        </ul>
      </main>

      <div className="side-decoration right-decoration"></div>
    </div>
  );
}

export default ContactoPage;
