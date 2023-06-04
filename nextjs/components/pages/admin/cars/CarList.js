"use client";

import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaEdit, FaTrashAlt } from "react-icons/fa";
import ConfirmModal from "@/components/common/ConfirmModal";

export default function CarList() {
  const [cars, setCars] = useState(null);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState(null);
  const [body, setBody] = useState(null);
  const [confirmBtnClass, setConfirmBtnClass] = useState(null);
  const [confirmBtnText, setConfirmBtnText] = useState(null);
  const [carNo, setCarNo] = useState(null);
  const [action, setAction] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/cars`)
      .then((res) => {
        setCars(res.data);
      });
  }, []);

  const handlerModifyCarModalOpen = (e) => {
    const car_no = e.currentTarget.dataset.car_no;
    const car_name = e.currentTarget.dataset.car_name;

    setTitle(`${car_name} 수정`);
    setBody(modifyLayout());
    setConfirmBtnClass("primary");
    setConfirmBtnText("수정");
    setCarNo(car_no);
    setAction("modify");
    setShow(true);
  };

  const modifyLayout = () => {
    return (
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
    );
  };

  const handlerModifyCar = (car) => {
    setCars(
      cars.map((car) => {
        if (car.car_no === parseInt(carNo)) {
          car.car_name = car.car_name;
          car.car_plate = car.car_plate;
          car.car_class = car.car_class;
        }
        return car;
      })
    );
  };

  const handlerChangeCarStateOpenModal = (e) => {
    const changeCarState = e.currentTarget.dataset.confirm_btn_text;
    const carNo = e.currentTarget.dataset.car_no;

    setTitle("차량 상태 변경");
    setConfirmBtnText(changeCarState);
    setBody(`해당 차량을 정말 ${changeCarState} 하시겠습니까?`);
    setConfirmBtnClass(changeCarState === "활성화" ? "success" : "danger");
    setCarNo(carNo);
    setAction("changeCarState");
    setShow(true);
  };

  const handlerChangeCarState = () => {
    axios
      .patch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/cars/${carNo}`)
      .then((res) => {
        if (res.data.success) {
          setCars(
            cars.map((car) => {
              if (car.car_no === parseInt(carNo)) {
                car.car_is_active = !car.car_is_active;
              }
              return car;
            })
          );

          setShow(false);
        }
      });
  };

  return (
    <>
      {cars &&
        cars.map((car, key) => {
          return (
            <tr key={key} className={car.car_is_active ? "" : "bg-warning"}>
              <td className="p-4">
                <img
                  src={`/images/cars/${car.car_image}`}
                  alt={car.car_name}
                  className="img-fluid"
                />
              </td>
              <td>{car.car_name}</td>
              <td>{car.car_plate}</td>
              <td>{car.car_class}</td>
              <td className="fs-5">
                {car.reserve_status === "예약중" &&
                dayjs(car.reserve_start_date).isBefore(dayjs()) &&
                dayjs(car.reserve_end_date).isAfter(dayjs()) ? (
                  <span className="badge bg-success">운행</span>
                ) : car.car_is_active === false ? (
                  <span className="badge bg-danger">중지</span>
                ) : (
                  <span className="badge bg-electrip">대기</span>
                )}
              </td>
              <td>
                <p className="mb-0">
                  {dayjs(car.car_created_at).format("YYYY-MM-DD")}
                </p>
                <p className="mb-0">
                  {dayjs(car.car_created_at).format("HH:mm:ss")}
                </p>
              </td>
              <td>
                <FaEdit
                  className="text-primary fs-4 me-2 cursor-pointer"
                  data-car_no={car.car_no}
                  data-car_name={car.car_name}
                  data-confirm_btn_text="수정"
                  onClick={handlerModifyCarModalOpen}
                />
                {car.car_is_active === true ? (
                  <FaTrashAlt
                    className="text-danger fs-4 cursor-pointer"
                    data-car_no={car.car_no}
                    data-confirm_btn_text="비활성화"
                    onClick={handlerChangeCarStateOpenModal}
                  />
                ) : (
                  <FaCheckCircle
                    className="text-dark fs-4 cursor-pointer"
                    data-car_no={car.car_no}
                    data-confirm_btn_text="활성화"
                    onClick={handlerChangeCarStateOpenModal}
                  />
                )}
              </td>
            </tr>
          );
        })}
      <ConfirmModal
        show={show}
        title={title}
        body={body}
        confirmBtnClass={confirmBtnClass}
        confirmBtnText={confirmBtnText}
        handlerConfirm={
          action === "modify" ? handlerModifyCar : handlerChangeCarState
        }
        setShow={setShow}
      />
    </>
  );
}
