import React, { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Alert from "../components/Alert/Alert";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import Container from "../components/Container/Container";
import ButtonSubmit from "../components/Form/ButtonSubmit";
import InputGroup from "../components/Form/InputGroup";
import { useAppSelector } from "../hooks/redux";
import { resetAuth } from "../redux/reducers/authSlice";
import { forgotPassword } from "../services/auth";
import { validateFormEachField } from "../utils/validateForm";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const {
    data,
    isLoading,
    error: errorApi,
  } = useAppSelector((state) => state.auth);

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    const err = validateFormEachField({
      value: e.target.value,
      name: e.target.name,
    });

    setError(err ? err : "");
  };

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const err = validateFormEachField({ value: email, name: "email" });
    if (err) {
      setError(err);
      return;
    }

    await forgotPassword(
      `${import.meta.env.VITE_API}/api/auth/forgotPassword`,
      email,
      dispatch
    );
  };

  return (
    <>
      <Breadcrumb active="Quên mật khẩu" />
      <Container className="mt-7">
        <h1 className="text-center font-roboto text-[26px] block mb-7">
          Quên mật khẩu
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

            <div className="mb-6">
              <InputGroup
                type="text"
                name="email"
                id="email"
                value={email}
                content="Email"
                autoComplete="off"
                error={error}
                onChange={handleChangeValue}
              />
            </div>
            <div className="mb-4 block">
              <ButtonSubmit
                isLoading={isLoading}
                className="block w-full py-2.5 rounded-md text-base bg-red-700 text-white border border-red-700 uppease font-bold text-center transition-colors duration-100 ease-in hover:bg-white hover:text-red-700"
                value={"Gửi"}
                title={"Gửi"}
              />
            </div>
            <div className="text-center">
              <span className="text-zinc-500">
                Quay lại đăng nhập{" "}
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

export default ForgotPassword;
