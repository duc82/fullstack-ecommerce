import React from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import Container from "../components/Container/Container";

const NotFound = () => {
  return (
    <div>
      <Breadcrumb active="404 Không tìm thấy trang" />
      <Container className="my-5">
        <h1 className="text-3xl text-zinc-700 font-medium leading-snug">
          Lỗi không tìm thấy trang
        </h1>
        <p className="my-4">
          Xin lỗi, chúng tôi không tìm thấy kết quả nào phù hợp. Xin vui lòng
          quay lại trang chủ
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center bg-zinc-800 text-white h-10 px-5 text-lg"
        >
          Về trang chủ
        </Link>
      </Container>
    </div>
  );
};

export default NotFound;
