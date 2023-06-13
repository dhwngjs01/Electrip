export default function Guide() {
  return (
    <>
      <main>
        <section className="container mt-5">
          <h1 className="text-center mb-4">일렉트립 서비스 이용 안내</h1>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">1. 회원 가입 및 로그인</h5>
              <p className="card-text">
                일렉트립 전기차 대여 서비스를 이용하시려면 먼저 회원가입 후
                로그인해주십시오.
              </p>
            </div>
          </div>
          <div className="card my-3">
            <div className="card-body">
              <h5 className="card-title">2. 전기차 선택 및 예약하기</h5>
              <p className="card-text">
                대여를 희망하는 날짜와 시간을 선택한 후 전기차를 선택하여 예약해
                주십시오.
              </p>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">3. 전기차 찾아가기 및 대여하기</h5>
              <p className="card-text">
                지정된 장소에서 전기차를 찾아 대여해주십시오. 대여 시간에
                스마트폰 애플리케이션을 통해 차량을 열고, 전기차를 대여할 수
                있습니다.
              </p>
            </div>
          </div>
          <div className="card my-3">
            <div className="card-body">
              <h5 className="card-title">4. 전기차 반납하기</h5>
              <p className="card-text">
                사용한 전기차는 예약된 반납 시간에 지정된 장소에 반납해주십시오.
                이때, 차량 충전이 필요한 경우 반납 장소에서 충전을
                시작해주십시오.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-primary text-white text-center py-3 mt-5">
        <p className="mb-0">&copy; 2023 일렉트립. All Rights Reserved.</p>
      </footer>
    </>
  );
}
