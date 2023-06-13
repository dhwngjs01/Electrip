"use client";

import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function CarStatusBadge({ car, cars }) {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/cars/reservations/${car.car_no}`
      )
      .then((res) => {
        res.data.map((reserve, key) => {
          const start = dayjs(reserve.reserve_start_date);
          const end = dayjs(reserve.reserve_end_date);

          if (car.car_is_active === false) {
            setStatus("중지");
          } else if (
            reserve.reserve_status === "예약중" &&
            start.isBefore(dayjs()) &&
            end.isAfter(dayjs())
          ) {
            setStatus("운행");
          } else if (car.car_is_active === true) {
            setStatus("대기");
          }
        });

        if (res.data.length == 0 && car.car_is_active === false) {
          setStatus("중지");
        } else if (res.data.length == 0 && car.car_is_active === true) {
          setStatus("대기");
        }
      });
  }, [cars]);

  return status === "운행" ? (
    <span className="badge bg-success">운행</span>
  ) : status === "중지" ? (
    <span className="badge bg-danger">중지</span>
  ) : (
    status === "대기" && <span className="badge bg-electrip">대기</span>
  );
}
