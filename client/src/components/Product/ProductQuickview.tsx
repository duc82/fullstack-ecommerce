import React, { useState, memo } from "react";
import { motion } from "framer-motion";
import { useGlobalContext } from "../../context/appContext";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { XMark, ChevronLeft, ChevronRight } from "../../icons/icons";
import ProductRate from "./ProductRate";
import formatVnd from "../../utils/formatVnd";
import useQuantity from "../../hooks/useQuantity";
import Overlay from "../Overlay/Overlay";
import useNavigationSwiper from "../../hooks/useNavigationSwiper";
import { useDispatch } from "react-redux";
import { addCart } from "../../redux/reducers/cartSlice";
import { portalVariants } from "../../data/variants";

const ProductQuickview = () => {
  const { isActiveProductQuickview, closeProductQuickview, product } =
    useGlobalContext();
  const { prevEl, nextEl, updatePrevEl, updateNextEl } = useNavigationSwiper();
  const [activeIndexImg, setActiveIndexImg] = useState(0);
  const dispatch = useDispatch();

  const {
    quantity,
    increaseQuantity,
    decreaseQuantity,
    inputChangeQuantity,
    resetQuantity,
  } = useQuantity(1, product.stock);

  return (
    <>
      <Overlay active={isActiveProductQuickview} />
      <motion.div
        initial="closed"
        variants={portalVariants}
        animate={isActiveProductQuickview ? "open" : "closed"}
        className="fixed inset-0 w-full h-full flex items-center z-[828282]"
      >
        <div
          onClick={() => {
            closeProductQuickview();
            resetQuantity();
          }}
          className="w-full h-full fixed inset-0"
        ></div>
        <div className="relative w-[990px] h-[500px] flex items-stretch mx-auto rounded-md px-4 py-8 shadow-md bg-white z-[828282]">
          <div className="px-4 w-2/5">
            <div className="mb-2.5 border border-zinc-200">
              <div className="max-w-xs p-2.5 mx-auto relative">
                <Link to={`/${product.slug}`} onClick={closeProductQuickview}>
                  <img
                    src={product.images?.[activeIndexImg].src}
                    alt={product.images?.[activeIndexImg].alt}
                  />
                </Link>
              </div>
            </div>
            <div className="py-2.5 h-[100px] relative">
              <button
                ref={updatePrevEl}
                className="absolute top-1/2 left-0 -translate-y-1/2 z-50 rounded-full border border-zinc-300 h-5 w-5 hover:bg-red-700 transtion duration-150 cursor-pointer hover:text-white"
              >
                <ChevronLeft className="w-1.5 h-1.5 mx-auto" />
              </button>
              <button
                ref={updateNextEl}
                className="absolute top-1/2 right-0 -translate-y-1/2 z-50 rounded-full border border-zinc-300 h-5 w-5 hover:bg-red-700 transition duration-150 cursor-pointer hover:text-white"
              >
                <ChevronRight className="w-1.5 h-1.5 mx-auto" />
              </button>
              <Swiper
                slidesPerView={4}
                modules={[Navigation]}
                navigation={{ prevEl, nextEl }}
                className="h-full w-4/5"
              >
                {product.images?.map((image, i) => (
                  <SwiperSlide key={image.id}>
                    <li className="h-full p-1 mr-2.5">
                      <button
                        onClick={() => setActiveIndexImg(i)}
                        className={`border h-[75px] flex items-center justify-center ${i === activeIndexImg
                          ? "border-red-700"
                          : "border-zinc-200"
                          }`}
                      >
                        <img src={image.src} alt={image.alt} />
                      </button>
                    </li>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div className="px-4 w-3/5">
            <h1 className="text-2xl font-medium text-zinc-800 font-roboto">
              <Link to={`/${product.slug}`} onClick={closeProductQuickview}>
                {product.name}
              </Link>
            </h1>
            <div className="leading-[30px] mb-1.5">
              <span>Thương hiệu: {product.brand}</span> <span>|</span> Tình
              trạng:{" "}
              <span className="text-white bg-green-500 py-1.5 px-2 rounded-sm text-center font-roboto text-xs leading-7">
                {product.status}
              </span>
            </div>
            <div className="mb-2.5 flex items-center space-x-1">
              <ProductRate rate={product.avgRating} className="w-3.5 h-3.5" />
              <span className="text-blue-500 text-xs leading-5">
                ({product.ratingCount} đánh giá)
              </span>
            </div>
            <div className="flex items-stretch pb-2.5">
              <span className="text-red-700 text-2xl mr-2.5" id="cost">
                {formatVnd(product.cost)}
              </span>{" "}
              <del
                className="ml-1.5 text-base leading-8 h-full text-zinc-400/90"
                id="price"
              >
                {formatVnd(product.price)}
              </del>
            </div>
            <div className="border-t border-t-zinc-200 mb-4 pt-4 text-zinc-500 line-clamp-3 font-roboto text-sm leading-6">
              {product.desc}
            </div>
            <div className="flex items-stretch w-full">
              <div className="relative w-[100px] h-[50px] border border-zinc-200 border-r-0 mt-2.5">
                <button
                  onClick={decreaseQuantity}
                  type="button"
                  className="font-bold text-zinc-500 h-full text-base absolute top-0 left-0 w-[30px] text-right z-20 transition-colors hover:text-zinc-800"
                >
                  -
                </button>
                <input
                  type="text"
                  name="quantity"
                  value={quantity}
                  onChange={inputChangeQuantity}
                  className="w-full h-full text-center absolute top-0 left-0 text-zinc-900 px-[30px] focus:outline-none border-none text-sm leading-[50px] focus:ring-0 focus:border-none"
                />
                <button
                  onClick={increaseQuantity}
                  type="button"
                  className="font-bold text-zinc-500 h-full text-base absolute top-0 right-0 w-[30px] text-left z-20 transition-colors hover:text-zinc-800"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => {
                  if (!quantity) {
                    resetQuantity();
                  }
                  dispatch(
                    addCart({
                      id: product.id,
                      name: product.name,
                      slug: product.slug,
                      cost: product.cost,
                      image: product.images[1].src,
                      quantity: !quantity ? 1 : Number(quantity),
                    })
                  );
                }}
                type="submit"
                className="mt-2.5 font-roboto font-bold px-6 border border-red-700 text-center cursor-pointer transition-colors duration-100 ease-in flex-auto text-xl hover:bg-white hover:text-red-700 bg-red-700 text-white rounded-tr-md rounded-br-md"
              >
                Cho vào giỏ hàng
              </button>
            </div>
          </div>
          <button
            onClick={() => {
              closeProductQuickview();
              resetQuantity();
            }}
            className="absolute -top-2.5 -right-2.5 w-6 h-6 text-white bg-red-700 rounded-full z-[82828282]"
          >
            <XMark className="w-3.5 h-3.5 mx-auto hover:underline" />
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default memo(ProductQuickview);
