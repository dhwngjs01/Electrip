"use client";

import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

export default function AddCarForm() {
  const [imgSrc, setImgSrc] = useState("/images/cars/empty.png");

  const handlerOpenInputFile = (e) => {
    document.querySelector("#car_image").click();
  };

  const handlerChangeCarImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImgSrc(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <form className="px-5">
      <Row className="gx-5">
        <Col lg={7}>
          <Card className="h-100">
            <Card.Body className="text-center">
              <img src={imgSrc} alt={imgSrc} className="img-fluid px-5" />
              <Button
                variant="primary"
                className="mt-3"
                onClick={handlerOpenInputFile}
              >
                차량 이미지 등록
              </Button>
              <input
                type="file"
                className="d-none"
                id="car_image"
                name="car_image"
                accept="image/*"
                onChange={handlerChangeCarImage}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col lg={5}>
          <Form.Group controlId="car_name">
            <Form.Label>차량 모델명</Form.Label>
            <Form.Control
              type="text"
              name="car_name"
              placeholder="차량 모델명"
            />
          </Form.Group>
          <Form.Group className="mt-3" controlId="car_plate">
            <Form.Label>제조사</Form.Label>
            <Form.Control type="text" name="car_brand" placeholder="제조사" />
          </Form.Group>
          <Form.Group className="mt-3" controlId="car_class">
            <Form.Label>종류</Form.Label>
            <Form.Select name="car_class">
              <option value="경차">경차</option>
              <option value="소형">소형</option>
              <option value="준중형">준중형</option>
              <option value="중형">중형</option>
              <option value="준대형">준대형</option>
              <option value="대형">대형</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      {/* 번호판, 적산거리, 일일가격, 상태, 차량 활성화 */}
      <Row className="gx-5 mt-3">
        <Col lg={4}>
          <Form.Group controlId="car_plate">
            <Form.Label>번호판</Form.Label>
            <Form.Control type="text" name="car_plate" placeholder="번호판" />
          </Form.Group>
        </Col>
        <Col lg={4}>
          <Form.Group controlId="car_mileage">
            <Form.Label>적산거리</Form.Label>
            <Form.Control
              type="number"
              name="car_mileage"
              placeholder="적산거리"
            />
          </Form.Group>
        </Col>
        <Col lg={4}>
          <Form.Group controlId="car_price">
            <Form.Label>일일가격</Form.Label>
            <Form.Control
              type="number"
              name="car_price"
              placeholder="일일가격"
            />
          </Form.Group>
        </Col>
        <Col lg={4}>
          <Form.Group controlId="car_active">
            <Form.Check
              type="checkbox"
              name="car_active"
              className="d-inline me-2"
            />
            <Form.Label>차량 활성화</Form.Label>
          </Form.Group>
        </Col>
      </Row>
    </form>
  );
}
