import React, { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Alert from "../components/Alert/Alert";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import Container from "../components/Container/Container";
import ButtonSubmit from "../components/Form/ButtonSubmit";
import InputGroup from "../components/Form/InputGroup";
import { useAppSelector } from "../hooks/redux";
import { resetAuth } from "../redux/reducers/authSlice";
import { signUp } from "../services/auth";
import {
  ErrorForm,
  validateForm,
  validateFormEachField,
} from "../utils/validateForm";

const initialValueSignUp = {
  fullName: "",
  phone: "",
  email: "",
  password: "",
};

const SignUp = () => {
  const [value, setValue] = useState(initialValueSignUp);

  const [error, setError] = useState({} as ErrorForm);

  const {
    isLoggedIn,
    isLoading,
    error: errorApi,
  } = useAppSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let valueInput = e.target.value;
    if (e.target.name === "phone") {
      valueInput = valueInput.replace(/\D/g, "");
    }

    setValue({ ...value, [e.target.name]: valueInput });

    const err = validateFormEachField({
      name: e.target.name,
      value: valueInput,
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
    setError(initialValueSignUp);
    signUp(
      `${import.meta.env.VITE_API}/api/auth/signUp`,
      {
        ...value,
        phone: parseInt(value.phone),
      },
      dispatch,
      navigate
    );
  };

  if (isLoggedIn) return <Navigate to="/dang-nhap" />;

  return (
    <>
      <Breadcrumb active="Đăng ký tài khoản" />
      <Container className="mt-7">
        <h1 className="text-center font-roboto text-[26px] block mb-7">
          Đăng ký tài khoản
        </h1>
        <form onSubmit={handleSubmit} className="mb-14">
          <div className="w-full md:w-1/2 xl:w-1/3 mx-auto">
            {errorApi && (
              <div className="mb-4">
                <Alert
                  type="error"
                  value={errorApi}
                  onClick={() => dispatch(resetAuth())}
                />
              </div>
            )}
            <div className="flex flex-col w-full space-y-4 mb-6">
              <InputGroup
                name="fullName"
                id="fullName"
                value={value.fullName}
                content="Họ & tên"
                autoComplete="off"
                error={error.fullName}
                onInput={handleChange}
              />
              <InputGroup
                name="phone"
                id="phone"
                value={value.phone}
                content="Số điện thoại"
                autoComplete="off"
                error={error.phone}
                onInput={handleChange}
              />
              <InputGroup
                type="text"
                name="email"
                id="email"
                value={value.email}
                content="Email"
                autoComplete="off"
                error={error.email}
                onInput={handleChange}
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
              />
            </div>
            <div className="mb-4 block">
              <ButtonSubmit
                className="block w-full py-2.5 rounded-md text-base bg-red-700 text-white border border-red-700 uppease font-bold text-center transition-colors duration-100 ease-in hover:bg-white hover:text-red-700"
                isLoading={isLoading}
                value={"Đăng ký"}
                title="Đăng ký"
              />
            </div>
            <div className="text-center">
              <span className="text-zinc-500">
                Đã có tài khoản đăng nhập{" "}
                <Link to="/dang-nhap" className="text-zinc-800 hover:underline">
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

export default SignUp;
