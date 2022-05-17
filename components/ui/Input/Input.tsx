import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
interface IFormProps {
  title: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phoneNumber: string;
  firstname: string;
  lastname: string;
  isDefault: boolean;
  email: string;
}

interface InputInter {
  register: UseFormRegister<any>;
  defaultValue?: any;
  inputValue:
    | "title"
    | "phone"
    | "addressLine1"
    | "addressLine2"
    | "city"
    | "state"
    | "zipCode"
    | "country"
    | "phoneNumber"
    | "firstname"
    | "lastname"
    | "isDefault"
    | "email"
    | "creditCartNumber"
    | "nameOnCart"
    | "expirationDate"
    | "securityCode";

  placeHolder: string;
  disabled?: boolean;
}

const Input = ({
  register,
  defaultValue,
  inputValue,
  placeHolder,
  disabled,
}: InputInter) => {
  return (
    <>
      <div className="w-full   relative h-[56px] ">
        <input
          disabled={disabled !== undefined ? disabled : false}
          // defaultValue={defaultValue}
          className="peer h-full placeholder-transparent focus:outline-none text-[17px] text-[#333]
          w-full px-4 pt-[18px] pb-0 border border-[#d6d6d6] rounded-sm  
         focus:ring-2 ring-[#333]
          "
          {...register(inputValue)}
          type="text"
          placeholder={placeHolder}
          id={inputValue}
        ></input>
        <label
          htmlFor={inputValue}
          className="absolute left-[17px]  top-[.58824rem] text-[#666] text-xs transition-all
     peer-placeholder-shown:text-base peer-placeholder-shown:text-[#888] peer-placeholder-shown:top-[1.05882rem]
      peer-focus:top-[.58824rem] peer-focus:text-[#666] peer-focus:text-xs"
        >
          {placeHolder}
        </label>
      </div>

      {/* <div className="w-full   relative h-[56px] ">
        <input
          id="emaila"
          name="emaila"
          type="text"
          className="peer h-full placeholder-transparent focus:outline-none text-[17px] text-[#333]
     w-full px-4 pt-[18px] pb-0 border border-[#d6d6d6] rounded-sm  
    focus:ring-2 ring-[#333]
     "
          placeholder="john@doe.com"
        ></input>
        <label
          htmlFor="emaila"
          className="absolute left-[17px]  top-[.58824rem] text-[#666] text-xs transition-all
     peer-placeholder-shown:text-base peer-placeholder-shown:text-[#888] peer-placeholder-shown:top-[1.05882rem]
      peer-focus:top-[.58824rem] peer-focus:text-[#666] peer-focus:text-xs"
        >
          Email address
        </label> */}
      {/* <label
    htmlFor="emaila"
    className="absolute left-[17px] top-[.58824rem] text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-[1.05882rem] peer-focus:top-[.58824rem] peer-focus:text-gray-600 peer-focus:text-sm"
  >
    Email address
  </label> */}
      {/* <span
    aria-hidden="true"
    className="absolute top-[18px] left-[17px] text-[#888] ease-in duration-150 text-base font-normal transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
    id="idms-input-labelledby-1649180411938-0"
  >
    Ad

  </span> */}
      {/* </div> */}
    </>
  );
};

export default Input;
