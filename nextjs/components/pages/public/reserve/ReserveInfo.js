import { hideDateLayout, showCarLayout } from "@/redux/features/reserveSlice";
import "./ReserveInfo.scss";

import { Button, Col } from "react-bootstrap";
import { BsFillCarFrontFill } from "react-icons/bs";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

export default function ReserveInfo() {
  const reserve = useSelector((state) => state.reserveReducer);
  const dispatch = useDispatch();

  const handleDateNextButton = (e) => {
    if (!reserve.reserveStartDate || !reserve.reserveEndDate) {
      alert("대여 기간을 선택해주세요.");
    } else {
      dispatch(hideDateLayout());
      dispatch(showCarLayout());
    }
  };

  const handleCarNextButton = (e) => {
    if (!reserve.zoneNo || !reserve.carNo) {
      alert("대여 장소와 차량을 선택해주세요.");
    } else if (reserve.zoneNo && reserve.carNo) {
    }
  };

  return (
    <Col md={4} className="p-0">
      <div className="position-relative reserve-info">
        <div>
          <div className="p-4">
            <h4 className="text-white border-bottom pb-3 mb-3">
              <FaMapMarkerAlt className="fs-3 align-middle" />
              <span className="ps-3">차량 대여 장소</span>
            </h4>
            <p className="text-white fs-5 m-0">{reserve.zoneAddress}</p>
          </div>
        </div>
        <div>
          <div className="p-4">
            <h4 className="text-white border-bottom pb-3 mb-3">
              <FaCalendarAlt className="fs-3 align-middle" />
              <span className="ps-3">대여 기간</span>
            </h4>
            <p className="text-white fs-5 mb-0">
              {reserve.reserveStartDate && reserve.reserveEndDate
                ? `${reserve.reserveStartDate} ~ ${reserve.reserveEndDate}`
                : "대여 기간을 선택해주세요."}
            </p>
          </div>
          {reserve.showDateLayout && (
            <Button
              size="lg"
              className={
                "btn-next w-100 fs-5 text-white rounded-0" +
                (reserve.reserveStartDate && reserve.reserveEndDate
                  ? " btn-active"
                  : " btn-disabled")
              }
              onClick={handleDateNextButton}
            >
              다음
            </Button>
          )}
        </div>

        {reserve.showCarLayout ? (
          <div>
            <div className="p-4">
              <h4 className="text-white border-bottom pb-3 mb-3">
                <BsFillCarFrontFill className="fs-3 align-middle" />
                <span className="ps-3">차량 선택</span>
              </h4>
              <p className="text-white fs-5 mb-0">{reserve.carName}</p>
            </div>
            <Button
              size="lg"
              className={
                "btn-next w-100 fs-5 text-white rounded-0" +
                (reserve.carNo ? " btn-active" : " btn-disabled")
              }
            >
              다음
            </Button>
          </div>
        ) : (
          <div className="position-absolute left-0 bottom-0 w-100">
            <div className="px-4">
              <h4 className="text-white border-bottom pb-3">
                <BsFillCarFrontFill className="fs-3 align-middle" />
                <span className="ps-3">차량 선택</span>
              </h4>
            </div>
          </div>
        )}
      </div>
    </Col>
  );
}
