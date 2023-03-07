import axios from "axios";
import {
  getProductFailed,
  getProductStart,
  getProductSuccess,
} from "../redux/reducers/productSlice";
import errorHandling from "../utils/errorHandling";
import { AppDispatch } from "../redux/store";

const getProduct = async (url: string, dispatch: AppDispatch) => {
  dispatch(getProductStart());

  try {
    const res = await axios.get(url);
    dispatch(getProductSuccess(res.data));
  } catch (error) {
    dispatch(getProductFailed(errorHandling(error).message));
  }
};

export { getProduct };
