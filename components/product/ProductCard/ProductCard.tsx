import { FC, useEffect, useState } from "react";

import Link from "next/link";
import * as _ from "lodash";
import Image, { ImageProps } from "next/image";

import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import SwiperCore, { EffectFade } from "swiper";
import { Autoplay } from "swiper";
import {
  getProducts_getProducts_products_color,
  getProducts_getProducts_products_productImages,
} from "graphql/__generated__/getProducts";
import { RadioGroup } from "@headlessui/react";
import { useHover } from "@lib/hooks/useHover";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import { useDebounce } from "@lib/hooks/useDebounce";
interface IProductCartProps {
  id?: string;
  name: string;
  rentPrice: number;
  retailPrice: number;
  description: string;
  marketValue: number;
  productImages: getProducts_getProducts_products_productImages[] | any;
  color: getProducts_getProducts_products_color | null;
  brandName: string | undefined;
}

const placeholderImg = "/product-img-placeholder.svg";

const ProductCard: FC<IProductCartProps> = ({
  name,
  description,
  id,
  rentPrice,
  retailPrice,
  marketValue,
  productImages,
  color,
  brandName,
}) => {
  const [heartState, setHeartState] = useState(false);

  const [productColor, setProductColor] = useState(color?.values?.[0]);

  const swiper1 = useSwiper();
  const [swiperInst, setSwiperInst] = useState<SwiperCore>();

  const [hoverRef, isHovered] = useHover();

  // useEffect(() => {
  //   if (isHovered && swiperInst !== undefined) {
  //     swiper1.autoplay.start();
  //   } else if (!isHovered && swiper1 !== undefined) {
  //     swiper1.autoplay.stop();
  //     swiper1.slideTo(0);
  //   }
  // }, [isHovered, swiperInst]);

  // console.log("isHovered", isHovered);
  const delayedHover: boolean = useDebounce(isHovered, 250);

  useEffect(() => {
    if (isHovered && delayedHover && swiperInst !== undefined) {
      swiperInst.slideTo(1);
    } else if (!isHovered && swiperInst !== undefined) {
      swiperInst.slideTo(0, 500);
    }
  }, [delayedHover, isHovered, swiperInst]);

  return (
    <div
      className="ProductCartWrapper  w-full relative bg-white z-0
    
        "
      data-id="1"
    >
      {/* <div
      className="ProductCartWrapper  w-full outline rounded-sm 
      outline-stone-100 hover:outline-stone-200 outline-1
  
      relative hover:outline hover:shadow-sm stroke-1  "
      data-id="1"
    > */}

      <button
        className={` absolute top-0 right-0 label  z-10 p-2  ${
          !heartState ? "fill-white stroke-black " : "fill-black stroke-white"
        }`}
        onClick={() => setHeartState((state) => !state)}
      >
        <svg
          className="heart-icon"
          width="20px"
          height="17px"
          viewBox="0 0 20 17"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-labelledby="title"
        >
          <title>Heart</title>
          <path d="M10.0473476,15.9286957 C9.99170475,15.9286957 9.93606189,15.9113043 9.88856189,15.8765217 L9.16452618,15.3450435 C4.90377618,12.2208696 1.22388332,9.52243478 1.00945475,5.83895652 C0.932776177,4.50817391 1.32363332,3.3346087 2.14063332,2.44626087 C2.96102618,1.55373913 4.20416903,1 5.38624046,1 C7.27538332,1 8.94399046,1.95026087 10.1213119,3.68591304 C10.4164905,3.27686957 10.6682405,2.95478261 10.8975976,2.69321739 C11.8930619,1.55373913 13.1395976,1 14.7077762,1 C15.8898476,1 17.133669,1.55373913 17.9533833,2.44626087 C18.7703833,3.33530435 19.1612405,4.50817391 19.0838833,5.83895652 C18.8701333,9.52243478 15.190919,12.2208696 10.9294905,15.3450435 L10.2054547,15.8765217 C10.1579547,15.9113043 10.1029905,15.9286957 10.0473476,15.9286957"></path>
        </svg>
        <label className="sr-only">Add to Hearts</label>
      </button>
      {/* //TODO: eskiden burası a idi sonradan div e çevrildi dobule check please */}
      <div className=" cursor-pointer">
        <div className="flex flex-col  w-full ">
          <Link href={`/products/${id}?merchantId=something`}>
            <div className="flex flex-col  w-auto relative ">
              <div
                ref={hoverRef}
                className="image-container  flex-none h-fit  "
              >
                <Swiper
                  // onSwiper={(swiper) => {
                  //   setSwiperInst(swiper);
                  //   if (isHovered) {
                  //     swiperInst.slideTo(2);
                  //   } else {
                  //     swiperInst.slidePrev();
                  //   }
                  // }}
                  onSwiper={setSwiperInst}
                  spaceBetween={1}
                  centeredSlides={true}
                  // autoplay={{
                  //   delay: 1000,
                  // }}
                  // pagination={{
                  //   clickable: false,
                  // }}
                  speed={400}
                  effect={"fade"}
                  modules={[EffectFade]}
                  // navigation={true}
                  // modules={[Autoplay]}
                  className="mySwiper"
                >
                  <SwiperSlide key={productImages} className="">
                    <img
                      className="p-card-img w-full h-full object-cover "
                      src="https://vestiyerimagebucket.s3.amazonaws.com/finalProductImages/halston/mSGaWaZTT5Bt/pink/editorial/1080x"
                      alt={productImages}
                    />
                  </SwiperSlide>
                  {productImages.lenght > 2
                    ? null
                    : // (
                      //   productImages?.map((image) => (
                      //     <SwiperSlide key={image.imageURL} className="">
                      //       <img
                      //         className="p-card-img w-full h-full object-cover "
                      //         // className="p-card-img w-[280px] h-[420px] object-cover"
                      //         src={image.imageURL}
                      //         alt={description}
                      //       />
                      //     </SwiperSlide>
                      //   ))
                      // )
                      null}
                </Swiper>
              </div>
              <div className="image-overlay absolute top-0 " hidden>
                <div className="header">2</div>
                <div className="body ">3</div>
                <div className="footer">4</div>
              </div>
            </div>
          </Link>
          <div className="product description p-2">
            <div className="product description center  pt-2">
              <div className="desction-text line-clamp-2">
                <div>
                  <div className=" ">
                    <RadioGroup value={productColor} onChange={setProductColor}>
                      {/* <RadioGroup.Label className="block  text-sm font-medium text-black">
                        Renk:{" "}
                        <span className="text-sm font-normal text-black">
                          {productColor}
                        </span>
                      </RadioGroup.Label> */}

                      <div className="flex items-center space-x-2  ">
                        {color?.values?.map((col: any, index: number) => {
                          if (index > 4) {
                            return <></>;
                          }

                          return (
                            <RadioGroup.Option
                              key={index}
                              value={col}
                              className={({ active, checked }) =>
                                `mt-2  relative  rounded-full flex items-center justify-center cursor-pointer focus:outline-none
                                  ${
                                    active || checked
                                      ? "ring-1 ring-offset-1 ring-black border-none"
                                      : "border-separate border-gray-700"
                                  } `
                              }
                            >
                              <RadioGroup.Label as="p" className="sr-only">
                                {col}
                              </RadioGroup.Label>
                              <span
                                style={{
                                  backgroundColor: color.hexCodes?.[index],
                                }}
                                aria-hidden="true"
                                className={`h-5 w-5 border border-[#EEEEEE] rounded-full
                                    `}
                              />
                            </RadioGroup.Option>
                          );
                        })}
                      </div>
                      {/* </Transition> */}
                    </RadioGroup>
                  </div>
                </div>
                <Link href={`/products/${id}&merchantId=something`}>
                  <a>
                    <span
                      className="prdct-desc-cntnr-ttl font-semibold text-sm mr-1 text-black"
                      title={name}
                    >
                      {name}
                    </span>

                    <br />
                    <span
                      className="prdct-desc-cntnr-name text-sm text-gray-800"
                      title={description}
                    >
                      {brandName}
                    </span>
                  </a>
                </Link>
              </div>
            </div>

            {/* <div className="ratings ">
              <div className="star-w flex flex-row">
                <div className="empty">
                  // <div className="star">*</div>
                </div>
                <div className="full">
                  <div className="star">*</div>
                </div>
              </div>
            </div> */}
            <div className="price-promotion-container  py-1">
              <div className="prc-cntnr h-5  ">
                <span className="prc-box-sllng prc-box-sllng-w-dscntd text-sm py-0 font-light line-through  text-gray-600">
                  {marketValue}TL
                </span>
              </div>
              <div className="prmtn-cntnr">
                {/* <div
                    className="prmtn border-2 p-1"
                    title="Sepette %25 İndirim"
                  >
                    <div className="prmtn-ttl dscntd">
                      Kiralama fiyatı %20 indirimli
                    </div>
                    <div className="prc-box-dscntd">{rentPrice}</div>
                  </div> */}

                <div className="h-fit  pb-1 ">
                  <span className="text-black text-sm font-semibold ">
                    {rentPrice} TL'ye kirala
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
