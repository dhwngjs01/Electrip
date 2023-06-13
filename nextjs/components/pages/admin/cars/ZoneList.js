"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Badge, ListGroup } from "react-bootstrap";
import KakaoRoadView from "./KakaoRoadView";
import { useDispatch, useSelector } from "react-redux";
import { setZoneNo } from "@/redux/features/carSlice";

export default function ZoneList(props) {
  const car = useSelector((state) => state.carReducer);
  const dispatch = useDispatch();

  const [zones, setZones] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/reserve/zone`)
      .then((res) => {
        setZones(res.data);
      });
  }, []);

  const handlerClickZone = (zoneNo) => {
    dispatch(setZoneNo(zoneNo));
  };

  return (
    <div className={props.className}>
      <h4>장소 목록</h4>
      <div className="border-top py-3">
        <ListGroup>
          {zones.map((zone) => {
            return (
              <ListGroup.Item
                key={zone.zone_no}
                action
                active={car.zoneNo === zone.zone_no}
                type="button"
                onClick={() => handlerClickZone(zone.zone_no)}
              >
                <Badge bg="primary" className="me-2">
                  {zone.car_count}
                </Badge>
                <span>{zone.zone_address}</span>
              </ListGroup.Item>
            );
          })}
          {car.zoneNo && <KakaoRoadView />}
        </ListGroup>
      </div>
    </div>
  );
}
