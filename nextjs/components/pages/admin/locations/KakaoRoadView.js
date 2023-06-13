"use client";

import {
  setDetailAddress,
  setAddress,
  setLat,
  setLng,
  setZipCode,
} from "@/redux/features/zoneSlice";
import { useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Map, MapMarker, MapTypeId, Roadview } from "react-kakao-maps-sdk";
import { useDispatch, useSelector } from "react-redux";

export default function KakaoRoadView() {
  const zone = useSelector((state) => state.zoneReducer);
  const dispatch = useDispatch();
  const geocoder = new window.kakao.maps.services.Geocoder();

  useEffect(() => {
    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(zone.address, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        dispatch(setLat(result[0].y));
        dispatch(setLng(result[0].x));
      }
    });
  }, [zone.searchFlag]);

  // 지도를 클릭한 위치에 표출할 마커입니다
  const handlerClickMap = (_, mouseEvent) => {
    dispatch(setLat(mouseEvent.latLng.getLat()));
    dispatch(setLng(mouseEvent.latLng.getLng()));
    searchAddressFromCoords(zone.lat, zone.lng);
  };

  // 마커를 드래그한 위치에 표출할 마커입니다
  const handlerDragMarker = (marker) => {
    dispatch(setLat(marker.getPosition().getLat()));
    dispatch(setLng(marker.getPosition().getLng()));
    searchAddressFromCoords(zone.lat, zone.lng);
  };

  const searchAddressFromCoords = (lat, lng) => {
    geocoder.coord2Address(lng, lat, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        if (result[0].road_address === null) {
          dispatch(setZipCode(result[0].address.postal_code));
          dispatch(setAddress(result[0].address.address_name));
          dispatch(setDetailAddress(result[0].address.building_name));
        } else {
          dispatch(setZipCode(result[0].road_address.zone_no));
          dispatch(setAddress(result[0].road_address.address_name));
          dispatch(setDetailAddress(result[0].road_address.building_name));
        }
      }
    });
  };

  return (
    zone.lat &&
    zone.lng && (
      <Card className="mt-3">
        <Card.Body>
          <Row>
            <Col lg={6}>
              <Map
                center={{ lat: zone.lat, lng: zone.lng }}
                className="w-100"
                style={{ height: "300px" }}
                level={3}
                onClick={handlerClickMap}
              >
                <MapMarker
                  position={{ lat: zone.lat, lng: zone.lng }}
                  draggable={true}
                  onDragEnd={handlerDragMarker}
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
                <MapTypeId type={kakao.maps.MapTypeId.ROADVIEW} />
              </Map>
            </Col>
            <Col lg={6}>
              <Roadview
                position={{ lat: zone.lat, lng: zone.lng, radius: 100 }}
                className="w-100"
                style={{ height: "300px" }}
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    )
  );
}
