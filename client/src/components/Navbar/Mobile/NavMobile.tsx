import React, { memo } from "react";
import { motion } from "framer-motion";
import MenuItems from "./MenuItems";
import { Link } from "react-router-dom";
import { BottomMenus, Menus } from "../../../data/Menus";
import logo from "../../../assets/logo.png";
import { useGlobalContext } from "../../../context/appContext";
import Overlay from "../../Overlay/Overlay";

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
    x: "-100%",
    transition: {
      duration,
    },
    transitionEnd: {
      display: "none",
    },
  },
};

const NavMobile = () => {
  const { isOpenNavMobile, closeNavMobile } = useGlobalContext();

  return (
    <>
      <Overlay
        active={isOpenNavMobile}
        onClick={closeNavMobile}
        duration={duration}
      ></Overlay>
      <motion.nav
        initial="closed"
        animate={isOpenNavMobile ? "open" : "closed"}
        variants={variants}
        className="w-72 h-full fixed top-0 left-0 z-[828282] shadow-navMobile bg-red-700 overflow-y-auto lg:hidden"
      >
        <div className="bg-white py-5">
          <Link to="/">
            <img className="mx-auto" src={logo} alt="Logo" />
          </Link>
        </div>
        <div>
          {/* Content Menu */}
          <ul>
            {Menus.map((menu, i) => {
              return (
                <MenuItems
                  key={i}
                  url={menu.url}
                  value={menu.value}
                  submenu={menu.submenu ? menu.submenu : []}
                  paddingLeft={15}
                />
              );
            })}
          </ul>
          {/* Footer Menu */}
          <ul>
            {BottomMenus.map((fm, i) => (
              <li key={i}>
                <Link
                  to={fm.url}
                  state={{ value: fm.value }}
                  className="flex items-center space-x-3.5 px-3 flex-auto leading-9 font-open_sans text-white border-b border-b-black/10 hover:underline"
                >
                  <fm.Icon className="w-3.5 h-3.5" />
                  <span>{fm.value}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </motion.nav>
    </>
  );
};

export default memo(NavMobile);
