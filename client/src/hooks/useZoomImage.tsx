import { useState, MouseEvent } from "react";

const useZoomImage = () => {
  const [isHoverImage, setIsHoverImage] = useState(false);
  const [lens, setLens] = useState({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  });
  const [backgroundZoom, setBackgroundZoom] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const mouseOverImage = () => setIsHoverImage(true);

  const mouseOutImage = () => setIsHoverImage(false);

  const mouseMoveImage = (e: MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    setIsHoverImage(true);
    const image = e.target as HTMLImageElement;
    const { top, left } = image.getBoundingClientRect();

    let x = e.pageX - left - window.scrollX - lens.width / 2;
    let y = e.pageY - top - window.scrollY - lens.height / 2;

    if (x > image.offsetWidth - lens.width) {
      x = image.offsetWidth - lens.width;
    }
    if (x < 0) {
      x = 0;
    }
    if (y > image.offsetHeight - lens.height) {
      y = image.offsetHeight - lens.height;
    }
    if (y < 0) {
      y = 0;
    }

    setLens({
      ...lens,
      x,
      y,
    });

    const cx = image.offsetWidth / lens.width;
    const cy = image.offsetHeight / lens.height;

    setBackgroundZoom({
      x: x * cx,
      y: y * cy,
      width: image.width * cx,
      height: image.height * cy,
    });
  };

  return {
    isHoverImage,
    backgroundZoom,
    lens,
    mouseOverImage,
    mouseOutImage,
    mouseMoveImage,
  };
};

export default useZoomImage;
