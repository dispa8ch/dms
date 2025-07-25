import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register required chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type LineChartProps = {
  labels: string[];
  dataPoints: number[];
  label?: string;
};

function LineChart({ labels, dataPoints, label = "Data" }: LineChartProps) {
  const data = {
    labels,
    datasets: [
      {
        label: label,
        data: dataPoints,
        borderColor: "#18A0FB",
        backgroundColor: "#18A0FB",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      x: {
        grid: {
          drawBorder: false,
          color: (ctx: any) => {
            return ctx.index % 2 === 0 ? "#e5e7eb" : "#f3f4f6"; // subtle alternating if needed
          },
          borderDash: [6, 6], // dashed grid
        },
        ticks: {
          maxRotation: 0,
          autoSkip: true,
          padding: 10, // spacing between ticks and axis line
        },
      },
      y: {
        grid: {
          drawBorder: false,
          color: "#E2E2E2",
          borderDash: [6, 6], // dashed grid
        },
        ticks: {
          padding: 15, // space between y-axis values
          stepSize: 30, // optional: control step intervals
        },
      },
    },
  };

  return <Line data={data} options={options} />;
}

export default LineChart;
