import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import Container from "../components/Container/Container";
import PageTitle from "../components/PageTitle/PageTitle";
import CheckboxGroup from "../components/Product/CheckboxGroup";
import ProductCard from "../components/Product/ProductCard";
import { prices } from "../data/Filter";
import { Close, Filter } from "../icons/icons";
import { motion } from "framer-motion";
import Overlay from "../components/Overlay/Overlay";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { getProducts } from "../services/products";

const duration = 0.3;

const variants = {
  open: {
    x: 0,
    display: "block",
    transition: {
      duration,
    },
  },
  closed: {
    x: "100%",
    transition: {
      duration,
    },
    transitionEnd: {
      display: "none",
    },
  },
};

const variants2 = {
  open: {
    right: 256,
    transition: {
      duration,
    },
  },
  closed: {
    right: 0,
    transition: {
      duration,
    },
  },
};

const Product = ({ title }: { title: string }) => {
  const [isOpenFilterMobile, setIsOpenFilterMobile] = useState(false);
  const { isLoading, datas, error } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const costQuery = searchParams.get("cost");

  const handleClickFilterMobile = () => {
    setIsOpenFilterMobile(!isOpenFilterMobile);
  };

  useEffect(() => {
    getProducts(
      `${import.meta.env.VITE_API}/api/product/get/${
        title === "Sản phẩm" ? "Tất cả sản phẩm" : title
      }`,
      dispatch
    );
  }, [title, dispatch]);

  if (error) return <div>{error}</div>;

  return (
    <>
      <Breadcrumb active={title} />
      <Container className="relative pt-7 pb-4 lg:flex lg:items-start lg:space-x-6">
        <aside className="hidden lg:block max-w-[25%] w-full">
          <h2 className="font-roboto text-lg inline-block text-zinc-800 font-medium relative w-full border-b boder-b-zinc-200 mt-1 mb-6">
            <span className="block h-9 before:absolute before:left-0 before:-bottom-[1px] before:content-[''] before:h-0.5 before:bg-red-700 before:w-[50px]">
              Tìm theo
            </span>
          </h2>
          <CheckboxGroup {...prices} />
        </aside>
        <section className="w-full lg:w-3/4">
          {/* Page Title */}
          <PageTitle value={title} />
          {/* Sort */}
          <div className="h-10 w-full border-b border-b-zinc-200 my-2.5">
            <div className="float-left leading-8">19 Quat, May Lam mat</div>
            <div className="float-right text-zinc-500 text-[13px]">
              <label className="float-left mr-2.5 leading-8 hidden md:block">
                Sắp xếp:
              </label>
              <select className="float-right w-36 bg-white py-0 text-[13px] px-2.5 h-8 cursor-pointer border-none focus:ring-0  focus:border-none bg-[length:16px_16px]">
                <option>Mặc định</option>
                <option>Giá tăng dần</option>
                <option>Giá giảm dần</option>
                <option>Từ A-Z</option>
                <option>Từ Z-A</option>
                <option>Mới đến cũ</option>
                <option>Cũ đến mới</option>
              </select>
            </div>
          </div>
          <div className="mb-2.5">
            <ul>
              <li className="px-1.5 py-1 inline-block bg-zinc-200 w-fit rounded">
                <span>Thuong hieu: 200K - 500K</span> <button></button>
              </li>
            </ul>
          </div>
          {/* Product List */}
          <section className="grid gap-7 grid-cols-2 md:grid-cols-3 mb-7">
            {datas.products.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </section>
          <nav className="flex items-center justify-between">
            <ul className="inline-flex my-2.5">
              <li>
                <Link
                  to={location.pathname}
                  className="w-7 h-7 ml-0 leading-7 text-black bg-zinc-200 border border-zinc-200 hover:border-red-700 hover:bg-red-700 hover:text-white transition-all ease-in-out duration-100 flex items-center justify-center"
                >
                  1
                </Link>
              </li>
            </ul>
            <div className="inline-flex my-2.5 space-x-1.5">
              <Link
                to={location.pathname}
                className="w-7 h-7 ml-0 leading-7 text-white bg-red-700 border border-red-700 hover:border-red-700 hover:bg-red-700 hover:text-white transition-all ease-in-out duration-100 flex items-center justify-center"
              >
                10
              </Link>
              <Link
                to={location.pathname}
                className="w-7 h-7 ml-0 leading-7 text-black bg-zinc-200 border border-zinc-200 hover:border-red-700 hover:bg-red-700 hover:text-white transition-all ease-in-out duration-100 flex items-center justify-center"
              >
                30
              </Link>
              <Link
                to={location.pathname}
                className="w-7 h-7 ml-0 leading-7 text-black bg-zinc-200 border border-zinc-200 hover:border-red-700 hover:bg-red-700 hover:text-white transition-all ease-in-out duration-100 flex items-center justify-center"
              >
                50
              </Link>
              <p className="leading-7">một trang</p>
            </div>
          </nav>
        </section>

        <Overlay
          active={isOpenFilterMobile}
          onClick={handleClickFilterMobile}
          duration={duration}
        ></Overlay>

        {/* Mobile Filter */}
        <motion.nav
          initial="closed"
          variants={variants}
          animate={isOpenFilterMobile ? "open" : "closed"}
          className="fixed top-0 bottom-0 right-0 w-64 h-full bg-white z-[9999]"
        ></motion.nav>

        <motion.button
          initial="closed"
          animate={isOpenFilterMobile ? "open" : "closed"}
          variants={variants2}
          onClick={handleClickFilterMobile}
          className="fixed z-[9999] top-[39%] lg:hidden w-10 h-10 text-white bg-red-700 rounded-tl-[20px] rounded-bl-[20px]"
        >
          {isOpenFilterMobile ? (
            <Close className="w-4 h-4 mx-auto" />
          ) : (
            <Filter className="w-4 h-4 mx-auto" />
          )}
        </motion.button>
      </Container>
    </>
  );
};

export default Product;
