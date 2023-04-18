/* global kakao */
import "./Map.css";

import React, { useState, useEffect, memo } from "react";
import Box from "@mui/material/Box";

const { kakao } = window;

const Map = (props) => {
  const [clickedZoneMarker, setClickedZoneMarker] = useState(null);

  useEffect(() => {
    // 지도를 표시할 div
    const mapContainer = document.getElementById("map");
    const geocoder = new kakao.maps.services.Geocoder();
    const ps = new kakao.maps.services.Places();

    const zoneList = props.zoneList;

    let currentPos = new kakao.maps.LatLng(37.4514480321002, 126.651542258118);
    let currentPosMarker = null;
    let zoneMarkers = [];

    let gpsIcon = document.querySelector(".gpsIcon");
    let searchAddressForm = document.querySelector(".searchAddressForm");
    let searchAddressInput = document.querySelector(".searchAddressInput");

    // 지도를 생성할 때 필요한 기본 옵션
    const options = {
      center: currentPos,
      level: 3,
    };

    // 지도를 생성합니다.
    const map = new kakao.maps.Map(mapContainer, options);

    setClickEventGpsIcon();
    setSubmitEventSearchAddressForm();
    resetMap();

    function resetMap() {
      resetCurrentLocationMarker();

      setZoneMarkerList();
      hideZoneMarkerList();
      showZoneMarkerList();
    }

    // 장소 검색 객체를 통해 키워드로 장소검색을 요청합니다
    function searchAddress(inputData, type) {
      switch (type) {
        // 주소로 검색
        case "address":
          geocoder.addressSearch(inputData, function (result, status) {
            // 현재 위치 좌표 설정
            if (status === kakao.maps.services.Status.OK) {
              if (status === kakao.maps.services.Status.OK) {
                if (result[0].road_address) {
                  // 도로명 주소 정보가 있을 경우
                  searchAddressInput.firstChild.value =
                    result[0].road_address.address_name;
                } else {
                  // 도로명 주소 정보가 없을 경우
                  searchAddressInput.firstChild.value =
                    result[0].address.address_name;
                }

                currentPos = new kakao.maps.LatLng(result[0].y, result[0].x);
                resetMap();
              }
            }
          });
          break;
        // 좌표로 검색
        case "coord":
          geocoder.coord2Address(
            inputData.getLng(),
            inputData.getLat(),
            function (result, status) {
              if (status === kakao.maps.services.Status.OK) {
                if (result[0].road_address) {
                  // 도로명 주소 정보가 있을 경우
                  searchAddressInput.firstChild.value =
                    result[0].road_address.address_name;
                } else {
                  // 도로명 주소 정보가 없을 경우
                  searchAddressInput.firstChild.value =
                    result[0].address.address_name;
                }
              }
            }
          );
          break;
      }
    }

    // 현재 위치 커스텀 마커 정의
    function resetCurrentLocationMarker() {
      let imageSrc = "/resources/images/current_location_marker.png";
      let imageSize = new kakao.maps.Size(100);
      let imageOption = { offset: new kakao.maps.Point(50, 69) };
      let markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );

      // 현재 위치 커스텀 마커 표시
      if (currentPosMarker !== null) {
        currentPosMarker.setMap(null);
        currentPosMarker = null;
      }

      currentPosMarker = new kakao.maps.Marker({
        position: currentPos,
        image: markerImage,
      });

      currentPosMarker.setMap(map);
      map.setCenter(currentPos);
    }

    // 예약 가능한 지역 마커 표시
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
          let reserveArrow = document.createElement("img");

          customOverlay.dataset.zone_no = zone.zone_no;
          customOverlay.dataset.address = zone.zone_address;
          customOverlay.className = "custom-overlay";
          customOverlayContent.className = "custom-overlay-content";
          reserveAbleTitle.className = "reserve-able-title";
          reserveAbleTitle.innerText = "예약 가능";

          reserveArrow.src = "/resources/images/reserve_arrow.png";
          reserveArrow.className = "reserve-arrow";

          customOverlay.appendChild(customOverlayContent);
          customOverlayContent.appendChild(reserveAbleTitle);
          customOverlayContent.appendChild(reserveArrow);

          let zoneMarker = new kakao.maps.Marker({
            position: position,
            image: markerImage,
          });

          let zoneOverlay = new kakao.maps.CustomOverlay({
            position: position,
            content: customOverlay,
            yAnchor: 1,
            clickable: true,
          });

          customOverlay.onclick = function (e) {
            selectedZoneMarker(e.currentTarget, position);
          };

          zoneMarkers.push({
            zoneMarker: zoneMarker,
            zoneOverlay: zoneOverlay,
          });
        }
      }
    }

    // 대여 장소 선택시
    function selectedZoneMarker(selected, position) {
      // 선택된 마커의 스타일 변경
      setClickedZoneMarker(position);

      let reserveZoneText = document.querySelector(".reserve-zone-text");
      reserveZoneText.textContent = selected.dataset.address;

      // 선택된 마커의 스타일 변경
      // 차량 선택 레이아웃 표시
      let customOverlayList = document.querySelectorAll(".custom-overlay");
      customOverlayList.forEach((el) => {
        if (el !== selected) {
          el.classList.remove("custom-overlay-active");
        } else {
          // 차량 선택 레이아웃
          let reserveCarSelectLayout = document.querySelector(
            ".reserveCarSelectLayout"
          );

          // 선택된 마커의 스타일 변경 및 차량 선택 레이아웃 표시
          selected.classList.toggle("custom-overlay-active") === false
            ? (reserveCarSelectLayout.style = "opacity:0")
            : (reserveCarSelectLayout.style = "max-height:100%; opacity:1");

          reserveCarSelectLayout.addEventListener("transitionend", () => {
            if (reserveCarSelectLayout.style.opacity == "0") {
              reserveCarSelectLayout.style.maxHeight = "0";
            }
          });
        }
      });
    }

    // 예약 가능한 지역 마커 표시
    function showZoneMarkerList() {
      for (let i = 0; i < zoneMarkers.length; i++) {
        zoneMarkers[i].zoneMarker.setMap(map);
        zoneMarkers[i].zoneOverlay.setMap(map);
      }
    }
    // 예약 가능한 지역 마커 제거
    function hideZoneMarkerList() {
      for (let i = 0; i < zoneMarkers.length; i++) {
        zoneMarkers[i].zoneMarker.setMap(null);
        zoneMarkers[i].zoneOverlay.setMap(null);
      }
    }

    // 주소 검색 이벤트
    function setSubmitEventSearchAddressForm() {
      searchAddressForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const keyword = e.target.keyword.value;
        searchAddress(keyword, "address");
      });
    }

    // GPS 아이콘 클릭 이벤트
    function setClickEventGpsIcon() {
      gpsIcon.addEventListener("click", () => {
        navigator.geolocation.getCurrentPosition(
          function (pos) {
            let ma = pos.coords.longitude;
            let la = pos.coords.latitude;
            let gpsPos = { La: la, Ma: ma };
            currentPos = new kakao.maps.LatLng(gpsPos.La, gpsPos.Ma);

            searchAddress(currentPos, "coord");
            resetMap();
          },
          function (error) {
            switch (error.code) {
              case 1:
                alert(
                  "사용자가 위치 정보 공유를 거부했습니다.\r\n위치 권한을 허용해주세요."
                );
                break;
              case 2:
                alert("위치 정보를 찾을 수 없습니다.");
                break;
              case 3:
                alert("위치 정보를 찾는데 시간이 초과되었습니다.");
                break;
              default:
                alert("기타 에러가 발생했습니다.");
                break;
            }
          }
        );
      });
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
