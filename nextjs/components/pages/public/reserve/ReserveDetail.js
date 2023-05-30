"use client";

import { reset } from "@/redux/features/reserveSlice";
import axios from "axios";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { Button, Card, Col, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "dayjs/locale/ko";
import { useRouter } from "next/navigation";

export default function ReserveDetail() {
  dayjs.locale("ko");
  const session = useSession();
  const reserve = useSelector((state) => state.reserveReducer);
  const dispatch = useDispatch();
  const router = useRouter();

  const handlerReserveConfirm = (e) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/reserve`, {
        car_no: reserve.carNo,
        user_no: session.data.user.user_no,
        reserve_total_price: reserve.totalPrice,
        reserve_start_date: reserve.reserveStartDate,
        reserve_end_date: reserve.reserveEndDate,
      })
      .then((res) => {
        if (res.data.message) {
          alert(res.data.message);
          window.location.href = "/member/myReserve";
        }
      })
      .catch((err) => {
        if (err.response.data.message) {
          alert(err.response.data.message);
        }
      });
  };

  const handlerCancel = (e) => {
    if (confirm("지금까지 저장된 정보가 모두 삭제됩니다. 취소하시겠습니까?")) {
      dispatch(reset());
    }
  };

  return (
    <Row className="mt-5">
      <Col md={8}>
        <h2
          className="p-3 px-4 rounded-3 fs-3"
          style={{ backgroundColor: "#e7e6e6" }}
        >
          예약상세내역
        </h2>
        <Row className="m-0 mb-3 px-5">
          <Col md={3} className="p-3">
            <h4 className="fw-bold m-0">대여장소</h4>
          </Col>
          <Col md={9} className="p-3 m-0">
            <h4>{reserve.zoneAddress}</h4>
          </Col>
          <Col md={3} className="p-3">
            <h4 className="fw-bold m-0">대여일시</h4>
          </Col>
          <Col md={9} className="p-3 m-0">
            <h4>
              {dayjs(reserve.reserveStartDate).format("YYYY-MM-DD (ddd) HH:mm")}
            </h4>
          </Col>
          <Col md={3} className="p-3">
            <h4 className="fw-bold m-0">반납일시</h4>
          </Col>
          <Col md={9} className="p-3 m-0">
            <h4>
              {dayjs(reserve.reserveEndDate).format("YYYY-MM-DD (ddd) HH:mm")}
            </h4>
          </Col>
          <Col md={3} className="p-3">
            <h4 className="fw-bold m-0">차량정보</h4>
          </Col>
          <Col md={9} className="p-3 m-0">
            <h4>{reserve.carName}</h4>
          </Col>
        </Row>
        <Row className="m-0 px-5">
          <Col md={3} className="p-3">
            <h4 className="fw-bold m-0">총 대여 기간</h4>
          </Col>
          <Col md={9} className="p-3 m-0">
            <h4>
              <span className="text-danger fs-3">{reserve.reservePeriod}</span>
            </h4>
          </Col>
          <Col md={3} className="p-3">
            <h4 className="fw-bold m-0">총 금액</h4>
          </Col>
          <Col md={9} className="p-3 m-0">
            <h4 className="fs-3">
              {reserve.totalPrice &&
                reserve.totalPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              원
            </h4>
          </Col>
        </Row>
      </Col>
      <Col md={4}>
        <Card>
          <Card.Header>
            <h4 className="fw-bold text-center m-0 py-2">{reserve.carName}</h4>
          </Card.Header>
          <Card.Body className="px-5 py-5 my-5">
            <Image
              src={`/images/cars/${reserve.carImage}`}
              className="w-100 d-block"
            />
          </Card.Body>
          <Card.Footer className="d-flex">
            <div className="w-50 px-2">
              <Button
                className="btn btn-primary w-100 text-center fs-5"
                onClick={handlerReserveConfirm}
              >
                확인
              </Button>
            </div>
            <div className="w-50 px-2">
              <Button
                className="btn btn-secondary w-100 text-center fs-5"
                onClick={handlerCancel}
              >
                취소
              </Button>
            </div>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
}
