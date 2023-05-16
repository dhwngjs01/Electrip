"use client";

import { signIn } from "next-auth/react";
import { FaLock, FaSmileBeam } from "react-icons/fa";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";

const Login = () => {
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res.error) {
      alert("아이디와 비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <Container>
      <div
        className="mt-5 d-flex flex-column align-items-center justify-content-center align-self-center mx-auto"
        style={{ maxWidth: "400px" }}
      >
        <FaLock className="text-primary fs-3 m-2" />
        <h2>로그인</h2>
        <Form onSubmit={handleLoginSubmit} className="w-100 mt-3">
          <Form.Control
            id="user_id"
            type="email"
            name="email"
            placeholder="아이디"
            required
            autoFocus
            size="lg"
            className="w-100 mb-2"
          />
          <Form.Control
            id="user_pw"
            type="password"
            name="password"
            placeholder="비밀번호"
            required
            size="lg"
            className="w-100"
          />
          <Button type="submit" className="w-100 mt-3 mb-2" variant="primary">
            로그인
          </Button>
          <Button
            href="/member/join"
            className="w-100 text-black border-0"
            variant="warning"
          >
            회원가입
          </Button>
        </Form>
        <Row className="mt-4">
          <Col>
            <Button variant="link" onClick={() => signIn("naver")}>
              <Image src="/images/naver_icon.png" />
            </Button>
          </Col>
          <Col>
            <Button variant="link" onClick={() => signIn("kakao")}>
              <Image src="/images/kakao_icon.png" />
            </Button>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Login;
