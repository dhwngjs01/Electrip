import { useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

import GpsFixedIcon from "@mui/icons-material/GpsFixed";

import KakaoMap from "./KakaoMap";

export default function ReserveMap(props) {
  const [currentPos, setCurrentPos] = useState({
    lat: 37.4514480321002,
    lng: 126.651542258118,
  });

  const handleClickGpsIcon = (e) => {
    const geocoder = new kakao.maps.services.Geocoder();
    navigator.geolocation.getCurrentPosition(
      function (pos) {
        let lat = pos.coords.latitude;
        let lng = pos.coords.longitude;
        setCurrentPos({ lat: lat, lng: lng });

        geocoder.coord2Address(lng, lat, function (result, status) {
          if (status === kakao.maps.services.Status.OK) {
            if (result[0].road_address) {
              // 도로명 주소 정보가 있을 경우
              props.setAddress(result[0].road_address.address_name);
              props.setSearchKeyword(result[0].road_address.address_name);
            } else {
              // 도로명 주소 정보가 없을 경우
              props.setAddress(result[0].address.address_name);
              props.setSearchKeyword(result[0].address.address_name);
            }
          }
        });
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
  };

  const handleSubmitSearchForm = (e) => {
    e.preventDefault();

    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(props.searchKeyword, function (result, status) {
      // 현재 위치 좌표 설정
      if (status === kakao.maps.services.Status.OK) {
        if (result[0].road_address) {
          // 도로명 주소 정보가 있을 경우
          props.setAddress(result[0].road_address.address_name);
          props.setSearchKeyword(result[0].road_address.address_name);
        } else {
          // 도로명 주소 정보가 없을 경우
          props.setAddress(result[0].address.address_name);
          props.setSearchKeyword(result[0].address.address_name);
        }

        setCurrentPos({ lat: result[0].y, lng: result[0].x });
      }
    });
  };

  const handleChangeAddressInput = (e) => {
    props.setSearchKeyword(e.target.value);
  };

  return (
    <Paper
      elevation={16}
      sx={{
        position: "relative",
      }}
    >
      <GpsFixedIcon
        className="gpsIcon"
        sx={{
          zIndex: 3,
          position: "absolute",
          top: 25,
          left: 25,
          color: "#333",
          cursor: "pointer",
          fontSize: "2rem",
          backgroundColor: "#fff",
          borderRadius: 3,
          padding: 1,
          border: "1px solid #333",
          boxShadow: "0 0 7px #333",
          transition: "all 0.2s",
          "&:hover": {
            backgroundColor: "#0093c9",
            color: "#fff",
          },
        }}
        onClick={handleClickGpsIcon}
      />
      <Paper
        className="searchAddressForm"
        component="form"
        sx={{
          zIndex: 2,
          position: "absolute",
          top: 25,
          right: 25,
          display: "flex",
          alignItems: "center",
          width: 400,
          pl: 2,
          border: "1px solid #333",
          borderRadius: 10,
          boxShadow: "0 0 7px #333",
        }}
        onSubmit={handleSubmitSearchForm}
      >
        <InputBase
          className="searchAddressInput"
          name="keyword"
          sx={{ ml: 1, flex: 1 }}
          placeholder="주소를 입력하세요."
          required
          value={props.searchKeyword}
          onChange={handleChangeAddressInput}
        />
        <IconButton type="submit" sx={{ p: "10px" }}>
          <SearchIcon />
        </IconButton>
      </Paper>
      <KakaoMap
        zoneList={props.zoneList}
        currentPos={currentPos}
        address={props.address}
        setReserveZone={props.setReserveZone}
        searchKeyword={props.searchKeyword}
        setShowReserveCarSelectLayout={props.setShowReserveCarSelectLayout}
      />
    </Paper>
  );
}
