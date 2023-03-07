import React, { memo } from "react";
import ReviewItem from "./ReviewItem";

const Review = () => {
  return (
    <ul className="font-arial text-[13px] leading-normal">
      <ReviewItem />
    </ul>
  );
};

export default memo(Review);
