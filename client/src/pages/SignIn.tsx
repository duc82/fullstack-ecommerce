import React, { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Alert from "../components/Alert/Alert";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import Container from "../components/Container/Container";
import ButtonSubmit from "../components/Form/ButtonSubmit";
import InputGroup from "../components/Form/InputGroup";
import { useAppSelector } from "../hooks/redux";
import { resetAuth } from "../redux/reducers/authSlice";
import { signIn } from "../services/auth";
import {
  ErrorForm,
  validateForm,
  validateFormEachField,
} from "../utils/validateForm";

const initialValue = {
  email: "",
  password: "",
};

const SignIn = () => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState({} as ErrorForm);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    isLoggedIn,
    isLoading,
    error: errorApi,
  } = useAppSelector((state) => state.auth);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...value, [e.target.name]: e.target.value });

    const err = validateFormEachField({
      name: e.target.name,
      value: e.target.value,
    });

    setError({ ...error, [e.target.name]: err });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const err = validateForm(value);

    if (err) {
      setError(err);
      return;
    }
    setError(initialValue);
    signIn(
      `${import.meta.env.VITE_API}/api/auth/signIn`,
      value,
      dispatch,
      navigate
    );
    setValue(initialValue);
  };

  if (isLoggedIn) return <Navigate to="/tai-khoan" />;

  return (
    <>
      <Breadcrumb active="Đăng nhập tài khoản" />
      <Container className="mt-7">
        <h1 className="text-center font-roboto text-[26px] block mb-7">
          Đăng nhập tài khoản
        </h1>
        <form onSubmit={handleSubmit} className="mb-14" method="POST">
          <div className="w-full md:w-1/2 xl:w-1/3 mx-auto">
            {errorApi && (
              <div className="mb-4">
                <Alert
                  value={errorApi}
                  type="error"
                  onClick={() => dispatch(resetAuth())}
                />
              </div>
            )}
            <div className="flex flex-col w-full space-y-4 mb-6">
              <InputGroup
                type="text"
                name="email"
                id="email"
                value={value.email}
                content="Email"
                autoComplete="off"
                error={error.email}
                onInput={handleChange}
                autoFocus={false}
              />
              <InputGroup
                type="password"
                name="password"
                id="password"
                value={value.password}
                content="Mật khẩu"
                autoComplete="off"
                error={error.password}
                onInput={handleChange}
                autoFocus={false}
              />
              <div>
                <Link
                  to="/quen-mat-khau"
                  className="text-zinc-500 cursor-pointer hover:underline"
                >
                  Quên mật khẩu?
                </Link>
              </div>
            </div>
            <div className="mb-4 block">
              <ButtonSubmit
                className="block w-full py-2.5 rounded-md text-base bg-red-700 text-white border border-red-700 uppease font-bold text-center transition-colors duration-100 ease-in hover:bg-white hover:text-red-700"
                isLoading={isLoading}
                value={"Đăng nhập"}
                title="Đăng nhập"
              />
            </div>
            <div className="text-center">
              <span className="text-zinc-500">
                Chưa có tài khoản đăng ký{" "}
                <Link to="/dang-ky" className="text-zinc-800 hover:underline">
                  tại đây
                </Link>
              </span>
            </div>
          </div>
        </form>
      </Container>
    </>
  );
};

export default SignIn;
