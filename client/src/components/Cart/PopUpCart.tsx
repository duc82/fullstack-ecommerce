import React, { memo } from "react";
import { Link } from "react-router-dom";
import { CaretDown, CaretUp, Check, XMark } from "../../icons/icons";
import formatVnd from "../../utils/formatVnd";
import { motion } from "framer-motion";
import { useGlobalContext } from "../../context/appContext";
import Overlay from "../Overlay/Overlay";
import { portalVariants } from "../../data/variants";
import useQuantity from "../../hooks/useQuantity";

const PopUpCart = () => {
  const { isOpenPopUpCart, closePopUpCart } = useGlobalContext();

  const {
    quantity,
    increaseQuantity,
    inputChangeQuantity,
    decreaseQuantity,
    resetQuantity,
  } = useQuantity(1, 100);

  return (
    <>
      <Overlay active={isOpenPopUpCart} />
      <motion.div
        initial={"closed"}
        variants={portalVariants}
        animate={isOpenPopUpCart ? "open" : "closed"}
        className="fixed inset-0 h-full w-full z-[828282] flex items-center justify-center"
      >
        <div
          onClick={closePopUpCart}
          className="w-full h-full fixed inset-0"
        ></div>
        <div className="max-w-4xl relative shadow-md rounded-md">
          <div className="px-7 py-4 bg-zinc-100 text-base flex items-center space-x-2">
            <Check className="w-5 h-5" />
            <p>
              Bạn đã thêm{" "}
              <Link to="/gio-hang" className="text-red-700 inline-block">
                Nồi chiên nướng không dầu Magic Eco AC-102 - Tặng Bộ thố Hoặc Bộ
                6 chén đũa
              </Link>{" "}
              vào giỏ hàng
            </p>
          </div>
          <div className="bg-white px-7 py-4">
            <h1 className="text-2xl hover:text-red-700 cursor-pointer mb-2 inline-block">
              Giỏ hàng của bạn
            </h1>
            <table className="w-full">
              <thead>
                <tr className="border-b border-b-zinc-200">
                  <th className="w-1/2 text-left py-4">Sản phẩm</th>
                  <th className="text-center py-4">Giá</th>
                  <th className="text-center py-4">Số lượng</th>
                  <th className="text-right py-4">Tổng tiền</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-b-zinc-200 min-h-[130px]">
                  <td className="w-1/2 text-left py-4">
                    <div className="flex items-start space-x-12">
                      <img
                        src="https://picsum.photos/1000?random=1"
                        alt=""
                        width={80}
                      />
                      <div>
                        <p className="line-clamp-2 mb-2">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Voluptas quisquam repellat numquam eius in
                          aperiam voluptates, cum voluptatibus, maxime quae sunt
                          dolorem voluptatem velit autem aut ducimus aliquam
                          enim eaque.
                        </p>
                        <button>Xoa</button>
                      </div>
                    </div>
                  </td>
                  <td className="text-center py-4">
                    <span className="text-red-700 font-bold">
                      {formatVnd(2500000)}
                    </span>
                  </td>
                  <td className="text-center py-4">
                    <div className="relative w-[100px] mx-auto">
                      <button
                        onClick={increaseQuantity}
                        className="absolute right-0 top-0 w-5 h-5 text-zinc-500 flex items-end justify-center"
                      >
                        <CaretUp className="w-2 h-3.5" />
                      </button>
                      <input
                        type="text"
                        id="quantity"
                        name="quantity"
                        value={quantity}
                        onChange={inputChangeQuantity}
                        className="border border-zinc-200 h-10 rounded-md text-center w-full"
                      />
                      <button
                        onClick={decreaseQuantity}
                        className="absolute right-0 bottom-0 w-5 h-5 text-zinc-500 flex items-start justify-center"
                      >
                        <CaretDown className="w-2 h-3.5" />
                      </button>
                    </div>
                  </td>
                  <td className="text-right py-4">
                    <span className="text-red-700 font-bold">
                      {formatVnd(2500000)}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex flex-col items-end">
              <div className="py-4 pb-2.5 pl-9">
                <p className="inline-block">Tổng số thành tiền:</p>{" "}
                <span className="text-red-700 font-bold text-lg inline-block">
                  {formatVnd(2500000)}
                </span>
              </div>
              <button
                onClick={() => {
                  if (!quantity) {
                    resetQuantity();
                  }
                }}
                type="button"
                className="font-roboto font-bold px-8 mb-2.5 border h-[50px] text-base border-red-700 text-center cursor-pointer transition-colors duration-100 ease-in flex-auto hover:bg-white hover:text-red-700 bg-red-700 text-white rounded-md"
              >
                Tiến hành thanh toán
              </button>
            </div>
          </div>
          <button
            onClick={closePopUpCart}
            className="absolute -top-2.5 -right-2.5 w-6 h-6 text-white bg-red-700 rounded-full z-[82828282]"
          >
            <XMark className="w-3.5 h-3.5 mx-auto" />
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default memo(PopUpCart);
