import axios from "axios";
import { addCart, getCart } from "../redux/reducers/cartSlice";
import { AppDispatch } from "../redux/store";
import errorHandling from "../utils/errorHandling";

interface CartItemsData {
  productId: number;
  quantity: number;
}

const getCartItem = async (url: string, dispatch: AppDispatch) => {
  try {
    const res = await axios.get(url, {
      withCredentials: true,
    });
    console.log(res.data);
    dispatch(getCart(res.data.cartItems));
  } catch (error) {
    console.log(errorHandling(error).message);
  }
};

const addCartItem = async (
  url: string,
  data: CartItemsData,
  dispatch: AppDispatch
) => {
  try {
    const res = await axios.post(url, data, {
      withCredentials: true,
    });
    console.log(res.data);
    dispatch(addCart(res.data.message));
    dispatch(getCart(res.data.cartItems));
  } catch (error) {
    console.log(errorHandling(error).message);
  }
};

export { getCartItem, addCartItem };
