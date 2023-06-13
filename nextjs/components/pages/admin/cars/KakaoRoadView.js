"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Map, MapMarker, Roadview } from "react-kakao-maps-sdk";
import { useDispatch, useSelector } from "react-redux";

export default function KakaoRoadView(props) {
  const car = useSelector((state) => state.carReducer);
  const dispatch = useDispatch();

  const [zone, setZone] = useState(null);
  const [center, setCenter] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/reserve/zone/${car.zoneNo}`)
      .then((res) => {
        setZone(res.data);
        setCenter({
          lat: res.data.zone_lat,
          lng: res.data.zone_lng,
        });
      });
  }, [car.zoneNo]);

  return (
    <Card className="mt-3">
      <Card.Body>
        <div className="row">
          {zone && (
            <>
              <div className="col-lg-6">
                <Map
                  center={center}
                  className="w-100"
                  style={{
                    height: "300px",
                  }}
                  level={3}
                  onClick={(_, mouseEvent) => {
                    setCenter({
                      lat: mouseEvent.latLng.getLat(),
                      lng: mouseEvent.latLng.getLng(),
                    });
                  }}
                >
                  <MapMarker
                    position={center}
                    draggable={true}
                    onDragEnd={(marker) => {
                      setCenter({
                        lat: marker.getPosition().getLat(),
                        lng: marker.getPosition().getLng(),
                      });
                    }}
                    image={{
                      src: "https://t1.daumcdn.net/localimg/localimages/07/2018/pc/roadview_minimap_wk_2018.png",
                      size: { width: 26, height: 46 },
                      options: {
                        spriteSize: { width: 1666, height: 168 },
                        spriteOrigin: { x: 705, y: 114 },
                        offset: { x: 13, y: 46 },
                      },
                    }}
                  />
                </Map>
              </div>
              <div className="col-lg-6">
                <Roadview
                  position={{ ...center, radius: 50 }}
                  className="w-100"
                  style={{ height: "300px" }}
                />
              </div>
            </>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
