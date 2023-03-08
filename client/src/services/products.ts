import axios from "axios";
import {
  getProductFailed,
  getProductStart,
  getProductSuccess,
  getSingleProductSuccess,
} from "../redux/reducers/productSlice";
import errorHandling from "../utils/errorHandling";
import { AppDispatch } from "../redux/store";

const getProducts = async (url: string, dispatch: AppDispatch) => {
  dispatch(getProductStart());

  try {
    const res = await axios.get(url);
    dispatch(getProductSuccess(res.data));
  } catch (error) {
    dispatch(getProductFailed(errorHandling(error).message));
  }
};

const getProductBySlug = async (url: string, dispatch: AppDispatch) => {
  dispatch(getProductStart());

  try {
    const res = await axios.get(url);
    dispatch(getSingleProductSuccess(res.data));
  } catch (error) {
    dispatch(getProductFailed(errorHandling(error).message));
  }
};

export { getProducts, getProductBySlug };
