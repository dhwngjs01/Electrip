"use client";

import ConfirmModal from "@/components/common/ConfirmModal";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import CarEditForm from "./CarEditForm";
import { useDispatch } from "react-redux";
import { reset } from "@/redux/features/carSlice";

export default function CarEditButton({ car }) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState(null);
  const [body, setBody] = useState(null);
  const [confirmBtnClass, setConfirmBtnClass] = useState(null);
  const [confirmBtnText, setConfirmBtnText] = useState(null);
  const [size, setSize] = useState(null);

  const dispatch = useDispatch();

  const handlerModifyCarModalOpen = (e) => {
    const car_no = e.currentTarget.dataset.car_no;
    const car_name = e.currentTarget.dataset.car_name;

    setTitle(`${car_name} 수정`);
    setBody(<CarEditForm carNo={car_no} />);
    setConfirmBtnClass("primary");
    setConfirmBtnText("수정");
    setSize("lg");
    setShow(true);
  };

  const handlerFormSubmit = () => {
    document.querySelector("#hidden-frm-submit").click();
  };

  const handlerClose = () => {
    dispatch(reset());
    setShow(false);
  };

  return (
    <>
      <FaEdit
        className="text-primary fs-4 me-2 cursor-pointer"
        data-car_no={car.car_no}
        data-car_name={car.car_name}
        onClick={handlerModifyCarModalOpen}
      />

      <ConfirmModal
        show={show}
        title={title}
        body={body}
        confirmBtnClass={confirmBtnClass}
        confirmBtnText={confirmBtnText}
        handlerConfirm={handlerFormSubmit}
        handlerClose={handlerClose}
        setShow={setShow}
        size={size}
      />
    </>
  );
}
