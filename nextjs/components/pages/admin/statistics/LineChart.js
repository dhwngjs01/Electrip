"use client";

import { useState } from "react";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function LineChart({ title, labels, label, data }) {
  const lineConfig = {
    type: "line",
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        onClick(e) {
          return false;
        },
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
    scales: {
      y: {
        ticks: {
          callback: function (value, index, values) {
            if (value / 10000 >= 10000) {
              return (value / 100000000).toLocaleString("ko-KR") + " 억원";
            } else {
              return (value / 10000).toLocaleString("ko-KR") + " 만원";
            }
          },
        },
      },
    },
  };

  const lineDataset = {
    labels: labels,
    datasets: [
      {
        type: "line",
        label: label,
        data: data,
        fill: false,
        backgroundColor: "rgb(0, 94, 160)",
        borderColor: "rgba(0, 94, 160)",
        borderWidth: 3,
        pointRadius: 5,
      },
    ],
  };

  return <Line data={lineDataset} options={lineConfig} />;
}
