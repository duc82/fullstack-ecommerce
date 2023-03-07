import React, { memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import TitleHead from "./TitleHead";
import { Autoplay, Pagination } from "swiper";
import useSwiperSlide from "../../hooks/useSwiperSlide";
import Blog from "./Blog";

export interface Blogs {
  img: {
    src: string;
    alt: string;
  };
  date: string;
  title: string;
  comment: number;
  tag: string;
  href: string;
}

const blogs: Blogs[] = [];

for (let i = 0; i < 10; i++) {
  blogs.push({
    img: {
      src: `https://picsum.photos/600/375?random=${i}`,
      alt: "string",
    },
    date: "12 Thang 07 2021",
    title: "Top 3 may ep cham duoi 3 trieu dang mua",
    comment: 0,
    tag: "Blog",
    href: "/",
  });
}

const BlogLists = () => {
  const { isEndSlide, handleChangeSlide } = useSwiperSlide();

  return (
    <section className="mb-7 pb-5">
      <TitleHead value="Tin tức" url="tin-tuc" />
      <Swiper
        speed={250}
        slidesPerView={1}
        spaceBetween={16}
        pagination={{
          el: ".pagination-wrapper",
          clickable: true,
          renderBullet: (_index, className) =>
            '<span class="' + className + " blog" + '">' + "" + "</span>",
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          reverseDirection: isEndSlide,
        }}
        breakpoints={{
          600: {
            slidesPerView: 2,
          },
          992: {
            slidesPerView: 3,
          },
        }}
        modules={[Autoplay, Pagination]}
        className="mt-2.5 mb-7"
        onSlideChange={handleChangeSlide}
      >
        {blogs.map((blog, i) => (
          <SwiperSlide key={i}>
            <Blog {...blog} />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Pagination */}
      <div className="pagination-wrapper flex items-center justify-center space-x-2"></div>
    </section>
  );
};

export default memo(BlogLists);
