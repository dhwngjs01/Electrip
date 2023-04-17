import { React } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import TelegramIcon from "@mui/icons-material/Telegram";

function Main() {
  return (
    <Swiper
      modules={[Mousewheel]}
      direction={"vertical"}
      speed={500}
      mousewheel={true}
      touchReleaseOnEdges={true}
      style={{
        height: "100vh",
        marginTop: "-110px",
      }}
    >
      <SwiperSlide>
        <video
          src="./resources/mainVisual/mainVisual.mp4"
          className="mainVisual"
          autoPlay
          loop
          muted
          poster="./resources/mainVisual/mainVisual.png"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100vw",
            height: "100vh",
            objectFit: "cover",
          }}
        />
      </SwiperSlide>
      <SwiperSlide style={{ overflow: "hidden" }}>
        <Box
          component="img"
          src="./resources/images/main_section_bg.jpeg"
          sx={{
            zIndex: -1,
            position: "absolute",
            left: "0",
            top: "0",
            width: "100%",
            height: "100%",
            transform: "translate(0, -20%)",
            objectFit: "cover",
          }}
        />

        <Box
          sx={{
            zIndex: -1,
            position: "absolute",
            left: 0,
            top: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        />
        <Container style={{ height: "60%" }}>
          <Grid
            container
            sx={{
              direction: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
              height: "100%",
              pb: 12,
            }}
          >
            <Grid md={8}>
              <Box
                sx={{
                  borderLeft: 1,
                  pl: 4,
                  color: "#fff",
                }}
              >
                <Typography variant="h3">내 주위 가까운</Typography>
                <Typography variant="h3" mt={3}>
                  일렉존에서 어느 곳이든
                </Typography>
              </Box>
            </Grid>
            <Grid md={4}>
              <Box
                component="img"
                src="./resources/images/car.png"
                sx={{ width: "100%", maxWidth: "380px", display: "block" }}
              ></Box>
            </Grid>
          </Grid>
        </Container>
        <Box
          sx={{
            display: "flex",
            backgroundColor: "#0087e2",
          }}
        >
          <Container py={2} style={{ height: "40vh" }}>
            <Grid
              container
              sx={{
                height: "100%",
                direction: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Grid md={5}>
                <Box
                  sx={{
                    py: 3,
                    display: { sm: "none", md: "flex" },
                  }}
                >
                  <Box
                    component="img"
                    src="./resources/images/main_section_map.png"
                    sx={{
                      width: "100%",
                      maxWidth: "400px",
                      display: "block",
                    }}
                  />
                </Box>
              </Grid>
              <Grid
                md={7}
                sx={{
                  py: 5,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: "#fff",
                    textAlign: "right",
                  }}
                >
                  차를 빌리고 반납하기 위해 먼 곳까지 찾아가셨나요?
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: "#fff",
                    textAlign: "right",
                    pt: 1,
                  }}
                >
                  일렉트립은 회사, 집, 학교, 내 주위 가까운 곳 어디에나
                  있습니다.
                </Typography>
                <Box
                  sx={{
                    textAlign: "right",
                    pt: 3,
                  }}
                >
                  <Button
                    href="/public/reserve"
                    color="warning"
                    variant="contained"
                    size="large"
                    endIcon={<TelegramIcon />}
                    sx={{
                      fontSize: "1.1rem",
                    }}
                  >
                    지금 예약하러 가기
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </SwiperSlide>
    </Swiper>
  );
}
export default Main;
