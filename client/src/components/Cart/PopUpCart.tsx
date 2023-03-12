import React, { memo } from "react";
import { Link } from "react-router-dom";
import { CaretDown, CaretUp, Check, XMark } from "../../icons/icons";
import formatVnd from "../../utils/formatVnd";
import { motion } from "framer-motion";
import { useGlobalContext } from "../../context/appContext";
import Overlay from "../Overlay/Overlay";
import { portalVariants } from "../../data/variants";
import { useAppSelector } from "../../hooks/redux";
import { useDispatch } from "react-redux";
import { addItemCart } from "../../redux/reducers/cartSlice";

const PopUpCart = () => {
  const { items, total } = useAppSelector((state) => state.cart);
  const { isOpenPopUpCart, closePopUpCart } = useGlobalContext();
  const dispatch = useDispatch();

  const increaseQuantity = (index: number) => {
    console.log("hi");
  };

  const inputChangeQuantity = (index: number) => {
    console.log("change");
  };

  const decreaseQuantity = (index: number) => {
    console.log("hi");
  };

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
              <Link
                to="/gio-hang"
                className="text-red-700 inline-block line-clamp-2"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Cupiditate cumque, quo inventore, porro consequuntur ullam
                placeat sed facere dolor aut ea neque amet enim quam ipsa
                eveniet odit id voluptate.
              </Link>{" "}
              vào giỏ hàng
            </p>
          </div>
          <div className="bg-white px-7 py-4">
            <h1 className="text-2xl hover:text-red-700 cursor-pointer mb-2 inline-block">
              Giỏ hàng của bạn
            </h1>
            <table className="w-full">
              <thead className="block">
                <tr className="relative flex border-b border-b-zinc-200">
                  <th className="w-1/2 text-left py-4">Sản phẩm</th>
                  <th className="w-[15%] text-center py-4">Giá</th>
                  <th className="w-1/5 text-center py-4">Số lượng</th>
                  <th className="w-[15%] text-right py-4">Tổng tiền</th>
                </tr>
              </thead>
              <tbody className="block overflow-y-auto max-h-[260px]">
                {items.map((item, i) => (
                  <tr
                    key={i}
                    className="border-b flex items-center border-b-zinc-200"
                  >
                    <td className="w-1/2 text-left">
                      <div className="flex items-start space-x-10">
                        <Link to="/" className="w-[120px] h-[130px]">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full py-2.5 pr-2.5"
                          />
                        </Link>
                        <div className="py-4">
                          <p className="line-clamp-2 mb-2">{item.name}</p>
                          <button>Xoa</button>
                        </div>
                      </div>
                    </td>
                    <td className="w-[15%] text-center py-4">
                      <span className="text-red-700 font-bold">
                        {formatVnd(item.cost)}
                      </span>
                    </td>
                    <td className="w-1/5 text-center py-4">
                      <div className="relative w-[100px] mx-auto">
                        <button className="absolute right-0 top-0 w-5 h-5 text-zinc-500 flex items-end justify-center">
                          <CaretUp className="w-2 h-3.5" />
                        </button>
                        <input
                          type="text"
                          id="quantity"
                          name="quantity"
                          value={item.quantity}
                          onChange={() => inputChangeQuantity(i)}
                          className="border border-zinc-200 h-10 rounded-md text-center w-full"
                        />
                        <button
                          onClick={() => decreaseQuantity(i)}
                          className="absolute right-0 bottom-0 w-5 h-5 text-zinc-500 flex items-start justify-center"
                        >
                          <CaretDown className="w-2 h-3.5" />
                        </button>
                      </div>
                    </td>
                    <td className="w-[15%] text-right py-4">
                      <span className="text-red-700 font-bold">
                        {formatVnd(item.quantity * item.cost)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex flex-col items-end">
              <div className="py-4 pb-2.5 pl-9">
                <p className="inline-block">Tổng số thành tiền:</p>{" "}
                <span className="text-red-700 font-bold text-lg inline-block">
                  {formatVnd(total)}
                </span>
              </div>
              <button
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
