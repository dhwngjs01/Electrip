"use client";

import { useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import Link from "next/link";
import DaumPostcode from "react-daum-postcode";
import { FaLock } from "react-icons/fa";
import axios from "axios";

const Join = () => {
  const [phone, setPhone] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
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

      setZipcode(data.zonecode);
      setAddress(data.address);
      setDetailAddress(data.buildingName);
    },
  };

  // 휴대폰 번호 입력 함수 (자동 하이픈 생성)
  const handlePhone = (e) => {
    const value = e.target.value.replace(/\D+/g, "");
    const phoneNumberLength = 11;

    let result = "";

    for (let i = 0; i < value.length && i < phoneNumberLength; i++) {
      if (i === 3 || i === 7) {
        result += "-";
      }
      result += value[i];
    }

    setPhone(result);
  };

  // 회원가입 폼 전송
  const handleSubmit = (event) => {
    event.preventDefault();

    const user_id = event.target.user_id.value;
    const user_pw = event.target.user_pw.value;
    const user_pw2 = event.target.user_pw2.value;
    const user_name = event.target.user_name.value;
    const user_phone = event.target.user_phone.value;
    const user_zipcode = event.target.user_zipcode.value;
    const user_address = event.target.user_address.value;
    const user_detail_address = event.target.user_detail_address.value;

    if (user_pw !== user_pw2) {
      alert("비밀번호가 서로 일치하지 않습니다.");
      return;
    }

    const data = {
      user_id,
      user_pw,
      user_pw2,
      user_name,
      user_phone,
      user_zipcode,
      user_address,
      user_detail_address,
    };

    axios.defaults.withCredentials = true;
    axios
      .post("/api/auth/signup", data)
      .then((res) => {
        // 회원가입 성공
        if (res.data.success) {
          alert("회원가입이 완료되었습니다.");
          location.href = "/member/login";
        } else {
          // 필수 입력사항이 비어있으면
          if (res.data.empty_value_required_list) {
            // 필수 입력사항 앞에 필수 입력사항임을 알리는 문구 표시
            document.querySelectorAll(".form-text").forEach((text) => {
              console.log(text);
              text.classList.add("d-none");
            });
            res.data.empty_value_required_list.forEach((emptyInput) => {
              document
                .getElementById(emptyInput)
                .previousSibling.classList.remove("d-none");
            });
          }

          // 서버에서 전달한 메시지가 있으면
          if (res.data.message) {
            alert(res.data.message);
          }

          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Container>
        <div
          className="mt-5 d-flex flex-column align-items-center justify-content-center align-self-center mx-auto"
          style={{ maxWidth: "400px" }}
        >
          <FaLock className="text-primary fs-3 m-2" />
          <h2>회원가입</h2>
          <Form onSubmit={handleSubmit} className="mt-3">
            <Row>
              <Col xs={12} className="mb-3">
                <small className="form-text text-danger d-none">
                  필수 입력사항
                </small>
                <Form.Control
                  type="email"
                  id="user_id"
                  name="user_id"
                  placeholder="이메일"
                  autoFocus
                  required
                />
              </Col>
              <Col xs={6} className="mb-3">
                <small className="form-text text-danger d-none">
                  필수 입력사항
                </small>
                <Form.Control
                  type="password"
                  id="user_pw"
                  name="user_pw"
                  placeholder="비밀번호"
                  required
                />
              </Col>
              <Col xs={6} className="mb-3">
                <small className="form-text text-danger d-none">
                  필수 입력사항
                </small>
                <Form.Control
                  type="password"
                  id="user_pw2"
                  name="user_pw2"
                  placeholder="비밀번호 확인"
                  required
                />
              </Col>
              <Col xs={12} className="mb-3">
                <small className="form-text text-danger d-none">
                  필수 입력사항
                </small>
                <Form.Control
                  type="text"
                  id="user_name"
                  name="user_name"
                  placeholder="이름"
                  required
                />
              </Col>
              <Col xs={12} className="mb-3">
                <small className="form-text text-danger d-none">
                  필수 입력사항
                </small>
                <Form.Control
                  type="tel"
                  id="user_phone"
                  name="user_phone"
                  placeholder="휴대폰 번호"
                  value={phone}
                  onChange={handlePhone}
                  required
                />
              </Col>
            </Row>
            <Row className="align-items-center mt-3">
              <Col xs={6} md={4} className="mb-2">
                <Form.Control
                  type="text"
                  id="user_zipcode"
                  name="user_zipcode"
                  placeholder="우편번호"
                  value={zipcode}
                  readOnly
                  onClick={handlePostcode.clickButton}
                />
              </Col>
              <Col className="mb-2">
                <Button
                  type="button"
                  variant="primary"
                  onClick={handlePostcode.clickButton}
                >
                  주소찾기
                </Button>
              </Col>
              <Col xs={12} className="mb-2">
                <Form.Control
                  type="text"
                  id="user_address"
                  name="user_address"
                  placeholder="주소"
                  value={address}
                  readOnly
                  onClick={handlePostcode.clickButton}
                />
              </Col>
              <Col xs={12} className="mb-2">
                <Form.Control
                  type="text"
                  id="user_detail_address"
                  name="user_detail_address"
                  placeholder="상세주소"
                  value={detailAddress}
                  readOnly={isPostcodeClicked}
                  onChange={(e) => {
                    setDetailAddress(e.target.value);
                  }}
                  onClick={
                    !openPostcode && isPostcodeClicked
                      ? handlePostcode.clickButton
                      : null
                  }
                />
              </Col>
            </Row>
            <Button type="submit" variant="warning" className="w-100 mt-3 mb-2">
              회원가입
            </Button>
            <div className="text-end">
              <Link href="/member/login">이미 계정이 있어요.</Link>
            </div>
          </Form>
        </div>
      </Container>
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
    </>
  );
};

export default Join;
