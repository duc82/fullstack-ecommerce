import React, { memo, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Close } from "../../icons/icons";
import { Carts, deleteItemCart } from "../../redux/reducers/cartSlice";
import formatVnd from "../../utils/formatVnd";

type CartProps = {
  carts: Carts[];
}

const totalCostCartReduce = (carts: Carts[]) =>
  carts.reduce((a, b) => a + b.cost * b.quantity, 0);

const Cart = ({ carts }: CartProps) => {
  const totalCostCartItems = useMemo(() => totalCostCartReduce(carts), [carts]);
  const dispatch = useDispatch();

  return (
    <div className="absolute right-0 top-10 z-[8282] pt-8 pb-1 hidden lg:hover:block lg:peer-hover:block">
      {carts.length > 0 ? (
        <div className="bg-white w-72 shadow-md">
          <ul className="overflow-y-auto max-h-60 px-4">
            {carts.map((cart) => (
              <li
                key={cart.id}
                className="py-4 flex items-start space-x-2 border-b border-b-zinc-200"
              >
                <Link to={`/${cart.slug}`} className="w-16 h-16">
                  <img src={cart.image} alt={"Cart Item"} />
                </Link>
                <div className="flex-1 min-w-0 relative">
                  <Link
                    to={`/${cart.slug}`}
                    className="line-clamp-2 text-sm leading-5 pr-2.5 hover:text-red-700 transition duration-150 ease-in-out"
                  >
                    {cart.name}
                  </Link>
                  <div className="flex items-center space-x-2">
                    <span className="text-red-700 font-bold uppercase">
                      {formatVnd(cart.cost)}
                    </span>
                    <span className="text-zinc-500/75 font-bold">
                      x {cart.quantity}
                    </span>
                  </div>
                  <button
                    onClick={() => dispatch(deleteItemCart(cart.id))}
                    className="absolute top-0 -right-2.5 h-5 w-5 rounded-full text-black hover:bg-red-700 hover:text-white transition duration-150 ease-in-out"
                  >
                    <Close className="w-2.5 h-2.5 mx-auto" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-2.5 pt-2.5 px-4 text-center text-red-700 text-sm leading-6">
            Tổng cộng:
            <span className="text-[13px] leading-6">
              {" "}
              {formatVnd(totalCostCartItems)}
            </span>
          </div>
          <div className="mt-2.5 px-4 pb-4">
            <Link
              to="/cart"
              className="h-11 flex items-center justify-center text-center font-bold text-xs uppercase bg-red-700 text-white rounded-md shadow-md transition-colors ease-in duration-100 hover:border hover:border-red-700 hover:bg-white hover:text-red-700"
            >
              Tiến hành thanh toán
            </Link>
          </div>
        </div>
      ) : (
        <p className="bg-white w-72 py-1 px-1.5 shadow-md">
          Không có sản phẩm nào trong giỏ hàng.
        </p>
      )}
    </div>
  );
};

export default memo(Cart);
