import React, { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menus } from "../../../data/Menus";
import { AngleDown } from "../../../icons/icons";
import { motion } from "framer-motion";
import MenuItems from "./MenuItems";

const variants = {
  open: {
    opacity: 1,
    top: "100%",
    display: "block",
    transition: {
      duration: 0.3,
    },
  },
  closed: {
    opacity: 0,
    top: "150%",
    transition: {
      duration: 0.3,
    },
    transitionEnd: {
      display: "none",
    },
  },
};

const NavDesktopRight = () => {
  const { pathname } = useLocation();

  return (
    <nav className="h-14">
      <ul className="h-full flex items-center">
        {Menus.map((menu, i) => {
          return (
            <React.Fragment key={i}>
              {menu.submenu ? (
                <motion.li
                  initial="closed"
                  whileHover="open"
                  animate="closed"
                  className={`relative px-1.5 xl:px-3.5 h-full flex items-center hover:text-red-700 ${
                    menu.url === pathname ? "text-red-700" : ""
                  }`}
                >
                  <Link
                    to={menu.url}
                    state={{ value: menu.value }}
                    className="h-full flex items-center space-x-1 px-2"
                  >
                    <span>{menu.value}</span>
                    <AngleDown className="w-2.5 h-3.5" />
                  </Link>
                  <motion.ul
                    variants={variants}
                    className="absolute top-full left-0 bg-white w-56 z-30"
                  >
                    {menu.submenu.map((productCate, i) => {
                      const lengthProductCate = menu.submenu.length;
                      return (
                        <MenuItems
                          key={i}
                          items={productCate}
                          isLastIndex={i + 1 !== lengthProductCate}
                          className="text-xs font-semibold"
                        />
                      );
                    })}
                  </motion.ul>
                </motion.li>
              ) : (
                <li
                  className={`px-1.5 xl:px-4 h-full flex items-center hover:text-red-700 ${
                    menu.url === pathname ? "text-red-700" : ""
                  }`}
                >
                  <Link
                    to={menu.url}
                    state={{ value: menu.value }}
                    className="h-full flex items-center px-2"
                  >
                    {menu.value}
                  </Link>
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ul>
    </nav>
  );
};

export default memo(NavDesktopRight);
