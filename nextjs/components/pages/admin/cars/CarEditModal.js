"use client";

import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

export default function CarEditModal(props) {
  const [car, setCar] = useState(null);
  const handleClose = () => props.setShow(false);

  useEffect(() => {
    if (props.car_no) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/cars/${props.car_no}`
        )
        .then((res) => {
          setCar(res.data);

          console.log(res.data);
        });
    }
  }, [props.car_no]);

  return (
    <Modal show={props.show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>차량 정보 수정</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="mb-3">
            <label htmlFor="car_name" className="form-label">
              모델명
            </label>
            <input
              type="text"
              className="form-control"
              id="car_name"
              name="car_name"
              placeholder="모델명을 입력하세요."
            />
          </div>
          <div className="mb-3">
            <label htmlFor="car_plate" className="form-label">
              번호판
            </label>
            <input
              type="text"
              className="form-control"
              id="car_plate"
              name="car_plate"
              placeholder="번호판을 입력하세요."
            />
          </div>
          <div className="mb-3">
            <label htmlFor="car_class" className="form-label">
              분류
            </label>
            <select className="form-select" id="car_class" name="car_class">
              <option value="경형">경형</option>
              <option value="소형">소형</option>
              <option value="준중형">준중형</option>
              <option value="중형">중형</option>
              <option value="대형">대형</option>
              <option value="SUV">SUV</option>
              <option value="RV">RV</option>
              <option value="승합차">승합차</option>
              <option value="전기차">전기차</option>
              <option value="수입차">수입차</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="car_image" className="form-label">
              이미지
            </label>
            <input
              type="file"
              className="form-control"
              id="car_image"
              name="car_image"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="car_is_active" className="form-label">
              상태
            </label>
            <select
              className="form-select"
              id="car_is_active"
              name="car_is_active"
            >
              <option value="true">활성화</option>
              <option value="false">비활성화</option>
            </select>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-primary">수정</button>
        <button className="btn btn-secondary" onClick={handleClose}>
          취소
        </button>
      </Modal.Footer>
    </Modal>
  );
}
