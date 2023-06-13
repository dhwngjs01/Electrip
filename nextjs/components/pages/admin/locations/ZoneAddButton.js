"use client";

import ConfirmModal from "@/components/common/ConfirmModal";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import AddZoneForm from "./AddZoneForm";
import { reset } from "@/redux/features/zoneSlice";

export default function ZoneAddButton() {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState(null);
  const [body, setBody] = useState(null);
  const [confirmBtnClass, setConfirmBtnClass] = useState(null);
  const [confirmBtnText, setConfirmBtnText] = useState(null);

  const dispatch = useDispatch();

  const handlerOpenZoneAddModal = (e) => {
    setTitle("장소 등록");
    setBody(<AddZoneForm />);
    setConfirmBtnClass("primary");
    setConfirmBtnText("등록");
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
      <Button
        className="btn btn-primary float-end open-modal-btn"
        onClick={handlerOpenZoneAddModal}
      >
        장소 등록
      </Button>
      <ConfirmModal
        show={show}
        title={title}
        body={body}
        confirmBtnClass={confirmBtnClass}
        confirmBtnText={confirmBtnText}
        handlerConfirm={handlerFormSubmit}
        handlerClose={handlerClose}
        setShow={setShow}
        size="lg"
      />
    </>
  );
}
