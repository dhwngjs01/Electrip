import React, { useState } from "react";
import "./Reserve.css";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";

import ElectricCar from "../../assets/svg/ElectricCar";
import KakaoMap from "../../components/KakaoMap";

// 예약 정보
const ReserveInfo = () => {
  return (
    <Grid
      sm={4}
      sx={{
        maxHeight: "inherit",
        backgroundColor: "primary.main",
        position: "relative",
      }}
    >
      <Box p={3}>
        <Typography
          variant="h6"
          sx={{
            color: "primary.contrastText",
            borderBottom: "1px solid #e0e0e0",
            pb: 1,
            mb: 2,
          }}
        >
          <LocationOnIcon
            sx={{
              verticalAlign: "middle",
              fontSize: "2rem",
              pr: 1,
            }}
          />
          차량 대여 장소
        </Typography>
        <Typography
          className="reserve-zone-text"
          sx={{
            color: "primary.contrastText",
            mb: 4,
          }}
        >
          장소를 먼저 선택해주세요.
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "primary.contrastText",
            borderBottom: "1px solid #e0e0e0",
            pb: 1,
            mb: 2,
          }}
        >
          <ElectricCar
            sx={{
              verticalAlign: "middle",
              fontSize: "2.5rem",
              pr: 1,
            }}
          />
          차량 선택
        </Typography>
        <Typography
          className="reserve-car-text"
          sx={{
            color: "primary.contrastText",
          }}
        >
          차량을 선택해주세요.
        </Typography>
      </Box>
      <Button
        fullWidth
        variant="contained"
        size="large"
        sx={{
          fontSize: "1.2rem",
          backgroundColor: "#333",
          color: "#fff",
          "&:hover": { backgroundColor: "#111", color: "#fff" },
          borderRadius: 0,
          position: "absolute",
          left: 0,
          bottom: 0,
        }}
      >
        다음
      </Button>
    </Grid>
  );
};

// 예약할 수 있는 차량 목록
const ReserveCarList = ({ carList }) => {
  return (
    <Grid
      sm={8}
      sx={{
        maxHeight: "inherit",
        "& > .scrollbar": {
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            width: 10,
            WebkitAppearance: "none",
          },
          "&::-webkit-scrollbar-thumb": {
            borderRadius: 5,
            backgroundColor: "rgba(0 0 0 / 0.5)",
          },
        },
      }}
    >
      <Box
        className="scrollbar"
        sx={{
          boxSizing: "border-box",
          p: 2,
          maxHeight: "inherit",
        }}
      >
        <Grid container spacing={2}>
          {carList.map((car) => (
            <Grid
              key={car.car_no}
              sm={6}
              sx={{
                pb: 1,
              }}
            >
              <Card elevation={3}>
                <CardActionArea>
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    p={3}
                    sx={{
                      height: "200px",
                      transition: "background-color 0.3s",
                      "&:hover": {
                        backgroundColor: "warning.main",
                      },
                      "&:hover .MuiTypography-root": {
                        color: "warning.contrastText",
                      },
                    }}
                  >
                    <Grid sm={6}>
                      <Box
                        component="img"
                        src={car.car_original_image}
                        title={car.car_name}
                        alt={car.car_name}
                        sx={{
                          maxWidth: "100%",
                        }}
                      />
                    </Grid>
                    <Grid
                      sm={6}
                      sx={{
                        textAlign: "right",
                      }}
                    >
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        style={{ wordBreak: "keep-all" }}
                      >
                        {car.car_name}
                      </Typography>
                      <Typography
                        variant="h5"
                        color="primary.main"
                        fontWeight="bold"
                      >
                        {car.car_price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        원
                      </Typography>
                      <Typography variant="h6">{car.car_seat}인승</Typography>
                    </Grid>
                  </Grid>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Grid>
  );
};

const Reserve = () => {
  const [address, setAddress] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);

  const zoneList = [
    {
      zone_no: 1,
      zone_zipcode: 22207,
      zone_address: "인천광역시 미추홀구 경인남길30번길 61-3",
      zone_detail_address: "",
      zone_charger: true,
      zone_la: 126.65774040338422,
      zone_ma: 37.451668691208354,
      zone_activate: true,
    },
    {
      zone_no: 2,
      zone_zipcode: 22211,
      zone_address: "인천광역시 미추홀구 한나루로463번길 109-1",
      zone_detail_address: "현대빌라 2동",
      zone_charger: true,
      zone_la: 126.66151601732115,
      zone_ma: 37.44896752616176,
      zone_activate: true,
    },
    {
      zone_no: 3,
      zone_zipcode: 22183,
      zone_address: "인천광역시 미추홀구 독배로382번길 47-18",
      zone_detail_address: "",
      zone_charger: true,
      zone_la: 126.65140488753036,
      zone_ma: 37.45309178828906,
      zone_activate: true,
    },
    {
      zone_no: 4,
      zone_zipcode: 22207,
      zone_address: "인천광역시 미추홀구 경인남길 64-1",
      zone_detail_address: "",
      zone_charger: true,
      zone_la: 126.65679620563483,
      zone_ma: 37.45301746679596,
      zone_activate: true,
    },
    {
      zone_no: 5,
      zone_zipcode: 22182,
      zone_address: "인천광역시 미추홀구 비룡길23번길 42-61",
      zone_detail_address: "",
      zone_charger: true,
      zone_la: 126.65604509610475,
      zone_ma: 37.45415055446024,
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

  return (
    <Container maxWidth="lg">
      <Grid container py={10}>
        <Grid sm={12}>
          <KakaoMap zoneList={zoneList} />
        </Grid>
        <Grid
          className="reserveCarSelectLayout"
          sm={12}
          mt={10}
          sx={{
            visibility: "hidden",
            opacity: 0,
          }}
        >
          <Paper elevation={4}>
            <Grid container maxHeight="620px">
              <ReserveInfo />
              <ReserveCarList carList={carList} />
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Reserve;
