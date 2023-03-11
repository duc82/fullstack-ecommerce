import React, { memo } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import { AngleRight } from "../../icons/icons";
import Container from "../Container/Container";

type BreadcrumbItems = {
  src: string;
  value: string;
}

type BreadcrumbProps = {
  items?: BreadcrumbItems[];
  active?: string;
}

const Breadcrumb = ({ items, active }: BreadcrumbProps) => {
  return (
    <section className="bg-breadcrumb bg-no-repeat bg-cover bg-left-top block">
      <Container>
        {active ? (
          <ul className="py-4">
            <li className="inline-block leading-5">
              <Link
                to="/"
                className="text-zinc-500 hover:text-red-700 transition duration-150 ease-in-out"
              >
                Trang chủ
              </Link>
              <span className="leading-5">
                <AngleRight className="w-2.5 h-2.5 mx-2.5 inline-block text-zinc-500" />
              </span>
            </li>
            {items?.map((item, i) => (
              <li key={i} className="inline-block leading-5">
                <Link
                  to={item.src}
                  className="text-zinc-500 hover:text-red-700 transition duration-150 ease-in-out"
                >
                  {item.value}
                </Link>
                <span className="leading-5">
                  <AngleRight className="w-2.5 h-2.5 mx-2.5 inline-block text-zinc-500" />
                </span>
              </li>
            ))}

            <li className="inline-block leading-5">{active}</li>
          </ul>
        ) : (
          <Skeleton width={"50%"} height={20} className="my-4" />
        )}
      </Container>
    </section>
  );
};

export default memo(Breadcrumb);
