import { ApolloError, gql, useMutation, useQuery } from "@apollo/client";
import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import { createAddressMutation, updateAddressMutation } from "graphql/mutation";
import { getAddressQuery } from "graphql/queries";
import {
  createAddress,
  createAddressVariables,
} from "graphql/__generated__/createAddress";
import {
  updateAddress,
  updateAddressVariables,
} from "graphql/__generated__/updateAddress";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as _ from "lodash";
import useUser from "@lib/hooks/useUser";

interface IFormProps {
  title: string;
  firstname: string;
  lastname: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phoneNumber: string;
}

interface IParam {
  action: string;
}
export default function AddressAction() {
  const { data: user, loading: userLoading, error: userError } = useUser();
  const { data: addressData, loading: addressLoading } =
    useQuery(getAddressQuery);

  const router = useRouter();

  console.log("router", router);
  console.log(addressData?.myAddresses);
  if (addressLoading) {
    <h1>loading...</h1>;
  }
  const onCreateCompleted = (data: createAddress) => {
    const {
      createAddress: { ok, error },
    } = data;

    alert("Adresiniz başarıyla eklendi");
    // history.push("/account/addresses");
    router.back();

    console.log(data);
    console.log("ok", ok);
    console.log("error", error);
  };

  const onUpdateCompleted = (data: updateAddress) => {
    const {
      updateAddress: { ok, error },
    } = data;
    router.back();
    console.log(data);
    console.log(ok, "ok");
    console.log(error, "error");
  };
  const onError = (error: ApolloError) => {
    console.log("ERORROR!!!", error);
  };

  const [
    createAddress,
    { loading: createAddressLoading, data: createAddressData },
  ] = useMutation<createAddress, createAddressVariables>(
    createAddressMutation,

    {
      refetchQueries: [{ query: getAddressQuery }],
      onCompleted: onCreateCompleted,
      onError,
    }
  );
  const [
    updateAddress,
    { loading: updateAddressLoading, data: updateAddressData },
  ] = useMutation<updateAddress, updateAddressVariables>(
    updateAddressMutation,
    {
      refetchQueries: [{ query: getAddressQuery }],
      onCompleted: onUpdateCompleted,
      onError,
    }
  );

  const [_1, addresId] = _.split(router.query, "addressId=");

  const mergeAddress = _.merge(
    addressData?.myAddresses.defaultShippingAddress,
    { ...addressData?.myAddresses.otherAddresses }
  );

  const toplu = _.concat(
    addressData?.myAddresses.otherAddresses,
    addressData?.myAddresses.defaultShippingAddress
  );

  const currentAddress = _.find(toplu, {
    id: addresId,
  });
  console.log("currentAddress", currentAddress);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    resetField,
    formState: { isValid },
  } = useForm<IFormProps>({});

  const onSubmit = () => {
    const {
      addressLine1,
      addressLine2,
      firstname,
      lastname,
      city,
      state,
      zipCode,
      country,
      phoneNumber,
      title,
    } = getValues();

    console.log(getValues());

    if (router.query.action === "edit") {
      updateAddress({
        variables: {
          input: {
            firstname,
            lastname,
            addressLine1,
            addressLine2,
            city,
            state,
            zipCode,
            country: "Turkiye",
            title,
            phoneNumber,
            id: addresId,
          },
        },
      });
    } else if (router.query.action === "add") {
      createAddress({
        variables: {
          input: {
            country: "Turkiye",
            firstname,
            lastname,
            title,
            addressLine1,
            addressLine2,
            city,
            state,
            zipCode,
            phoneNumber,
          },
        },
      });
    }
  };
  useEffect(() => {
    if (currentAddress) {
      setValue("firstname", currentAddress.firstname || "");
      setValue("title", currentAddress.title || "");
      setValue("lastname", currentAddress.lastname || "");
      setValue("addressLine1", currentAddress.addressLine1);
      setValue("addressLine2", currentAddress.addressLine2);
      setValue("zipCode", currentAddress.zipCode);
      setValue("state", currentAddress.state || "");
      setValue("city", currentAddress.city);
      setValue("phoneNumber", currentAddress.phoneNumber);
    } else {
      resetField("firstname");
      resetField("title");
      resetField("lastname");
      resetField("addressLine1");
      resetField("addressLine2");
      resetField("zipCode");
      resetField("state");
      resetField("city");
      resetField("phoneNumber");
    }
  }, [currentAddress, resetField, setValue]);

  if (router.query.action === "add") {
    return (
      <div className="w-full tablet:w-480 py-20 flex flex-col justify-start items-center ">
        <h1>Adres Ekleyin</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
        >
          <Input register={register} inputValue="title" placeHolder="Başlık" />
          <Input
            register={register}
            inputValue="firstname"
            placeHolder="İsim"
          />
          <Input
            register={register}
            inputValue="lastname"
            placeHolder="soyad"
          />
          <Input register={register} inputValue="city" placeHolder="city" />
          <Input
            register={register}
            inputValue="addressLine1"
            placeHolder="AddressLine 1"
          />
          <Input
            register={register}
            inputValue="addressLine2"
            placeHolder="AddressLine 2"
          />

          <Input
            register={register}
            inputValue="zipCode"
            placeHolder="zipCode"
          />
          {/* <Input
            register={register}
            inputValue="country"
            placeHolder="country"
          /> */}
          <Input
            register={register}
            inputValue="phoneNumber"
            placeHolder="phoneNumber"
          />

          <Button
            loading={false}
            canClick={true}
            actionText="Adresi kaydet"
          ></Button>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full py-20 flex flex-col justify-start items-center ">
      <h1>Adresinizi düzenleyin</h1>
      <h1>Adres Adı: {currentAddress?.title}</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
      >
        <Input
          register={register}
          inputValue="title"
          placeHolder="Başlık"
          defaultValue={currentAddress?.title}
        />
        <Input
          register={register}
          inputValue="firstname"
          placeHolder="İsim"
          defaultValue={currentAddress?.firstname}
        />
        <Input
          register={register}
          inputValue="lastname"
          placeHolder="soyad"
          defaultValue={currentAddress?.lastname}
        />
        <Input
          register={register}
          inputValue="city"
          placeHolder="city"
          defaultValue={currentAddress?.city}
        />
        <Input
          register={register}
          inputValue="addressLine1"
          placeHolder="AddressLine 1"
          defaultValue={currentAddress?.addressLine1}
        />
        <Input
          register={register}
          inputValue="addressLine2"
          placeHolder="AddressLine 2"
          defaultValue={currentAddress?.addressLine2}
        />
        <Input
          register={register}
          inputValue="state"
          placeHolder="AddressLine 2"
          defaultValue={currentAddress?.state}
        />

        <Input
          register={register}
          inputValue="zipCode"
          placeHolder="zipCode"
          defaultValue={currentAddress?.zipCode}
        />

        <Input
          register={register}
          inputValue="phoneNumber"
          placeHolder="phoneNumber"
          defaultValue={currentAddress?.phoneNumber}
        />

        <Button
          loading={false}
          canClick={true}
          actionText="değişiklikleri kaydet"
        ></Button>
      </form>
    </div>
  );
}
