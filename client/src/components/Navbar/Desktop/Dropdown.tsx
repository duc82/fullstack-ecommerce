import React, { memo } from "react";
import { motion } from "framer-motion";
import MenuItems from "./MenuItems";

type DropdownProps = {
  submenus: any[];
  toggle?: () => void;
}

const variants = {
  open: {
    scaleX: 1,
    originX: 0,
    transition: {
      duration: 0.3,
    },
  },
  closed: {
    scaleX: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const Dropdown = ({ submenus, toggle }: DropdownProps) => {
  return (
    <motion.ul
      variants={variants}
      className="absolute top-0 left-full block w-full py-2.5 shadow-lg bg-white text-black z-[8282]"
    >
      {submenus.map((submenu, i) => (
        <MenuItems
          key={i}
          items={submenu}
          isLastIndex={i + 1 !== submenus.length}
          className="text-sm font-medium"
          toggle={toggle}
        />
      ))}
    </motion.ul>
  );
};

export default memo(Dropdown);
