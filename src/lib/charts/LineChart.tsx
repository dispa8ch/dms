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
  type ChartOptions,
  type ChartData,
  Filler,
  type Plugin,
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
  Legend,
  Filler
);

// Custom plugin for shadow
const shadowPlugin: Plugin<"line"> = {
  id: "lineShadow",
  beforeDatasetsDraw: (chart) => {
    const ctx = chart.ctx;
    ctx.save();

    chart.data.datasets.forEach((dataset, datasetIndex) => {
      const meta = chart.getDatasetMeta(datasetIndex);
      if (meta.type !== "line") return;

      ctx.shadowColor = "#80ccffff";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 5;
    });
  },
  afterDatasetsDraw: (chart) => {
    chart.ctx.restore();
  },
};

type LineChartProps = {
  labels: string[];
  dataPoints: number[];
  label?: string;
};

function LineChart({ labels, dataPoints, label = "Data" }: LineChartProps) {
  const data: ChartData<"line"> = {
    labels,
    datasets: [
      {
        label: label,
        data: dataPoints,
        borderColor: "#18A0FB",
        backgroundColor: "#45b2faff",
        tension: 0.4,
        fill: false,
        pointRadius: 3,
        pointHoverRadius: 6,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      x: {
        grid: {
          color: (ctx) => (ctx.index % 2 === 0 ? "#f1f1f1" : "#ececec"),
        },
        ticks: {
          maxRotation: 0,
          autoSkip: true,
          padding: 10,
        },
      },
      y: {
        grid: {
          color: "#f0f0f0",
        },
        ticks: {
          padding: 15,
          stepSize: 30,
        },
      },
    },
  };

  return <Line data={data} options={options} plugins={[shadowPlugin]} />;
}

export default LineChart;
