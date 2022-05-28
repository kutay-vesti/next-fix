import { gql, useMutation } from "@apollo/client";

import {
  loginMutation,
  loginMutationVariables,
} from "graphql/__generated__/loginMutation";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { LOGIN_MUTATION } from "pages/login";
import { getCsrfToken, getSession, signIn, useSession } from "next-auth/react";

import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { Layout } from "@components/common";
import Link from "next/link";

interface ILoginForm {
  email: string;
  password: string;
}

// const Login: NextPage = () => {
export default function SignIn({ csrfToken, session }) {
  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
    setError,
  } = useForm<ILoginForm>({ mode: "onChange", shouldFocusError: true });

  //   useEffect(() => {
  //     if (session) {
  //       router.push(callbackUrl ?? "/");
  //     }
  //   }, [session]);

  //   const {session, loading} = useSession({
  //     required: true,
  //     redirectTo: "http://localhost:3000",
  //     queryConfig: {
  //       staleTime: 60 * 1000 * 60 * 3, // 3 hours
  //       refetchInterval: 60 * 1000 * 5, // 5 minutes
  //     },
  //   });
  const router = useRouter();
  //   const { data: session, status } = useSession();

  const [formError, setFormError] = useState("");

  const callbackUrl = React.useMemo(
    () =>
      typeof router.query.callbackUrl == "string"
        ? router.query.callbackUrl
        : router.query.callbackUrl?.[0] ?? null,
    [router]
  );
  if (session) {
    typeof window !== "undefined" && router.replace(`/${callbackUrl}` ?? "/");
  }

  // console.log("callbackUrl", callbackUrl);
  // console.log("callbackUrl", router.query.callbackUrl);
  // console.log("callbackUrl", router.query);

  const onSubmit = async () => {
    const { email, password } = getValues();
    const { error, ok } = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (ok) {
      router.push(`/${callbackUrl}` ?? "/");
    } else if (error) {
      setError("password", { message: error });
    }
  };

  //   const onSubmit = () => {
  //     if (!loading) {
  //       const { email, password } = getValues();
  //       loginMutation({
  //         variables: {
  //           input: {
  //             email,
  //             password,
  //           },
  //         },
  //       });
  //     }
  //   };
  //   const onCompleted = (data: loginMutation) => {
  //     const {
  //       login: { error, ok, token },
  //     } = data;
  //     if (ok && token) {
  //       // localStorage.setItem(LOCALSTORAGE_TOKEN, token);
  //       // authToken(token);
  //       // isLoggedInVar(true);
  //       router.push("/");
  //     } else {
  //       console.log(error);
  //     }
  //   };
  //   const [loginMutation, { data: loginMutationResult, loading, error }] =
  //     useMutation<loginMutation, loginMutationVariables>(LOGIN_MUTATION, {
  //       onCompleted,
  //     });

  //   if (status === "loading") {
  //     return <h1>Loading...</h1>;
  //   }

  //   if (status === "authenticated") {
  //     router.replace(callbackUrl ?? "/");
  //     return;
  //   }

  //   useEffect(() => {
  //     if (status === "authenticated") {
  //       router.replace(callbackUrl ?? "/");
  //       return;
  //     }
  //   }, [status, callbackUrl, router]);

  return (
    <div>
      <div className=" flex items-center justify-center  ">
        {/* <Helmet>
<title>Login | Vestiyer</title>
</Helmet> */}
        <div className="bg-white w-full max-w-lg pt-10 pb-7 rounded-lg text-start text-sm">
          <h3 className="text-3xl text-gray-800 text-center">
            Vestiyer Üye Girişi
          </h3>
          <div className="px-5 py-4 ">
            <Link href="/auth/register">Vestiyer'e üye değil misin? </Link>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid gap-3 mt-1  px-5 mb-3"
            // method="post"
            // action="/api/auth/callback/credentials"
          >
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
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

            {/* <Button
    canClick={isValid}
    loading={loading}
    actionText={"Giriş Yap"}
  /> */}
            <button>giriş</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  //   const { data: session, status } = await getSession(context);
  return {
    props: {
      csrfToken: await getCsrfToken(context),
      session: await getSession(context),
    },
  };
}

SignIn.Layout = Layout;
