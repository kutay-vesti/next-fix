import DatePicker from "@components/common/DatePicker";
import { Star } from "@components/icons";
import { RadioGroup } from "@headlessui/react";
import { productPageQuery } from "graphql/__generated__/productPageQuery";
import * as _ from "lodash";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

interface IProductOptionSelector {
  lengthOfRent: number;
  ProductData: productPageQuery | undefined;
  defaultColor: string | undefined;
  setDefaultColor: any;
  defaultSize: string | undefined;
  setDefaultSize: React.Dispatch<React.SetStateAction<string | undefined>>;
  setLengthOfRent: React.Dispatch<React.SetStateAction<number>>;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  date: Date | undefined;
  HandleAddToCart: () => void;
  mutationLoading: boolean;
  sizeError: boolean;
  dateError: boolean;
  buttonDisabled?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductOptionSelector: FC<IProductOptionSelector> = ({
  ProductData,
  defaultColor,
  setDefaultColor,
  defaultSize,
  setDefaultSize,
  sizeError,
  lengthOfRent,
  setLengthOfRent,
  setDate,
  date,
  HandleAddToCart,
  mutationLoading,
  dateError,
  buttonDisabled,
  setOpen,
}) => {
  return (
    <div className="bg-white w-full ">
      {ProductData?.getProduct.product?.option1?.map((option1: any) => {
        if (option1.option1Value === "N/A") {
          return (
            <div className="flex flex-col " key={option1}>
              <div className=" p-4">
                <RadioGroup value={defaultColor} onChange={setDefaultColor}>
                  <RadioGroup.Label className="block  text-sm font-medium text-black">
                    Renk:{" "}
                    <span className="text-sm font-normal text-black">
                      {defaultColor}
                    </span>
                  </RadioGroup.Label>

                  <div className="flex items-center space-x-3  ">
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
                            sizeError && defaultSize === "Select"
                              ? "border border-red-500"
                              : ""
                          }
                            
                            ${
                              checked
                                ? "bg-black text-white rounded-sm"
                                : " hover:opacity-60"
                            }
                          
                            ${
                              disabled ? "opacity-40 " : ""
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

              <div className="mx-4">
                <div className="flex py-4 flex-col">
                  {/* TODO:Check box ekle güne bağla */}
                  <div className="text-sm font-semibold mb-2">
                    Kiralama süresini seçin
                  </div>

                  <div className="flex ">
                    <div className="flex flex-col items-center justify-center mr-4">
                      <div className="flex gap-x-1 flex-row items-center justify-center">
                        <input
                          className="h-4 w-4 "
                          type="radio"
                          name="date-picker"
                          value="4days"
                          // checked={
                          //   lengthOfRent === 4
                          // }
                          defaultChecked={lengthOfRent === 4}
                          onClick={() => setLengthOfRent(4)}
                        />
                        <label className="text-sm font-semibold">
                          4 günlük kirala
                        </label>
                      </div>
                      <div className="flex  gap-x-1 flex-row items-center justify-center">
                        <input
                          className="h-4 w-4 "
                          type="radio"
                          name="date-picker"
                          value="8days"
                          // checked={
                          //   lengthOfRent === 8
                          // }
                          defaultChecked={lengthOfRent === 8}
                          onClick={() => setLengthOfRent(8)}
                        />
                        <label className="text-sm font-semibold">
                          8 günlük kirala
                        </label>
                      </div>
                    </div>
                    <div>
                      <DatePicker
                        lengthOfRent={lengthOfRent}
                        setDate={setDate}
                        date={date}
                        dateError={dateError}
                      />
                    </div>
                  </div>
                  {dateError && date === undefined ? (
                    <span className="text-red-600 pt-2 w-full">
                      Kiralama yapmak için tarih seçmelisiniz
                    </span>
                  ) : null}
                </div>
                <div
                  onClick={() => {
                    if (setOpen) setOpen(false);
                  }}
                >
                  <button
                    onClick={buttonDisabled ? () => {} : HandleAddToCart}
                    className={`bg-black text-white text-lg font-medium w-full py-2 mb-4${
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
            </div>
          );
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

export default ProductOptionSelector;
