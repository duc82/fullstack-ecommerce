import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "../components/Container/Container";
import InfiniteScroll from "react-infinite-scroll-component";

interface Products {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: number;
  category: string;
  thumbnail: string;
  images: string[];
}

const limit = 5;

const Test = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [skip, setSkip] = useState(0);

  const getMoreProduct = () => {
    setSkip((prev) => prev + limit);
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
        );

        setProducts((prev) => [...prev, ...res.data.products]);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [skip]);

  return (
    <Container className="pt-10">
      <ul>
        <InfiniteScroll
          dataLength={products.length}
          next={getMoreProduct}
          hasMore={products.length < 100}
          loader={<p className="text-center">Đang tải...</p>}
          scrollThreshold={0.6}
          endMessage={
            <p className="text-center">
              <b>Xin lỗi! Đã hết sản phẩm</b>
            </p>
          }
        >
          {products.map((product) => {
            return (
              <li className="mb-5" key={product.id}>
                <p>Id: {product.id}</p>
                <h1>Title: {product.title}</h1>
                <p>Description: {product.description}</p>
                <p>Price: {product.price}</p>
              </li>
            );
          })}
        </InfiniteScroll>
      </ul>
    </Container>
  );
};

export default Test;
