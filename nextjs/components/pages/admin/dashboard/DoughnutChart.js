"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

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

export default function DoughnutChart() {
  const [doughnutLabel, setDoughnutLabel] = useState(null);
  const [doughnutData, setDoughnutData] = useState(null);

  const doughnutConfig = {
    type: "doughnut",
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        position: "top",
        text: "차량 대여 현황(월)",
        font: {
          size: 25,
          weight: "normal",
        },
      },
    },
  };

  const doughnutDataset = {
    labels: doughnutLabel,
    datasets: [
      {
        label: " 대여 건수",
        data: doughnutData,
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
        borderWidth: 1,
        cutout: "70%",
        spacing: 10,
      },
    ],
  };

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/dashboard`)
      .then((res) => {
        setDoughnutLabel(
          res.data.month_popular_cars.map((item) => item.car_name)
        );
        setDoughnutData(
          res.data.month_popular_cars.map((item) => item.reserve_count)
        );
      });
  }, []);

  return <Doughnut data={doughnutDataset} options={doughnutConfig} />;
}
