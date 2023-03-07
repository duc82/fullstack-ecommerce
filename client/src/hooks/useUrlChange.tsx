import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useGlobalContext } from "../context/appContext";

const useUrlChange = () => {
  const { pathname } = useLocation();
  const { closeNavMobile, closeNavDesktopLeft } = useGlobalContext();

  useEffect(() => {
    window.scrollTo(0, 0);
    closeNavMobile();
    closeNavDesktopLeft();
  }, [pathname, closeNavMobile, closeNavDesktopLeft]);
};

export default useUrlChange;
