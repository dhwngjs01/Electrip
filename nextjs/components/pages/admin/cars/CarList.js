"use client";

import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import CarEditButton from "./CarEditButton";
import CarChangeStatusButton from "./CarChangeStatusButton";
import { Table } from "react-bootstrap";
import CarStatusBadge from "./CarStatusBadge";

export default function CarList() {
  const [cars, setCars] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/cars`)
      .then((res) => {
        setCars(res.data);
      });
  }, []);

  return (
    <>
      <Table responsive className="text-center align-middle mt-3" size="sm">
        <thead>
          <tr className="bg-electrip-table text-white">
            <th>상태</th>
            <th>이미지</th>
            <th>모델</th>
            <th>번호판</th>
            <th>분류</th>
            <th>등록일자</th>
            <th>기능</th>
          </tr>
        </thead>
        <tbody>
          {cars &&
            cars.map((car, key) => {
              return (
                <tr key={key} className={car.car_is_active ? "" : "bg-warning"}>
                  <td className="fs-6">
                    <CarStatusBadge car={car} cars={cars} />
                  </td>
                  <td>
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/images/${car.car_image}`}
                      alt={car.car_name}
                      height="50"
                    />
                  </td>
                  <td>{car.car_name}</td>
                  <td>{car.car_plate}</td>
                  <td>{car.car_class}</td>

                  <td>{dayjs(car.car_created_at).format("YYYY-MM-DD")}</td>
                  <td className="bg-white">
                    <CarEditButton car={car} />
                    <CarChangeStatusButton
                      car={car}
                      cars={cars}
                      setCars={setCars}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
}
