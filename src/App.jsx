// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import HomePage from "./pages/HomePage";
import MisionPage from "./pages/MisionPage";
import VisionPage from "./pages/VisionPage";
import QuienesSomosPage from "./pages/QuienesSomosPage";
import QueHacemosPage from "./pages/QueHacemosPage";
import MeteorologiaPage from "./pages/MeteorologiaPage";
import ClimaPage from "./pages/ClimaPage";
import HidrologiaPage from "./pages/HidrologiaPage";
import SistemasPage from "./pages/SistemasPage";
import ContactoPage from "./pages/ContactoPage";
import TransparenciaPage from "./pages/TransparenciaPage";
import AlertaMeteorologicaPage from "./pages/AlertaMeteorologicaPage";
import AlertaHidrologicaPage from "./pages/AlertaHidrologicaPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import DashboardEstadisticas from './components/DashboardEstadisticas';


function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta protegida sin layout */}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/estadisticas" element={<DashboardEstadisticas />} />

        {/* Rutas públicas con layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="mision" element={<MisionPage />} />
          <Route path="institucion/mision" element={<MisionPage />} />
          <Route path="institucion/vision" element={<VisionPage />} />
          <Route path="institucion/quienes-somos" element={<QuienesSomosPage />} />
          <Route path="institucion/que-hacemos" element={<QueHacemosPage />} />
          <Route path="meteorologia" element={<MeteorologiaPage />} />
          <Route path="clima" element={<ClimaPage />} />
          <Route path="hidrologia" element={<HidrologiaPage />} />
          <Route path="sistemas" element={<SistemasPage />} />
          <Route path="contacto" element={<ContactoPage />} />
          <Route path="transparencia" element={<TransparenciaPage />} />
          <Route path="alerta-meteorologica" element={<AlertaMeteorologicaPage />} />
          <Route path="alerta-hidrologica" element={<AlertaHidrologicaPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
