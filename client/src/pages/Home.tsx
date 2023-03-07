import React, { useEffect, useState } from "react";
import Banner from "../components/Home/Banner";
import Hero from "../components/Home/Hero";
import ProductLists from "../components/Home/ProductLists";
import bannerFull from "../assets/banner_full_width.webp";
import Brand from "../components/Home/Brand";
import BlogLists from "../components/Home/BlogLists";
import Service from "../components/Home/Service";
import Container from "../components/Container/Container";
import { ProductState } from "../redux/reducers/productSlice";
import axios from "axios";
import errorHandling from "../utils/errorHandling";

export const productTest: ProductState[] = [];

for (let i = 0; i < 10; i++) {
  productTest.push({
    id: i,
    name: `Lo vi song ${i}`,
    slug: "lo-vi-song",
    cost: 600000,
    price: 1690000,
    discount: 50,
    bonus: "",
    stock: 50,
    brand: "Samsung",
    model: "LVS",
    currency: "VND",
    images: [
      {
        id: 1,
        src: `https://picsum.photos/1000?random=${i}`,
        alt: "Random image",
      },
      {
        id: 2,
        src: `https://picsum.photos/1000?random=${i + 1}`,
        alt: "Random image",
      },
      {
        id: 3,
        src: `https://picsum.photos/1000?random=${i + 2}`,
        alt: "Random image",
      },
    ],
    avgRating: 2.5,
    status: "Còn hàng",
    ratings: [
      {
        id: 1,
        rating: 2.6,
        name: "Duc Dang",
        email: "example@gmail.com",
        title: "San pham rat tot",
        comment: "abcxyz",
      },
    ],
    category: "Noi chien khong dau",
    ratingCount: 3,
    desc: "asdfsaf",
  });
}

const banner1 = [
  {
    href: "/",
    img: { src: bannerFull, alt: "abc" },
  },
];

const banner2 = [
  {
    href: "/",
    img: { src: "https://picsum.photos/1182/500?random=1", alt: "abc" },
  },
  {
    href: "/",
    img: { src: "https://picsum.photos/1182/500?random=2", alt: "abc" },
  },
  {
    href: "/",
    img: { src: "https://picsum.photos/1182/500?random=3", alt: "abc" },
  },
];

const banner3 = [...Array(2)].map((_, index) => {
  return {
    href: "/",
    img: {
      src: `https://picsum.photos/1182/500?random=${index + 1}`,
      alt: "abc",
    },
  };
});

const query = "?sort=sold-desc&limit=10";

const urls = [
  `${import.meta.env.VITE_API}/api/product/get/Tất cả sản phẩm${query}`,
  `${import.meta.env.VITE_API}/api/product/get/Nồi chiên không dầu${query}`,
];

const Home = () => {
  const [products, setProducts] = useState<ProductState[][]>([]);

  useEffect(() => {
    const promiseArray = urls.map((url) => axios.get(url));
    Promise.allSettled(promiseArray).then((res) => {
      const datas = res.map((r) =>
        r.status === "fulfilled" ? r.value.data.products : undefined
      );

      setProducts(datas);

      const errors = res.map((r) =>
        r.status === "rejected" ? errorHandling(r.reason).message : undefined
      );
    });
  }, []);

  return (
    <main>
      <Container>
        {/* Hero */}
        <Hero />

        {/* Top Product */}
        <ProductLists
          titleHeadValue="Top sản phẩm bán chạy"
          titleHeadUrl="san-pham-ban-chay"
          products={products[0]}
        />
        {/* Banner1 */}
        <Banner datas={banner1} />
        {/* AirFryer */}
        <ProductLists
          titleHeadValue="NỒI CHIÊN - AIR FRYER COLLECTION"
          titleHeadUrl="san-pham-ban-chay"
          products={products[1]}
        />

        {/* Banner2 */}
        <Banner datas={banner2} />
        {/* CollingFan - AirPurifier */}
        {/* <ProductLists
          titleHeadValue="Top sản phẩm bán chạy"
          titleHeadUrl="san-pham-ban-chay"
          category=""
        /> */}

        {/* Banner3 */}
        <Banner datas={banner3} />

        {/* New Products */}
        {/* <ProductLists
          titleHeadUrl="san-pham-moi"
          titleHeadValue="Sản phẩm mới"
          category=""
        /> */}

        {/* Banner4 */}
        <Banner datas={banner3} />
        {/* Brand */}
        <Brand />
        {/* Blog */}
        <BlogLists />
        {/* Service */}
        <Service />
      </Container>
    </main>
  );
};

export default Home;
