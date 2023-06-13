"use client";

import { MapMarker, StaticMap } from "react-kakao-maps-sdk";

export default function KakaoStaticMap({ height, lat, lng }) {
  return (
    lat &&
    lng && (
      <StaticMap
        center={{ lat: lat, lng: lng }}
        className="w-100"
        style={{
          height: `${height}px`,
        }}
        level={2}
        marker={{
          lat: lat,
          lng: lng,
          text: "대여 위치",
        }}
      ></StaticMap>
    )
  );
}
