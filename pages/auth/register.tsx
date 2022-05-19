import { ApolloError, gql, useMutation } from "@apollo/client";
import { Layout } from "@components/common";
import Button from "@components/ui/Button";
import {
  createAccountMutation,
  createAccountMutationVariables,
} from "graphql/__generated__/createAccountMutation";
import { UserRole } from "graphql/__generated__/globalTypes";
import Link from "next/link";
import { useRouter } from "next/router";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

export const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccountMutation($input: CreateUserInput!) {
    createUser(input: $input) {
      ok
      error
    }
  }
`;
interface ICreate {
  setForm?: React.Dispatch<React.SetStateAction<"register" | "login">>;
}

interface IForm {
  email: string;
  phone?: string | null;
  password: string;
  role: UserRole;
  otp: string;
}

const CreateAccount = ({ setForm }: ICreate) => {
  const router = useRouter();

  const [otpState, setOtpState] = useState<any>(false);
  const [otpError, setOtpError] = useState("");

  const {
    register,
    getValues,
    watch,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<IForm>({
    mode: "onChange",
  });

  const onCompleted = (data: createAccountMutation) => {
    const {
      createUser: { ok },
    } = data;
    if (ok) {
      alert("account created! log in now!");
      router.push("/auth/login");
    }
  };
  const onError = (error: ApolloError) => {};
  const [
    createAccountMutation,
    { loading, data: createAccountMutationResult },
  ] = useMutation<createAccountMutation, createAccountMutationVariables>(
    CREATE_ACCOUNT_MUTATION,
    {
      onError,
      onCompleted,
    }
  );
  const onSubmit = () => {
    if (!loading) {
      const { email, password, phone } = getValues();

      createAccountMutation({
        variables: {
          input: { email, password, role: UserRole.User, phone },
        },
      });
    }
  };

  // console.log("watch", watch().otp);
  return (
    <div className=" py-8 flex items-center justify-center relative">
      <div className="bg-white w-full max-w-lg pb-7 rounded-lg text-start text-sm">
        <h3 className="text-3xl text-gray-800 text-center"> Hesap yaratın </h3>

        <div className="px-5 py-4">
          Hesabınız var mı ?
          {setForm ? (
            <button
              className="underline text-sm font-normal"
              onClick={() => setForm("login")}
            >
              Giriş yap
            </button>
          ) : (
            <Link href="/auth/login">
              <a className=" text-black underline font-medium hover:opacity-80">
                giriş yapın
              </a>
            </Link>
          )}
        </div>

        {/* {createAccountMutationResult?.createUser.error && (
          <FormError
            errorMessage={createAccountMutationResult.createUser.error}
          />
        )} */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-2  px-5 mb-3"
        >
          <div className="w-full   relative h-[56px] ">
            <input
              {...register("email", {
                required: "email  is required",
                minLength: {
                  value: 4,
                  message: "en az 4 adet olmali",
                },
                pattern: {
                  value:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "not valid mail",
                },
              })}
              className="peer h-full placeholder-transparent focus:outline-none text-[17px] text-[#333]
            w-full px-4 pt-[18px] pb-0 border border-[#d6d6d6] rounded-sm  
           focus:ring-2 ring-[#333]
            "
              placeholder="email"
              id="email"
            />
            <label
              htmlFor="email"
              className="absolute left-[17px]  top-[.58824rem] text-[#666] text-xs transition-all
     peer-placeholder-shown:text-base peer-placeholder-shown:text-[#888] peer-placeholder-shown:top-[1.05882rem]
      peer-focus:top-[.58824rem] peer-focus:text-[#666] peer-focus:text-xs"
            >
              Email adresiniz
            </label>
          </div>
          {/* {errors.email?.message && (
            <FormError errorMessage={errors.email?.message} />
          )} */}
          <div className="w-full   relative h-[56px] ">
            <input
              {...register("phone", {
                required: "phone  is required",
                minLength: { value: 1, message: "10 karakter olmali" },
                pattern: {
                  value:
                    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
                  message: "gecerli olmayan bir numara",
                },
              })}
              className="peer h-full placeholder-transparent focus:outline-none text-[17px] text-[#333]
              w-full px-4 pt-[18px] pb-0 border border-[#d6d6d6] rounded-sm  
             focus:ring-2 ring-[#333]
              "
              placeholder="Phone"
              id="phone"
            />
            <label
              htmlFor="phone"
              className="absolute left-[17px]  top-[.58824rem] text-[#666] text-xs transition-all
     peer-placeholder-shown:text-base peer-placeholder-shown:text-[#888] peer-placeholder-shown:top-[1.05882rem]
      peer-focus:top-[.58824rem] peer-focus:text-[#666] peer-focus:text-xs"
            >
              Telefon numarası
            </label>
          </div>
          {/* {errors.phone?.message && (
            <FormError errorMessage={errors.phone?.message} />
          )} */}
          <div className="w-full   relative h-[56px] ">
            <input
              {...register("password", {
                required: "password is required",
                minLength: {
                  value: 6,
                  message: "en az 6 karakter olmali",
                },
              })}
              placeholder="password"
              className="peer h-full placeholder-transparent focus:outline-none text-[17px] text-[#333]
              w-full px-4 pt-[18px] pb-0 border border-[#d6d6d6] rounded-sm  
             focus:ring-2 ring-[#333]
              "
              type="password"
              id="password"
            ></input>

            <label
              htmlFor="password"
              className="absolute left-[17px]  top-[.58824rem] text-[#666] text-xs transition-all
     peer-placeholder-shown:text-base peer-placeholder-shown:text-[#888] peer-placeholder-shown:top-[1.05882rem]
      peer-focus:top-[.58824rem] peer-focus:text-[#666] peer-focus:text-xs"
            >
              Şifre
            </label>
          </div>
          {/* {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
          )} */}

          <Button
            canClick={isValid}
            loading={false}
            actionText={"Hesabımı Yarat"}
          />
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;

CreateAccount.Layout = Layout;
