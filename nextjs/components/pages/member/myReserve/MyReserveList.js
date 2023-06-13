"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import ReserveStatus from "./ReserveStatus";
import CancelBtn from "./ReserveCancelBtn";
import { useDispatch, useSelector } from "react-redux";
import { setReserveList } from "@/redux/features/myReserveSlice";
import FinishBtn from "./FinishRentBtn";

export default function MyReserveList() {
  dayjs.locale("ko");

  const session = useSession();
  const myReserve = useSelector((state) => state.myReserveReducer);
  const dispatch = useDispatch();
  const now = dayjs().format("YYYY-MM-DD HH:mm");

  const [reserveCount, setReserveCount] = useState(null);

  useEffect(() => {
    const getReserveList = async () => {
      if (session.data) {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/member/myReserve?user_no=${session.data.user.user_no}`
          );

          dispatch(setReserveList([...response.data]));
          setReserveCount(response.data.length);
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
              <h4 className="mb-0 ">
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
                  <Row className="align-items-center gy-3">
                    <Col md={3}>
                      <span className="fw-bold">대여장소</span>
                    </Col>
                    <Col md={9}>
                      <p className="text-end word-keep-all mb-0">
                        {reserve.zone_address} {reserve.zone_detail_address}
                      </p>
                    </Col>
                    <Col md={3}>
                      <span className="fw-bold">대여일시</span>
                    </Col>
                    <Col md={9}>
                      <p className="text-end mb-0">
                        {dayjs(reserve.reserve_start_date).format(
                          "YYYY년 MM월 DD일 (ddd) HH:mm"
                        )}
                      </p>
                    </Col>
                    <Col md={3}>
                      <span className="fw-bold">반납일시</span>
                    </Col>
                    <Col md={9}>
                      <p className="text-end mb-0">
                        {dayjs(reserve.reserve_end_date).format(
                          "YYYY년 MM월 DD일 (ddd) HH:mm"
                        )}
                      </p>
                    </Col>
                    <Col md={3}>
                      <span className="fw-bold">총 대여 기간</span>
                    </Col>
                    <Col md={9}>
                      <p className="text-danger fs-5 text-end mb-0">
                        {reservePeriod(
                          reserve.reserve_start_date,
                          reserve.reserve_end_date
                        )}
                      </p>
                    </Col>
                    <Col md={3}>
                      <span className="fw-bold">총 금액</span>
                    </Col>
                    <Col md={9}>
                      <p className="fs-5 text-end mb-0">
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

                    {dayjs(now).isAfter(reserve.reserve_start_date) &&
                      reserve.reserve_status === "예약중" && (
                        <Col md={{ span: 8, offset: 4 }} className="text-end">
                          <FinishBtn reserve_no={reserve.reserve_no} />
                        </Col>
                      )}
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      ))}
      {reserveCount === 0 && (
        <Col md={{ span: 8 }}>
          <Card className="mt-4">
            <Card.Body className="p-4">
              <Row className="align-items-center">
                <Col md={12}>
                  <h5 className="fw-bold text-center mb-0">
                    예약 내역이 없습니다.
                  </h5>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      )}
    </Row>
  );
}
