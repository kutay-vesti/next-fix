import DatePicker from "@components/common/DatePicker";
import { Star } from "@components/icons";
import { RadioGroup } from "@headlessui/react";
import { productPageQuery } from "graphql/__generated__/productPageQuery";
import * as _ from "lodash";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

interface IProductBuyOptionSelector {
  ProductData: productPageQuery | undefined;
  defaultColor: string | undefined;
  setDefaultColor: any;
  defaultSize: string | undefined;
  setDefaultSize: React.Dispatch<React.SetStateAction<string | undefined>>;
  mutationLoading: boolean;
  CurrentRetailPrice: number | undefined;
  HandleAddToCartRetail: () => void;
  sizeError: boolean;
  buttonDisabled?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductBuyOptionSelector: FC<IProductBuyOptionSelector> = ({
  ProductData,
  defaultColor,
  setDefaultColor,
  defaultSize,
  setDefaultSize,
  mutationLoading,
  CurrentRetailPrice,
  HandleAddToCartRetail,
  sizeError,
  buttonDisabled,
  setOpen,
}) => {
  return (
    <div className="bg-white w-full">
      {ProductData?.getProduct.product?.option1?.map((option1: any) => {
        if (option1.option1Value === "N/A") {
          return (
            <div
              className="flex flex-col"
              key={`${ProductData?.getProduct.product?.id}&buy`}
            >
              <div className=" p-4">
                <RadioGroup value={defaultColor} onChange={setDefaultColor}>
                  <RadioGroup.Label className="block  text-sm font-medium text-black">
                    Renk:{" "}
                    <span className="text-sm font-normal text-black">
                      {defaultColor}
                    </span>
                  </RadioGroup.Label>

                  <div className="flex items-center space-x-3 ">
                    {option1.color.map((color: any, index: number) => {
                      return (
                        <RadioGroup.Option
                          key={index}
                          value={color.colorValue}
                          className={({ active, checked }) =>
                            `mt-2  relative  rounded-full flex items-center justify-center cursor-pointer focus:outline-none 
                                        ${
                                          active || checked
                                            ? "ring-2 ring-offset-2 ring-black border-none"
                                            : "border-separate border-gray-700"
                                        } `
                          }
                        >
                          <RadioGroup.Label as="p" className="sr-only">
                            {color.colorValue}
                          </RadioGroup.Label>
                          <span
                            style={{
                              backgroundColor: color.hexCode,
                            }}
                            aria-hidden="true"
                            className={`h-8 w-8 border border-[#EEEEEE] rounded-full 
                                          `}
                          />
                        </RadioGroup.Option>
                      );
                    })}
                  </div>
                  {/* </Transition> */}
                </RadioGroup>
              </div>

              <div className="mx-4">
                <RadioGroup value={defaultSize} onChange={setDefaultSize}>
                  <RadioGroup.Label className="block text-sm font-medium text-black">
                    Beden:{" "}
                  </RadioGroup.Label>
                  <div className="flex items-center space-x-2 ">
                    {_.find(option1.color, {
                      colorValue: defaultColor,
                    })?.size.map((sizes: any, index: number) => {
                      return (
                        <RadioGroup.Option
                          className={({ checked, disabled }) =>
                            `
                                          ${
                                            sizeError &&
                                            defaultSize === "Select"
                                              ? "border border-red-500"
                                              : ""
                                          }
                                            ${
                                              checked
                                                ? "bg-black text-white rounded-sm"
                                                : " hover:opacity-60"
                                            }
                                          
                                            ${
                                              disabled
                                                ? "opacity-40 "
                                                : " bg-white border-black"
                                            }  border cursor-pointer   w-14 h-10 flex items-center justify-center `
                          }
                          key={index}
                          value={sizes.sizeValue}
                          disabled={!sizes.skus[0].isAvailable}
                        >
                          <span className={` text-sm select-none `}>
                            {sizes.sizeValue}
                          </span>
                          <RadioGroup.Label as="p" className="sr-only">
                            {`${
                              sizes.skus[0].isAvailable
                                ? sizes.sizeValue
                                : sizes.sizeValue + " beden mevcut değil"
                            }   `}
                          </RadioGroup.Label>
                        </RadioGroup.Option>
                      );
                    })}
                  </div>
                </RadioGroup>
                {sizeError && defaultSize === "Select" ? (
                  <span className="text-red-600 pt-1">Beden seçiniz</span>
                ) : null}
              </div>
              <div
                className="m-4"
                onClick={() => {
                  if (setOpen) setOpen(false);
                }}
              >
                <button
                  onClick={buttonDisabled ? () => {} : HandleAddToCartRetail}
                  className={`bg-black text-white text-lg font-medium w-full py-2 ${
                    mutationLoading ? "bg-gray-600 pointer-events-none" : ""
                  } ${buttonDisabled ? "bg-gray-600" : ""}`}
                >
                  {mutationLoading
                    ? "Sepete ekleniyor..."
                    : buttonDisabled
                    ? "Geri Dön"
                    : "Sepete ekle"}
                </button>
              </div>
            </div>
          );
          // return option1.option2.map((color) => {
          //   return (
          //     <div>
          //       <h1>{color.option2Value}</h1>

          //     </div>
          //   );
          // });
        }
        return (
          <div>
            <h1>problem</h1>
          </div>
        );
      })}
    </div>
  );
};

export default ProductBuyOptionSelector;
