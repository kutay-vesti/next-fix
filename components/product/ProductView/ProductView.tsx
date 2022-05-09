import Image from "next/image";
import s from "./ProductView.module.css";
import { FC, useEffect, useState } from "react";
import { SEO } from "@components/common";
import { productPageQuery } from "graphql/__generated__/productPageQuery";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import * as _ from "lodash";
import {
  addToCartMutation,
  addToCartMutationVariables,
} from "graphql/__generated__/addToCartMutation";
import { RadioGroup } from "@headlessui/react";
import moment from "moment";
import ProductImageBox from "../ProductImageBox";
import ProductHeader from "../ProductHeader";
import ProductRentOption from "../ProductRentOption";
import ProductBuyOption from "../ProductBuyOption";

// import cn from 'clsx'
// import type { Product } from '@commerce/types/product'
// import usePrice from '@framework/product/use-price'
// import { WishlistButton } from '@components/wishlist'
// import { ProductSlider, ProductCard } from '@components/product'
// import { Container, Text } from '@components/ui'
// import ProductSidebar from '../ProductSidebar'
// import ProductTag from '../ProductTag'

interface ProductViewProps {
  productData: productPageQuery;
}

export const ADD_TO_CART_MUTATION = gql`
  mutation addToCartMutation($input: AddItemToCartInput!) {
    addItemToCart(input: $input) {
      ok
      error
      cart {
        id
        multipleVendors
        totalPrice
        cartItems {
          id
          itemType
          quantity
          sku {
            sku
            retailStock
            rentalStock
            rentalPrice4Days
            rentalPrice8Days
          }
        }
      }
    }
  }
`;

enum CartItemType {
  rental = "rental",
  retail = "retail",
}
enum RentalPeriod {
  eightDays = "eightDays",
  fourDays = "fourDays",
}

const ProductView: FC<ProductViewProps> = ({ productData }) => {
  const router = useRouter();
  const [lengthOfRent, setLengthOfRent] = useState<number>(4);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [productImages, setProductImages] = useState<any>(undefined);

  const [defaultColor, setDefaultColor] = useState<string | undefined>(
    productData.getProduct.product?.option1?.[0].color?.[0].colorValue
  );
  // const initialDefaultColor =
  //   productData.getProduct.product?.option1?.[0].color?.[0].colorValue !==
  //   defaultColor
  //     ? productData.getProduct.product?.option1?.[0].color?.[0].colorValue
  //     : undefined;
  const [defaultSize, setDefaultSize] = useState<string | undefined>("Select");
  const [isNullRent, setIsNullRent] = useState(false);

  const [sizeError, setSizeError] = useState<boolean>(false);
  const [dateError, setDateError] = useState<boolean>(false);

  //Type of operation => affects directly to boxes
  const [selected, setSelected] = useState("rentit");

  // useEffect(() => {
  //   if (
  //     productData.getProduct.product?.option1?.[0].color?.[0].colorValue !==
  //     defaultColor
  //   ) {
  //     setDefaultColor(
  //       productData.getProduct.product?.option1?.[0].color?.[0].colorValue
  //     );
  //   }

  //   if (
  //     productData.getProduct.product?.option1?.[0].color[0].images !==
  //     productImages
  //   ) {
  //     setProductImages(
  //       productData.getProduct.product?.option1?.[0].color?.[0].images
  //     );
  //   }
  // }, [defaultColor, productImages]);

  // current images
  const ImageSector =
    productData &&
    _.find(productData.getProduct.product?.option1?.[0].color, {
      colorValue: defaultColor,
    })?.images;

  // rental date calculator
  const rentalPeriodCalculator = () => {
    if (isNullRent) {
      return null;
    } else if (!isNullRent) {
      return lengthOfRent === 4
        ? RentalPeriod.fourDays
        : RentalPeriod.eightDays;
    } else {
      return undefined;
    }
  };
  //rental
  const HandleAddToCart = () => {
    console.log("running");
    if (defaultSize === "Select") {
      setSizeError(true);
      return;
    }

    if (date === undefined) {
      setDateError(true);
      return;
    }
    addToCartMutation({
      variables: {
        input: {
          sku: `${product?.id}-N/A-${defaultColor}-${defaultSize}`,
          quantity: 1,
          rentalPeriod: rentalPeriodCalculator(),
          itemType: CartItemType[CartItemType.rental],
          rentalStartDate: moment(date).format("YYYY-MM-DD"),
          rentalEndDate: moment(date)
            .add(lengthOfRent, "days")
            .format("YYYY-MM-DD"),
          isExpressShipping: false, //TODO add express shipping choose option
        },
      },
    });
  };
  //retail
  const HandleAddToCartRetail = () => {
    if (defaultSize === "Select") {
      setSizeError(true);
      return;
    }
    addToCartMutation({
      variables: {
        input: {
          sku: `${product?.id}-N/A-${defaultColor}-${defaultSize}`,
          quantity: 1,
          itemType: CartItemType[CartItemType.retail],
          isExpressShipping: false, //TODO add express shipping choose option
        },
      },
    });
  };

  //--------------------Logger--------------------
  // console.log("ImageSector", ImageSector);
  // console.log("productImages", productImages);
  // console.log("productData", productData);
  // console.log("defaultColor", defaultColor);
  //--------------------Logger--------------------

  //Current Size
  const CurrentProductSizes =
    productData &&
    _.find(productData.getProduct.product?.option1?.[0].color, {
      colorValue: defaultColor,
    })?.size;

  //Current Prices
  const CurrentRetailPrice = _.find(CurrentProductSizes, {
    sizeValue: defaultSize,
  })?.skus?.[0].discountedRetailPrice;
  const Current4DaysRentalPrice = _.find(CurrentProductSizes, {
    sizeValue: defaultSize,
  })?.skus?.[0].discountedRentalPrice4Days;
  const Current8DaysRentalPrice = _.find(CurrentProductSizes, {
    sizeValue: defaultSize,
  })?.skus?.[0].discountedRentalPrice8Days;

  const onCompletedMutation = (MutationData: addToCartMutation) => {
    console.log(MutationData);
    router.push("/cart");
  };
  const [
    addToCartMutation,
    { loading: mutationLoading, data: MutationData, error: mutationError },
  ] = useMutation<addToCartMutation, addToCartMutationVariables>(
    ADD_TO_CART_MUTATION,
    { onCompleted: onCompletedMutation }
  );

  const product = productData.getProduct.product;

  return (
    <>
      <div className=" h-full min-h-screen w-full grid justify-items-center phoneFin:py-4">
        <div className="max-w-7xl flex flex-col phoneFin:flex-row w-fit overflow-visible h-fit   phoneFin:gap-x-4   ">
          <div className=" w-full phoneFin:w-fit phoneFin:sticky phoneFin:top-0 phoneFin:h-fit  phoneFin:flex-1 ">
            <div className=" w-full   flex h-full ">
              <div className=" w-full h-96 ">
                <ProductImageBox productImages={ImageSector} />
              </div>
            </div>
          </div>
          <div className=" bg-white  my-4 w-full  phoneFin:w-480 flex-1 z-10">
            <div>
              <div className="">
                <ProductHeader productData={productData} />
                <div className="bg-white">
                  {/* <div className="h-px w-full bg-gray-500 my-1"></div> */}
                  <div className="mt-2">
                    <RadioGroup
                      value={selected}
                      onChange={setSelected}
                      className=""
                    >
                      <RadioGroup.Label className="sr-only">
                        Satınalma Seçenekleri
                      </RadioGroup.Label>
                      <div className="-space-y-px flex flex-col gap-y-4 w-full">
                        <ProductRentOption
                          lengthOfRent={lengthOfRent}
                          Current4DaysRentalPrice={Current4DaysRentalPrice}
                          Current8DaysRentalPrice={Current8DaysRentalPrice}
                          productData={productData}
                          defaultColor={defaultColor}
                          setDefaultColor={setDefaultColor}
                          defaultSize={defaultSize}
                          setDefaultSize={setDefaultSize}
                          setLengthOfRent={setLengthOfRent}
                          setDate={setDate}
                          date={date}
                          HandleAddToCart={HandleAddToCart}
                          mutationLoading={mutationLoading}
                          sizeError={sizeError}
                          dateError={dateError}
                        />
                        <ProductBuyOption
                          productData={productData}
                          defaultColor={defaultColor}
                          setDefaultColor={setDefaultColor}
                          defaultSize={defaultSize}
                          setDefaultSize={setDefaultSize}
                          mutationLoading={mutationLoading}
                          CurrentRetailPrice={CurrentRetailPrice}
                          HandleAddToCartRetail={HandleAddToCartRetail}
                          sizeError={sizeError}
                          dateError={dateError}
                        />
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                <div className="w-full pt-4 flez">
                  {/* <ProductDetails productData={productData} /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SEO
        title={product?.name}
        description={product?.description}
        openGraph={{
          type: "website",
          title: product?.name,
          description: product?.description,
          images: [
            {
              url: product?.option1?.[0].color?.[0].images?.[0].x1080!,
              width: "800",
              height: "600",
              alt: product?.name,
            },
          ],
        }}
      />
    </>
  );
};

export default ProductView;
