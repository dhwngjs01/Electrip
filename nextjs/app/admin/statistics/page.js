"use client";

import DoughnutChart from "@/components/pages/admin/statistics/DoughnutChart";
import LineChart from "@/components/pages/admin/statistics/LineChart";
import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

export default function Statistics() {
  const [monthLabels, setMonthLabels] = useState(null);
  const [monthData, setMonthData] = useState(null);

  const [yearLabels, setYearLabels] = useState(null);
  const [yearData, setYearData] = useState(null);

  const [monthCarLabels, setMonthCarLabels] = useState(null);
  const [monthCarData, setMonthCarData] = useState(null);

  const [allCarLabels, setAllCarLabels] = useState(null);
  const [allCarData, setAllCarData] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/dashboard`)
      .then((res) => {
        setMonthLabels(
          res.data.month_sales_list.map((item) =>
            dayjs(new Date(item.month)).format("YYYY년 MM월")
          )
        );
        setMonthData(res.data.month_sales_list.map((item) => item.sales));

        setYearLabels(
          res.data.year_sales_list.map((item) =>
            dayjs(new Date(item.year)).format("YYYY년")
          )
        );
        setYearData(res.data.year_sales_list.map((item) => item.sales));

        setMonthCarLabels(
          res.data.month_popular_cars.map((item) => item.car_name)
        );
        setMonthCarData(
          res.data.month_popular_cars.map((item) => item.reserve_count)
        );

        setAllCarLabels(res.data.all_popular_cars.map((item) => item.car_name));
        setAllCarData(
          res.data.all_popular_cars.map((item) => item.reserve_count)
        );
      });
  }, []);

  return (
    <>
      <h3>통계</h3>
      <div className="row mb-5">
        <div className="col-lg-6">
          <LineChart
            title="매출(월)"
            labels={monthLabels}
            label=" 매출"
            data={monthData}
          />
        </div>
        <div className="col-lg-6">
          <LineChart
            title="매출(년)"
            labels={yearLabels}
            label=" 매출"
            data={yearData}
          />
        </div>
      </div>
      <div className="row mb-5">
        <div className="col-lg-6 px-5">
          <DoughnutChart
            title="차량 대여 현황(월)"
            labels={monthCarLabels}
            label=" 대여 건수"
            data={monthCarData}
          />
        </div>
        <div className="col-lg-6 px-5">
          <DoughnutChart
            title="차량 대여 현황(전체)"
            labels={allCarLabels}
            label=" 대여 건수"
            data={allCarData}
          />
        </div>
      </div>
    </>
  );
}
