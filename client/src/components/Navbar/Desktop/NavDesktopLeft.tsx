import React, { memo } from "react";
import { Menus } from "../../../data/Menus";
import { motion } from "framer-motion";
import MenuItems from "./MenuItems";

type NavDesktopLeftProps = {
  active?: boolean;
}

const productCateVariants = {
  open: {
    height: "auto",
    display: "block",
    overflow: "hidden",
    transition: {
      duration: 0.3,
    },
    transitionEnd: {
      overflow: "visible",
    },
  },
  closed: {
    height: 0,
    overflow: "hidden",
    transition: {
      duration: 0.3,
    },
    transitionEnd: {
      display: "none",
    },
  },
};

const NavDesktopLeft = ({ active = false }: NavDesktopLeftProps) => {
  return (
    <motion.nav
      initial={"closed"}
      variants={productCateVariants}
      animate={active ? "open" : "closed"}
      className="absolute top-full left-0 z-[8282] w-full"
    >
      <ul className="relative block py-2.5 bg-white shadow-sm border border-zinc-200 border-solid border-t-0">
        {Menus[1].submenu?.map((productCate, i) => {
          const lengthProductCate = Menus[1].submenu?.length;
          return (
            <MenuItems
              key={i}
              items={productCate}
              isLastIndex={i + 1 !== lengthProductCate}
              className="text-xs font-semibold"
            />
          );
        })}
      </ul>
    </motion.nav>
  );
};

export default memo(NavDesktopLeft);
