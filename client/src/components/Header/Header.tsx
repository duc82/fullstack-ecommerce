import React, { memo, useState } from "react";
import { Link } from "react-router-dom";
import {
  AngleDown,
  Cube,
  Envelope2,
  Location,
  CaretDown,
  Hamburger,
  CartShopping,
  Search,
  User2,
  Phone,
} from "../../icons/icons";
import Container from "../Container/Container";
import logo from "../../assets/logo.png";
import hot from "../../assets/hot.webp";
import NavDesktopLeft from "../Navbar/Desktop/NavDesktopLeft";
import NavDesktopRight from "../Navbar/Desktop/NavDesktopRight";
import { motion } from "framer-motion";
import { useGlobalContext } from "../../context/appContext";
import { useAppSelector } from "../../hooks/redux";
import Cart from "../Cart/CartItems";
import { Carts } from "../../redux/reducers/cartSlice";

const variants = {
  open: {
    display: "block",
    height: "auto",
    overflow: "hidden",
    transition: {
      duration: 0.3,
    },
  },
  closed: {
    height: 0,
    transition: {
      duration: 0.3,
    },
    transitionEnd: {
      display: "none",
      overflow: "hidden",
    },
  },
};

// const carts: CartItem[] = [
//   {
//     id: 1,
//     name: "Noi chien khong dau",
//     img: "https://picsum.photos/1182/500?random=1",
//     slug: "noi-chien-khong-dau",
//     cost: 2000000,
//     quantity: 5,
//      totalCost: 10000000
//   },
//   {
//     id: 2,
//     name: "may say",
//     img: "https://picsum.photos/1182/500?random=2",
//     slug: "may-say",
//     cost: 1000000,
//     quantity: 2,
//      totalCost: 2000000
//   },
//   {
//     id: 3,
//     name: "tu lanh",
//     img: "https://picsum.photos/1182/500?random=3",
//     slug: "tu-lanh",
//     cost: 5000000,
//     quantity: 1,
//      totalCost: 5000000
//   },
// ];

const searchCategories = ["Sản phẩm", "Tin tức"];
const totalCartItemCount = (carts: Carts[]) =>
  carts.reduce((a, b) => a + 1 * b.quantity, 0);

const Header = () => {
  const { openNavMobile } = useGlobalContext();

  const [searchCategory, setSearchCategory] = useState(searchCategories[0]);
  const [isOpenCategory, setOpenCategory] = useState(false);

  const { isOpenNavDesktopLeft, toggleNavDesktopLeft } = useGlobalContext();

  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const { carts } = useAppSelector((state) => state.cart);

  return (
    <header>
      {/* Header Top Bar */}
      <div className="h-10 leading-10 overflow-hidden text-[13px] text-zinc-700 bg-white hidden lg:block">
        <Container className="flex items-center justify-between">
          <div className="px-4 w-1/2 flex items-center">
            <div>
              <span>
                <Phone className="h-3 w-3 inline-block mb-0.5" /> Hotline:
                <a href="tel:+84123456789"> 0123456789</a>
              </span>
            </div>
            <div className="pl-14 relative before:absolute before:content-[''] before:h-2.5 before:w-[1px] before:bg-zinc-200 before:left-5 before:top-1/2 before:-translate-y-1/2">
              <span>
                <Envelope2 className="h-[13px] w-[13px] inline-block mb-0" />{" "}
                Email:
                <a href="mailto:duccdht123@gmail.com"> duccdht123@gmail.com</a>
              </span>
            </div>
          </div>
          <div className="px-4 w-1/2 flex items-center justify-end">
            <div>
              <span>
                <Location className="h-[13px] w-2 inline-block mb-0.5" />{" "}
                <Link to="/he-thong-cua-hang">
                  Địa điểm các cửa hàng{" "}
                  <AngleDown className="h-[13px] w-2 inline-block mb-0.5" />
                </Link>
              </span>
            </div>
            <div className="pl-14 relative before:absolute before:content-[''] before:h-2.5 before:w-[1px] before:bg-zinc-200 before:left-5 before:top-1/2 before:-translate-y-1/2">
              <span>
                <Cube className="h-[13px] w-[13px] inline-block mb-0.5" />{" "}
                <Link to="/kiem-tra-don-hang">Theo dõi đơn hàng của bạn</Link>
              </span>
            </div>
          </div>
        </Container>
      </div>
      {/* Wrap Header Top */}
      <div className="lg:h-24 relative w-full bg-white text-[13px] leading-10">
        <Container>
          <div className="lg:border-t border-t-zinc-200 flex items-center justify-between">
            {/* Hamburger Mobile */}
            <button
              onClick={openNavMobile}
              className="lg:hidden p-2 text-black"
            >
              <Hamburger className="text-red-600 w-5 h-5" />
            </button>

            {/* Logo */}
            <Link
              to="/"
              className="w-40 h-20 lg:w-1/4 lg:h-24 flex items-center px-4"
            >
              <div>
                <img src={logo} alt="Logo" />
              </div>
            </Link>

            {/* Search */}
            <div className="w-1/2 px-4 hidden lg:block">
              <form className="h-full w-full flex items-center justify-center">
                <div className="relative min-w-[150px] xl:min-w-[170px]  flex-auto inline-block h-full border border-zinc-200 border-r-0">
                  <button
                    onClick={() => setOpenCategory((prev) => !prev)}
                    type="button"
                    className="lg:px-3 xl:px-5 text-zinc-500 w-full flex justify-between items-center"
                  >
                    <span>{searchCategory}</span>
                    <CaretDown className="h-[13px] w-[7px] inline-block mb-0.5 text-zinc-600" />
                  </button>
                  <motion.ul
                    initial="closed"
                    variants={variants}
                    animate={isOpenCategory ? "open" : "closed"}
                    className="absolute top-full border border-zinc-300 left-0 min-w-[190px] bg-white w-auto font-normal z-10 -ml-[1px] max-h-80"
                  >
                    {searchCategories.map((value, i) => (
                      <li
                        onClick={() => {
                          setSearchCategory(value);
                          setOpenCategory(false);
                        }}
                        key={i}
                        className="px-5 leading-8 cursor-pointer hover:bg-red-700 hover:text-white"
                      >
                        {value}
                      </li>
                    ))}
                  </motion.ul>
                </div>
                <input
                  type="text"
                  className="w-full flex-auto min-w-0 border border-zinc-200 px-3 text-[13px] placeholder:text-zinc-400/70 focus:outline-none caret-red-700"
                  placeholder="Tìm kiếm sản phẩm..."
                />
                <button className="bg-red-700 flex-none px-5 text-white uppercase text-center text-xs leading-[42px]">
                  Tìm kiếm
                </button>
              </form>
            </div>

            <div className="px-2 lg:pr-4 xl:px-4 flex items-center justify-between lg:w-1/4">
              {/* Cart  */}
              <div className="relative lg:ml-3 xl:ml-6">
                <Link
                  to="/gio-hang"
                  className="peer inline-flex items-center text-zinc-700 h-10 w-10 rounded-full bg-zinc-200/70 hover:bg-zinc-300/70 relative"
                >
                  <CartShopping className="w-4 h-4 mx-auto" />
                  <span className="absolute -top-1 -right-2 w-5 h-5 lg:w-6 lg:h-6 lg:-right-2.5 lg:-top-2 bg-red-700 rounded-full text-white text-center flex items-center justify-center">
                    {totalCartItemCount(carts)}
                  </span>
                </Link>
                <Cart carts={carts} />
              </div>
              {/* Account auth */}
              <div className="hidden lg:flex items-center justify-center space-x-3 text-zinc-800">
                <User2 className="w-5 h-6" />
                <div className="font-poppins leading-6">
                  {isLoggedIn ? (
                    <>
                      <Link
                        to="/tai-khoan"
                        className="block hover:text-red-600"
                      >
                        Tài khoản
                      </Link>
                      <span className="text-zinc-400/80">hoặc</span>{" "}
                      <Link to="/dang-xuat" className="hover:text-red-600">
                        Đăng xuất
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/dang-ky" className="block hover:text-red-600">
                        Đăng ký
                      </Link>
                      <span className="text-zinc-400/80">hoặc</span>{" "}
                      <Link to="/dang-nhap" className="hover:text-red-600">
                        Đăng nhập
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Search Mobile */}
          <div className="mt-4 lg:hidden">
            <form className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm"
                autoComplete="off"
                className="border h-12 w-full text-sm leading-relaxed text-zinc-800 border-zinc-200 px-5 pr-14 placeholder:text-zinc-500/90 focus:outline-none caret-red-600"
              />
              <button
                type="submit"
                className="absolute top-1/2 right-2.5 -translate-y-1/2 h-full px-5 text-zinc-500/90"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>
        </Container>
      </div>
      <div className="hidden lg:block w-full bg-zinc-200/75 border-b border-b-zinc-200">
        <Container className="flex items-center px-0">
          {/* NavDesktop Left */}
          <div className="w-1/4 px-4 -ml-4">
            <div className="relative">
              <button
                onClick={toggleNavDesktopLeft}
                className="px-5 w-full uppercase bg-white h-14 flex items-center justify-between"
              >
                <Hamburger className="w-[18px] h-[18px] text-red-700" />
                <span className="uppercase text-black text-xs xl:text-sm font-poppins xl:font-bold inline-block">
                  Danh mục sản phẩm
                </span>
                <CaretDown className="w-2 h-3.5 text-zinc-400/90" />
              </button>
              <NavDesktopLeft active={isOpenNavDesktopLeft} />
            </div>
          </div>
          {/* NavDesktop Right */}
          <div className="w-3/4 flex justify-between items-center">
            <NavDesktopRight />
            <div className="h-14 flex items-center relative">
              <Link
                to="/may-xay-va-may-ep"
                className="font-bold text-red-600 hover:underline"
              >
                Máy ép chậm Thế hệ mới
                <img
                  src={hot}
                  alt="Hot Icon"
                  className="absolute top-0 right-0"
                />
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default memo(Header);
