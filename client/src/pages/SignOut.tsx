import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../hooks/redux";
import { resetAuth } from "../redux/reducers/authSlice";
import { signOut } from "../services/auth";

const SignOut = () => {
  const dispatch = useDispatch();
  const { data } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (data?.accessToken) {
      signOut(
        `${import.meta.env.VITE_API}/api/auth/signOut`,
        data.accessToken,
        dispatch
      );
    } else {
      dispatch(resetAuth());
    }
  }, [dispatch, data?.accessToken]);

  return <div>Loading</div>;
};

export default SignOut;
