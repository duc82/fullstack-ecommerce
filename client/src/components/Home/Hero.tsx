import React, { useState, memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import slideImg1 from "../../assets/slide_img_1.webp";
import slideImg3 from "../../assets/slide_img_3.webp";
import bannerSlideImg1 from "../../assets/banner_slide_img_1.webp";
import bannerSlideImg2 from "../../assets/banner_slide_img_2.webp";
import bannerSlideImg3 from "../../assets/banner_slide_img_3.webp";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "../../icons/icons";
import { motion } from "framer-motion";
import { bannerVariants } from "../../data/variants";

const BannerImgs = [
  {
    url: "/noi-chien-nuong-khong-dau-magic-eco-ac-120",
    src: bannerSlideImg1,
    alt: "Banner img",
  },
  {
    url: "/may-ep-toc-do-cham-magic-eco-ac-130",
    src: bannerSlideImg2,
    alt: "Banner img",
  },
  {
    url: "/may-loc-khong-khi-magic-eco-ac-300",
    src: bannerSlideImg3,
    alt: "Banner img",
  },
];

const Hero = () => {
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);

  return (
    <section className="mt-7 lg:mt-2.5 mb-7 grid grid-cols-3 lg:grid-cols-slide2 gap-y-7 lg:gap-2.5">
      <Swiper
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={{
          prevEl,
          nextEl,
        }}
        loop
        modules={[Pagination, Navigation, Autoplay]}
        className="col-span-3 lg:col-span-1 w-full lg:row-span-3"
      >
        <button
          className="p-2 rounded-full bg-black/30 text-white hover:bg-red-600 absolute top-1/2 left-0 -translate-y-1/2 z-50"
          ref={(node) => setPrevEl(node)}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          className="p-2 rounded-full bg-black/30 text-white hover:bg-red-600 absolute top-1/2 right-0 -translate-y-1/2 z-50"
          ref={(node) => setNextEl(node)}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
        <SwiperSlide>
          <Link to="/may-xay-va-may-ep">
            <img src={slideImg1} alt="Img Slide" loading="lazy" />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/gia-dung-khac">
            <img src={slideImg3} alt="Img Slide" loading="lazy" />
          </Link>
        </SwiperSlide>
      </Swiper>

      {BannerImgs.map((banner, i) => (
        <Link key={i} className="relative" to={banner.url}>
          <motion.div
            initial="closed"
            whileHover="open"
            className="w-full h-full absolute inset-0"
          >
            <motion.div
              variants={bannerVariants}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="h-full w-full absolute inset-0 bg-black/50 bg-rhombus bg-no-repeat bg-scroll bg-center z-10"
            ></motion.div>
          </motion.div>
          <img className="h-full" src={banner.src} alt={banner.alt} />
        </Link>
      ))}
    </section>
  );
};

export default memo(Hero);
