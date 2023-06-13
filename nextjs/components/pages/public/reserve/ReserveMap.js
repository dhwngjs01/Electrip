"use client";

import "./ReserveMap.scss";

import KakaoMap from "./KakaoMap";
import { FaSearch } from "react-icons/fa";
import { BiCurrentLocation } from "react-icons/bi";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setAddress,
  setCurrentPos,
  setSearchKeyword,
} from "@/redux/features/reserveSlice";

export default function ReserveMap() {
  const reserve = useSelector((state) => state.reserveReducer);
  const dispatch = useDispatch();

  const handleClickGpsIcon = (e) => {
    const geocoder = new kakao.maps.services.Geocoder();
    navigator.geolocation.getCurrentPosition(
      function (pos) {
        let lat = pos.coords.latitude;
        let lng = pos.coords.longitude;
        dispatch(setCurrentPos({ lat: lat, lng: lng }));

        geocoder.coord2Address(lng, lat, function (result, status) {
          if (status === kakao.maps.services.Status.OK) {
            if (result[0].road_address) {
              // 도로명 주소 정보가 있을 경우
              dispatch(setAddress(result[0].road_address.address_name));
              dispatch(setSearchKeyword(result[0].road_address.address_name));
            } else {
              // 도로명 주소 정보가 없을 경우
              dispatch(setAddress(result[0].address.address_name));
              dispatch(setSearchKeyword(result[0].address.address_name));
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

    // 검색 키워드 설정
    dispatch(setSearchKeyword(e.target.keyword.value));

    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(reserve.searchKeyword, function (result, status) {
      // 현재 위치 좌표 설정
      if (status === kakao.maps.services.Status.OK) {
        if (result[0].road_address) {
          // 도로명 주소 정보가 있을 경우
          dispatch(setAddress(result[0].road_address.address_name));
          dispatch(setSearchKeyword(result[0].road_address.address_name));
        } else {
          // 도로명 주소 정보가 없을 경우
          dispatch(setAddress(result[0].address.address_name));
          dispatch(setSearchKeyword(result[0].address.address_name));
        }

        dispatch(setCurrentPos({ lat: result[0].y, lng: result[0].x }));
      }
    });
  };

  const handleChangeAddressInput = (e) => {
    dispatch(setSearchKeyword(e.target.value));
  };

  return (
    <div className="shadow-lg position-relative overflow-hidden rounded-5 map">
      <BiCurrentLocation
        className="gpsIcon position-absolute fs-1 rounded-circle p-1 border border-dark  bg-light text-dark"
        onClick={handleClickGpsIcon}
      />
      <Form
        className="searchAddressForm position-absolute d-flex align-middle rounded pl-2"
        onSubmit={handleSubmitSearchForm}
      >
        <Form.Control
          className="searchAddressInput rounded-0 rounded-start"
          name="keyword"
          placeholder="주소를 입력하세요."
          required
          value={reserve.searchKeyword}
          onChange={handleChangeAddressInput}
        />
        <Button type="submit" className="rounded-0 rounded-end">
          <FaSearch />
        </Button>
      </Form>
      <KakaoMap />
    </div>
  );
}
