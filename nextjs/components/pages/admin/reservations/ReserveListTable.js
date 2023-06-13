"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import ReserveInfoModal from "./ReserveInfoModal";
import dayjs from "dayjs";
import { Table } from "react-bootstrap";

export default function ReserveListTable() {
  const [reserveList, setReserveList] = useState([]);

  const [show, setShow] = useState(false);
  const [reserveNo, setReserveNo] = useState();
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/reservations`)
      .then((res) => {
        setReserveList(res.data);
      });
  }, []);

  const handlerClick = (e) => {
    setReserveNo(e.currentTarget.dataset.reserveNo);
    handleShow();
  };

  return (
    <>
      <Table
        responsive
        hover
        className="text-center align-middle mt-3"
        size="sm"
      >
        <thead>
          <tr className="bg-electrip-table text-white">
            <th>예약번호</th>
            <th>이미지</th>
            <th>모델</th>
            <th>차량번호</th>
            <th>대여일자</th>
            <th>반납일자</th>
            <th>예약자</th>
            <th>예약상태</th>
          </tr>
        </thead>
        <tbody>
          {reserveList.map((reserve) => (
            <tr
              key={reserve.reserve_no}
              className={
                "cursor-pointer" +
                (reserve.reserve_status == "예약중" &&
                dayjs().isAfter(reserve.reserve_end_date)
                  ? " bg-danger text-white"
                  : reserve.reserve_status == "예약중" &&
                    dayjs().isAfter(reserve.reserve_start_date) &&
                    dayjs().isBefore(reserve.reserve_end_date)
                  ? " bg-primary text-white"
                  : "")
              }
              data-reserve-no={reserve.reserve_no}
              onClick={handlerClick}
            >
              <td>{reserve.reserve_no}</td>
              <td>
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/images/${reserve.car_image}`}
                  alt={reserve.car_name}
                  height="50"
                />
              </td>
              <td>{reserve.car_name}</td>
              <td>{reserve.car_plate}</td>
              <td>
                {dayjs(reserve.reserve_start_date).format("YYYY-MM-DD HH:mm")}
              </td>
              <td>
                {dayjs(reserve.reserve_end_date).format("YYYY-MM-DD HH:mm")}
              </td>
              <td>{reserve.user_name ? reserve.user_name : "삭제된 회원"}</td>
              <td>
                {reserve.reserve_status == "예약중" &&
                dayjs().isAfter(reserve.reserve_start_date) &&
                dayjs().isBefore(reserve.reserve_end_date)
                  ? "대여중"
                  : reserve.reserve_status == "예약중" &&
                    dayjs().isAfter(reserve.reserve_end_date)
                  ? "대여 시간 초과"
                  : reserve.reserve_status == "대여종료" &&
                    dayjs().isAfter(reserve.reserve_end_date)
                  ? "대여종료"
                  : reserve.reserve_status}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {reserveNo && (
        <ReserveInfoModal show={show} setShow={setShow} reserveNo={reserveNo} />
      )}
    </>
  );
}
