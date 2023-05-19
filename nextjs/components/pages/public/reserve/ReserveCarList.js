import "./ReserveCarList.scss";

import { Card, Col, Image, Row } from "react-bootstrap";

export default function ReserveCarList(props) {
  const handleClickCar = (e) => {
    self = e.currentTarget;
    const carNo = self.dataset.carNo;
    const carName = self.dataset.carName;

    props.setSelectedCarNo(parseInt(carNo));
    props.setSelectedCarName(carName);
  };

  return (
    // <Col xl={8} lg={(12, { order: "first" })} className="bg-white">
    <Col md={8} className="bg-white">
      <div className="scrollbar d-flex">
        <Row className="m-0 gx-5">
          {props.carList.map((car) => (
            <Col key={car.car_no} sm={6}>
              <Row
                className={
                  "justify-content-center align-items-center car-card p-3 shadow border rounded mb-3" +
                  (car.car_no === props.selectedCarNo ? " selected-car" : "")
                }
                data-car-no={car.car_no}
                data-car-name={car.car_name}
                onClick={handleClickCar}
              >
                <Col sm={6}>
                  <Image
                    src={car.car_original_image}
                    title={car.car_name}
                    alt={car.car_name}
                    style={{
                      maxWidth: "100%",
                    }}
                  />
                </Col>
                <Col sm={6} className="text-end">
                  <h4 className="fw-bold word-keep-all">{car.car_name}</h4>
                  <h4 className="text-primary fw-bold">
                    {car.car_price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    원
                  </h4>
                  <h4>{car.car_seat}인승</h4>
                </Col>
              </Row>
            </Col>
          ))}
        </Row>
      </div>
    </Col>
  );
}
