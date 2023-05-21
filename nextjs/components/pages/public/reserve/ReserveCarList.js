import { useDispatch, useSelector } from "react-redux";
import "./ReserveCarList.scss";

import { Col, Image, Row } from "react-bootstrap";

import {
  initCarName,
  initCarNo,
  setCarList,
  setCarName,
  setCarNo,
} from "@/redux/features/reserveSlice";
import { useEffect } from "react";
import axios from "axios";

export default function ReserveCarList() {
  const reserve = useSelector((state) => state.reserveReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (reserve.zoneNo == null) return;

    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/reserve/zone/${reserve.zoneNo}/carList`,
        {
          params: {
            startDate: reserve.startDate,
            endDate: reserve.endDate,
          },
        }
      )
      .then((res) => {
        dispatch(setCarList(res.data));
      });
  }, [reserve.showCarLayout]);

  const handleClickCar = (e) => {
    self = e.currentTarget;
    const carNo = self.dataset.carNo;
    const carName = self.dataset.carName;

    if (reserve.carNo == carNo) {
      dispatch(initCarNo());
      dispatch(initCarName());
    } else {
      dispatch(setCarNo(parseInt(carNo)));
      dispatch(setCarName(carName));
    }
  };

  return (
    reserve.showCarLayout && (
      <Col md={8} className="bg-white p-0">
        <div className="scrollbar d-flex">
          <Row className="m-0 gx-5 p-4">
            {reserve.carList.map((car) => (
              <Col key={car.car_no} sm={6}>
                <Row
                  className={
                    "justify-content-center align-items-center car-card p-3 shadow border rounded mb-3" +
                    (car.car_no === reserve.carNo ? " selected-car" : "")
                  }
                  data-car-no={car.car_no}
                  data-car-name={car.car_name}
                  onClick={handleClickCar}
                >
                  <Col sm={6}>
                    <Image
                      src={`/images/cars/${car.car_image}`}
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
    )
  );
}
