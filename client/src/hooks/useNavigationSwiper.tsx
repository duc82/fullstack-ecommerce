import { useState } from "react";

type NavigationButton = HTMLButtonElement | null;

const useNavigationSwiper = () => {
  const [prevEl, setPrevEl] = useState<NavigationButton>(null);
  const [nextEl, setNextEl] = useState<NavigationButton>(null);

  const updatePrevEl = (node: NavigationButton) => {
    setPrevEl(node);
  };

  const updateNextEl = (node: NavigationButton) => {
    setNextEl(node);
  };

  return { prevEl, updatePrevEl, nextEl, updateNextEl };
};

export default useNavigationSwiper;
