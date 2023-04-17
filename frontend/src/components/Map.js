/* global kakao */
import "./Map.css";

import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";

const { kakao } = window;

const Map = (props) => {
  const [clickedZoneMarker, setClickedZoneMarker] = useState(null);

  useEffect(() => {
    // 지도를 표시할 div
    const container = document.getElementById("map");
    const geocoder = new kakao.maps.services.Geocoder();
    const ps = new kakao.maps.services.Places();

    const zoneList = props.zoneList;

    let currentPos = new kakao.maps.LatLng(37.4514480321002, 126.651542258118);
    let currentPosMarker;
    let zoneMarkers = [];

    let searchAddressForm = document.querySelector(".searchAddressForm");

    // 지도를 생성할 때 필요한 기본 옵션
    const options = {
      center: currentPos,
      level: 3,
    };

    // 지도를 생성합니다.
    const map = new kakao.maps.Map(container, options);
    setCurrentLocationMarker();
    showCurrentLocationMarker();
    setZoneMarkerList();
    showZoneMarkerList();

    searchAddressForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const keyword = e.target.keyword.value;
      searchAddress(keyword);
    });

    // 장소 검색 객체를 통해 키워드로 장소검색을 요청합니다
    function searchAddress(keyword) {
      geocoder.addressSearch(keyword, function (result, status) {
        // 현재 위치 좌표 설정
        if (status === kakao.maps.services.Status.OK) {
          currentPos = new kakao.maps.LatLng(result[0].y, result[0].x);

          map.setCenter(currentPos);
          removeCurrentLocationMarker();
          setCurrentLocationMarker();
          showCurrentLocationMarker();
        }
      });
    }

    // 현재 위치 커스텀 마커 정의
    function setCurrentLocationMarker() {
      let imageSrc = "/resources/images/current_location_marker.png";
      let imageSize = new kakao.maps.Size(100);
      let imageOption = { offset: new kakao.maps.Point(50, 69) };
      let markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );

      // 현재 위치 커스텀 마커 표시
      currentPosMarker = new kakao.maps.Marker({
        position: currentPos,
        image: markerImage,
      });
    }
    // 현재 위치 커스텀 마커 표시
    function showCurrentLocationMarker() {
      currentPosMarker.setMap(map);
    }
    // 현재 위치 커스텀 마커 제거
    function removeCurrentLocationMarker() {
      currentPosMarker.setMap(null);
    }

    // 예약 가능한 지역 마커 표시
    // props.zoneList: 예약 가능한 지역 리스트
    function setZoneMarkerList() {
      let imageSrc = "/resources/images/car_location_marker.png";
      let imageSize = new kakao.maps.Size(70);
      let imageOption = { offset: new kakao.maps.Point(30, 70) };
      let markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );

      for (let i = 0; i < zoneList.length; i++) {
        let zone = zoneList[i];

        if (zone.zone_activate) {
          let position = new kakao.maps.LatLng(zone.zone_ma, zone.zone_la);

          let customOverlay = document.createElement("div");
          let customOverlayContent = document.createElement("div");
          let reserveAbleTitle = document.createElement("span");

          customOverlay.dataset.zone_no = zone.zone_no;
          customOverlay.className = "custom-overlay";
          customOverlayContent.className = "custom-overlay-content";
          reserveAbleTitle.className = "reserve-able-title";
          reserveAbleTitle.dataset.address = zone.zone_address;
          reserveAbleTitle.innerText = "예약 가능";

          customOverlayContent.appendChild(reserveAbleTitle);
          customOverlay.appendChild(customOverlayContent);

          let zoneMarker = new kakao.maps.Marker({
            position: position,
            image: markerImage,
          });

          let zoneOverlay = new kakao.maps.CustomOverlay({
            position: position,
            content: customOverlay,
            yAnchor: 1,
          });

          customOverlay.onclick = function (e) {
            selectedZoneMarker(e, position);
          };

          zoneMarkers.push({
            zoneMarker: zoneMarker,
            zoneOverlay: zoneOverlay,
          });
        }
      }
    }

    // 대여 장소 선택시
    function selectedZoneMarker(e, position) {
      let selected = e.target;
      let reserveZoneText = document.querySelector(".reserve-zone-text");

      setClickedZoneMarker(position); // 선택된 마커의 위도, 경도 저장
      initStyle(selected);

      reserveZoneText.textContent = selected.dataset.address;

      // 선택된 마커의 스타일 변경
      // 차량 선택 레이아웃 표시
      function initStyle(selected) {
        let reserveCarSelectLayout = document.querySelector(
          ".reserveCarSelectLayout"
        );

        document.querySelectorAll(".custom-overlay").forEach((el) => {
          el.classList.remove("custom-overlay-active");
        });

        selected.parentNode.parentNode.classList.toggle(
          "custom-overlay-active"
        );

        reserveCarSelectLayout.style = "visibility: visible; opacity:1";
      }
    }

    // 예약 가능한 지역 마커 표시
    function showZoneMarkerList() {
      for (let i = 0; i < zoneMarkers.length; i++) {
        zoneMarkers[i].zoneMarker.setMap(map);
        zoneMarkers[i].zoneOverlay.setMap(map);
      }
    }
    // 예약 가능한 지역 마커 제거
    function removeZoneMarkerList() {
      for (let i = 0; i < zoneMarkers.length; i++) {
        zoneMarkers[i].zoneMarker.setMap(null);
        zoneMarkers[i].zoneOverlay.setMap(null);
      }
    }
  }, [props]);

  return (
    <Box
      id="map"
      sx={{
        width: "100%",
        height: "700px",
      }}
    ></Box>
  );
};

export default Map;
