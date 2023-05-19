import "./KakaoMap.scss";

import React, { useState } from "react";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";

export default function KakaoMap(props) {
  const [zoneSelected, setZoneSelected] = useState();

  const handleSelectZone = (e) => {
    const selected = e.currentTarget;
    const address = selected.dataset.address;
    props.setReserveZone(address);

    const clickedIndex = selected.getAttribute("index");
    setZoneSelected(clickedIndex);

    document.querySelectorAll(".custom-overlay").forEach((overlay) => {
      const overlayZoneNo = overlay.dataset.zone_no;

      if (overlayZoneNo != clickedIndex) {
        overlay.classList.remove("custom-overlay-active");
      } else {
        overlay.classList.toggle("custom-overlay-active") === false
          ? props.setShowReserveCarSelectLayout(false)
          : props.setShowReserveCarSelectLayout(true);
      }
    });
  };

  return (
    <Map
      id="map"
      center={props.currentPos}
      style={{ width: "100%", height: 700 }}
    >
      <MapMarker
        position={props.currentPos}
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
      {props.zoneList.map((zone, index) => (
        <div
          key={zone.zone_no}
          data-address={zone.zone_address}
          onClick={handleSelectZone}
          index={zone.zone_no}
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
            <div className="custom-overlay" data-zone_no={zone.zone_no}>
              <div className="custom-overlay-content">
                <span className="reserve-able-title">예약 가능</span>
                <img
                  className="reserve-arrow"
                  src="/images/reserve_arrow.png"
                />
              </div>
            </div>
          </CustomOverlayMap>
        </div>
      ))}
    </Map>
  );
}
