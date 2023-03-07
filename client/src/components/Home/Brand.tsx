import React, { memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import Container from "../Container/Container";
import TitleHead from "./TitleHead";
import { Link } from "react-router-dom";
import useSwiperSlide from "../../hooks/useSwiperSlide";

interface Brands {
  href: string;
  src: string;
  alt: string;
}

const brands: Brands[] = [];

for (let i = 0; i < 10; i++) {
  brands.push({
    src: `https://picsum.photos/200/100?random=${i}`,
    alt: "random",
    href: "/",
  });
}

const Brand = () => {
  const { isEndSlide, handleChangeSlide } = useSwiperSlide();

  return (
    <section>
      <TitleHead value={"Thương hiệu"} url={"thuong-hieu"} />
      <Swiper
        speed={250}
        slidesPerView={2}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          reverseDirection: isEndSlide,
        }}
        breakpoints={{
          600: {
            slidesPerView: 3,
          },
          992: {
            slidesPerView: 4,
          },
          1200: {
            slidesPerView: 6,
          },
        }}
        modules={[Autoplay]}
        className="border-l border-l-zinc-300 border-solid"
        onSlideChange={handleChangeSlide}
      >
        {brands.map((brand, i) => {
          return (
            <SwiperSlide key={i}>
              <Link
                to={brand.href}
                className="w-full flex justify-center items-center h-28 border boder-solid border-zinc-300 border-b-0 border-l-0 border-t-0"
              >
                <img src={brand.src} alt={brand.alt} loading="lazy" />
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default memo(Brand);
