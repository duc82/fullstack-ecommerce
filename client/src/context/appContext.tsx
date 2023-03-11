import React, { useState, createContext, useContext, useCallback } from "react";
import { ProductState } from "../redux/reducers/productSlice";
import { ChildrenProps } from "../types/types";

type AppContextType = {
  isOpenNavMobile: boolean;
  closeNavMobile: () => void;
  isActiveProductQuickview: boolean;
  openProductQuickview: (product: ProductState) => void;
  product: ProductState;
  closeProductQuickview: () => void;
  isOpenNavDesktopLeft: boolean;
  closeNavDesktopLeft: () => void;
  toggleNavDesktopLeft: () => void;
  openNavMobile: () => void;
  isOpenPopUpCart: boolean;
  openPopUpCart: () => void;
  closePopUpCart: () => void;
}

const AppContext = createContext({} as AppContextType);

const AppProvider = ({ children }: ChildrenProps) => {
  const [isOpenNavMobile, setIsOpenNavMobile] = useState(false);
  const [isOpenNavDesktopLeft, setIsOpenNavDesktopLeft] = useState(false);
  const [isActiveProductQuickview, setIsActiveProductQuickview] =
    useState(false);
  const [isOpenPopUpCart, setIsOpenPopUpCart] = useState(false);
  const [product, setProduct] = useState({} as ProductState);

  const closeNavMobile = useCallback(() => {
    setIsOpenNavMobile(false);
  }, []);

  const openNavMobile = useCallback(() => {
    setIsOpenNavMobile(true);
  }, []);

  const toggleNavDesktopLeft = useCallback(() => {
    setIsOpenNavDesktopLeft((prev) => !prev);
  }, []);

  const closeNavDesktopLeft = useCallback(() => {
    setIsOpenNavDesktopLeft(false);
  }, []);

  const openProductQuickview = useCallback((product: ProductState) => {
    setIsActiveProductQuickview(true);
    setProduct(product);
  }, []);

  const closeProductQuickview = useCallback(() => {
    setIsActiveProductQuickview(false);
  }, []);

  const openPopUpCart = useCallback(() => {
    setIsOpenPopUpCart(true);
  }, []);

  const closePopUpCart = useCallback(() => {
    setIsOpenPopUpCart(false);
  }, []);

  return (
    <AppContext.Provider
      value={{
        isOpenNavMobile,
        closeNavMobile,
        openNavMobile,
        isActiveProductQuickview,
        openProductQuickview,
        product,
        closeProductQuickview,
        isOpenNavDesktopLeft,
        closeNavDesktopLeft,
        toggleNavDesktopLeft,
        isOpenPopUpCart,
        openPopUpCart,
        closePopUpCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => useContext(AppContext);

export { AppProvider, AppContext, useGlobalContext };
