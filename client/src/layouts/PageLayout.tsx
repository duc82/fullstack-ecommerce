import React from "react";
import { createPortal } from "react-dom";
import { Outlet } from "react-router-dom";
import PopUpCart from "../components/Cart/PopUpCart";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import NavMobile from "../components/Navbar/Mobile/NavMobile";
import ProductQuickview from "../components/Product/ProductQuickview";
import useScroll from "../hooks/useScroll";
import useWindowResize from "../hooks/useWindowResize";
import { DoubleUp, Phone } from "../icons/icons";

const PageLayout = () => {
  const [, y] = useScroll();
  const [widthWindow] = useWindowResize();

  return (
    <>
      <Header />

      {createPortal(
        <div id="portal">
          {widthWindow < 992 && <NavMobile />}
          <ProductQuickview />
          <PopUpCart />
        </div>,
        document.body
      )}

      <Outlet />
      <Footer />
      {/* Tel */}
      <a
        href="tel:+84123456789"
        title="Số điện thoại"
        className="w-8 h-8 fixed bottom-12 left-4 z-[82] text-white bg-red-700 rounded-full flex items-center justify-center animate-growUp md:hidden"
      >
        <Phone className="w-3.5 h-4" />
      </a>
      {/* Scroll to top */}
      <button
        type="button"
        title="Lên đầu trang"
        style={{
          opacity: `${y > 200 ? "1" : "0"}`,
        }}
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
        className="border-red-600 border-2 transition-opacity duration-200 ease-out w-12 h-12 text-white flex items-center justify-center bg-red-700 fixed bottom-20 right-4 z-[82] rounded-full"
      >
        <DoubleUp className="w-3 h-3" />
      </button>
    </>
  );
};

export default PageLayout;
