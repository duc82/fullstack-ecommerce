import React, { memo } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import Container from "../Container/Container";

const SkeletonProductOverview = () => {
  return (
    <SkeletonTheme duration={1}>
      <Breadcrumb />
      <Container>
        <section className="flex-col lg:flex-row flex mt-10">
          {/* Left */}
          <div className="lg:w-1/4 order-2 w-full lg:pr-4">
            <Skeleton height={50} />
          </div>
          {/* Right */}
          <div className="w-full lg:w-9/12 lg:order-2 lg:pl-4">
            <div className="md:flex">
              <div className="mb-8 md:w-1/2 md:flex-1 md:px-4">
                <div className="relative mb-4">
                  <Skeleton height={400} />
                </div>
                <div className="relative overflow-hidden w-full">
                  <div className="w-9/12 mx-auto grid grid-cols-3 gap-x-4">
                    <Skeleton height={80} />
                    <Skeleton height={80} />
                    <Skeleton height={80} />
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 md:flex-1 md:px-4">
                <div>
                  <h1 className="text-2xl font-medium text-zinc-800 font-roboto mb-4">
                    <Skeleton count={2} />
                  </h1>

                  <div className="mb-2.5 flex items-center space-x-1">
                    <Skeleton width={150} />
                  </div>
                  <div className="mb-4">
                    <Skeleton width={180} height={28} />
                  </div>
                  <div>
                    <Skeleton width={130} />
                  </div>
                </div>
                <ul className="pl-4">
                  {[...Array(4)].map((_, i) => (
                    <li
                      key={i}
                      className="list-disc list-outside text-zinc-500 flex"
                    >
                      <Skeleton width={300} />
                    </li>
                  ))}
                </ul>
                <div className="mt-5 pt-4 mb-2.5 border-t boder-t-zinc-200">
                  <Skeleton height={28} className="mb-5" />
                  <Skeleton height={30} />
                </div>
                <div className="mb-2.5">
                  <Skeleton />
                </div>
                <div>
                  <Skeleton />
                </div>
              </div>
            </div>
            <div className="mt-7">
              <div className="w-full border boder-zinc-200">
                <h3 className="bg-red-700 leading-[50px] px-6 text-white uppercase border-r border-r-200 inline-block">
                  Th??ng tin s???n ph???m
                </h3>
              </div>
              <div className="px-2.5 pt-2.5 lg:pt-7 lg:px-7 pb-5 border border-zinc-200 text-black font-timesNewRoman text-base leading-6">
                <p className="mb-4">
                  <img
                    src="//bizweb.dktcdn.net/100/009/443/files/doi-cu-so-huu-moi-web.png?v=1622793281583"
                    alt="Img Test"
                  />
                </p>
                <p className="mb-4">
                  <strong className="uppercase block">
                    T??nh n??ng n???i b???t c???a s???n ph???m
                  </strong>
                </p>
                <ul className="list-inside list-disc mb-4">
                  <Skeleton count={10} width={"50%"} />
                </ul>
                <p className="mb-4">
                  <strong className="uppercase block">Th??ng s??? k??? thu???t</strong>
                </p>
                <p className="mb-4">
                  <img
                    src="//bizweb.dktcdn.net/100/009/443/files/ac102.jpg?v=1609208781597"
                    alt="Img Test"
                  />
                </p>
                <div className="mb-4">
                  <div className="relative overflow-hidden w-full pt-[56.25%]">
                    <iframe
                      src="https://www.youtube.com/embed/nOmBSslaKIY?rel=0"
                      title="Video nhung youtube"
                      allowFullScreen
                      className="focus-visible:outline-none absolute inset-0 w-full h-full"
                    ></iframe>
                  </div>
                </div>
                <p className="mb-4">
                  V???i s??? ph??t tri???n v?? b??o c???a ng??nh c??ng ngh??? - ??i???n t??? hi???n
                  nay ???? v?? ??ang cho ra m???t c??c s???n ph???m ??u vi???t ????? ph???c v??? cho
                  cu???c s???ng c???a con ng?????i. Trong ????, n???i chi??n n?????ng kh??ng d???u
                  ch??nh l?? m???t trong nh???ng s???n ph???m ??u vi???t ??ang ???????c r???t nhi???u
                  ng?????i quan t??m kh??ng ch??? b???i s??? ti???n d???ng m?? c??n b???i c??c ??u
                  ??i???m n???i b???t m?? s???n ph???m ??em l???i.
                </p>
                <p className="mb-4">
                  Th??ng th?????ng, khi s??? d???ng c??c n???i chi??n truy???n th???ng s??? r???t
                  t???n k??m chi ph?? nguy??n li???u, th???i gian ch??? bi???n m?? c??n g??y h???i
                  cho s???c kh???e khi c??c m??n ??n s??? b??? ng???p d???u m???. S??? ra ?????i c???a
                  n???i chi??n n?????ng kh??ng d???u ???? gi??p c??c b?? n???i tr??? ti???t ki???m
                  ???????c ????ng k??? chi ph?? nguy??n li???u ?????ng th???i gi??p gi???m l?????ng d???u
                  m??? trong th???c ph???m gi??p b???o v??? s???c kh???e gia ????nh.
                </p>
              </div>
            </div>
            {/* Rating & reviews */}
            <div id="reviews" className="border-b border-b-zinc-300">
              <h4 className="my-2.5 text-base text-zinc-800 font-arial font-medium">
                ????nh gi?? s???n ph???m
              </h4>
            </div>
            <div className="flex items-center justify-between">
              <div className="w-1/2">
                <div className="pl-2.5 py-2 inline-block font-arial leading-tight">
                  <Skeleton height={70} />
                </div>
              </div>
              <div>
                <button className="py-1.5 px-4 bg-red-700 border-red-700 rounded-md text-white text-[17px] leading-6">
                  Vi???t ????nh gi??
                </button>
              </div>
            </div>
            <Skeleton />
            <Skeleton />
            <div className="pl-4 pt-1.5">
              <Skeleton />
              <Skeleton />
            </div>
          </div>
        </section>
      </Container>
    </SkeletonTheme>
  );
};

export default memo(SkeletonProductOverview);
