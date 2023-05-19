import "./ReserveInfo.scss";

import { Button, Col } from "react-bootstrap";
import { BsFillCarFrontFill } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function ReserveInfo(props) {
  return (
    // <Col xl={4} lg={(12, { order: "last" })} className="bg-primary p-0 position-relative rounded-3">
    <Col md={4} className="bg-primary p-0 position-relative rounded-3">
      <div className="p-3">
        <h4 className="text-white border-bottom pb-1 mb-2">
          <FaMapMarkerAlt className="fs-3 align-middle" />
          <span className="ps-3">차량 대여 장소</span>
        </h4>
        <p className="text-white mb-4">{props.reserveZone}</p>
        <h4 className="text-white border-bottom pb-1 mb-2">
          <BsFillCarFrontFill className="fs-3 align-middle" />
          <span className="ps-3">차량 선택</span>
        </h4>
        <p className="text-white">{props.selectedCarName}</p>
      </div>
      <Button className="btn-next position-absolute left-0 bottom-0 w-100 fs-5 bg-dark text-white rounded-0">
        다음
      </Button>
    </Col>
  );
}
