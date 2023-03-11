import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import randomInt from "../../utils/randomInt";

const Loading = () => {
  return (
    <div className="loadingio-spinner-ellipsis-i1138j55jva">
      <div className="ldio-3m9u2msjlz5">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};



const SkeletonProductCard = () => {
  return (
    <SkeletonTheme duration={1}>
      <div className={`select-none border boder-solid border-zinc-300`}>
        <div className="lg:px-2.5">
          <div className="h-40 xs:h-56 w-full mb-0.5 flex items-center justify-center relative">
            <span className="absolute top-2.5 right-2.5 z-10 w-9 h-9 rounded-full text-xs leading-none bg-red-600 text-white flex justify-center items-center font-roboto">
              - {randomInt(0, 100)}%
            </span>

            <Loading />
          </div>
          <div className="pb-3 px-4 min-h-[120px]">
            <Skeleton width={"50%"} />
            <Skeleton className="mt-1.5 mb-0.5" height={20} />
            <Skeleton className="mb-2" height={20} />
            <div className="w-full grid grid-cols-2 gap-x-2.5">
              <Skeleton className="w-full" />
              <Skeleton className="w-full" />
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default SkeletonProductCard;
