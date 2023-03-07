import { useEffect, useState } from "react";

const useScroll = (el?: HTMLElement) => {
  const [scrollPosition, setScrollPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition({
        x:
          el?.scrollLeft ||
          window.scrollX ||
          document.documentElement.scrollLeft,
        y:
          el?.scrollTop || window.scrollY || document.documentElement.scrollTop,
      });
    };

    (el || window).addEventListener("scroll", handleScroll);
    return () => (el || window).removeEventListener("scroll", handleScroll);
  }, [el]);

  return Object.values(scrollPosition); // or [scroll.x,scroll.y]
};

export default useScroll;
