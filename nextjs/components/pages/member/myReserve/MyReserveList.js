"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import ReserveStatus from "./ReserveStatus";
import CancelBtn from "./CancelBtn";
import { useDispatch, useSelector } from "react-redux";
import { setReserveList } from "@/redux/features/myReserveSlice";

export default function MyReserveList() {
  dayjs.locale("ko");

  const session = useSession();
  const myReserve = useSelector((state) => state.myReserveReducer);
  const dispatch = useDispatch();
  const now = dayjs().format("YYYY-MM-DD HH:mm");

  useEffect(() => {
    const getReserveList = async () => {
      if (session.data) {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/member/myReserve?user_no=${session.data.user.user_no}`
          );

          dispatch(setReserveList([...response.data]));
        } catch (error) {
          console.error(error);
        }
      }
    };

    getReserveList();
  }, [session]);

  const diffDate = (type, start, end) => {
    return dayjs(end).diff(dayjs(start).format("YYYY-MM-DD HH:mm"), type);
  };

  const reservePeriod = (start, end) => {
    let period = "";

    if (start && end) {
      period +=
        diffDate("day", start, end) > 0
          ? diffDate("day", start, end) + "일 "
          : "";
      period +=
        diffDate("hour", start, end) % 24 > 0
          ? (diffDate("hour", start, end) % 24) + "시간 "
          : "";
      period +=
        diffDate("minute", start, end) % 60 > 0
          ? (diffDate("minute", start, end) % 60) + "분"
          : "";

      return period;
    }
  };

  return (
    <Row className="justify-content-center">
      {myReserve.reserveList.map((reserve, key) => (
        <Col key={key} md={{ span: 8 }}>
          <Card className="mt-4">
            <Card.Title className="bg-light p-3 mb-0 rounded-top">
              <h4 className="mb-0">
                <ReserveStatus
                  reserve_status={reserve.reserve_status}
                  reserve_start_date={reserve.reserve_start_date}
                  reserve_end_date={reserve.reserve_end_date}
                />
                <span className="fs-4 fw-bold ms-3">{reserve.car_name}</span>
                <span className="fs-5 fw-bold float-end">
                  {dayjs(reserve.reserve_created_at).format("YYYY. MM. DD")}
                </span>
              </h4>
            </Card.Title>
            <Card.Body className="p-4">
              <Row className="align-items-center">
                <Col md={5}>
                  <img
                    src={`/images/cars/${reserve.car_image}`}
                    alt={reserve.car_name}
                    className="img-fluid px-5"
                  />
                </Col>
                <Col md={7}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <h5 className="fw-bold">대여장소</h5>
                    </Col>
                    <Col md={8}>
                      <p className="text-end">{reserve.zone_address}</p>
                      {reserve.zone_detail_address && (
                        <p className="text-end">
                          {reserve.zone_detail_address}
                        </p>
                      )}
                    </Col>
                    <Col md={4}>
                      <h5 className="fw-bold">대여일시</h5>
                    </Col>
                    <Col md={8}>
                      <p className="text-end">
                        {dayjs(reserve.reserve_start_date).format(
                          "YYYY년 MM월 DD일 (ddd) HH:mm"
                        )}
                      </p>
                    </Col>
                    <Col md={4}>
                      <h5 className="fw-bold">반납일시</h5>
                    </Col>
                    <Col md={8}>
                      <p className="text-end">
                        {dayjs(reserve.reserve_end_date).format(
                          "YYYY년 MM월 DD일 (ddd) HH:mm"
                        )}
                      </p>
                    </Col>
                    <Col md={4}>
                      <h5 className="fw-bold">총 대여 기간</h5>
                    </Col>
                    <Col md={8}>
                      <p className="text-danger fs-5 text-end">
                        {reservePeriod(
                          reserve.reserve_start_date,
                          reserve.reserve_end_date
                        )}
                      </p>
                    </Col>
                    <Col md={4}>
                      <h5 className="fw-bold">총 금액</h5>
                    </Col>
                    <Col md={8}>
                      <p className="fs-5 text-end">
                        {reserve.reserve_total_price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " "}
                        원
                      </p>
                    </Col>
                    {dayjs(now).isBefore(reserve.reserve_start_date) &&
                      reserve.reserve_status === "예약중" && (
                        <Col md={{ span: 8, offset: 4 }} className="text-end">
                          <CancelBtn reserve_no={reserve.reserve_no} />
                        </Col>
                      )}
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
