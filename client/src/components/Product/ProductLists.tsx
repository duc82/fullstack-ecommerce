import React, { memo } from "react";
import TitleHead from "../Home/TitleHead";
import ProductCard from "./ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";
import useSwiperSlide from "../../hooks/useSwiperSlide";
import { ProductState } from "../../redux/reducers/productSlice";
import SkeletonProductCard from "../Skeleton/SkeletonProductCard";

type ProductListsProps = {
  titleHeadValue: string;
  titleHeadUrl: string;
  products: ProductState[];
}

const ProductLists = ({
  titleHeadValue,
  titleHeadUrl,
  products,
}: ProductListsProps) => {
  const { handleChangeSlide, isEndSlide } = useSwiperSlide();

  return (
    <section className="mb-7">
      <TitleHead value={titleHeadValue} url={titleHeadUrl} />

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
            slidesPerView: 5,
          },
        }}
        modules={[Autoplay]}
        className="border-l border-l-zinc-300 border-solid"
        onSlideChange={handleChangeSlide}
      >
        {products
          ? products.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} isCarousel={true} />
            </SwiperSlide>
          ))
          : [...Array(5)].map((_, i) => (
            <SwiperSlide key={i}>
              <SkeletonProductCard />
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

export default memo(ProductLists);
