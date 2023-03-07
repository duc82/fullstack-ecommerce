import React, { memo } from "react";

interface PageTitleProps {
  value: string;
}

const PageTitle = ({ value }: PageTitleProps) => {
  return (
    <h1 className="font-roboto text-lg inline-block text-zinc-800 font-medium relative uppercase my-5">
      <span className="block h-9 before:absolute before:left-0 before:bottom-0 before:content-[''] before:h-0.5 before:bg-red-700 before:w-[50px]">
        {value}
      </span>
    </h1>
  );
};

export default memo(PageTitle);
