import { FC, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Controller, Thumbs } from "swiper";
import { useSwiper } from "swiper/react";
import { ChevronDown, ChevronUp } from "@components/icons";

interface IProductImageBox {
  productImages: any;
}

const ProductImageBox: FC<IProductImageBox> = ({ productImages }) => {
  console.log("productImages", productImages);
  const swiper1 = useSwiper();
  const [swiperInst, setSwiperInst] = useState<any>(swiper1);
  const [activeIndex, setActiveIndex] = useState<any>(0);
  const [position, setPosition] = useState<"start" | "end" | "middle">("start");

  const goSlide = (slideIndex: number) => {
    // if (swiperInst.isEnd()) {
    //   setEnd(true);
    //   return;
    // }
    swiperInst.slideTo(slideIndex);
  };
  const handleDown = (slideIndex: number) => {
    swiperInst.slidePrev();
  };
  const handleUp = (slideIndex: number) => {
    swiperInst.slideNext();
  };

  const positionHandler = (slideIndex: number) => {
    if (slideIndex === 0) {
      return setPosition("start");
    } else if (slideIndex === productImages.length - 1) {
      return setPosition("end");
    } else {
      if (position !== "middle") return setPosition("middle");
    }
  };
  return (
    <div className=" flex flex-row-reverse items-center  w-full">
      <Swiper
        className="w-screen  phoneFin:h-720 phoneFin:w-480 mr-4  items-center justify-center"
        onSlideChange={() => {
          setActiveIndex(swiperInst.activeIndex);
          positionHandler(swiperInst.activeIndex);
        }}
        modules={[Pagination]}
        pagination={{
          dynamicBullets: false,
        }}
        onSwiper={(swiper) => {
          setSwiperInst(swiper);
        }}
      >
        {productImages?.map((image: any) => {
          return (
            <SwiperSlide
              key={image.label}
              className=" h-auto w-full phoneFin:w-480 bg "
            >
              <div className=" h-full w-full ">
                <img className="h-full w-full" src={image.x1080} alt={image} />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div className=" flex-col w-24 justify-center items-center hidden phoneFin:flex">
        <div className=" py-1 w-full flex items-center justify-center">
          <button
            className={`${
              position === "start" ? "opacity-50  cursor-default " : ""
            }w-full flex justify-center `}
            onClick={() => handleDown(1)}
          >
            <ChevronUp className="w-6 h-6" />
          </button>
        </div>
        <div className="flex flex-col  ">
          <Swiper
            slidesPerView={5}
            modules={[Thumbs]}
            className="flex h-auto w-24   "
            direction={"vertical"}
          >
            {productImages?.map((tumbImage: any, index: number) => {
              return (
                <SwiperSlide
                  key={tumbImage.label}
                  className=" flex  items-center justify-around w-fit "
                >
                  <button
                    className="h-auto w-auto  flex rounded "
                    onClick={() => goSlide(Number(index))}
                  >
                    <img
                      className={`h-32 w-auto  m-1 ring-1 ring-gray-300 shadow-sm
                  
                      
                      ${
                        activeIndex === index
                          ? position === "start" || position === "end"
                            ? " opacity-60 cursor-default"
                            : "ring-gray-300  shadow-md opacity-80"
                          : " ring-gray-100"
                      }
              
                      
                      `}
                      src={tumbImage.x70}
                      alt={tumbImage.label}
                    />
                  </button>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <button
          className={`${
            position === "end" ? "opacity-50  cursor-default" : ""
          } w-full flex justify-center `}
          onClick={() => handleUp(1)}
        >
          <ChevronDown className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default ProductImageBox;
