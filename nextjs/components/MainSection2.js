import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaTelegramPlane } from "react-icons/fa/";
import { Image } from "react-bootstrap";

export default function MainSection2() {
  return (
    <>
      <Image
        src="./images/main_section_bg.jpeg"
        className="position-absolute left-0 top-0 w-100 h-100"
        style={{
          zIndex: -1,
          transform: "translate(0, -20%)",
          objectFit: "cover",
        }}
      />

      <div
        className="position-absolute left-0 top-0 w-100 h-100"
        style={{
          zIndex: -1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      />
      <Container style={{ height: "60%" }}>
        <Row
          className="align-items-end justify-content-between h-100"
          style={{ paddingBottom: "4rem" }}
        >
          <Col md={8}>
            <div
              className="border-start ps-4"
              style={{
                color: "#fff",
              }}
            >
              <h3 style={{ fontSize: "3rem" }}>내 주위 가까운</h3>
              <h3 className="mt-3" style={{ fontSize: "3rem" }}>
                일렉존에서 어느 곳이든
              </h3>
            </div>
          </Col>
          <Col md={4}>
            <Image
              src="./images/car.png"
              className="w-100 d-block"
              style={{ maxWidth: "380px" }}
            />
          </Col>
        </Row>
      </Container>
      <div
        className="d-flex"
        style={{
          backgroundColor: "#0087e2",
        }}
      >
        <Container style={{ height: "40vh" }}>
          <Row className="align-items-center justify-content-between h-100">
            <Col md={5}>
              <Image
                src="./images/main_section_map.png"
                className="w-100 d-block py-3"
                style={{
                  maxWidth: "400px",
                }}
              />
            </Col>
            <Col
              md={7}
              style={{
                py: 5,
              }}
            >
              <h5 className="text-white text-end">
                차를 빌리고 반납하기 위해 먼 곳까지 찾아가셨나요?
              </h5>
              <h5 className="text-white text-end pt-1">
                일렉트립은 회사, 집, 학교, 내 주위 가까운 곳 어디에나 있습니다.
              </h5>
              <div className="text-end pt-3">
                <Button href="/public/reserve" variant="warning">
                  지금 예약하러 가기 <FaTelegramPlane />
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
