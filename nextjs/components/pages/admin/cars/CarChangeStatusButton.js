"use client";

import ConfirmModal from "@/components/common/ConfirmModal";
import axios from "axios";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { FaCheckCircle, FaTrashAlt } from "react-icons/fa";

export default function CarChangeStatusButton({ car, cars, setCars }) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState(null);
  const [body, setBody] = useState(null);
  const [confirmBtnClass, setConfirmBtnClass] = useState(null);
  const [confirmBtnText, setConfirmBtnText] = useState(null);
  const [size, setSize] = useState(null);

  const [carNo, setCarNo] = useState(null);

  const handlerChangeCarStateOpenModal = (e) => {
    const changeCarState = e.currentTarget.dataset.confirm_btn_text;
    const carNo = e.currentTarget.dataset.car_no;

    setTitle("차량 상태 변경");
    setConfirmBtnText(changeCarState);
    setBody(
      <p>
        해당 차량을 정말{" "}
        {changeCarState === "비활성화" ? (
          <Button
            type="button"
            variant="link"
            className="text-danger p-0"
            onClick={handlerDeleteCar}
          >
            {changeCarState}
          </Button>
        ) : (
          <span className="text-success text-decoration-underline">활성화</span>
        )}
        하시겠습니까?
      </p>
    );
    setConfirmBtnClass(changeCarState === "활성화" ? "success" : "danger");
    setCarNo(carNo);
    setSize("md");
    setShow(true);
  };

  const handlerDeleteCar = () => {
    if (confirm("정말 차량을 삭제하시겠습니까?") === false) return;

    axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/cars/${carNo}`)
      .then((res) => {
        if (res.data.success) {
          setCars(
            cars.filter((car) => {
              return car.car_no !== parseInt(carNo);
            })
          );

          setShow(false);
        }
      });
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
      {car.car_is_active ? (
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

      <ConfirmModal
        show={show}
        title={title}
        body={body}
        confirmBtnClass={confirmBtnClass}
        confirmBtnText={confirmBtnText}
        handlerConfirm={handlerChangeCarState}
        setShow={setShow}
        size={size}
      />
    </>
  );
}
