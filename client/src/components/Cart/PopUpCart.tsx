import React, { ChangeEvent, memo, useEffect } from "react";
import { Link } from "react-router-dom";
import { CaretDown, CaretUp, Check, XMark } from "../../icons/icons";
import formatVnd from "../../utils/formatVnd";
import { motion } from "framer-motion";
import { useGlobalContext } from "../../context/appContext";
import Overlay from "../Overlay/Overlay";
import { portalVariants } from "../../data/variants";
import { useAppSelector } from "../../hooks/redux";
import { useDispatch } from "react-redux";
import { Close } from "../../icons/icons";
import {
  addItemCart,
  CartItem,
  subItemCart,
  updateItemCart,
  deleteItemCart
} from "../../redux/reducers/cartSlice";

const PopUpCart = () => {
  const { items, total, newItem } = useAppSelector((state) => state.cart);
  const { isOpenPopUpCart, closePopUpCart } = useGlobalContext();
  const dispatch = useDispatch();

  const increaseQuantity = (item: CartItem) => {
    dispatch(
      addItemCart({
        id: item.id,
        name: item.name,
        slug: item.slug,
        cost: item.cost,
        image: item.image,
        quantity: 1,
        stock: item.stock,
      })
    );
  };

  const inputChangeQuantity = (
    e: ChangeEvent<HTMLInputElement>,
    item: CartItem
  ) => {
    const value = e.target.value;

    const newValue = value.split(/\D/).join("");
    if (newValue) {
      dispatch(
        updateItemCart({
          id: item.id,
          name: item.name,
          slug: item.slug,
          cost: item.cost,
          image: item.image,
          quantity: parseInt(newValue),
          stock: item.stock,
        })
      );
    }
  };

  const decreaseQuantity = (item: CartItem) => {
    dispatch(
      subItemCart({
        id: item.id,
        name: item.name,
        slug: item.slug,
        cost: item.cost,
        image: item.image,
        quantity: 1,
        stock: item.stock,
      })
    );
  };

  useEffect(() => {
    if (items.length === 0) {
      closePopUpCart();
    }
  }, [items, closePopUpCart])

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
                className="text-red-700 inline-block"
              >{newItem?.name}
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
                <tr className="relative flex border-b border-b-zinc-300">
                  <th className="w-[15%] text-left py-4">Sản phẩm</th>
                  <th className="w-[35%] text-left py-4"></th>
                  <th className="w-[15%] text-center py-4">Giá</th>
                  <th className="w-1/5 text-center py-4">Số lượng</th>
                  <th className="w-[15%] text-right py-4">Tổng tiền</th>
                </tr>
              </thead>
              <tbody className="block overflow-y-auto max-h-72">
                {items.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b flex items-center border-b-zinc-300"
                  >
                    <td className="w-[15%] text-left">
                      <Link
                        to={"/" + item.slug}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="py-2.5 pr-2.5"
                        />
                      </Link>
                    </td>
                    <td className="w-[35%] text-left py-4 h-[136px]">
                      <div className="ml-5 ">
                        <Link to={"/" + item.slug} className="line-clamp-2 mb-1 pr-4 max-w-[250px] transition hover:text-red-700">{item.name}</Link>
                        <button className="text-zinc-500 leading-7 flex items-center space-x-1.5 mb-0.5" onClick={() =>
                          dispatch(deleteItemCart(item.id))
                        }>
                          <Close className="w-2.5 h-2.5" />
                          <span>
                            Xóa
                          </span>
                        </button>
                        {item.id === newItem?.id && <p className="flex items-center space-x-1.5 text-rose-500">
                          <Check className="w-3.5 h-3.5" />
                          <span>Sản phẩm vừa thêm</span>
                        </p>}
                      </div>
                    </td>
                    <td className="w-[15%] text-center py-4">
                      <span className="text-red-700 font-bold">
                        {formatVnd(item.cost)}
                      </span>
                    </td>
                    <td className="w-1/5 text-center py-4">
                      <div className="relative w-[100px] mx-auto">
                        <button
                          onClick={() => increaseQuantity(item)}
                          className="absolute right-0 top-0 w-5 h-5 text-zinc-500 flex items-end justify-center"
                        >
                          <CaretUp className="w-2 h-3.5" />
                        </button>
                        <input
                          type="text"
                          id="quantity"
                          name="quantity"
                          value={item.quantity}
                          onChange={(e) => inputChangeQuantity(e, item)}
                          className="border border-zinc-200 h-10 rounded-md text-center w-full"
                        />
                        <button
                          onClick={() => decreaseQuantity(item)}
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
