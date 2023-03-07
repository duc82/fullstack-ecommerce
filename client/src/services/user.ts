import { resetAuth } from "../redux/reducers/authSlice";
import {
  getUserStart,
  getUserSuccess,
  getUserFailed,
} from "../redux/reducers/userSlice";
import { AppDispatch } from "../redux/store";
import axiosJWT from "../utils/axiosJWT";
import errorHandling from "../utils/errorHandling";

export const getUser = async (
  url: string,
  accessToken: string,
  dispatch: AppDispatch
) => {
  dispatch(getUserStart());
  try {
    const res = await axiosJWT(accessToken, dispatch).get(url);
    dispatch(getUserSuccess(res.data));
  } catch (error) {
    dispatch(resetAuth());
    dispatch(getUserFailed(errorHandling(error).message));
  }
};
