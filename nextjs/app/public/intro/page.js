"use client";

import { Col, Container, Image, Row } from "react-bootstrap";

export default function Intro() {
  return (
    <Container>
      <Row spacing={4} sx={{ my: 4 }}>
        <Col xs={12} sm={6}>
          <p variant="h4" component="h1" gutterBottom>
            일렉트립, 전기차 대여 서비스
          </p>
          <p variant="body1" paragraph>
            일렉트립은 전기차 대여 서비스로, 친환경적이면서도 경제적입니다.
            전국적으로 전기차 충전기가 설치되어 있어 이용이 용이하며, 간편한
            예약과 결제 시스템으로 편리하게 이용할 수 있습니다.
          </p>
          <p variant="body1" paragraph>
            일렉트립은 안전성과 편리성을 중요시 하여 매일 정비하고 관리합니다.
            또한, 보험을 가입하여 안심하고 이용할 수 있습니다.
          </p>
        </Col>
        <Col xs={12} sm={6}>
          <Image
            src="/electric-car.jpg"
            alt="Electric Car"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Col>
      </Row>
    </Container>
  );
}