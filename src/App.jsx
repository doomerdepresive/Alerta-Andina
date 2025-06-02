import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layouts
import Layout from "./components/Layout";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

// Páginas públicas
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

// Páginas del administrador
import Dashboard from "./pages/admin/Dashboard";
import Usuarios from "./pages/admin/Usuarios";
import Reportes from "./pages/admin/Reportes";
import Alertas from "./pages/admin/Alertas";
import Contenido from "./pages/admin/Contenido";
import Perfil from "./pages/admin/Perfil";

function App() {
  return (
    <Router>
      <Routes>

        {/* ✅ Ruta de Login pública, separada */}
        <Route path="/login" element={<LoginPage />} />

        {/* ✅ Área de Administración protegida */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="reportes" element={<Reportes />} />
          <Route path="alertas" element={<Alertas />} />
          <Route path="contenido" element={<Contenido />} />
          <Route path="perfil" element={<Perfil />} />
        </Route>

        {/* ✅ Rutas públicas bajo Layout general */}
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
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
