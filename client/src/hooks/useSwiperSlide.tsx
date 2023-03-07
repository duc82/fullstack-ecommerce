import { useState, useCallback } from "react";
import { Swiper as SwiperType } from "swiper";

const useSwiperSlide = () => {
  const [isEndSlide, setIsEndSlide] = useState(false);

  const handleChangeSlide = useCallback((swiper: SwiperType) => {
    const lastIndex = swiper.snapGrid.length - 1;
    if (swiper.isBeginning) {
      setIsEndSlide(false);
    } else if (lastIndex === swiper.activeIndex) {
      setIsEndSlide(true);
    }
  }, []);

  return { isEndSlide, handleChangeSlide };
};

export default useSwiperSlide;
