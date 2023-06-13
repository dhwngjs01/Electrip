"use client";

import { Pie } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LineElement,
  LinearScale,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LineElement,
  LinearScale,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function DoughnutChart({ title, labels, label, data }) {
  const doughnutConfig = {
    type: "pie",
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        position: "top",
        text: title,
        font: {
          size: 25,
          weight: "normal",
        },
      },
    },
  };

  const doughnutDataset = {
    labels: labels,
    datasets: [
      {
        label: label,
        data: data,
        backgroundColor: [
          "rgb(54, 162, 235)",
          "rgb(255, 99, 132)",
          "rgb(75, 192, 192)",
          "rgb(255, 205, 86)",
          "rgb(201, 203, 207)",
        ],
        borderColor: [
          "rgb(54, 162, 235)",
          "rgb(255, 99, 132)",
          "rgb(75, 192, 192)",
          "rgb(255, 205, 86)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 3,
      },
    ],
  };

  return <Pie data={doughnutDataset} options={doughnutConfig} />;
}
