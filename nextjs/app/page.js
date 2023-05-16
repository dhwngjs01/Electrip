"use client";

import "./globals.scss";
import "./page.scss";
import "swiper/swiper.min.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Mousewheel } from "swiper";
import MainSection1 from "@/components/MainSection1";
import MainSection2 from "@/components/MainSection2";

export default function Main() {
  return (
    <Swiper
      className="swiper-parent"
      modules={[Mousewheel, Keyboard]}
      direction={"vertical"}
      speed={500}
      mousewheel={true}
      keyboard={true}
      touchReleaseOnEdges={true}
      style={{
        height: "100vh",
      }}
    >
      <SwiperSlide>
        <MainSection1 />
      </SwiperSlide>
      <SwiperSlide style={{ overflow: "hidden" }}>
        <MainSection2 />
      </SwiperSlide>
    </Swiper>
  );
}
