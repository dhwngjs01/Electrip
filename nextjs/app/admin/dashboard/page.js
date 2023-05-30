"use client";

import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Doughnut, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [data, setData] = useState();
  const [lineData, setLineData] = useState();

  let lineLabels = [];

  for (let i = 5; i > 0; i--) {
    lineLabels.push(dayjs().subtract(i, "month").format("YYYY-MM"));
  }

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "매출(월)",
      },
    },
  };

  const lineDataset = {
    labels: lineLabels,
    datasets: [
      {
        type: "line",
        label: "매출",
        data: [0, 1, 2, 3, 4],
        fill: false,
        backgroundColor: "rgb(0, 94, 160)",
        borderColor: "rgba(0, 94, 160)",
      },
    ],
  };

  const doughnutDataset = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/dashboard`)
      .then((res) => {
        setData(res.data);
        setLineData(res.data.month_sales_array);
        console.log(res.data.month_sales_array);
      });
  }, []);

  return (
    <div className="row gy-3">
      <div className="col-4">
        <div className="card">
          <div className="card-body">
            <div className="card-title">매출(월)</div>
            <p className="card-text text-end">
              \{" "}
              {data
                ? data.month_sales
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : 0}
            </p>
          </div>
        </div>
      </div>
      <div className="col-4">
        <div className="card">
          <div className="card-body">
            <div className="card-title">매출(년)</div>
            <p className="card-text text-end">
              \{" "}
              {data
                ? data.year_sales
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : 0}
            </p>
          </div>
        </div>
      </div>
      <div className="col-4">
        <div className="card">
          <div className="card-body">
            <div className="card-title">보류 중인 차량</div>
            <p className="card-text text-end">
              {data
                ? data.pending_cars
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : 0}{" "}
              대
            </p>
          </div>
        </div>
      </div>
      <div className="col-4">
        <div className="card">
          <div className="card-body">
            <div className="card-title">현재 회원 수</div>
            <p className="card-text text-end">
              {data
                ? data.user_count
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : 0}{" "}
              명
            </p>
          </div>
        </div>
      </div>
      <div className="col-4">
        <div className="card">
          <div className="card-body">
            <div className="card-title">차량 대여 건수(일)</div>
            <p className="card-text text-end">
              {data
                ? data.reserve_count
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : 0}{" "}
              건
            </p>
          </div>
        </div>
      </div>
      <div className="col-4">
        <div className="card">
          <div className="card-body">
            <div className="card-title">사고 건수(일)</div>
            <p className="card-text text-end">
              {data
                ? data.accident_count
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : 0}{" "}
              건
            </p>
          </div>
        </div>
      </div>
      <div className="col-8">
        <Line data={lineDataset} options={lineOptions} />
      </div>
      <div className="col-4">
        <Doughnut data={doughnutDataset} />
      </div>
    </div>
  );
}
