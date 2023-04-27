"use client";

import "./reserve_page.scss";

import { useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";

import axios from "axios";

import ReserveMap from "/components/ReserveMap";
import ReserveInfo from "/components/ReserveInfo";
import ReserveCarList from "/components/ReserveCarList";

// 예약 정보

export default function Reserve() {
  const [address, setAddress] = useState("인천광역시 미추홀구 인하로 100");
  const [searchKeyword, setSearchKeyword] =
    useState("인천광역시 미추홀구 인하로 100");
  const [reserveZone, setReserveZone] = useState("장소를 먼저 선택해주세요.");
  const [selectedCarName, setSelectedCarName] =
    useState("차량을 선택해주세요.");
  const [selectedCarNo, setSelectedCarNo] = useState(null);

  const [showReserveCarSelectLayout, setShowReserveCarSelectLayout] =
    useState(false);
  const [showReserveDateSelectLayout, setReserveDateSelectLayout] =
    useState(false);

  const zoneList = [
    {
      zone_no: 1,
      zone_zipcode: 22207,
      zone_address: "인천광역시 미추홀구 경인남길30번길 61-3",
      zone_detail_address: "",
      zone_charger: true,
      zone_lat: 37.451668691208354,
      zone_lng: 126.65774040338422,
      zone_activate: true,
    },
    {
      zone_no: 2,
      zone_zipcode: 22211,
      zone_address: "인천광역시 미추홀구 한나루로463번길 109-1",
      zone_detail_address: "현대빌라 2동",
      zone_charger: true,
      zone_lat: 37.44896752616176,
      zone_lng: 126.66151601732115,
      zone_activate: true,
    },
    {
      zone_no: 3,
      zone_zipcode: 22183,
      zone_address: "인천광역시 미추홀구 독배로382번길 47-18",
      zone_detail_address: "",
      zone_charger: true,
      zone_lat: 37.45309178828906,
      zone_lng: 126.65140488753036,
      zone_activate: true,
    },
    {
      zone_no: 4,
      zone_zipcode: 22207,
      zone_address: "인천광역시 미추홀구 경인남길 64-1",
      zone_detail_address: "",
      zone_charger: true,
      zone_lat: 37.45301746679596,
      zone_lng: 126.65679620563483,
      zone_activate: true,
    },
    {
      zone_no: 5,
      zone_zipcode: 22182,
      zone_address: "인천광역시 미추홀구 비룡길23번길 42-61",
      zone_detail_address: "",
      zone_charger: true,
      zone_lat: 37.45415055446024,
      zone_lng: 126.65604509610475,
      zone_activate: true,
    },
  ];
  const carList = [
    {
      car_no: 1,
      car_name: "아이오닉 6",
      car_seat: 4,
      car_price: 70000,
      car_original_image: "/resources/images/cars/ionic6.png",
    },
    {
      car_no: 2,
      car_name: "아이오닉 일렉트릭",
      car_seat: 4,
      car_price: 70000,
      car_original_image: "/resources/images/cars/ionicelectric.png",
    },
    {
      car_no: 3,
      car_name: "모델 S",
      car_seat: 4,
      car_price: 100000,
      car_original_image: "/resources/images/cars/models.png",
    },
    {
      car_no: 4,
      car_name: "포터2 EV",
      car_seat: 2,
      car_price: 70000,
      car_original_image: "/resources/images/cars/porter2ev.png",
    },
    {
      car_no: 5,
      car_name: "볼트 EV",
      car_seat: 4,
      car_price: 55000,
      car_original_image: "/resources/images/cars/voltev.png",
    },
    {
      car_no: 6,
      car_name: "타이칸",
      car_seat: 4,
      car_price: 200000,
      car_original_image: "/resources/images/cars/taycan.png",
    },
    {
      car_no: 7,
      car_name: "코나 일렉트릭",
      car_seat: 4,
      car_price: 70000,
      car_original_image: "/resources/images/cars/konaelectric.png",
    },
    {
      car_no: 8,
      car_name: "E-트론",
      car_seat: 4,
      car_price: 90000,
      car_original_image: "/resources/images/cars/etron.png",
    },
    {
      car_no: 9,
      car_name: "EV 6 GT",
      car_seat: 4,
      car_price: 90000,
      car_original_image: "/resources/images/cars/ev6gt.png",
    },
    {
      car_no: 10,
      car_name: "G80 EV",
      car_seat: 4,
      car_price: 90000,
      car_original_image: "/resources/images/cars/g80ev.png",
    },
  ];

  /* axios
    .request({
      method: "GET",
      url: "http://localhost:8000/api/user",
    })
    .then((res) => {
      console.log(res.data);
    }); */

  return (
    <Container maxWidth="lg">
      <Grid container py={10}>
        <Grid sm={12}>
          <ReserveMap
            zoneList={zoneList}
            address={address}
            setAddress={setAddress}
            setReserveZone={setReserveZone}
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
            setShowReserveCarSelectLayout={setShowReserveCarSelectLayout}
          />
        </Grid>
        <Grid
          className={
            showReserveCarSelectLayout
              ? "show-select-car-layout reserve-car-select-layout"
              : "hide-select-car-layout reserve-car-select-layout"
          }
          sm={12}
          mt={10}
        >
          <Paper elevation={4}>
            <Grid container maxHeight="620px">
              <ReserveInfo
                reserveZone={reserveZone}
                selectedCarName={selectedCarName}
              />
              <ReserveCarList
                carList={carList}
                selectedCarNo={selectedCarNo}
                setSelectedCarNo={setSelectedCarNo}
                setSelectedCarName={setSelectedCarName}
              />
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
