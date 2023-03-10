import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { Close } from "../../icons/icons";
import { deleteItemCart } from "../../redux/reducers/cartSlice";
import formatVnd from "../../utils/formatVnd";




const Cart = () => {
  const dispatch = useDispatch();
  const { items, total } = useAppSelector((state) => state.cart)

  return (
    <div className="absolute right-0 top-10 z-[8282] pt-8 pb-1 hidden lg:hover:block lg:peer-hover:block">
      {items.length > 0 ? (
        <div className="bg-white w-72 shadow-md">
          <ul className="overflow-y-auto max-h-60 px-4">
            {items.map((item) => (
              <li
                key={item.id}
                className="py-4 flex items-start space-x-2 border-b border-b-zinc-200"
              >
                <Link to={`/${item.slug}`} className="w-16 h-16">
                  <img src={item.image} alt={"Cart Item"} />
                </Link>
                <div className="flex-1 min-w-0 relative">
                  <Link
                    to={`/${item.slug}`}
                    className="line-clamp-2 text-sm leading-5 pr-2.5 hover:text-red-700 transition duration-150 ease-in-out"
                  >
                    {item.name}
                  </Link>
                  <div className="flex items-center space-x-2">
                    <span className="text-red-700 font-bold uppercase">
                      {formatVnd(item.cost)}
                    </span>
                    <span className="text-zinc-500/75 font-bold">
                      x {item.quantity}
                    </span>
                  </div>
                  <button
                    onClick={() => dispatch(deleteItemCart(item.id))}
                    className="absolute top-0 -right-2.5 h-5 w-5 rounded-full text-black hover:bg-red-700 hover:text-white transition duration-150 ease-in-out"
                  >
                    <Close className="w-2.5 h-2.5 mx-auto" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-2.5 pt-2.5 px-4 text-center text-red-700 text-sm leading-6">
            T???ng c???ng:
            <span className="text-[13px] leading-6">
              {" "}
              {formatVnd(total)}
            </span>
          </div>
          <div className="mt-2.5 px-4 pb-4">
            <Link
              to="/cart"
              className="h-11 flex items-center justify-center text-center font-bold text-xs uppercase bg-red-700 text-white rounded-md shadow-md transition-colors ease-in duration-100 hover:border hover:border-red-700 hover:bg-white hover:text-red-700"
            >
              Ti???n h??nh thanh to??n
            </Link>
          </div>
        </div>
      ) : (
        <p className="bg-white w-72 py-1 px-1.5 shadow-md">
          Kh??ng c?? s???n ph???m n??o trong gi??? h??ng.
        </p>
      )}
    </div>
  );
};

export default memo(Cart);
