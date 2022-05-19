import { ApolloClient } from "@apollo/client";
import { ChevronDown, ChevronUp } from "@components/icons";
import ProductCard from "@components/product/ProductCard";
import { initializeApollo } from "@lib/apollo";
import { getProductsQuery } from "graphql/queries";
import "swiper/css";
import "swiper/css/pagination";
import {
  getProducts,
  getProductsVariables,
} from "graphql/__generated__/getProducts";
import { GetStaticProps } from "next";
import { FC, useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
interface IProductCarousel {
  CollectionName: string;
  HeadlineText: string;
  productData: getProducts;
}
enum Sorting {
  AscendingRentingPrice = "AscendingRentingPrice",
  DescendingRentingPrice = "DescendingRentingPrice",
  Latest = "Latest",
  Recommended = "Recommended",
}

const ProductCarousel: React.FC<IProductCarousel> = ({
  CollectionName,
  HeadlineText,
  productData,
}) => {
  const swiper1 = useSwiper();
  const [swiperInst, setSwiperInst] = useState<any>(swiper1);
  const [activeIndex, setActiveIndex] = useState<any>(0);
  const [position, setPosition] = useState<"start" | "end" | "middle">("start");
  const [end, setEnd] = useState<boolean>(false);

  const handleDown = (slideIndex: number) => {
    swiperInst.slideTo(activeIndex - 5);
  };
  const handleUp = (slideIndex: number) => {
    swiperInst.slideTo(activeIndex + 5);
  };

  // console.log("productData", productData);

  const positionHandler = (slideIndex: number) => {
    if (slideIndex === 0) {
      return setPosition("start");
    } else if (end) {
      return setPosition("end");
    } else {
      if (position !== "middle") {
        setPosition("middle");

        return;
      }
    }
  };

  return (
    <div className=" flex justify-center  items-center ">
      <div className="py-16  w-full max-w-7xl ">
        <div className="px-4 flex items-center justify-between sm:px-6 lg:px-0 ">
          <h2 className="text-lg tracking-tight font-semibold text-gray-900">
            {HeadlineText}
          </h2>
          <a
            href="/h1"
            className="hidden sm:block text-sm font-light  text-stone-600 hover:text-stone-900 underline"
          >
            Bütün ürünleri göster<span aria-hidden="true"> &rarr;</span>
          </a>
        </div>
        <div className=" w-full flex px-2">
          <div className="flex-none">
            <button
              className={`${
                position === "start" ? "opacity-40  cursor-default " : ""
              } flex justify-center items-center h-full `}
              onClick={() => handleDown(1)}
            >
              <ChevronUp className="w-8 h-8 -rotate-90" />
            </button>
          </div>

          <Swiper
            slidesPerView={2}
            spaceBetween={1}
            //   pagination={{
            //     clickable: true,
            //   }}
            //   modules={[Pagination]}
            breakpoints={{
              640: {
                slidesPerView: 3,
                spaceBetween: 2,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 2,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 2,
              },
            }}
            className="mySwiper w-full "
            onSlideChange={() => {
              setActiveIndex(swiperInst.activeIndex);
              positionHandler(swiperInst.activeIndex);
              if (swiperInst.isEnd) {
                setEnd(true);
              } else {
                setEnd(false);
              }
            }}
            //   modules={[Pagination]}
            //   pagination={{
            //     dynamicBullets: false,
            //   }}
            onSwiper={(swiper) => {
              setSwiperInst(swiper);
            }}
          >
            {productData?.getProducts.products?.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard
                  id={product.id}
                  name={product.name}
                  rentPrice={product.rentalPrice4Days}
                  retailPrice={product.retailPrice}
                  description={product.description}
                  marketValue={product.marketValue}
                  productImages={product.productImages}
                  color={product.color}
                  brandName={product.brand?.name}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex-none">
            {" "}
            <button
              className={`${
                end ? "opacity-40  cursor-default" : ""
              } flex justify-center items-center h-full`}
              onClick={() => handleUp(1)}
            >
              <ChevronDown className="w-8 h-8 -rotate-90" />
            </button>
          </div>
        </div>
        {/* <div className="bg-cyan-600   ">
        <div className="flex flex-row w-full relative bg-yellow-200 mx-10">
          <div className=" py-1 h-full  absolute -left-8 ">
            <button
              className={`${
                position === "start" ? "opacity-40  cursor-default " : ""
              } flex justify-center items-center h-full `}
              onClick={() => handleDown(1)}
            >
              <ChevronUpIcon className="w-8 h-8 -rotate-90" />
            </button>
          </div>
          <div className="w-full mx-10">
            <Swiper
              slidesPerView={5}
              spaceBetween={0}
              //   pagination={{
              //     clickable: true,
              //   }}
              //   modules={[Pagination]}
              className="mySwiper w-full "
              onSlideChange={() => {
                setActiveIndex(swiperInst.activeIndex);
                positionHandler(swiperInst.activeIndex);
                if (swiperInst.isEnd) {
                  setEnd(true);
                } else {
                  setEnd(false);
                }
              }}
              //   modules={[Pagination]}
              //   pagination={{
              //     dynamicBullets: false,
              //   }}
              onSwiper={(swiper) => {
                setSwiperInst(swiper);
              }}
            >
              {productData?.getProducts.products?.map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductCart
                    id={product.id}
                    name={product.name}
                    rentPrice={product.rentalPrice4Days}
                    retailPrice={product.retailPrice}
                    description={product.description}
                    marketValue={product.marketValue}
                    productImages={product.productImages}
                    color={product.color}
                    brandName={product.brand?.name}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className=" py-1 h-full    absolute -right-8">
            <button
              className={`${
                end ? "opacity-40  cursor-default" : ""
              } flex justify-center items-center h-full`}
              onClick={() => handleUp(1)}
            >
              <ChevronDownIcon className="w-8 h-8 -rotate-90" />
            </button>
          </div>
        </div>
      </div> */}
      </div>
    </div>
  );
};

export default ProductCarousel;
