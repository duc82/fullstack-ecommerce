import { MouseEvent, useCallback, useState } from "react";

type Lens = {
  lensWidth: number;
  lensHeight: number;
};

type BackgroundZoom = {
  backgroundZoomWidth: number;
  backgroundZoomHeight: number;
};

const useZoomImage = ({
  lensWidth,
  lensHeight,
  backgroundZoomHeight,
  backgroundZoomWidth,
}: Lens & BackgroundZoom) => {
  const [isHoverImage, setIsHoverImage] = useState(false);
  const [lens, setLens] = useState({
    x: 0,
    y: 0,
  });
  const [backgroundZoom, setBackgroundRoom] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  const mouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      const container = e.currentTarget;
      const containerRect = container.getBoundingClientRect();
      let x = e.clientX - containerRect.left - lensWidth / 2;
      let y = e.clientY - containerRect.top - lensHeight / 2;

      const minX = 0;
      const minY = 0;
      const maxX = containerRect.width - lensWidth;
      const maxY = containerRect.height - lensHeight;

      if (x <= minX) {
        x = minX;
      } else if (x >= maxX) {
        x = maxX;
      }

      if (y <= minY) {
        y = minY;
      } else if (y >= maxY) {
        y = maxY;
      }

      const fx = backgroundZoomWidth / lensWidth;
      const fy = backgroundZoomHeight / lensHeight;

      setLens({ x, y });
      setBackgroundRoom({
        width: containerRect.width * fx,
        height: containerRect.height * fy,
        x: -x * fx,
        y: -y * fy,
      });
    },
    [lensHeight, lensWidth, backgroundZoomHeight, backgroundZoomWidth]
  );

  const mouseOver = useCallback(() => setIsHoverImage(true), []);

  const mouseLeave = useCallback(() => setIsHoverImage(false), []);

  return {
    lens,
    backgroundZoom,
    mouseMove,
    mouseOver,
    mouseLeave,
    isHoverImage,
  };
};

export default useZoomImage;
