import axios from "axios";
import "./KakaoMap.scss";

import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import { useDispatch, useSelector } from "react-redux";
import {
  hideDateLayout,
  hideReserveLayout,
  reset,
  setZoneAddress,
  setZoneNo,
  showDateLayout,
  showReserveLayout,
} from "@/redux/features/reserveSlice";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function KakaoMap() {
  const reserve = useSelector((state) => state.reserveReducer);
  const dispatch = useDispatch();

  const [zoneList, setZoneList] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/reserve/zone`)
      .then((res) => {
        setZoneList(res.data);
      });
  }, []);

  const handleSelectZone = (e) => {
    dispatch(reset());

    const selected = e.currentTarget;
    const address = selected.dataset.address;
    dispatch(setZoneAddress(address));

    const clickedZoneNo = selected.dataset.zoneNo;
    dispatch(setZoneNo(Number(clickedZoneNo)));

    document.querySelectorAll(".custom-overlay").forEach((overlay) => {
      const overlayZoneNo = overlay.dataset.zoneNo;
      if (overlayZoneNo !== clickedZoneNo) {
        overlay.classList.remove("custom-overlay-active");
      } else {
        if (overlay.classList.toggle("custom-overlay-active")) {
          dispatch(showReserveLayout());
          dispatch(showDateLayout());
        } else {
          dispatch(hideReserveLayout());
          dispatch(hideDateLayout());
        }
      }
    });
  };

  return (
    <Map
      id="map"
      center={reserve.currentPos}
      style={{ width: "100%", height: 700 }}
    >
      <MapMarker
        position={reserve.currentPos}
        image={{
          src: "/images/current_location_marker.png",
          size: { width: 100 },
          options: {
            offset: {
              x: 50,
              y: 69,
            },
          },
        }}
      ></MapMarker>
      {zoneList.map((zone) => (
        <button
          type="button"
          style={{ display: "contents" }}
          key={zone.zone_no}
          data-address={zone.zone_address}
          onClick={handleSelectZone}
          data-zone-no={zone.zone_no}
        >
          <MapMarker
            position={{ lat: zone.zone_lat, lng: zone.zone_lng }}
            image={{
              src: "/images/car_location_marker.png",
              size: { width: 70 },
              options: {
                offset: {
                  x: 30,
                  y: 70,
                },
              },
            }}
          />
          <CustomOverlayMap
            position={{ lat: zone.zone_lat, lng: zone.zone_lng }}
            yAnchor={1}
            clickable={true}
          >
            <div className="custom-overlay" data-zone-no={zone.zone_no}>
              <div className="custom-overlay-content">
                <span className="reserve-able-title">예약 가능</span>
                <Image
                  className="reserve-arrow"
                  src="/images/reserve_arrow.png"
                  alt=""
                  width={8}
                  height={13}
                />
              </div>
            </div>
          </CustomOverlayMap>
        </button>
      ))}
    </Map>
  );
}
