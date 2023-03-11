export const bannerVariants = {
  open: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
  },
  closed: {
    opacity: 0,
    scale: 0.5,
    rotateY: 180,
  },
};

export const portalVariants = {
  open: {
    opacity: 1,
    scale: 1,
    display: "flex",
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
  closed: {
    scale: 0.95,
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
    transitionEnd: {
      display: "none",
    },
  },
};
