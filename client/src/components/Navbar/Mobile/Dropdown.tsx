/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { memo } from "react";
import MenuItems from "./MenuItems";
import { motion } from "framer-motion";

interface DropdownProps {
  submenus: any[];
  dropdown: boolean;
  paddingLeft: number;
}

const ulDropdown = {
  open: {
    height: "auto",
    display: "block",
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
      overflow: "visible",
    },
  },
};

const Dropdown = ({ submenus, dropdown, paddingLeft }: DropdownProps) => {
  paddingLeft += 15;
  return (
    <motion.ul
      initial="closed"
      animate={dropdown ? "open" : "closed"}
      variants={ulDropdown}
    >
      {submenus.map((submenu, i) => (
        <MenuItems
          key={i}
          url={submenu.url}
          value={submenu.value}
          submenu={submenu.submenu ? submenu.submenu : []}
          paddingLeft={paddingLeft}
        />
      ))}
    </motion.ul>
  );
};

export default memo(Dropdown);
