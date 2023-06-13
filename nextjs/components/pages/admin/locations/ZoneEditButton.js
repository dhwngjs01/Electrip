"use client";

import ConfirmModal from "@/components/common/ConfirmModal";
import { reset } from "@/redux/features/zoneSlice";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import ZoneEditForm from "./ZoneEditForm";

export default function ZoneEditButton({ zone }) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState(null);
  const [body, setBody] = useState(null);
  const [confirmBtnClass, setConfirmBtnClass] = useState(null);
  const [confirmBtnText, setConfirmBtnText] = useState(null);
  const [size, setSize] = useState(null);

  const dispatch = useDispatch();

  const handlerModifyCarModalOpen = (e) => {
    const zone_no = e.currentTarget.dataset.zone_no;

    setTitle("장소 수정");
    setBody(<ZoneEditForm zoneNo={zone_no} />);
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
        data-zone_no={zone.zone_no}
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
