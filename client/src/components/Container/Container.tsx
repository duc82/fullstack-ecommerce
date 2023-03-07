import React, { memo, CSSProperties } from "react";
import { ChildrenProps } from "../../types/types";

interface ContainerProps extends ChildrenProps {
  className?: string;
  style?: CSSProperties;
}

const Container = ({ children, className, style }: ContainerProps) => {
  return (
    <div
      style={style}
      className={`mx-auto md:max-w-3xl lg:max-w-5xl xl:max-w-6xl w-full px-4 ${className}`}
    >
      {children}
    </div>
  );
};

export default memo(Container);
