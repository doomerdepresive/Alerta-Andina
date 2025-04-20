import React from "react";
import "./MisionPage.css";

function TransparenciaPage() {
  return (
    <div className="page-container mision-page">
      <div className="side-decoration left-decoration"></div>

      <main className="main-content">
        <h1 className="page-title">TRANSPARENCIA</h1>
        <p className="page-text">
          En cumplimiento con la normativa vigente, el SENAMHI pone a disposición de la ciudadanía
          la información pública relacionada con la gestión institucional:
        </p>
        <ul className="page-text">
          <li>Planificación estratégica y operativa</li>
          <li>Informes de ejecución presupuestaria</li>
          <li>Contrataciones y adquisiciones</li>
          <li>Rendición de cuentas</li>
          <li>Informes de auditoría</li>
        </ul>
        <p className="page-text">
          Para mayor información puedes visitar el portal de transparencia institucional.
        </p>
      </main>

      <div className="side-decoration right-decoration"></div>
    </div>
  );
}

export default TransparenciaPage;
