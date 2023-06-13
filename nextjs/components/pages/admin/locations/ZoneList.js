"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import ZoneChangeStatusButton from "./ZoneChangeStatusButton";
import ZoneEditButton from "./ZoneEditButton";
import { FaCheckCircle, FaMinusCircle } from "react-icons/fa";
import { Table } from "react-bootstrap";

export default function ZoneList() {
  const [zoneList, setZoneList] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/zones`)
      .then((res) => {
        setZoneList(res.data);
      });
  }, []);

  return (
    <>
      <Table responsive className="text-center align-middle mt-3">
        <thead>
          <tr className="bg-electrip-table text-white">
            <th>상태</th>
            <th>우편번호</th>
            <th>장소 주소</th>
            <th>차량 수</th>
            <th>등록일자</th>
            <th>기능</th>
          </tr>
        </thead>
        <tbody>
          {zoneList.map((zone) => (
            <tr
              key={zone.zone_no}
              className={zone.zone_is_active ? "" : "bg-warning"}
            >
              <td>
                {zone.zone_is_active ? (
                  <FaCheckCircle className="text-success" />
                ) : (
                  <FaMinusCircle className="text-danger" />
                )}
              </td>
              <td>{zone.zone_zipcode}</td>
              <td>{zone.zone_address}</td>
              <td>{zone.car_count} 대</td>
              <td>{dayjs(zone.zone_created_at).format("YYYY-MM-DD")}</td>
              <td className="bg-white">
                <ZoneEditButton zone={zone} />
                <ZoneChangeStatusButton
                  zone={zone}
                  zoneList={zoneList}
                  setZoneList={setZoneList}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
