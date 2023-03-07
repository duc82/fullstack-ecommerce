import React from "react";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import Container from "../components/Container/Container";
import { showrooms } from "../components/Footer/Footer";
import PageTitle from "../components/PageTitle/PageTitle";

const Showroom = () => {
  return (
    <div>
      <Breadcrumb active="Hệ thống cửa hàng" />
      <Container>
        <PageTitle value="Hệ thống cửa hàng" />
        <h2 className="font-timesNewRoman text-base font-bold uppercase mb-4">
          Miền Bắc
        </h2>
        <ul className="h-60 font-timesNewRoman text-base overflow-y-auto bg-white">
          {showrooms.map((showroom, i) => {
            return (
              <li key={i} className="mb-4 text-base">
                <strong>
                  {i + 1}. {showroom.address}:
                </strong>{" "}
                <a
                  className="hover:underline hover:text-red-700 font-medium transition-all ease-in-out duration-150 focus:text-blue-900 focus:underline"
                  href="https://www.google.com/maps/"
                  target={"_blank"}
                  rel="noreferrer"
                >
                  {showroom.detailedAddress}
                </a>
              </li>
            );
          })}
        </ul>
        <h2 className="font-timesNewRoman text-base font-bold uppercase mb-4">
          Miền Nam
        </h2>
        <ul className="h-60 font-timesNewRoman text-base overflow-y-auto bg-white">
          {showrooms.map((showroom, i) => {
            return (
              <li key={i} className="mb-4 text-base">
                <strong>
                  {i + 1}. {showroom.address}:
                </strong>{" "}
                <a
                  className="hover:underline hover:text-red-700 font-medium transition-all ease-in-out duration-150 focus:text-blue-900 focus:underline"
                  href="https://www.google.com/maps/"
                  target={"_blank"}
                  rel="noreferrer"
                >
                  {showroom.detailedAddress}
                </a>
              </li>
            );
          })}
        </ul>
      </Container>
    </div>
  );
};

export default Showroom;
