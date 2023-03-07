import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Container from "../components/Container/Container";
import { useAppSelector } from "../hooks/redux";
import { getUser } from "../services/user";
import formatDate from "../utils/formateDate";

const Account = () => {
  const { data } = useAppSelector((state) => state.auth);
  const { data: user } = useAppSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.accessToken) {
      getUser(
        `${import.meta.env.VITE_API}/api/user/get`,
        data.accessToken,
        dispatch
      );
    }
  }, [data, dispatch]);

  return (
    <Container className="my-8">
      {user && (
        <ul>
          <li>UserId: {user.id}</li>
          <li>Full Name: {user.fullName}</li>
          <li>Phone: 0{user.phone}</li>
          <li>Email: {user.email}</li>
          <li>
            <>createdAt: {formatDate(user.createdAt)}</>
          </li>
          <li>
            <>updateAt: {formatDate(user.updatedAt)}</>
          </li>
        </ul>
      )}
    </Container>
  );
};

export default Account;
