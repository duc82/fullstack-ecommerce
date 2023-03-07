import React, { memo, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import Container from "../components/Container/Container";
import { ChevronLeft, ChevronRight, StarFull, User } from "../icons/icons";
import ProductRate from "../components/Product/ProductRate";
import formatVnd from "../utils/formatVnd";
import useQuantity from "../hooks/useQuantity";
import useScript from "../hooks/useScript";
import useAddThis from "../hooks/useAddThis";
import Overlay from "../components/Overlay/Overlay";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import ProductLists from "../components/Home/ProductLists";
import Review from "../components/Review/Review";
import useStyleBody from "../hooks/useStyleBody";
import useNavigationSwiper from "../hooks/useNavigationSwiper";
import useZoomImage from "../hooks/useZoomImage";
import { useAppSelector } from "../hooks/redux";
import { useDispatch } from "react-redux";
import NotFound from "./NotFound";
import SkeletonProductOverview from "../components/Skeleton/SkeletonProductOverview";

const duration = 0.3;

const variants = {
  open: {
    opacity: 1,
    display: "block",
    transition: {
      duration,
      ease: "easeIn",
    },
  },
  closed: {
    opacity: 0,
    transition: {
      duration,
      ease: "easeOut",
    },
    transitionEnd: {
      display: "none",
    },
  },
};

const updateHoverStar = (index: number) => {
  const newArray: boolean[] = Array(5).fill(false);

  for (let i = 0; i <= index; i++) {
    newArray[i] = true;
  }

  return newArray;
};

const ProductOverview = () => {
  const { nextEl, updateNextEl, prevEl, updatePrevEl } = useNavigationSwiper();
  const [statusSlide, setStatusSlide] = useState("start");
  const { quantity, increaseQuantity, decreaseQuantity, inputChangeQuantity } =
    useQuantity(1, 999);
  const [isActiveReview, setIsActiveReview] = useState(false);
  const {
    isHoverImage,
    backgroundZoom,
    lens,
    mouseOverImage,
    mouseOutImage,
    mouseMoveImage,
  } = useZoomImage();

  const [hoverStar, setHoversStar] = useState(Array(5).fill(false));
  const [indexActiveStar, setIndexActiveStar] = useState(-1);
  const [activeIndexImg, setActiveIndexImg] = useState(1);

  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const {
    isLoading,
    datas: { product, products },
    error,
  } = useAppSelector((state) => state.product);

  useScript(import.meta.env.VITE_ADDTHIS_PLUGIN);
  useAddThis();
  useStyleBody({
    active: isActiveReview,
    className: "overflow-hidden",
  });

  const resetHoverStar = () => setHoversStar(Array(5).fill(false));

  const closeReview = () => {
    setIsActiveReview(false);
    resetHoverStar();
    setIndexActiveStar(-1);
  };

  const handleMouseOverStar = (index: number) => {
    const newArray = updateHoverStar(index);
    setHoversStar(newArray);
  };

  const handleMouseLeaveStar = () => {
    if (indexActiveStar === -1) {
      resetHoverStar();
    } else {
      const newArray = updateHoverStar(indexActiveStar);
      setHoversStar(newArray);
    }
  };

  const handleClickStar = (index: number) => {
    const newArray = updateHoverStar(index);
    setHoversStar(newArray);
    setIndexActiveStar(index);
  };

  // useEffect(() => {
  //   getProductByTag(
  //     `${import.meta.env.VITE_API}/api/product/get${pathname}`,
  //     dispatch
  //   );
  // }, [pathname, dispatch]);

  if (isLoading) {
    return <SkeletonProductOverview />;
  }
  if (error) {
    return <NotFound />;
  }

  return (
    <>
      {product && (
        <div>
          {<Breadcrumb active={product.name} />}
          <Overlay
            active={isActiveReview}
            onClick={closeReview}
            duration={duration}
          />
          <motion.div
            initial="closed"
            variants={variants}
            animate={isActiveReview ? "open" : "closed"}
            className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-80 lg:w-96 bg-white shadow-2xl shadow-black/50 z-[9999] rounded py-4 px-5"
          >
            <form className="overflow-y-auto">
              <h4 className="text-center my-2.5 text-lg font-roboto">
                Đánh giá sản phẩm
              </h4>
              <div
                onMouseLeave={handleMouseLeaveStar}
                className="flex items-start space-x-0.5 cursor-pointer justify-center h-5 mb-2.5"
              >
                {hoverStar.map((hover, i) => (
                  <StarFull
                    key={i}
                    onMouseOver={() => handleMouseOverStar(i)}
                    onClick={() => handleClickStar(i)}
                    className={`w-3.5 h-3.5 ${
                      hover ? "text-red-700" : "text-zinc-300"
                    }`}
                  />
                ))}
              </div>
              <div className="flex flex-col w-full space-y-4">
                <input
                  type="text"
                  placeholder="Nhập tên của bạn"
                  className="h-10 py-1.5 px-3 w-full text-zinc-600 border border-zinc-300 shadow-inner focus:border-blue-400 focus:shadow-[0_0_8px_rgba(96,165,250,0.6)]  rounded focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="example@gmail.com"
                  className="h-10 py-1.5 px-3 w-full text-zinc-600 border border-zinc-300 shadow-inner focus:border-blue-400 focus:shadow-[0_0_8px_rgba(96,165,250,0.6)]  rounded focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Tiêu đề"
                  className="h-10 py-1.5 px-3 w-full text-zinc-600 border border-zinc-300 shadow-inner focus:border-blue-400 focus:shadow-[0_0_8px_rgba(96,165,250,0.6)]  rounded focus:outline-none"
                />
                <div>
                  <textarea
                    placeholder="Nội dung"
                    className="py-1.5 px-3 resize w-full min-h-[100px] lg:min-h-[130px] max-w-full text-zinc-600 border border-zinc-300 shadow-inner focus:border-blue-400 focus:shadow-[0_0_8px_rgba(96,165,250,0.6)]  rounded focus:outline-none"
                  ></textarea>
                </div>
              </div>
              <div className="flex justify-center w-full my-7">
                <button
                  type="submit"
                  className="bg-red-700 rounded px-3 py-1.5 shadow-inner text-white"
                >
                  Gửi
                </button>
              </div>
            </form>
            <button
              type="button"
              onClick={closeReview}
              className="absolute w-9 h-9 cursor-pointer -top-4 -right-4 bg-zinc-800 rounded-full bg-fancybox z-[99999]"
            ></button>
          </motion.div>
          <Container>
            <section className="flex-col lg:flex-row flex mt-10">
              {/* Left */}
              <div className="lg:w-1/4 order-2 w-full lg:pr-4">
                <ProductLists
                  titleHeadValue="Sản phẩm liên quan"
                  titleHeadUrl="san-pham-ban-chay"
                  products={products}
                />
              </div>
              {/* Right */}
              <div className="w-full lg:w-9/12 lg:order-2 lg:pl-4">
                <div className="md:flex">
                  <div className="mb-8 md:w-1/2 md:flex-1 md:px-4">
                    <div className="relative mb-4">
                      <span className="absolute top-2 right-2 z-50 w-9 h-9 rounded-full text-xs leading-none bg-red-600 text-white flex justify-center items-center font-roboto">
                        {product.discount}%
                      </span>
                      <button className="block relative">
                        {/* Lens */}
                        <div
                          onMouseOver={mouseOverImage}
                          onMouseOut={mouseOutImage}
                          className="absolute bg-white opacity-40 border border-black cursor-pointer hidden"
                          style={{
                            top: `${lens.y}px`,
                            left: `${lens.x}px`,
                            width: `${lens.width}px`,
                            height: `${lens.height}px`,
                            display: isHoverImage ? "block" : "none",
                          }}
                        ></div>

                        <img
                          onMouseOver={mouseOverImage}
                          onMouseMove={mouseMoveImage}
                          onMouseOut={mouseOutImage}
                          className="mx-auto"
                          src={product.images[activeIndexImg].src}
                          alt={product.images[activeIndexImg].alt}
                        />

                        {/* Background Image Zoom */}
                        <div
                          id="zoom-img"
                          className="absolute top-0 -right-full z-50 h-full w-full border"
                          style={{
                            backgroundImage: `url('${product.images[activeIndexImg].src}')`,
                            backgroundSize: `${backgroundZoom.width}px ${backgroundZoom.height}px`,
                            backgroundPosition: `-${backgroundZoom.x}px -${backgroundZoom.y}px`,
                            display: isHoverImage ? "block" : "none",
                          }}
                        ></div>
                      </button>
                    </div>
                    <div className="relative overflow-hidden w-full">
                      <div className="w-9/12 mx-auto">
                        <Swiper
                          slidesPerView={3}
                          spaceBetween={16}
                          navigation={{
                            prevEl,
                            nextEl,
                          }}
                          onSlideChange={({ isBeginning, isEnd }) =>
                            setStatusSlide(
                              isBeginning ? "start" : isEnd ? "end" : ""
                            )
                          }
                          modules={[Navigation]}
                        >
                          {product.images.map((image, i) => (
                            <SwiperSlide key={image.id}>
                              <li
                                onClick={() => setActiveIndexImg(i)}
                                className="h-20 cursor-pointer flex items-center justify-center border border-zinc-200"
                              >
                                <img
                                  className="max-h-full"
                                  src={image.src}
                                  alt={image.alt}
                                />
                              </li>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                        <button
                          type="button"
                          ref={updatePrevEl}
                          className={`absolute top-1/2 -translate-y-1/2 left-0 w-6 h-6 rounded-full bg-red-700 text-white ${
                            statusSlide === "start"
                              ? "opacity-50 cursor-default"
                              : "cursor-pointer"
                          }`}
                        >
                          <ChevronLeft className="w-3 h-3 mx-auto" />
                        </button>
                        <button
                          type="button"
                          ref={updateNextEl}
                          className={`absolute top-1/2 -translate-y-1/2 right-0 w-6 h-6 rounded-full bg-red-700 text-white ${
                            statusSlide === "end"
                              ? "opacity-50 cursor-default"
                              : "cursor-pointer"
                          }`}
                        >
                          <ChevronRight className="w-3 h-3 mx-auto" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/2 md:flex-1 md:px-4">
                    <div>
                      <h1 className="text-2xl font-medium text-zinc-800 font-roboto mb-4">
                        {product.name}
                      </h1>

                      <div className="mb-2.5 flex items-center space-x-1">
                        <ProductRate
                          rate={product.avgRating}
                          className="w-3.5 h-3.5"
                        />
                        <a
                          href="#reviews"
                          className="text-blue-500 text-xs leading-5"
                        >
                          ({product.reviews.length} đánh giá)
                        </a>
                      </div>
                      <div>
                        <span
                          className="text-xl text-red-700 font-medium "
                          id="cost"
                        >
                          {formatVnd(product.cost)}
                        </span>{" "}
                        <span className="line-through" id="price">
                          {formatVnd(product.price)}
                        </span>
                        <div className="mt-4 text-[13px] pb-1">
                          <span>Tình trạng:</span>{" "}
                          <span className="text-lime-500">
                            {product.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <ul className="pl-4">
                      <li className="list-disc list-outside text-zinc-500">
                        <span>Thương hiệu:</span>{" "}
                        <span className="uppercase">{product.brand}</span>
                      </li>

                      <li className="list-disc list-outside text-zinc-500">
                        <span>Dòng sản phẩm:</span>{" "}
                        <span className="uppercase">
                          {product.tags[0].category}
                        </span>
                      </li>

                      <li className="list-disc list-outside text-zinc-500">
                        <span>Mua hàng: 1800 1234 / 0123456789</span>
                      </li>

                      <li className="list-disc list-outside text-zinc-500">
                        <span>Bảo hành: 0123456789</span>
                      </li>
                    </ul>
                    <div className="mt-5 pt-4 mb-2.5 border-t boder-t-zinc-200">
                      <form>
                        <label htmlFor="quantity" className="hidden">
                          Số lượng:{" "}
                        </label>
                        <div className="flex items-stretch mb-7">
                          <button
                            type="button"
                            onClick={decreaseQuantity}
                            className="w-6 h-7 text-xl leading-5 bg-zinc-200 hover:bg-white border boder-zinc-200 border-r-0 rounded-md rounded-r-none"
                          >
                            -
                          </button>
                          <input
                            type="text"
                            className="border h-7 text-center bodder-zinc-200 focus:outline-none text-zinc-600 flex-auto"
                            value={quantity}
                            name="quantity"
                            id="quantity"
                            onChange={inputChangeQuantity}
                          />
                          <button
                            type="button"
                            onClick={increaseQuantity}
                            className="w-6 h-7 text-xl leading-5 bg-zinc-200 hover:bg-white border boder-zinc-200 border-l-0 rounded-md rounded-l-none"
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="submit"
                          className="text-center bg-red-700 w-full text-white border h-[30px] uppercase transition-colors duration-100 ease-in rounded-md hover:bg-white hover:border-red-700 hover:text-red-700"
                        >
                          Cho vào giỏ hàng
                        </button>
                      </form>
                    </div>
                    <div className="mb-2.5">
                      <span className="w-24 inline-block">Tags: </span>
                      <>
                        {product.tags.map((tag) => (
                          <Link
                            key={tag.id}
                            to="/"
                            className="text-zinc-600 hover:text-red-700 transition ease-in-out duration-150"
                          >
                            {tag.category},{" "}
                          </Link>
                        ))}
                      </>
                    </div>
                    <div>
                      <span className="mb-2.5 w-24 leading-5 inline-block">
                        Chia sẻ:
                      </span>
                      <div
                        data-url={import.meta.env.VITE_ORIGIN + "/test"}
                        data-title="Do gia dung"
                        data-description="Mo ta"
                        className="addthis_inline_share_toolbox share_add inline-block"
                      ></div>
                    </div>
                  </div>
                </div>
                {/* Product Information */}
                <div className="mt-7">
                  <div className="w-full border boder-zinc-200">
                    <h3 className="bg-red-700 leading-[50px] px-6 text-white uppercase border-r border-r-200 inline-block">
                      Thông tin sản phẩm
                    </h3>
                  </div>
                  <div className="px-2.5 pt-2.5 lg:pt-7 lg:px-7 pb-5 border border-zinc-200 text-black font-timesNewRoman text-base leading-6">
                    <p className="mb-4">
                      <img
                        src="//bizweb.dktcdn.net/100/009/443/files/doi-cu-so-huu-moi-web.png?v=1622793281583"
                        alt="Img Test"
                      />
                    </p>
                    <p className="mb-4">
                      <strong className="uppercase block">
                        Tính năng nổi bật của sản phẩm
                      </strong>
                    </p>
                    <ul className="list-inside list-disc mb-4">
                      {/* {product.features.map((feature) => (
                        <li key={feature.id} className="mb-1.5">
                          {feature.content}
                        </li>
                      ))} */}
                    </ul>
                    <p className="mb-4">
                      <strong className="uppercase block">
                        Thông số kỹ thuật
                      </strong>
                    </p>
                    <p className="mb-4">
                      <img
                        src="//bizweb.dktcdn.net/100/009/443/files/ac102.jpg?v=1609208781597"
                        alt="Img Test"
                      />
                    </p>
                    <div className="mb-4">
                      <div className="relative overflow-hidden w-full pt-[56.25%]">
                        <iframe
                          src="https://www.youtube.com/embed/nOmBSslaKIY?rel=0"
                          title="Video nhung youtube"
                          allowFullScreen
                          className="focus-visible:outline-none absolute inset-0 w-full h-full"
                        ></iframe>
                      </div>
                    </div>
                    <p className="mb-4">
                      Với sự phát triển vũ bão của ngành công nghệ - điện tử
                      hiện nay đã và đang cho ra mắt các sản phẩm ưu việt để
                      phục vụ cho cuộc sống của con người. Trong đó, nồi chiên
                      nướng không dầu chính là một trong những sản phẩm ưu việt
                      đang được rất nhiều người quan tâm không chỉ bởi sự tiện
                      dụng mà còn bởi các ưu điểm nổi bật mà sản phẩm đem lại.
                    </p>
                    <p className="mb-4">
                      Thông thường, khi sử dụng các nồi chiên truyền thống sẽ
                      rất tốn kém chi phí nguyên liệu, thời gian chế biến mà còn
                      gây hại cho sức khỏe khi các món ăn sẽ bị ngập dầu mỡ. Sự
                      ra đời của nồi chiên nướng không dầu đã giúp các bà nội
                      trợ tiết kiệm được đáng kể chi phí nguyên liệu đồng thời
                      giúp giảm lượng dầu mỡ trong thực phẩm giúp bảo vệ sức
                      khỏe gia đình.
                    </p>
                  </div>
                </div>
                {/* Rating & reviews */}
                <div id="reviews" className="border-b border-b-zinc-300">
                  <h4 className="my-2.5 text-base text-zinc-800 font-arial font-medium">
                    Đánh giá sản phẩm
                  </h4>
                </div>
                <div className="flex items-center justify-between">
                  <div className="w-1/2">
                    <div className="pl-2.5 py-2 inline-block font-arial leading-tight">
                      <span className="text-[28px] mr-4">
                        {product.reviews.length}
                      </span>
                      <div className="inline-flex items-center space-x-1">
                        <StarFull className="w-4 h-5 text-yellow-500" />
                        <StarFull className="w-4 h-5 text-yellow-500" />
                        <StarFull className="w-4 h-5 text-yellow-500" />
                        <StarFull className="w-4 h-5 text-yellow-500" />
                        <StarFull className="w-4 h-5 text-yellow-500" />
                      </div>
                      <div className="flex justify-center items-center space-x-1.5">
                        <p>2</p>
                        <User className="text-black w-4 h-4" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => setIsActiveReview(true)}
                      className="py-1.5 px-4 bg-red-700 border-red-700 rounded-md text-white text-[17px] leading-6"
                    >
                      Viết đánh giá
                    </button>
                  </div>
                </div>
                <Review />
              </div>
            </section>
          </Container>
        </div>
      )}
    </>
  );
};

export default memo(ProductOverview);
