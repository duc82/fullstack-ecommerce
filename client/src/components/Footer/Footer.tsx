import React, { useState, memo } from "react";
import { Link } from "react-router-dom";
import { Menus } from "../../data/Menus";
import { Home, Minus, PaperPlane, Phone, Plus } from "../../icons/icons";
import Container from "../Container/Container";
import Showroom from "./Showroom";
import { motion } from "framer-motion";
import { ListFanPages } from "../../data/ListFanPages";
import useFB from "../../hooks/useFB";
import useWindowResize from "../../hooks/useWindowResize";
import useScript from "../../hooks/useScript";

const variants = {
  open: {
    height: "auto",
    display: "block",
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

const policies = [
  {
    url: "chinh-sach-bao-hanh",
    value: "Chính Sách Bảo Hành",
  },
  {
    url: "chinh-sach-bao-mat",
    value: "Chính Sách Bảo Mật",
  },
  {
    url: "dieu-khoan-su-dung",
    value: "Điều Khoản Sử Dụng",
  },
  {
    url: "phuong-thuc-thanh-toan",
    value: "Phương thức thanh toán",
  },
  {
    url: "phuong-thuc-giao-hang",
    value: "Phương Thức Giao Hàng",
  },

  {
    url: "chinh-sach-doi-tra-hang",
    value: "Chính Sách Đổi Trả Hàng",
  },
];

export const showrooms = [
  {
    address: "Showroom Trung Sơn",
    detailedAddress:
      "Số 233A - 235 - 237 Đường 9A, KDC Trung Sơn, Ấp 4, Bình Hưng, Bình Chánh, Tp. HCM",
  },
  {
    address: "Showroom Trung Sơn",
    detailedAddress:
      "Số 233A - 235 - 237 Đường 9A, KDC Trung Sơn, Ấp 4, Bình Hưng, Bình Chánh, Tp. HCM",
  },
  {
    address: "Showroom Trung Sơn",
    detailedAddress:
      "Số 233A - 235 - 237 Đường 9A, KDC Trung Sơn, Ấp 4, Bình Hưng, Bình Chánh, Tp. HCM",
  },
  {
    address: "Showroom Trung Sơn",
    detailedAddress:
      "Số 233A - 235 - 237 Đường 9A, KDC Trung Sơn, Ấp 4, Bình Hưng, Bình Chánh, Tp. HCM",
  },
  {
    address: "Showroom Trung Sơn",
    detailedAddress:
      "Số 233A - 235 - 237 Đường 9A, KDC Trung Sơn, Ấp 4, Bình Hưng, Bình Chánh, Tp. HCM",
  },
];

const Footer = () => {
  const [isOpenMenu, setIsOpenMenu] = useState([false, false, false]);
  const [windowWidth] = useWindowResize();
  useScript("https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v15.0", {
    defer: true,
    crossorigin: "anonymous",
    nonce: "4xZxM5Ry",
  });
  useFB();

  const handleClick = (i: number) => {
    const copyArr = [...isOpenMenu];

    copyArr[i] = !copyArr[i];

    setIsOpenMenu(copyArr);
  };

  return (
    <footer className="bg-zinc-200/75">
      <Container className="pt-7">
        <div className="md:flex md:items-center md:space-x-7">
          <Showroom
            titleShowroom="Showroom Miền Bắc"
            addressShowroom={showrooms}
          />
          <Showroom
            titleShowroom="Showroom Miền Nam"
            addressShowroom={showrooms}
          />
        </div>
        <div className="text-black grid md:grid-cols-2 md:gap-x-8 lg:grid-cols-6">
          <div>
            <h4
              onClick={() => windowWidth < 768 && handleClick(0)}
              className="text-[13px] py-1 leading-8 uppercase cursor-pointer flex items-center justify-between md:cursor-auto md:text-lg md:leading-8"
            >
              <span>Thông tin</span>
              {windowWidth < 768 && (
                <button className="w-3.5 h-3.5 flex items-center justify-center rounded-full bg-zinc-500 mr-4">
                  {isOpenMenu[0] ? (
                    <Minus className="w-2.5 h-2.5 text-white" />
                  ) : (
                    <Plus className="w-2.5 h-2.5 text-white" />
                  )}
                </button>
              )}
            </h4>
            <motion.ul
              initial="closed"
              variants={variants}
              animate={isOpenMenu[0] || windowWidth >= 768 ? "open" : "closed"}
              className="mb-4"
            >
              {Menus.map((menu, i) => (
                <li
                  key={i}
                  className="leading-7 hover:ml-2.5 transition-all duration-500 group"
                >
                  <Link
                    to={menu.url}
                    className="text-xs group-hover:text-red-700 transition-all duration-150 ease-in-out"
                  >
                    {menu.value}
                  </Link>
                </li>
              ))}
            </motion.ul>
          </div>
          <div>
            <h4
              onClick={() => windowWidth < 768 && handleClick(1)}
              className="text-[13px] py-1 leading-8 uppercase cursor-pointer flex items-center justify-between md:cursor-auto md:text-lg md:leading-8"
            >
              <span>Chính sách</span>
              {windowWidth < 768 && (
                <button className="w-3.5 h-3.5 flex items-center justify-center rounded-full bg-zinc-500 mr-4">
                  {isOpenMenu[1] ? (
                    <Minus className="w-2.5 h-2.5 text-white" />
                  ) : (
                    <Plus className="w-2.5 h-2.5 text-white" />
                  )}
                </button>
              )}
            </h4>
            <motion.ul
              initial="closed"
              variants={variants}
              animate={isOpenMenu[1] || windowWidth >= 768 ? "open" : "closed"}
              className="mb-4"
            >
              {policies.map((policy, i) => (
                <li
                  key={i}
                  className="leading-7 hover:ml-2.5 transition-all duration-500 group"
                >
                  <Link
                    to={policy.url}
                    className="text-xs group-hover:text-red-700 transition-all duration-150 ease-in-out"
                  >
                    {policy.value}
                  </Link>
                </li>
              ))}
            </motion.ul>
          </div>
          <div className="lg:col-span-2">
            <h4
              onClick={() => windowWidth < 768 && handleClick(2)}
              className="text-[13px] py-1 leading-8 uppercase cursor-pointer flex items-center justify-between md:cursor-auto md:text-lg md:leading-8"
            >
              <span>Liên hệ</span>
              {windowWidth < 768 && (
                <button className="w-3.5 h-3.5 flex items-center justify-center rounded-full bg-zinc-500 mr-4">
                  {isOpenMenu[2] ? (
                    <Minus className="w-2.5 h-2.5 text-white" />
                  ) : (
                    <Plus className="w-2.5 h-2.5 text-white" />
                  )}
                </button>
              )}
            </h4>
            <motion.ul
              initial="closed"
              variants={variants}
              animate={isOpenMenu[2] || windowWidth >= 768 ? "open" : "closed"}
              className="mb-4"
            >
              <li className="leading-7 flex items-center space-x-4">
                <span>
                  <Home className="w-3 h-3 flex-auto" />
                </span>
                <span className="text-xs leading-7 pr-4">
                  235-237 Đường số 9A, Khu dân cư Trung Sơn, Q.8, TP HCM, TP Hồ
                  Chí Minh,{" "}
                </span>
              </li>
              <li className="leading-7 flex items-center space-x-4">
                <span>
                  <Home className="w-3 h-3" />
                </span>
                <span className="text-xs leading-7 pr-4">
                  Số 2, Ngõ 382, Phạm Văn Đồng, Cổ Nhuế 2, Bắc Từ Liêm, Hà Nội |
                  Hotline: 0123456789
                </span>
              </li>
              <li className="leading-7 flex items-center space-x-4">
                <span>
                  <Phone className="w-3 h-3" />
                </span>
                <a
                  href="tel:+84123456789"
                  className="text-xs leading-7 hover:text-red-700 transition-all duration-150 ease-in-out pr-4"
                >
                  0123456789
                </a>
              </li>
              <li className="leading-7 flex items-center space-x-4">
                <span>
                  <PaperPlane className="w-3 h-3" />
                </span>
                <a
                  href="tel:+84123456789"
                  className="text-xs leading-7 hover:text-red-700 transition-all duration-150 ease-in-out pr-4"
                >
                  Bảo hành: 0123456789 - 0123456789
                </a>
              </li>
            </motion.ul>
            <div className="flex items-center space-x-3">
              {ListFanPages.map((lfp, i) => (
                <a
                  href={lfp.url}
                  className="w-8 h-8 bg-white flex items-center justify-center text-zinc-400 transition-all duration-150 ease-in-out hover:text-white hover:bg-red-700"
                  target="_blank"
                  rel="noreferrer"
                  key={i}
                >
                  <lfp.Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          <div className="text-black lg:col-span-2">
            <h4 className="text-[13px] py-1 leading-8 uppercase flex items-center justify-between md:text-lg md:leading-8">
              <span>Đăng ký nhận tin</span>
            </h4>
            <p className="text-xs leading-6 mb-2.5">
              Hãy gửi chúng tôi địa chỉ email của bạn, chúng tôi sẽ gửi cho bạn
              những ưu đãi đặc biêt.
            </p>
            <form className="mb-8 flex items-center">
              <input
                type="text"
                placeholder="Email nhận tin"
                className="min-h-[40px] flex-1 min-w-0 w-full px-5 border-zinc-200 border border-solid text-zinc-800 placeholder:text-zinc-500/90 caret-red-700 focus:outline-none"
              />
              <input
                type="submit"
                className="bg-red-700 cursor-pointer px-5 uppercase text-white text-center font-medium border-zinc-200 border border-l-0 min-h-[40px]"
                value="Gửi đi"
              />
            </form>
            <div
              className="fb-page"
              data-href="https://www.facebook.com/zumidogiadung/"
              data-tabs=""
              data-width=""
              data-height=""
              data-small-header="true"
              data-adapt-container-width="true"
              data-hide-cover="false"
              data-show-facepile="true"
            >
              <blockquote
                cite="https://www.facebook.com/zumidogiadung/"
                className="fb-xfbml-parse-ignore"
              >
                <a href="https://www.facebook.com/zumidogiadung/">
                  Zumi - Đồ Gia Dụng
                </a>
              </blockquote>
            </div>
          </div>
        </div>

        <div className="mt-5 py-7 border-t border-t-zinc-300 text-center">
          <ul className="mb-4">
            {Menus.map((menu, i) => (
              <li key={i} className="inline-block px-2.5 relative">
                <a
                  href={menu.url}
                  className={`text-xs uppercase text-black transition-all duration-300 ease-in-out hover:underline font-normal ${
                    i !== Menus.length - 1 &&
                    "after:content-['|'] after:text-zinc-600 after:absolute after:top-1/2 after:-translate-y-1/2 after:-right-0.5 after:text-sm"
                  }`}
                >
                  {menu.value}
                </a>
              </li>
            ))}
          </ul>
          <p className="text-xs mb-6 leading-[1.7] px-4 lg:px-32">
            Với tiêu chí {'"Hài Lòng Khách Đến - Vừa Lòng Khách Đi"'} chúng tôi
            luôn mong muốn mang lại dịch vụ tiện ích nhất cho khách hàng với chi
            phí rẻ nhất, tốt nhất. Cảm ơn quý khách hàng đã đồng hành cùng chúng
            tôi trong thời gian qua.
          </p>
        </div>
      </Container>
      <div className="text-center py-2.5 text-[13px] bg-white relative">
        <Container className="py-4 md:py-2 leading-6 md:flex md:items-center md:justify-center md:space-x-1">
          <div>
            <span className="text-zinc-400">© 2022 Bản quyền thuộc về </span>
            <b className="text-red-700 uppercase">houseware-sern.vercel.app</b>
          </div>
          <span className="hidden md:block text-zinc-400">|</span>
          <div>
            <span className="text-zinc-400">Cung cấp bởi </span>
            <Link to="/" className="text-red-700 hover:underline font-bold">
              Zumi Đồ Gia Dụng
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default memo(Footer);
