import React, { memo } from "react";
import { Link } from "react-router-dom";

interface TitleHeadProps {
  value: string;
  url: string;
}

const TitleHead = ({ value, url }: TitleHeadProps) => {
  return (
    <div className="w-full bg-zinc-100 border border-zinc-300 min-h-[50px]">
      <Link
        to={url}
        title={value.toUpperCase()}
        className="relative inline-block bg-red-700 text-white min-w-[185px] px-4 font-roboto text-base xl:text-lg xl:leading-[48px] uppercase font-semibold leading-[48px] before:absolute before:content-[''] before:right-0 before:border-t-[24px] before:border-t-zinc-100 before:border-l-[16px] before:border-l-transparent before:border-b-[24px] before:border-b-zinc-100"
      >
        {value}
      </Link>
    </div>
  );
};

export default memo(TitleHead);
