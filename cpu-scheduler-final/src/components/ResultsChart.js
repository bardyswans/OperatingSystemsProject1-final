import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement);

export default function ResultsChart({ results }) {
  console.log("ResultsChart received:", results);  

  if (!results || results.length === 0) {
    return <p>No chart data available.</p>;
  }

  const data = {
    labels: results.map((p) => `P${p.id}`),
    datasets: [
      {
        label: "Turnaround Time",
        data: results.map((p) => p.turnaroundTime),
        backgroundColor: "blue",
      },
    ],
  };

  return <Bar data={data} />;
}