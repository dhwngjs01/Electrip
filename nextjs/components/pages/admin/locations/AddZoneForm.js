"use client";

import { useState } from "react";
import { Button, ButtonGroup, Card, Form, Modal } from "react-bootstrap";
import DaumPostcode from "react-daum-postcode";
import KakaoRoadView from "./KakaoRoadView";
import { useDispatch, useSelector } from "react-redux";
import {
  setAddress,
  setDetailAddress,
  setSearchFlag,
  setZipCode,
} from "@/redux/features/zoneSlice";
import axios from "axios";

export default function AddZoneForm() {
  const zone = useSelector((state) => state.zoneReducer);
  const dispatch = useDispatch();

  const [isPostcodeClicked, setIsPostcodeClicked] = useState(true);

  // 카카오 주소 검색 API
  const [openPostcode, setOpenPostcode] = useState(false);

  const handlePostcode = {
    // 버튼 클릭 이벤트
    clickButton: () => {
      setOpenPostcode((current) => !current);
      setIsPostcodeClicked((current) => !current);
    },

    // 주소 선택 이벤트
    selectAddress: (data) => {
      setOpenPostcode(false);
      setIsPostcodeClicked(false);

      dispatch(setZipCode(data.zonecode));
      dispatch(setAddress(data.address));
      dispatch(setDetailAddress(data.buildingName));
      dispatch(setSearchFlag(!zone.searchFlag));
    },
  };

  const handlerSubmitZoneAddForm = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (!data.zone_lat || !data.zone_lng) {
      alert("주소를 검색해주세요.");
      return;
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/zones`, data)
      .then((res) => {
        if (res.data.message) {
          alert(res.data.message);
        }

        if (res.data.success) {
          window.location.reload();
        }
      });
  };

  return (
    <>
      <Card>
        <Card.Body>
          <form id="zone-add-form" onSubmit={handlerSubmitZoneAddForm}>
            <input
              type="hidden"
              name="zone_lat"
              value={zone.lat ? zone.lat : ""}
            />
            <input
              type="hidden"
              name="zone_lng"
              value={zone.lng ? zone.lng : ""}
            />
            <Form.Group controlId="zone_zipcode">
              <Form.Label className="d-block">우편번호</Form.Label>
              <Form.Control
                type="text"
                name="zone_zipcode"
                className="w-25 d-inline-block"
                size="sm"
                value={zone.zipcode ? zone.zipcode : ""}
                onClick={handlePostcode.clickButton}
                onChange={(e) => dispatch(setZipCode(e.target.value))}
                readOnly
              />
              <Button
                type="button"
                variant="secondary"
                className="d-inline-block ms-2"
                size="sm"
                onClick={handlePostcode.clickButton}
              >
                주소 검색
              </Button>
            </Form.Group>
            <Form.Group controlId="zone_address" className="mt-3">
              <Form.Label>주소</Form.Label>
              <Form.Control
                type="text"
                name="zone_address"
                className="w-50"
                size="sm"
                value={zone.address ? zone.address : ""}
                onClick={handlePostcode.clickButton}
                onChange={(e) => dispatch(setAddress(e.target.value))}
                readOnly
              />
            </Form.Group>
            <Form.Group controlId="zone_detail_address" className="mt-3">
              <Form.Label>상세주소</Form.Label>
              <Form.Control
                type="text"
                name="zone_detail_address"
                className="w-75"
                size="sm"
                value={zone.detailAddress ? zone.detailAddress : ""}
                onClick={handlePostcode.clickButton}
                onChange={(e) => dispatch(setDetailAddress(e.target.value))}
                readOnly
              />
            </Form.Group>
            <Button type="submit" id="hidden-frm-submit" className="d-none">
              등록
            </Button>
          </form>
        </Card.Body>
      </Card>
      {openPostcode && (
        <Modal show={openPostcode} onHide={handlePostcode.clickButton}>
          <Modal.Header closeButton>
            <Modal.Title>다음 주소 찾기</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <DaumPostcode
              onComplete={handlePostcode.selectAddress}
              autoClose={false}
              style={{ height: "450px" }}
            />
          </Modal.Body>
        </Modal>
      )}
      {zone.address && <KakaoRoadView />}
    </>
  );
}
