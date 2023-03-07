import axios from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Alert from "../components/Alert/Alert";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import Container from "../components/Container/Container";
import ButtonSubmit from "../components/Form/ButtonSubmit";
import InputGroup from "../components/Form/InputGroup";
import { useAppSelector } from "../hooks/redux";
import { resetAuth } from "../redux/reducers/authSlice";
import { validateFormEachField } from "../utils/validateForm";

const ResetPassword = () => {
  const [value, setValue] = useState({
    password: "",
    rePassword: "",
  });
  const [error, setError] = useState({
    password: "",
    rePassword: "",
  });
  const dispatch = useDispatch();
  const [urlSearchParams] = useSearchParams();
  const {
    isLoading,
    data,
    error: errorApi,
  } = useAppSelector((state) => state.auth);

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API}/api/auth/resetPassword`,
        {
          email: urlSearchParams.get("email"),
          token: urlSearchParams.get("token"),
          password: value.password,
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...value, [e.target.name]: e.target.value });
    const err = validateFormEachField({
      name: e.target.name,
      value: e.target.value,
      value2: e.target.name === "rePassword" ? value.password : "",
    });
    setError({ ...error, [e.target.name]: err });
  };

  return (
    <>
      <Breadcrumb active="Đổi mật khẩu" />
      <Container className="mt-7">
        <h1 className="text-center font-roboto text-[26px] block mb-7">
          Đổi mật khẩu
        </h1>
        <form onSubmit={handleSubmitForm} className="mb-14">
          <div className="w-full md:w-1/2 xl:w-1/3 mx-auto">
            {errorApi && (
              <Alert
                value={errorApi}
                type="error"
                onClick={() => dispatch(resetAuth())}
              />
            )}

            {data?.message && (
              <Alert
                value={data.message}
                type="success"
                onClick={() => dispatch(resetAuth())}
              />
            )}

            <div className="flex flex-col w-full space-y-4 mb-6">
              <InputGroup
                type="password"
                name="password"
                id="password"
                value={value.password}
                content="Mật khẩu mới"
                autoComplete="off"
                error={error.password}
                onChange={handleChangeValue}
              />
              <InputGroup
                type="password"
                name="rePassword"
                id="rePassword"
                value={value.rePassword}
                content="Xác nhận mật khẩu"
                autoComplete="off"
                error={error.rePassword}
                onChange={handleChangeValue}
              />
            </div>
            <div className="mb-4 block">
              <ButtonSubmit
                isLoading={isLoading}
                className="block w-full py-2.5 rounded-md text-base bg-red-700 text-white border border-red-700 uppease font-bold text-center transition-colors duration-100 ease-in hover:bg-white hover:text-red-700"
                value={"Đổi mật khẩu"}
                title={"Đổi mật khẩu"}
              />
            </div>
          </div>
        </form>
      </Container>
    </>
  );
};

export default ResetPassword;
