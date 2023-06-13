import ConfirmModal from "@/components/common/ConfirmModal";
import axios from "axios";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { FaCheckCircle, FaTrashAlt } from "react-icons/fa";

export default function ZoneChangeStatusButton({
  zone,
  zoneList,
  setZoneList,
}) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState(null);
  const [body, setBody] = useState(null);
  const [confirmBtnClass, setConfirmBtnClass] = useState(null);
  const [confirmBtnText, setConfirmBtnText] = useState(null);
  const [size, setSize] = useState(null);

  const [zoneNo, setZoneNo] = useState(null);

  const handlerChangeCarStateOpenModal = (e) => {
    const changeCarState = e.currentTarget.dataset.confirm_btn_text;
    const zoneNo = e.currentTarget.dataset.zone_no;

    setTitle("장소 상태 변경");
    setConfirmBtnText(changeCarState);
    setBody(
      <p>
        해당 장소를 정말{" "}
        {changeCarState === "비활성화" ? (
          <Button
            type="button"
            variant="link"
            className="text-danger p-0"
            onClick={() => handlerDeleteZone(zoneNo)}
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
    setZoneNo(zoneNo);
    setSize("md");
    setShow(true);
  };

  const handlerDeleteZone = (zoneNo) => {
    if (confirm("정말 장소를 삭제하시겠습니까?") === false) return;

    axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/zones/${zoneNo}`)
      .then((res) => {
        if (res.data.success) {
          setZoneList(
            zoneList.filter((zone) => {
              return zone.zone_no !== parseInt(zoneNo);
            })
          );

          setShow(false);
        }
      });
  };

  const handlerChangeZoneState = () => {
    axios
      .patch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/zones/${zoneNo}`)
      .then((res) => {
        if (res.data.success) {
          setZoneList(
            zoneList.map((zone) => {
              if (zone.zone_no === parseInt(zoneNo)) {
                return {
                  ...zone,
                  zone_is_active: !zone.zone_is_active,
                };
              } else {
                return zone;
              }
            })
          );

          setShow(false);
        }
      });
  };

  return (
    <>
      {zone.zone_is_active ? (
        <FaTrashAlt
          className="text-danger fs-4 cursor-pointer"
          data-zone_no={zone.zone_no}
          data-confirm_btn_text="비활성화"
          onClick={handlerChangeCarStateOpenModal}
        />
      ) : (
        <FaCheckCircle
          className="text-success fs-4 cursor-pointer"
          data-zone_no={zone.zone_no}
          data-confirm_btn_text="활성화"
          onClick={handlerChangeCarStateOpenModal}
        />
      )}
      <ConfirmModal
        show={show}
        title={title}
        body={body}
        confirmBtnText={confirmBtnText}
        confirmBtnClass={confirmBtnClass}
        handlerConfirm={handlerChangeZoneState}
        setShow={setShow}
        size={size}
      />
    </>
  );
}
