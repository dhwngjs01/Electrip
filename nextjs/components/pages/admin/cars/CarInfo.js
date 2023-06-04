"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";

export default function CarInfo(props) {
  const [car, setCar] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/cars/${props.carNo}`)
      .then((res) => {
        setCar(res.data);
      });
  }, [props.carNo]);

  return (
    car && (
      <form>
        <Row>
          <Col lg={4}>
            <Card>
              <Card.Body>
                <img
                  src={`/images/cars/${car.car_image}`}
                  alt={car.car_name}
                  className="img-fluid"
                />
                <input type="file" className="form-control" />
              </Card.Body>
            </Card>
          </Col>
          <Col lg={8}>
            <Card>
              <Card.Body>
                <div className="mb-3">
                  <label htmlFor="car_name" className="form-label">
                    차량 모델명
                  </label>
                  <input type="text" className="form-control" id="car_name" />
                </div>
                <div className="mb-3">
                  <label htmlFor="car_plate" className="form-label">
                    차량 번호판
                  </label>
                  <input type="text" className="form-control" id="car_plate" />
                </div>
                <div className="mb-3">
                  <label htmlFor="car_class" className="form-label">
                    차량 분류
                  </label>
                  <select className="form-select" id="car_class">
                    <option value="경차">경차</option>
                    <option value="소형">소형</option>
                    <option value="중형">중형</option>
                    <option value="대형">대형</option>
                    <option value="SUV">SUV</option>
                    <option value="RV">RV</option>
                    <option value="승합차">승합차</option>
                    <option value="전기차">전기차</option>
                  </select>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </form>
    )
  );
}
