"use client";

import "./globals.scss";
import "./page.scss";
import "swiper/swiper.min.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Mousewheel } from "swiper";
import MainVisual from "@/components/pages/main/MainVisual";
import MainIntro from "@/components/pages/main/MainIntro";

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
      style={{ height: "100vh" }}
    >
      <SwiperSlide>
        <MainVisual />
      </SwiperSlide>
      <SwiperSlide>
        <MainIntro />
      </SwiperSlide>
    </Swiper>
  );
}
