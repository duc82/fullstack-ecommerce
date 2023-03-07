import React, { memo } from "react";
import { motion } from "framer-motion";

interface OverlayProps {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  duration: number;
}

const Overlay = ({
  active = false,
  onClick,
  duration = 0.2,
}: Partial<OverlayProps>) => {
  const variants = {
    open: {
      opacity: 1,
      display: "flex",
      transition: {
        duration,
        ease: "easeIn",
      },
    },
    closed: {
      opacity: 0,
      transition: {
        duration,
        ease: "easeOut",
      },
      transitionEnd: {
        display: "none",
      },
    },
  };

  return (
    <motion.div
      initial={"closed"}
      variants={variants}
      animate={active ? "open" : "closed"}
      onClick={onClick}
      className="fixed inset-0 w-full h-full z-[8282] items-center bg-black/50"
    ></motion.div>
  );
};

export default memo(Overlay);
