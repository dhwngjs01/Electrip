import Link from "next/link";

export default function Intro() {
  return (
    <>
      <section
        className="bg-primary text-white text-center"
        style={{ padding: "4rem 0" }}
      >
        <div className="container text-center">
          <h1 className="display-4">
            환경을 생각하는 전기차 대여 서비스, 일렉트립
          </h1>
          <p className="lead">
            일렉트립을 통해 친환경 전기차를 대여하고, 더 나은 미래를 만들어가요.
          </p>
          <Link className="btn btn-outline-light" href="/public/reserve">
            지금 예약하기
          </Link>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h3>편리한 예약</h3>
              <p className="word-keep-all">
                언제 어디서든 쉽게 예약할 수 있도록 24/7 고객센터를 운영하고
                있습니다.
              </p>
            </div>
            <div className="col-md-4">
              <h3>다양한 차종 보유</h3>
              <p className="word-keep-all">
                소형 전기차부터 SUV까지 다양한 전기차를 보유하여 고객의 필요에
                맞는 차량을 선택할 수 있습니다.
              </p>
            </div>
            <div className="col-md-4">
              <h3>신속한 충전 서비스</h3>
              <p className="word-keep-all">
                전국 곳곳에 전기차 충전소를 설치하여, 고객들이 빠르게 충전할 수
                있도록 지원합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <h2>전기차 대여 서비스란?</h2>
              <p className="word-keep-all">
                전기차 대여 서비스는 고객이 원하는 시간에 전기차를 대여해 이용할
                수 있도록 도움을 주는 서비스입니다.
              </p>
              <p className="word-keep-all">
                고객은 간편한 앱을 통해 시간과 장소를 선택하고 예약할 수 있으며,
                전기차 충전 네트워크를 이용하여 이동 중에도 충전이 가능합니다.
              </p>
            </div>
            <div className="col-lg-6">
              <h2>일렉트립 이용안내</h2>
              <ol className="lh-lg mb-0">
                <li>
                  회원가입 후 로그인하여 예약 페이지에서 차량을 선택합니다.
                </li>
                <li>이용일자, 시간, 장소를 입력한 후 결제를 진행합니다.</li>
                <li>
                  예약이 완료되면 픽업 장소에서 차량을 수령하실 수 있습니다.
                </li>
                <li>차량 반납 시 반납 장소에서 차량을 건네주시면 됩니다.</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="container mt-5">
        <h2 className="text-center mb-4">이용 가능한 전기차 모델</h2>
        <div className="row">
          <div className="col-lg-4">
            <div className="card h-100">
              <div
                className="card-img"
                style={{
                  height: "250px",
                  position: "relative",
                }}
              >
                <img
                  src="/images/cars/g80ev.png"
                  alt="제네시스 G80 EV"
                  className="card-img-top position-absolute top-50 start-50 translate-middle px-3"
                />
              </div>

              <div className="card-body">
                <h3 className="card-title">Genesis G80 EV</h3>
                <div className="card-text">
                  <p className="word-keep-all">
                    현대자동차의 프리미엄 브랜드 제네시스에서 출시한 최초의 전기
                    차량입니다.
                  </p>
                  <p className="word-keep-all">
                    G80 EV는 기존의 G80 세단 모델을 기반으로 충전식 전기차로
                    개발되었으며, 완전 전기차로서 세련된 디자인과 높은 성능, 긴
                    주행 거리를 자랑합니다.
                  </p>
                  <p className="word-keep-all">
                    G80 EV는 탄소세와 대기오염 문제에 대한 대안이 되기 위해 전
                    세계적으로 급부상하는 전기 차량 시장에 참여하는 제네시스의
                    첫 단추로, 이미 많은 차주들로부터 높은 관심을 받고 있습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card h-100">
              <div
                className="card-img"
                style={{
                  height: "250px",
                  position: "relative",
                }}
              >
                <img
                  src="/images/cars/taycan.png"
                  alt="포르쉐 타이칸"
                  className="card-img-top position-absolute top-50 start-50 translate-middle px-3"
                />
              </div>
              <div className="card-body">
                <h3 className="card-title">Porsche Taycan</h3>
                <div className="card-text">
                  <p className="word-keep-all">
                    독일의 프리미엄 자동차 메이커 포르쉐의 첫 전기 승용차
                    모델입니다.
                  </p>
                  <p className="word-keep-all">
                    2019년 처음 공개된 이래로 전 세계 전기차 시장에서 높은
                    관심을 받고 있으며, 그 성능과 디자인은 기존 전기차에 대한
                    전반적인 인식을 바꾸는 계기가 되었습니다.
                  </p>
                  <p className="word-keep-all">
                    타이칸은 스포츠카 퍼포먼스와 지속 가능한 이동 수단 사이의
                    이상적인 조합을 찾기 위해 탄생한 차로, 전기차의 한계를
                    뛰어넘어 탁월한 주행 성능과 차별화 된 스타일을 자랑합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card h-100">
              <div
                className="card-img"
                style={{
                  height: "250px",
                  position: "relative",
                }}
              >
                <img
                  src="/images/cars/models.png"
                  alt="테슬라 모델S"
                  className="card-img-top position-absolute top-50 start-50 translate-middle px-3"
                />
              </div>

              <div className="card-body">
                <h3 className="card-title">Tesla Model S</h3>
                <div className="card-text">
                  <p className="word-keep-all">
                    미국의 전기 자동차 회사인 테슬라에서 생산하는 고성능 완전
                    전기 차량입니다.
                  </p>
                  <p className="word-keep-all">
                    2012년 첫 출시 이후로 전 세계 전기차 시장에서 지속적으로
                    선도하고 있으며, 최첨단 기술, 빠른 속도, 그리고 친환경적인
                    면모를 갖춘 명실상부한 대표 전기차로 인정받고 있습니다.
                  </p>
                  <p className="word-keep-all">
                    이 차량은 테슬라의 창업자인 일론 머스크의 혁신적인 전기차
                    개발 전략을 통해 글로벌 친환경 차량 시장을 선도하고 있는
                    상징적인 차량입니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-white text-center py-3 mt-5">
        <p className="mb-0">&copy; 2023 일렉트립. All Rights Reserved.</p>
      </footer>
    </>
  );
}
