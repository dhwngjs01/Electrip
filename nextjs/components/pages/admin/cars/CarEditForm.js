"use client";

import axios from "axios";
import { useEffect } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import ZoneList from "./ZoneList";
import { useDispatch, useSelector } from "react-redux";
import {
  setCarBrand,
  setCarClass,
  setCarImage,
  setCarOdo,
  setCarPlate,
  setCarPrice,
  setImgSrc,
  setCarName,
  setZoneNo,
  setCarNo,
  setCarSeat,
} from "@/redux/features/carSlice";

export default function CarEditForm(props) {
  const car = useSelector((state) => state.carReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/cars/${props.carNo}`)
      .then((res) => {
        dispatch(setCarImage(res.data.car_image));
        dispatch(
          setImgSrc(
            `${process.env.NEXT_PUBLIC_API_URL}/uploads/images/${res.data.car_image}`
          )
        );
        dispatch(setCarName(res.data.car_name));
        dispatch(setCarBrand(res.data.car_brand));
        dispatch(setCarClass(res.data.car_class));
        dispatch(setCarPlate(res.data.car_plate));
        dispatch(setCarOdo(res.data.car_odo));
        dispatch(setCarPrice(res.data.car_price));
        dispatch(setZoneNo(res.data.zone_no));
        dispatch(setCarNo(res.data.car_no));
        dispatch(setCarSeat(res.data.car_seat));
      });
  }, [props.carNo]);

  const handlerSubmitForm = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    if (car.carImage) {
      formData.append("car_image", car.carImage);
    }

    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/cars/${car.carNo}`,
        formData
      )
      .then((res) => {
        if (res.data.message) {
          alert(res.data.message);
        }

        if (res.data.success) {
          window.location.reload();
        }
      });
  };

  const handlerOpenInputFile = (e) => {
    document.querySelector("#car_image").click();
  };

  const handlerChangeCarImage = (e) => {
    const file = e.target.files[0];

    if (file === undefined) {
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const { name, type, size, lastModified } = file;
      const fileData = {
        name,
        type,
        size,
        lastModified,
        dataUrl: reader.result,
      };

      dispatch(setImgSrc(fileData.dataUrl));
      dispatch(setCarImage(fileData));
    };
    reader.readAsDataURL(file);
  };

  return (
    car && (
      <form id="car-add-form" className="px-5" onSubmit={handlerSubmitForm}>
        <input
          type="hidden"
          name="zoneNo"
          value={car.zoneNo ? car.zoneNo : ""}
        />
        <Row className="gx-5">
          <Col lg={7}>
            <Card className="h-100">
              <Card.Body className="text-center">
                <input
                  type="file"
                  id="car_image"
                  className="d-none"
                  name="car_image"
                  accept="image/*"
                  onChange={handlerChangeCarImage}
                />
                <p className="text-muted border-bottom mb-3 pb-2">
                  차량 이미지
                </p>
                <img
                  src={car.imgSrc}
                  alt={car.imgSrc}
                  className="img-fluid px-3 my-4"
                  style={{ maxHeight: 130 }}
                />
                <Button
                  type="button"
                  variant="primary"
                  onClick={handlerOpenInputFile}
                  className="mt-4"
                >
                  차량 이미지 등록
                </Button>
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
                required
                defaultValue={car.carName}
              />
            </Form.Group>
            <Form.Group className="mt-3" controlId="car_brand">
              <Form.Label>제조사</Form.Label>
              <Form.Control
                type="text"
                name="car_brand"
                placeholder="제조사"
                required
                defaultValue={car.carBrand}
              />
            </Form.Group>
            <Form.Group className="mt-3" controlId="car_class">
              <Form.Label>종류</Form.Label>
              <Form.Select
                name="car_class"
                required
                value={car.carClass ? car.carClass : ""}
                onChange={(e) => dispatch(setCarClass(e.target.value))}
              >
                <option value="">선택해주세요.</option>
                <option value="경차">경차</option>
                <option value="소형">소형</option>
                <option value="준중형">준중형</option>
                <option value="중형">중형</option>
                <option value="준대형">준대형</option>
                <option value="대형">대형</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mt-3" controlId="car_seat">
              <Form.Label>승차인원</Form.Label>
              <Form.Control
                type="number"
                name="car_seat"
                placeholder="승차인원"
                required
                defaultValue={car.carSeat}
              />
            </Form.Group>
          </Col>
        </Row>
        <Card className="mt-4">
          <Card.Body>
            <Row className="gx-3">
              <Col lg={4}>
                <Form.Group controlId="car_plate">
                  <Form.Label>번호판</Form.Label>
                  <Form.Control
                    type="text"
                    name="car_plate"
                    placeholder="번호판"
                    required
                    defaultValue={car.carPlate}
                  />
                </Form.Group>
              </Col>
              <Col lg={4}>
                <Form.Group controlId="car_mileage">
                  <Form.Label>적산거리</Form.Label>
                  <Form.Control
                    type="number"
                    name="car_odo"
                    placeholder="적산거리"
                    required
                    defaultValue={car.carOdo}
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
                    required
                    defaultValue={car.carPrice}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <ZoneList className="mt-3" />
        <Button type="submit" className="d-none" id="hidden-frm-submit">
          전송
        </Button>
      </form>
    )
  );
}
