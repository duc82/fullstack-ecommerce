import { AppDispatch } from "./../redux/store/index";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import errorHandling from "./errorHandling";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { resetAuth, signInSuccess } from "../redux/reducers/authSlice";

const getRefreshToken = async (url: string, dispatch: AppDispatch) => {
  try {
    const res = await axios.get(url, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(errorHandling(error).message);
    dispatch(resetAuth());
  }
};

const reqInterceptors = async (
  config: InternalAxiosRequestConfig,
  accessToken: string,
  dispatch: AppDispatch
) => {
  config.headers.Authorization = `Bearer ${accessToken}`;
  const decodedToken = jwtDecode<JwtPayload>(accessToken);
  if ((decodedToken?.exp as JwtPayload) < new Date().getTime() / 1000) {
    const data = await getRefreshToken(
      `${import.meta.env.VITE_API}/api/auth/refreshToken`,
      dispatch
    );
    dispatch(signInSuccess(data));
    config.headers.Authorization = `Bearer ${data.accessToken}`;
  }

  return config;
};

const reqInterceptorsError = (error: AxiosError) => {
  return Promise.reject(error);
};

const axiosJWT = (accessToken: string, dispatch: AppDispatch) => {
  const instance = axios.create();
  instance.interceptors.request.use(
    (config) => reqInterceptors(config, accessToken, dispatch),
    reqInterceptorsError
  );

  return instance;
};

export default axiosJWT;
