# 🚘 Electrip

Next.js + Express.js Restful API를 이용한 전기 자동차 대여 사이트

## 📖 프로젝트 소개

<a href="https://www.greencar.co.kr/index" title="그린카로 이동하기" target="_blank">그린카</a>, <a href="https://www.lotterentacar.net/hp/kor/main/index.do" title="롯데렌터카로 이동하기" target="_blank">롯데렌터카</a>를 참고하여 만든 전기 자동차 대여 사이트입니다.

## ⏰ 개발 기간

- 23.03.15일 - 23.06.14일

## ⚙ 개발 환경

- **JavaScript Runtime** : `Node.js 20.9.0 이상`
- **Frontend** : `Next.js 16.3.3`
- **Backend** : `Express.js 5.2.1`
- **Text Editor** : `Visual Studio Code 1.79.2`
- **Database** : `PostgreSQL 15.2`

## 보안 환경 설정

- `JWT_SECRET`: NextAuth 세션 전용으로 32자 이상의 임의 값을 설정합니다.
- `API_JWT_SECRET`: Next.js와 Express API에 동일한 별도 32자 이상의 임의 값을 설정합니다.
- `FRONTEND_ORIGINS`: Express API 호출을 허용할 Origin을 쉼표로 구분합니다. 예: `https://electrip.example.com,https://admin.electrip.example.com`
- `NEXT_PUBLIC_API_URL`: 브라우저에서 접근 가능한 Express API의 기본 URL을 설정합니다.
- `RESERVATION_TIME_ZONE`: 예약 시간을 해석할 IANA 시간대를 설정합니다. 기본값은 `Asia/Seoul`입니다.
- `TRUST_PROXY`: Express 앞에 신뢰할 수 있는 프록시가 있을 때만 정확한 홉 수 또는 CIDR을 설정합니다.
- `RATE_LIMIT_CLIENT_IP_HEADER`: Next.js 앞단의 신뢰 프록시가 덮어쓰는 단일 IP 헤더 이름을 설정합니다. 설정하지 않으면 직접 연결의 소켓 주소를 사용하며, 일반 `X-Forwarded-For`는 신뢰하지 않습니다.

일반 로그인 비밀번호는 bcrypt 해시만 허용합니다. 배포 전에 `sql/20230613.sql`의 `citext`, 고유 이메일, 예약 제약 및 `auth_rate_limit` 스키마를 반영하고, 기존 이메일을 소문자로 정규화·중복 제거한 뒤 평문 비밀번호 계정의 비밀번호를 재설정해야 합니다.

## 📋 시스템 구성도

|                                             사용자 구성도                                              |                                             관리자 구성도                                              |
| :----------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/dhwngjs01/Electrip/assets/38345593/4d3897dc-def1-4227-ba0d-0b06459ee647"> | <img src="https://github.com/dhwngjs01/Electrip/assets/38345593/faa44a3b-b73e-4720-8c53-e27eafac8002"> |

## ⌨ E-R 다이어그램

<p align="center">
  <img src="https://github.com/dhwngjs01/Electrip/assets/38345593/f01347c5-16bd-4626-ab03-8db0e77223bd" width="80%">
</p>

## 🔍 기능 설명

#### 메인 페이지

- 배경 비디오
- 풀 페이지 스크롤 애니메이션 (`Swiper`)

#### 로그인

- 로그인 시 쿠키(Cookie) 및 세션(Session) 생성
- 네이버, 카카오 소셜 로그인 (`NextAuth.js`)

#### 회원가입

- 이메일 중복 검증
- 필수 입력 항목 검증
- 휴대폰 번호 양식 검증
- Daum 우편번호 서비스 연동

#### 바로예약

- 현재 위치 조회 (`Geolocation API`)
- 주소 검색, 이미지 마커, 커스텀 오버레이 (`Kakao 지도 API 연동`)
- 대여 장소 선택
- 날짜, 시간 선택
- 차량 선택
- 결제 페이지
- 대여 예약 완료

#### 예약조회

- 대여 상태 조회 (예약중, 대여중, 대여기간 초과, 대여종료)

#### 관리자 페이지

- 대시보드
- 회원관리 (회원 비활성화)
- 차량관리 (추가, 수정, 삭제, 비활성화, Kakao 지도 API)
- 장소관리 (추가, 수정, 삭제, 비활성화, Kakao 지도 API)
- 대여관리 (대여 현황 조회)
- 통계 (`Chart.js`)

## 🖥 스크린샷

### 메인페이지 상단

<img alt="메인페이지 상단" src="https://github.com/dhwngjs01/Electrip/assets/38345593/50a39a73-0c9f-41ed-98ce-1b70754870ef">

<hr>

### 메인페이지 하단

<img alt="메인페이지 하단" src="https://github.com/dhwngjs01/Electrip/assets/38345593/251ff019-bac3-4fe4-a525-a30a9b05d2ce">

<hr>

### 일렉트립 소개

<img alt="일렉트립 소개" src="https://github.com/dhwngjs01/Electrip/assets/38345593/5b9ea907-fc7c-4e9b-9bd1-647fc8f10ee9">

<hr>

### 바로예약 - 날짜선택

<img alt="바로예약 - 날짜선택" src="https://github.com/dhwngjs01/Electrip/assets/38345593/35c9f97e-2b16-40a7-aaf6-565e84b92882">

<hr>

### 바로예약 - 차량선택

<img alt="바로예약 - 차량선택" src="https://github.com/dhwngjs01/Electrip/assets/38345593/9e4722d4-98a6-424c-9753-59bb1f138f6a">

<hr>

### 바로예약 - 예약내역

<img alt="바로예약 - 예약내역" src="https://github.com/dhwngjs01/Electrip/assets/38345593/7412f8a9-5b2f-45b8-8744-dc52f8a3a34d">

<hr>

### 예약조회

<img alt="예약조회" src="https://github.com/dhwngjs01/Electrip/assets/38345593/4ea5a673-1c3d-4482-aac2-e1158dd10464">

<hr>

### 대시보드

<img alt="대시보드" src="https://github.com/dhwngjs01/Electrip/assets/38345593/b3f5a2f9-c343-4106-bf62-ff0dcccc5073">

<hr>

### 회원관리

<img alt="회원관리" src="https://github.com/dhwngjs01/Electrip/assets/38345593/1bf9abf4-0e5c-4689-815d-b5398de5c0b3">

<hr>

### 차량관리

<img alt="차량관리" src="https://github.com/dhwngjs01/Electrip/assets/38345593/96d5f51d-5f77-4f4e-8984-81e6904ca563">

<hr>

### 차량관리 - 차량추가

<img alt="차량관리 - 차량추가" src="https://github.com/dhwngjs01/Electrip/assets/38345593/b0e0156d-76b7-438f-a99d-6851e8668af1">

<hr>

### 차량관리 - 차량수정

<img alt="차량관리 - 차량수정" src="https://github.com/dhwngjs01/Electrip/assets/38345593/2ad93818-895c-4755-b049-000fd1f12a6b">

<hr>

### 장소관리

<img alt="장소관리" src="https://github.com/dhwngjs01/Electrip/assets/38345593/a5b6765a-cc30-4c9b-a2b5-f39ac899a2ab">

<hr>

### 장소관리 - 장소추가

<img alt="장소관리 - 장소추가" src="https://github.com/dhwngjs01/Electrip/assets/38345593/ca6aacc6-5627-485e-a7c3-2aee1371be9b">

<hr>

### 대여관리

<img alt="대여관리" src="https://github.com/dhwngjs01/Electrip/assets/38345593/e96b80f2-dd95-4b1f-bf16-efccde758643">

<hr>

### 통계

<img alt="통계" src="https://github.com/dhwngjs01/Electrip/assets/38345593/d56ef4cc-aec9-4a1c-b54d-65f8c8be77bd">
