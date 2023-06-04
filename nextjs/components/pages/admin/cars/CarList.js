"use client";

import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaEdit, FaTrashAlt } from "react-icons/fa";
import ConfirmModal from "@/components/common/ConfirmModal";
import { Card, Col, Row } from "react-bootstrap";
import CarInfo from "./CarInfo";

export default function CarList() {
  const [cars, setCars] = useState(null);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState(null);
  const [body, setBody] = useState(null);
  const [confirmBtnClass, setConfirmBtnClass] = useState(null);
  const [confirmBtnText, setConfirmBtnText] = useState(null);
  const [action, setAction] = useState(null);
  const [carNo, setCarNo] = useState(null);
  const [size, setSize] = useState(null);

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

    setAction("modify");
    setCarNo(car_no);
    setTitle(`${car_name} 수정`);
    setBody(<CarInfo carNo={car_no} />);
    setConfirmBtnClass("primary");
    setConfirmBtnText("수정");
    setSize("lg");
    setShow(true);
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
    setSize("md");
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
              </td>
              <td className="bg-white">
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
                    className="text-success fs-4 cursor-pointer"
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
        size={size}
      />
    </>
  );
}
