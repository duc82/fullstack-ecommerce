import React, { memo } from "react";
import { Star, StarFull, StarHalf } from "../../icons/icons";
import formatRate from "../../utils/formatRate";

interface ProductRateProps {
  rate: number;
  className?: string;
}

const ProductRate = ({ rate, className }: ProductRateProps) => {
  const arrRate = formatRate(rate);

  return (
    <>
      {rate > -1 && rate < 6 && (
        <div className="flex items-center space-x-0.5 h-5">
          {[...Array(parseInt(arrRate[0]))].map((_value, i) => (
            <StarFull
              key={i}
              className={`text-yellow-500 ${
                className ? className : "h-2.5 w-2.5"
              }`}
            />
          ))}
          {parseInt(arrRate[1]) > 4 && (
            <StarHalf
              className={`text-yellow-500 ${
                className ? className : "h-2.5 w-2.5"
              }`}
            />
          )}
          {[
            ...Array(
              5 - parseInt(arrRate[0]) - (parseInt(arrRate[1]) > 4 ? 1 : 0)
            ),
          ].map((_value, i) => (
            <Star
              key={i}
              className={`text-yellow-500 ${
                className ? className : "h-2.5 w-2.5"
              }`}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default memo(ProductRate);
