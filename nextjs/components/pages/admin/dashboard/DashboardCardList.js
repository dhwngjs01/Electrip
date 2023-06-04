"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Col } from "react-bootstrap";
import CustomCard from "./CustomCard";

export default function DashboardCardList() {
  const [summaryData, setSummaryData] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/dashboard`)
      .then((res) => {
        setSummaryData(res.data.summary_data);
      });
  }, []);

  return (
    summaryData && (
      <>
        <Col lg={4} md={6} sm={12}>
          <CustomCard
            title={summaryData.month_sales.title}
            text={
              summaryData.month_sales.data.replace(
                /\B(?=(\d{3})+(?!\d))/g,
                ","
              ) + " 원"
            }
          />
        </Col>
        <Col lg={4} md={6} sm={12}>
          <CustomCard
            title={summaryData.year_sales.title}
            text={
              summaryData.year_sales.data.replace(
                /\B(?=(\d{3})+(?!\d))/g,
                ","
              ) + " 원"
            }
          />
        </Col>
        <Col lg={4} md={6} sm={12}>
          <CustomCard
            title={summaryData.reserve_count.title}
            text={
              summaryData.reserve_count.data.replace(
                /\B(?=(\d{3})+(?!\d))/g,
                ","
              ) + " 건"
            }
          />
        </Col>
        <Col lg={4} md={6} sm={12}>
          <CustomCard
            title={summaryData.user_count.title}
            text={
              summaryData.user_count.data.replace(
                /\B(?=(\d{3})+(?!\d))/g,
                ","
              ) + " 명"
            }
          />
        </Col>
        <Col lg={4} md={6} sm={12}>
          <CustomCard
            title={summaryData.have_car_count.title}
            text={
              summaryData.have_car_count.data.replace(
                /\B(?=(\d{3})+(?!\d))/g,
                ","
              ) + " 대"
            }
          />
        </Col>
        <Col lg={4} md={6} sm={12}>
          <CustomCard
            title={summaryData.pending_cars.title}
            text={
              summaryData.pending_cars.data.replace(
                /\B(?=(\d{3})+(?!\d))/g,
                ","
              ) + " 대"
            }
          />
        </Col>
      </>
    )
  );
}
