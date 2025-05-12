// src/components/ClimateChart.jsx
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

function ClimateChart() {
  const data = {
    labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
    datasets: [
      {
        label: "Temperatura (°C)",
        data: [18, 20, 22, 21, 19],
        borderColor: "rgb(255, 99, 132)",
        tension: 0.3,
      },
      {
        label: "Lluvias (mm)",
        data: [5, 10, 3, 8, 12],
        borderColor: "rgb(54, 162, 235)",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <h3 style={{ textAlign: "center", color: "#1a2a56" }}>Gráfico Climático Semanal</h3>
      <Line data={data} options={options} />
    </div>
  );
}

export default ClimateChart;
