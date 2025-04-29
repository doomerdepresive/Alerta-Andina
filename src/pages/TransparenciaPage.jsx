import React from "react";
import "./TransparenciaPage.css";

function TransparenciaPage() {
  const documentos = [
    { titulo: "Informe de Gestión 2024", enlace: "#" },
    { titulo: "Auditoría Interna", enlace: "#" },
    { titulo: "Contrataciones y licitaciones", enlace: "#" }
  ];

  return (
    <div className="page-container transparencia-page">
      <h1 className="page-title">📑 Transparencia</h1>
      <p className="intro">Consulta aquí los documentos públicos, informes, auditorías y contrataciones del sistema.</p>

      <table className="tabla-documentos">
        <thead>
          <tr>
            <th>📄 Documento</th>
            <th>📥 Descargar</th>
          </tr>
        </thead>
        <tbody>
          {documentos.map((doc, index) => (
            <tr key={index}>
              <td>{doc.titulo}</td>
              <td><a href={doc.enlace} className="btn-descargar">Ver PDF</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransparenciaPage;
