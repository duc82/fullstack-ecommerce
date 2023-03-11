import React, { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context/appContext";
import { CartShopping, Search } from "../../icons/icons";
import { addCart } from "../../redux/reducers/cartSlice";
import { ProductState } from "../../redux/reducers/productSlice";
import formatVnd from "../../utils/formatVnd";
import ProductRate from "./ProductRate";

type ProductCard = {
  product: ProductState;
  isCarousel?: boolean;
};

const ProductCard = ({ product, isCarousel = false }: ProductCard) => {
  const { openProductQuickview, openPopUpCart } = useGlobalContext();
  const [isHoverProductCard, setIsHoverProductCard] = useState(false);
  const dispatch = useDispatch();

  return (
    <div
      className={`select-none border boder-solid border-zinc-300 hover:shadow-card ${
        isCarousel && "border-l-0 border-t-0"
      }`}
      onMouseOver={() => setIsHoverProductCard(true)}
      onMouseLeave={() => setIsHoverProductCard(false)}
    >
      <div className="lg:px-2.5">
        {/* Product Image  */}
        <div className="relative group mb-0.5">
          <span className="absolute top-2.5 right-2.5 z-10 w-9 h-9 rounded-full text-xs leading-none bg-red-600 text-white flex justify-center items-center font-roboto">
            - {product.discount}%
          </span>
          <Link
            to={`/${product.slug}`}
            className="h-40 xs:h-56 w-full flex justify-center items-center relative before:content-[''] before:absolute before:w-full before:h-full before:transition-opacity before:ease-ease before:duration-200 before:z-10 before:bg-white before:opacity-0 group-hover:before:opacity-40"
          >
            <img
              loading="lazy"
              src={product.images[1].src}
              alt={product.images[1].alt}
              className="block max-h-full max-w-full mx-auto select-none"
            />
          </Link>
          <button
            type="button"
            onClick={() => openProductQuickview(product)}
            className={`hidden absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-30 scale-0 transition-all ease-ease duration-300 rounded-full bg-red-700 h-11 w-11 lg:inline-flex lg:items-center lg:justify-center shadow-xl shadow-black/10 ${
              isHoverProductCard ? "scale-100" : ""
            } group1`}
          >
            <Search className="text-white w-3.5 h-4" />
            <span className="absolute -top-9 left-1/2 -translate-x-1/2 rounded-sm px-1.5 text-xs leading-6 text-zinc-800 shadow-sm shadow-zinc-400 z-40 text-center min-w-[82px] bg-white hidden font-roboto group-[1:hover]:block before:content-[''] before:absolute before:-bottom-1.5 before:left-1/2 before:-translate-x-1/2 before:border-[6px] before:border-b-0 before:border-transparent before:border-t-white before:z-50">
              Xem nhanh
            </span>
          </button>
        </div>

        {/* Product Info */}
        <div className="px-4 relative pb-3 min-h-[120px]">
          {/* Rate  */}
          {!isHoverProductCard && (
            <React.Fragment>
              <div className="flex items-center space-x-0.5">
                <ProductRate rate={product.avgRating} />
                <span className="text-zinc-400/90 text-xs">
                  ({product.ratingCount})
                </span>
              </div>
              <Link
                to={`/${product.slug}`}
                className="text-[13px] text-zinc-800 leading-5 min-h-[40px] mt-1.5 mb-2 hover:text-red-700 line-clamp-2"
              >
                {product.name}
              </Link>
              <div className="flex flex-wrap items-center">
                <span className="text-red-700 text-[15px] mr-2.5">
                  {formatVnd(product.cost)}
                </span>
                <del className="text-xs font-light text-zinc-400/90">
                  {formatVnd(product.price)}
                </del>
              </div>
            </React.Fragment>
          )}

          {/* Them gio hang */}
          <div
            onClick={() => {
              dispatch(
                addCart({
                  id: product.id,
                  name: product.name,
                  slug: product.slug,
                  cost: product.cost,
                  image: product.images[1].src,
                  quantity: 1,
                })
              );
              openPopUpCart();
            }}
            className={`flex items-center justify-center h-0 ${
              isHoverProductCard ? "h-[92px]" : ""
            }`}
          >
            <button
              className={`flex items-center space-x-1 bg-red-700 rounded-3xl h-[30px] cursor-pointer text-[13px] px-5 text-white opacity-0 text-center transition-all ease-ease duration-300 ${
                isHoverProductCard ? "opacity-100" : ""
              }`}
            >
              <CartShopping className="w-3.5 h-3.5 text-white" />
              <p>Giỏ hàng</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(ProductCard);
