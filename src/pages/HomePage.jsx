import Slider from "../components/Slider";
import PronosticoRegional from "../components/PronosticoRegional";

function HomePage() {
  return (
    <>
      <Slider />

      <div className="main-content">
        <h2>Pronostico Regional</h2>
        <p>Clima.</p>

        {/* 👇 Aquí va el pronóstico por regiones */}
        <PronosticoRegional />
      </div>
    </>
  );
}

export default HomePage;
