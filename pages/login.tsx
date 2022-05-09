import { gql, useMutation } from "@apollo/client";
import {
  loginMutation,
  loginMutationVariables,
} from "graphql/__generated__/loginMutation";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { useForm } from "react-hook-form";

interface ILoginForm {
  email: string;
  password: string;
}

export const LOGIN_MUTATION = gql`
  mutation loginMutation($input: LoginInput!) {
    login(input: $input) {
      ok
      token
      error
    }
  }
`;

const Login: NextPage = () => {
  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<ILoginForm>({ mode: "onChange", shouldFocusError: true });

  const router = useRouter();

  const onSubmit = () => {
    if (!loading) {
      const { email, password } = getValues();
      loginMutation({
        variables: {
          input: {
            email,
            password,
          },
        },
      });
    }
  };
  const onCompleted = (data: loginMutation) => {
    const {
      login: { error, ok, token },
    } = data;
    if (ok && token) {
      // localStorage.setItem(LOCALSTORAGE_TOKEN, token);
      // authToken(token);
      // isLoggedInVar(true);
      router.push("/");
    } else {
      console.log(error);
    }
  };
  const [loginMutation, { data: loginMutationResult, loading, error }] =
    useMutation<loginMutation, loginMutationVariables>(LOGIN_MUTATION, {
      onCompleted,
    });

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
            <span>Vestiyer'e üye değil misin? </span>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid gap-3 mt-1  px-5 mb-3"
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
};

export default Login;
