"use client";

import ConfirmModal from "@/components/common/ConfirmModal";
import { useState } from "react";

import AddCarForm from "./AddCarForm";

export default function CarAddButton() {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState(null);
  const [body, setBody] = useState(null);
  const [confirmBtnClass, setConfirmBtnClass] = useState(null);
  const [confirmBtnText, setConfirmBtnText] = useState(null);

  const handlerOpenCarAddModal = (e) => {
    setTitle("차량 등록");
    setBody(<AddCarForm />);
    setConfirmBtnClass("primary");
    setConfirmBtnText("등록");
    setShow(true);
  };

  const handlerAddCar = () => {
    console.log("차량 등록");
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
        setShow={setShow}
        size="lg"
      />
    </>
  );
}
