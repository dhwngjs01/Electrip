"use client";

import { Button, Card, Col, Form, Row } from "react-bootstrap";
import ZoneList from "./ZoneList";
import { useDispatch, useSelector } from "react-redux";
import {
  initCarImage,
  initImgSrc,
  setCarImage,
  setImgSrc,
} from "@/redux/features/carSlice";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddCarForm() {
  const car = useSelector((state) => state.carReducer);
  const dispatch = useDispatch();

  const router = useRouter();

  const handlerOpenInputFile = (e) => {
    document.querySelector("#car_image").click();
  };

  const handlerChangeCarImage = (e) => {
    const file = e.target.files[0];

    if (file === undefined) {
      dispatch(initImgSrc());
      dispatch(initCarImage());
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

  const handlerSubmitCarAddForm = async (e) => {
    e.preventDefault();

    const car_name = e.target.car_name.value;
    const car_brand = e.target.car_brand.value;
    const car_class = e.target.car_class.value;
    const car_seat = e.target.car_seat.value;
    const car_plate = e.target.car_plate.value;
    const car_odo = e.target.car_odo.value;
    const car_price = e.target.car_price.value;
    const car_image = e.target.car_image.files[0];
    const zoneNo = e.target.zoneNo.value;

    if (car_image === undefined) {
      alert("차량 이미지를 등록해주세요.");
      return;
    }

    if (zoneNo === "") {
      alert("장소를 선택해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("car_name", car_name);
    formData.append("car_brand", car_brand);
    formData.append("car_class", car_class);
    formData.append("car_seat", car_seat);
    formData.append("car_plate", car_plate);
    formData.append("car_odo", car_odo);
    formData.append("car_price", car_price);
    formData.append("car_image", car_image);
    formData.append("zoneNo", zoneNo);

    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/cars`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.message) {
          alert(res.data.message);
        }

        if (res.data.success) {
          alert("차량이 추가되었습니다.");
          window.location.reload();
        }
      });
  };

  return (
    <form id="car-add-form" className="px-5" onSubmit={handlerSubmitCarAddForm}>
      <input type="hidden" name="zoneNo" value={car.zoneNo ? car.zoneNo : ""} />
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
              <p className="text-muted border-bottom mb-3 pb-2">차량 이미지</p>
              <img
                src={car.imgSrc}
                alt={car.imgSrc}
                className="img-fluid px-3 my-4"
                style={{ maxHeight: 130 }}
              />
              <Button
                variant="primary"
                className="mt-4"
                onClick={handlerOpenInputFile}
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
            />
          </Form.Group>
          <Form.Group className="mt-3" controlId="car_brand">
            <Form.Label>제조사</Form.Label>
            <Form.Control
              type="text"
              name="car_brand"
              placeholder="제조사"
              required
            />
          </Form.Group>
          <Form.Group className="mt-3" controlId="car_class">
            <Form.Label>종류</Form.Label>
            <Form.Select name="car_class" required>
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
  );
}
