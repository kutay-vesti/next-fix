import { ApolloError, useMutation, useQuery } from "@apollo/client";
import AccountLayout from "@components/account/AccountLayout/AccountLayout";
import { Layout } from "@components/common";
import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import useUser from "@lib/hooks/useUser";
import { editProfileMutaion } from "graphql/mutation";
import { getEditProfileQuery, getMyOrders } from "graphql/queries";
import {
  editProfile,
  editProfileVariables,
} from "graphql/__generated__/editProfile";
import { editprofilemeQuery } from "graphql/__generated__/editprofilemeQuery";
import { myOrders } from "graphql/__generated__/myOrders";
import moment from "moment";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Router from "next/router";
interface IFormProps {
  firstname?: string;
  lastname?: string;
  birthDate?: string;
  phone?: string;
}
const Profile: NextPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { data: userDatae, loading: userLoading, error: userError } = useUser();
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const { data: userData, loading: queryLoading } =
    useQuery<editprofilemeQuery>(getEditProfileQuery);

  const onCompleted = (data: editProfile) => {
    const {
      updateUser: { ok },
    } = data;
    alert("değişilikler kaydedildi");
  };
  const onError = (error: ApolloError) => {};

  if (queryLoading && !userData) {
    <h2>loading</h2>;
  }

  if (!userData) {
    <h2>loading</h2>;
  }

  const [editProfile, { loading, data: editProfileMutationResults }] =
    useMutation<editProfile, editProfileVariables>(editProfileMutaion, {
      onCompleted,
      onError,
    });

  //TODO: Bunları map ile yap use state ile

  const firstNameDef = () => {
    if (userData && userData.me.firstname !== null) {
      return userData.me.firstname;
    } else {
      return undefined;
    }
  };
  const lastNameDef = () => {
    if (userData && userData.me.lastname !== null) {
      return userData.me.lastname;
    } else {
      return "";
    }
  };
  const phoneDef = () => {
    if (userData && userData.me.phone !== null) {
      return userData.me.phone;
    } else {
      return undefined;
    }
  };
  const birtthDateDef = () => {
    if (userData && userData.me.birthDate !== null) {
      return userData.me.birthDate;
    } else {
      return undefined;
    }
  };

  const firstVal = firstNameDef();
  const lastVal = lastNameDef();
  const phoneVal = phoneDef();
  const birthDateVal = birtthDateDef();

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    setValue,
    resetField,
    formState: { isValid, isDirty },
  } = useForm<IFormProps>({
    // defaultValues: {
    //   firstname: firstVal,
    // },
  });

  const onSubmit = () => {
    const { birthDate, firstname, lastname, phone } = getValues();
    editProfile({
      variables: {
        input: {
          firstname,
          lastname,
          phone,
          birthDate,
        },
      },
    });
  };

  useEffect(() => {
    if (userData) {
      setValue(
        "firstname",
        userData?.me?.firstname === null ? undefined : userData?.me?.firstname
      );
      setValue(
        "lastname",
        userData?.me?.lastname === null ? undefined : userData?.me?.lastname
      );
      setValue(
        "phone",
        userData?.me?.phone === null ? undefined : userData?.me?.phone
      );
      setValue(
        "birthDate",
        userData?.me?.birthDate === null ? undefined : userData?.me?.birthDate
      );
    } else {
      resetField("firstname");
      resetField("lastname");
      resetField("phone");
      resetField("birthDate");
    }
  }, [resetField, setValue, userData]);

  if (status === "authenticated") {
    return (
      <>
        <AccountLayout>
          <div className="w-full">
            <div className="header border-b border-gray-300  p-4 flex justify-between mx-4">
              {/* <div className="header border border-gray-300  p-4 flex justify-between rounded-md mx-4"> */}
              <h2 className="text-5xl font-black ">Kullanıcı Bilgilerim</h2>
            </div>
            {userData?.me.isVerified ? null : (
              <div className="header my-4  bg-red-200 p-4 flex items-center justify-between rounded-md mx-4">
                <span className="text-base font-medium">
                  Kullanıcı bilgilerinizi değiştirebilmek için E-posta
                  adresinizi doğrulamanız gerekmektedir
                </span>

                <button className="text-white text-md bg-green-500 hover:bg-green-700 py-2 px-4 rounded-md">
                  DOĞRULA
                </button>
              </div>
            )}
            {/* form Start */}
            {/* <div className="border border-gray-300 m-4 rounded-md bg-gray-200"> */}
            <div className="border border-gray-50 m-4  bg-gray-50">
              <div className="flex flex-col justify-center items-start p-4">
                <h4>Üyelik Bilgilerim</h4>
                <h3>Email Adresim: {userData?.me.email}</h3>
                {/* <h3>{userData?.me.email}</h3> */}
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
                >
                  <div className=" gap-x-4 flex flex-row">
                    <Input
                      // disabled={
                      //   selectedAddress !== "newAddress" &&
                      //   selectedAddress !== "Var olan adreslerden seçin"
                      // }
                      register={register}
                      // defaultValue={defaultAddresses.lastname}
                      inputValue="firstname"
                      placeHolder="Adınız"
                    />
                    <Input
                      // disabled={
                      //   selectedAddress !== "newAddress" &&
                      //   selectedAddress !== "Var olan adreslerden seçin"
                      // }
                      register={register}
                      // defaultValue={defaultAddresses.lastname}
                      inputValue="lastname"
                      placeHolder="Soy adınız"
                    />
                  </div>
                  <div className="w-full bg-red-200">
                    <Input
                      // disabled={
                      //   selectedAddress !== "newAddress" &&
                      //   selectedAddress !== "Var olan adreslerden seçin"
                      // }
                      register={register}
                      // defaultValue={defaultAddresses.lastname}
                      inputValue="phone"
                      placeHolder="telefon Nnumaranız"
                    />
                  </div>
                  <input
                    defaultValue={
                      birthDateVal !== undefined ? birthDateVal : ""
                    }
                    // value={userData?.me.birthDate}
                    className="input"
                    {...register("birthDate", {
                      valueAsDate: true,
                    })}
                    type="date"
                  />

                  {/* <input
            {...register("email", {
              required: "email  is required",
              minLength: { value: 4, message: "en az 4 adet olmali" },
              pattern: {
                value:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "not valid mail",
              },
            })}
            className="input"
            placeholder="Email"
          /> */}
                  {/* {errors.email?.message && (
            <FormError errorMessage={errors.email?.message} />
          )} */}

                  <Button
                    loading={loading}
                    canClick={isDirty}
                    actionText="değişiklikleri kaydet"
                  ></Button>
                </form>
              </div>
            </div>
            <h1 className="bg-yellow-400">TODO Beden terchileri</h1>
          </div>
        </AccountLayout>
      </>
    );
  }
  if (status === "unauthenticated") {
    Router.replace("/auth/login");
  }
  return <div className="h-screen">Hesabınızı açınız</div>;
};

export default Profile;

Profile.Layout = Layout;
