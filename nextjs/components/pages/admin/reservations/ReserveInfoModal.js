"use client";

import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import dayjs from "dayjs";
import axios from "axios";
import { useEffect, useState } from "react";
import KakaoStaticMap from "./KakaoStaticMap";

export default function ReserveInfoModal({ show, setShow, reserveNo }) {
  const [reserve, setReserve] = useState({});

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/reservations/${reserveNo}`
      )
      .then((res) => {
        setReserve(res.data);
      });
  }, [reserveNo]);

  const handleClose = () => setShow(false);

  return (
    reserve && (
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>대여 상세 정보</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col lg={4}>
              <Card className="h-100">
                <Card.Body className="pb-0">
                  <Card.Img
                    variant="top"
                    src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/images/${reserve.car_image}`}
                    alt={reserve.car_name}
                    width="100%"
                  />
                </Card.Body>
                <Card.Body>
                  <Card.Text className="text-center">
                    <small className="text-muted">{reserve.car_name}</small>
                    <br />
                    <small className="text-muted">{reserve.car_plate}</small>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={8}>
              <Card>
                <Card.Body>
                  <Row className="gy-3">
                    <Col lg={3}>
                      <span>대여 기간</span>
                    </Col>
                    <Col lg={9}>
                      {dayjs(reserve.reserve_start_date).format(
                        "YYYY-MM-DD HH:mm"
                      )}{" "}
                      ~{" "}
                      {dayjs(reserve.reserve_end_date).format(
                        "YYYY-MM-DD HH:mm"
                      )}
                    </Col>
                    <Col lg={3}>
                      <span>반납 일자</span>
                    </Col>
                    <Col lg={9}>
                      {reserve.reserve_real_end_date
                        ? dayjs(reserve.reserve_real_end_date).format(
                            "YYYY-MM-DD HH:mm"
                          )
                        : "현재 예약중 입니다."}
                    </Col>
                    <Col lg={3}>
                      <span>대여 장소</span>
                    </Col>
                    <Col lg={9}>
                      <span className="word-keep-all">
                        {reserve.zone_address} {reserve.zone_detail_address}
                      </span>
                    </Col>
                    <Col lg={3}>
                      <span>결제 금액</span>
                    </Col>
                    <Col lg={9}>
                      <span>
                        {reserve.reserve_total_price &&
                          reserve.reserve_total_price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        원
                      </span>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {reserve.user_email && (
            <Card className="mt-3">
              <Card.Body>
                <Row className="gy-3">
                  <>
                    <Col lg={3}>
                      <span>예약자</span>
                    </Col>
                    <Col lg={9}>
                      <span>{reserve.user_name}</span>
                    </Col>
                    <Col lg={3}>
                      <span>연락처</span>
                    </Col>
                    <Col lg={9}>
                      <span>{reserve.user_mobile}</span>
                    </Col>
                    <Col lg={3}>
                      <span>이메일</span>
                    </Col>
                    <Col lg={9}>
                      <span>{reserve.user_email}</span>
                    </Col>
                  </>
                </Row>
              </Card.Body>
            </Card>
          )}
          <Card className="mt-3">
            <KakaoStaticMap
              height="400"
              lat={reserve.zone_lat}
              lng={reserve.zone_lng}
            />
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    )
  );
}
