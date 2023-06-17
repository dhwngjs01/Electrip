# 🚘 Electrip
Next.js + Express.js Restful API를 이용한 전기 자동차 대여 사이트

## 📖 프로젝트 소개
그린카, 롯데 렌터카를 참고하여 만든 전기 자동차 대여 사이트입니다.

## ⏰ 개발 기간
* 23.03.15일 - 23.06.14일

## ⚙ 개발 환경
- **JavaScript Runtime** : `Node.js 19.8.1`
- **Frontend** : `Next.js 13.2.4`
- **Backend** : `Express.js 4.16.1`
- **IDE** : `Visual Studio Code 1.79.2`
- **Database** : `PostgreSQL 15.2`

## 📋 시스템 구성도
사용자 구성도 | 관리자 구성도
:---:|:---:
<img src="https://github.com/dhwngjs01/Electrip/assets/38345593/b8653f3d-e2b2-4955-9c3f-e49793b03464"> | <img src="https://github.com/dhwngjs01/Electrip/assets/38345593/9faf1e0e-1c0a-4787-87a1-9da5b83591a9">

## ⌨ E-R 다이어그램
<p align="center">
  <img src="https://github.com/dhwngjs01/Electrip/assets/38345593/ff3f84f3-d926-4f77-b1e7-7eeb18beb725" width="70%">
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
<img src="https://github.com/dhwngjs01/Electrip/assets/38345593/1715b7da-9f8c-4d63-8f70-0eb1c6be4c72">
