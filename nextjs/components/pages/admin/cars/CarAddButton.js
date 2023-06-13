"use client";

import ConfirmModal from "@/components/common/ConfirmModal";
import { useState } from "react";

import AddCarForm from "./AddCarForm";
import { useDispatch } from "react-redux";
import { reset } from "@/redux/features/carSlice";

export default function CarAddButton() {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState(null);
  const [body, setBody] = useState(null);
  const [confirmBtnClass, setConfirmBtnClass] = useState(null);
  const [confirmBtnText, setConfirmBtnText] = useState(null);

  const dispatch = useDispatch();

  const handlerOpenCarAddModal = (e) => {
    setTitle("차량 등록");
    setBody(<AddCarForm />);
    setConfirmBtnClass("primary");
    setConfirmBtnText("등록");
    setShow(true);
  };

  const handlerAddCar = () => {
    document.querySelector("#hidden-frm-submit").click();
  };

  const handlerClose = () => {
    dispatch(reset());
    setShow(false);
  };

  return (
    <>
      <button
        className="btn btn-primary float-end"
        onClick={handlerOpenCarAddModal}
      >
        차량 등록
      </button>
      <ConfirmModal
        show={show}
        title={title}
        body={body}
        confirmBtnClass={confirmBtnClass}
        confirmBtnText={confirmBtnText}
        handlerConfirm={handlerAddCar}
        handlerClose={handlerClose}
        setShow={setShow}
        size="lg"
      />
    </>
  );
}
