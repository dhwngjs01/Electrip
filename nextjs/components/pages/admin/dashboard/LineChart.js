"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import dayjs from "dayjs";

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

export default function LineChart() {
  const [lineLabel, setLineLabel] = useState(null);
  const [lineData, setLineData] = useState(null);

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
        text: "매출(월)",
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
    labels: lineLabel,
    datasets: [
      {
        type: "line",
        label: " 매출",
        data: lineData,
        fill: false,
        backgroundColor: "rgb(0, 94, 160)",
        borderColor: "rgba(0, 94, 160)",
        borderWidth: 3,
        pointRadius: 5,
      },
    ],
  };

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/dashboard`)
      .then((res) => {
        setLineLabel(
          res.data.month_sales_list.map((item) =>
            dayjs(new Date(item.month)).format("YYYY년 MM월")
          )
        );
        setLineData(res.data.month_sales_list.map((item) => item.sales));
      });
  }, []);

  return <Line data={lineDataset} options={lineConfig} />;
}
