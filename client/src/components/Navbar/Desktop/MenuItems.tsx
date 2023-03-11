import React, { memo } from "react";
import { Link } from "react-router-dom";
import { AngleRight } from "../../../icons/icons";
import { motion } from "framer-motion";
import Dropdown from "./Dropdown";
import capitalizeFirstLetter from "../../../utils/capitalizeFirstLetter";

type MenuItemsProps = {
  items: {
    value: string;
    url: string;
    submenu?: any[];
  };
  isLastIndex: boolean;
  className: string;
  toggle?: () => void;
}

const MenuItems = ({ items, isLastIndex, className }: MenuItemsProps) => {
  return (
    <>
      {items.submenu ? (
        <motion.li
          initial="closed"
          whileHover="open"
          className="px-5 text-zinc-800 hover:text-red-700"
        >
          <Link
            to={items.url}
            id="test"
            className={`flex justify-between items-center border-b-zinc-200 border-solid py-1.5 transition-all ease-in-out duration-150  ${isLastIndex && "border-b"
              } ${className} leading-6`}
          >
            <span>{capitalizeFirstLetter(items.value)}</span>
            <AngleRight className="w-1.5 h-3.5" />
          </Link>
          <Dropdown submenus={items.submenu} />
        </motion.li>
      ) : (
        <li className="px-5 text-zinc-800 hover:text-red-700">
          <Link
            to={items.url}
            className={`flex justify-between items-center border-b-zinc-200 border-solid py-1.5 transition-all ease-in-out duration-150 ${isLastIndex && "border-b"
              } ${className} leading-6`}
          >
            <span>{capitalizeFirstLetter(items.value)}</span>
          </Link>
        </li>
      )}
    </>
  );
};

export default memo(MenuItems);
