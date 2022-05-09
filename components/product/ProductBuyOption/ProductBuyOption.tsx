import { Star } from "@components/icons";
import { RadioGroup } from "@headlessui/react";
import { productPageQuery } from "graphql/__generated__/productPageQuery";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import ProductBuyOptionSelector from "../ProductBuyOptionSelector";
import ProductOptionSelector from "../ProductOptionSelector";

interface IProductBuyOption {
  productData: productPageQuery | undefined;
  defaultColor: string | undefined;
  setDefaultColor: any;
  defaultSize: string | undefined;
  setDefaultSize: React.Dispatch<React.SetStateAction<string | undefined>>;
  mutationLoading: boolean;
  CurrentRetailPrice: number | undefined;
  HandleAddToCartRetail: () => void;
  sizeError: boolean;
  dateError: boolean;
  buttonDisabled?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductBuyOption: FC<IProductBuyOption> = ({
  productData: ProductData,
  defaultColor,
  setDefaultColor,
  defaultSize,
  setDefaultSize,
  mutationLoading,
  CurrentRetailPrice,
  HandleAddToCartRetail,
  dateError,
  sizeError,
  buttonDisabled,
  setOpen,
}) => {
  return (
    <>
      <RadioGroup.Option
        value="butit"
        className={({ checked }) =>
          `
                ${checked ? "" : ""}
               ${checked ? "" : ""}
               ${
                 checked
                   ? "bg-gray-50 border-gray-200 z-10 "
                   : "border-gray-100 "
               }
                 relative border flex flex-row justify-start items-center  focus:outline-none
                `
        }
      >
        {({ active, checked }) => (
          <div className="w-full">
            <div
              className={`flex items-center bg-[#f7f7f7] w-full p-4 rounded-t-md ${
                setOpen ? "hidden" : null
              }`}
            >
              <span
                className={`
                                bg-white mt-0.5 ring-2 ring-offset-2 ring-black mx-2 h-4 w-4  cursor-pointer rounded-full  border-gray-900 flex items-center justify-center`}
                aria-hidden="true"
              >
                {active || checked ? (
                  <span className="rounded-full bg-black w-full h-full" />
                ) : (
                  ""
                )}
              </span>
              <div className="ml-3 flex flex-col">
                <RadioGroup.Label
                  as="span"
                  className={`
                      ${checked ? "text-gray-900" : "text-gray-900"}
                      block text-sm font-medium
                    `}
                >
                  <div>
                    <div className=" flex flex-col">
                      <div className="flex flex-col mb-2">
                        <div className="text-black font-semibold text-base">
                          Satın al
                        </div>
                        <div className="text-black font-normal text-sm ">
                          Bu ürünü hemen satın alın
                        </div>
                      </div>
                      <span className="text-black font-semibold text-base ">
                        ₺
                        {CurrentRetailPrice
                          ? CurrentRetailPrice
                          : ProductData?.getProduct.product
                              ?.discountedRetailPrice}
                      </span>
                    </div>
                  </div>
                </RadioGroup.Label>
              </div>
            </div>
            {checked ? (
              <ProductBuyOptionSelector
                ProductData={ProductData}
                defaultColor={defaultColor}
                setDefaultColor={setDefaultColor}
                defaultSize={defaultSize}
                setDefaultSize={setDefaultSize}
                mutationLoading={mutationLoading}
                CurrentRetailPrice={CurrentRetailPrice}
                HandleAddToCartRetail={HandleAddToCartRetail}
                sizeError={sizeError}
                buttonDisabled={buttonDisabled}
                setOpen={setOpen}
              />
            ) : null}
          </div>
        )}
      </RadioGroup.Option>
    </>
  );
};

export default ProductBuyOption;
