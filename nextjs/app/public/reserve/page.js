"use client";

import "./reserve_page.scss";

import Script from "next/script";

import ReserveMap from "@/components/pages/public/reserve/ReserveMap";
import ReserveInfo from "@/components/pages/public/reserve/ReserveInfo";
import ReserveCarList from "@/components/pages/public/reserve/ReserveCarList";
import { Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { reset } from "@/redux/features/reserveSlice";
import ReserveDate from "@/components/pages/public/reserve/ReserveDate";

// 예약 정보
export default function Reserve() {
  const reserve = useSelector((state) => state.reserveReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reset());
  }, []);

  return (
    <Container className="py-5">
      <ReserveMap />
      <div
        className={
          (reserve.showReserveLayout
            ? "show-reserve-layout reserve-layout"
            : "hide-reserve-layout reserve-layout") + " mt-5"
        }
      >
        <Row className="m-0">
          <ReserveInfo />
          {reserve.showDateLayout && <ReserveDate />}
          {reserve.showCarLayout && <ReserveCarList />}
        </Row>
      </div>
      <Script
        type="text/javascript"
        src={
          "//dapi.kakao.com/v2/maps/sdk.js?appkey=" +
          process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY +
          "&libraries=services,clusterer,drawing&autoload=false"
        }
        strategy="beforeInteractive"
      />
    </Container>
  );
}
