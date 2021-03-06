import Link from "next/link";
import { Logo } from "@components/ui";
import { ApolloError, gql, useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { getAddressQuery } from "graphql/queries";
import {
  addressQuery,
  addressQuery_myAddresses,
} from "graphql/__generated__/addressQuery";
import { useEffect, useState } from "react";
import {
  createAddressMutation,
  setDefaultShippingAddressMutation,
} from "graphql/mutation";
import * as _ from "lodash";
import {
  createAddress,
  createAddressVariables,
} from "graphql/__generated__/createAddress";
import {
  setCartAddress,
  setCartAddressVariables,
} from "graphql/__generated__/setCartAddress";
import Input from "@components/ui/Input";
import { Listbox } from "@headlessui/react";
import { useRouter } from "next/router";

export const SAVE_CART_ADDRESS_MUTATION = gql`
  mutation setCartAddress($input: SetCartAddressInput!) {
    setCartAddress(input: $input) {
      error
      ok
      cart {
        id
        shippingAddressId
        billingAddressId
      }
    }
  }
`;
interface IAddressForm {
  shipping: boolean;
  addressId: string;
}
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
function AddressForm({ shipping, addressId }: IAddressForm) {
  const [selectedAddress, setSelectedAddress] = useState<any>("newAddress");
  const router = useRouter();

  const setCartAddressCompleted = (data: setCartAddress) => {
    const { cart, ok, error } = data.setCartAddress;
    if (ok) {
      if (shipping) {
        router.push({ pathname: "/checkout", query: { state: "billing" } });
      }
    } else {
      console.log("error", error);
    }
  };

  const { data: addressData, loading: addressLoading } =
    useQuery<addressQuery>(getAddressQuery);

  const [
    setCartAddress,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation<setCartAddress, setCartAddressVariables>(
    SAVE_CART_ADDRESS_MUTATION,
    {
      onCompleted: setCartAddressCompleted,
      refetchQueries: [{ query: getAddressQuery }],
    }
  );

  const onCreateCompleted = (data: createAddress) => {
    const { createdAddressId, ok, error } = data.createAddress;
    if (ok) {
      setCartAddress({
        variables: {
          input: {
            shippingAddressId: createdAddressId,
          },
        },
      });
    } else {
      console.log("error", error);
    }
  };
  const onError = (error: ApolloError) => {
    console.log("ERORROR!!!", error);
  };
  const [
    createAddress,
    { loading: createAddressLoading, data: createAddressData, error },
  ] = useMutation<createAddress, createAddressVariables>(
    createAddressMutation,
    {
      onCompleted: onCreateCompleted,
      onError,
      refetchQueries: [{ query: getAddressQuery }],
    }
  );

  const toplu = _.concat(
    addressData?.myAddresses.otherAddresses,
    addressData?.myAddresses.defaultShippingAddress
  );

  const defaultAddresse: any = _.find(
    _.concat(
      addressData?.myAddresses.otherAddresses,
      addressData?.myAddresses.defaultShippingAddress
    ),
    { id: addressId }
  );
  useEffect(() => {
    if (defaultAddresse) {
      console.log("girdi");
      setSelectedAddress(defaultAddresse);
    }
  }, [defaultAddresse]);

  const {
    register,
    getValues,
    formState,
    handleSubmit,
    reset,
    setValue,
    resetField,
    formState: { errors, isValid },
  } = useForm<IFormProps>({ mode: "onChange" });

  useEffect(() => {
    if (selectedAddress !== "newAddress") {
      setValue("firstname", selectedAddress.firstname);
      setValue("lastname", selectedAddress.lastname);
      setValue("addressLine1", selectedAddress.addressLine1);
      setValue("addressLine2", selectedAddress.addressLine2);
      setValue("zipCode", selectedAddress.zipCode);
      setValue("state", selectedAddress.state);
      setValue("city", selectedAddress.city);
      setValue("phoneNumber", selectedAddress.phoneNumber);
    } else {
      resetField("firstname");
      resetField("lastname");
      resetField("addressLine1");
      resetField("addressLine2");
      resetField("zipCode");
      resetField("state");
      resetField("city");
      resetField("phoneNumber");
    }
  }, [resetField, selectedAddress, setValue]);

  const onSubmitAddAddress = () => {
    if (selectedAddress?.firstname) {
      if (shipping) {
        setCartAddress({
          variables: {
            input: {
              shippingAddressId: selectedAddress.id,
            },
          },
        });
      }
    } else {
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
      createAddress({
        variables: {
          input: {
            country: "Turkey",
            title: "adresim",
            firstname,
            lastname,
            addressLine1,
            addressLine2,
            city,
            state,
            zipCode,
            phoneNumber: phoneNumber + "",
          },
        },
      });
    }
  };

  console.log("selectedAddress", selectedAddress);
  return (
    <div className="w-[448px]">
      <div className=" w-[448px]">
        <Listbox value={selectedAddress} onChange={setSelectedAddress}>
          <Listbox.Button
            className="h-[56px] px-4  rounded-sm
       focus:ring-2 ring-[#333]  w-full text-left
        truncate focus:outline-none text-[17px]
        text-[#333] border border-[#d6d6d6]   "
          >
            {selectedAddress?.firstname
              ? `  ${selectedAddress?.addressLine1}, ${
                  selectedAddress?.addressLine2
                },${" "}
              ${selectedAddress?.state}, ${selectedAddress?.city}, ${
                  selectedAddress?.firstname
                }${" "}
              ${selectedAddress?.lastname}`
              : "Yeni adres ekle veya var olan adreslerinden se??"}
          </Listbox.Button>

          <Listbox.Options className="bg-white border border-gray-600  ">
            <Listbox.Option
              key="yeniAdress"
              value="newAddress"
              className="hover:bg-blue-300 w-full px-2 py-1 text-sm"
            >
              Yeni adres ekle
            </Listbox.Option>
            {toplu.length > 1 &&
              toplu.map((address) => {
                if (address === null) {
                  return null;
                }
                return (
                  <Listbox.Option
                    key={`${address?.id}1`}
                    value={address}
                    // TODO: selected ekel
                    className="hover:bg-blue-300 w-full px-2 py-1 text-sm"
                  >
                    {address?.addressLine1}, {address?.addressLine2},{" "}
                    {address?.state}, {address?.city}, {address?.firstname}{" "}
                    {address?.lastname}
                  </Listbox.Option>
                );
              })}
          </Listbox.Options>
        </Listbox>
      </div>

      <form
        onSubmit={handleSubmit(onSubmitAddAddress)}
        className="grid gap-3    w-[448px] mt-3  "
      >
        <Input
          disabled={
            selectedAddress !== "newAddress" &&
            selectedAddress !== "Var olan adreslerden se??in"
          }
          register={register}
          // defaultValue={defaultAddresses.firstname}
          inputValue="firstname"
          placeHolder="Ad??n??z"
        />

        <Input
          disabled={
            selectedAddress !== "newAddress" &&
            selectedAddress !== "Var olan adreslerden se??in"
          }
          register={register}
          // defaultValue={defaultAddresses.lastname}
          inputValue="lastname"
          placeHolder="Soy ad??n??z"
        />

        <Input
          disabled={
            selectedAddress !== "newAddress" &&
            selectedAddress !== "Var olan adreslerden se??in"
          }
          register={register}
          // defaultValue={defaultAddresses.addressLine1}
          inputValue="addressLine1"
          placeHolder="Adresiniz"
        />
        <Input
          disabled={
            selectedAddress !== "newAddress" &&
            selectedAddress !== "Var olan adreslerden se??in"
          }
          register={register}
          // defaultValue={defaultAddresses.addressLine2}
          inputValue="addressLine2"
          placeHolder="Aparman no"
        />
        <div className="flex gap-x-3">
          <Input
            disabled={
              selectedAddress !== "newAddress" &&
              selectedAddress !== "Var olan adreslerden se??in"
            }
            register={register}
            // defaultValue={defaultAddresses.zipCode}
            inputValue="zipCode"
            placeHolder="Posta kodu"
          />
          <Input
            disabled={
              selectedAddress !== "newAddress" &&
              selectedAddress !== "Var olan adreslerden se??in"
            }
            register={register}
            // defaultValue={defaultAddresses.state}
            inputValue="state"
            placeHolder="??l??e"
          />
          <Input
            disabled={
              selectedAddress !== "newAddress" &&
              selectedAddress !== "Var olan adreslerden se??in"
            }
            register={register}
            // defaultValue={defaultAddresses.city}
            inputValue="city"
            placeHolder="City"
          />
        </div>
        <Input
          disabled={
            selectedAddress !== "newAddress" &&
            selectedAddress !== "Var olan adreslerden se??in"
          }
          register={register}
          // defaultValue={defaultAddresses.phoneNumber}
          inputValue="phoneNumber"
          placeHolder="Telefon numaras??"
        />
        <div className="flex items-center gap-x-2"></div>
        <div className=" flex justify-end ">
          {" "}
          <button
            type="submit"
            className="bg-black text-white self-end  font-semibold text-base py-5 px-8 w-[280px] rounded-3xl"
          >
            {selectedAddress === "newAddress"
              ? "Adresi kaydet ve teslimata ilerle"
              : "Teslimat?? se?? "}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddressForm;
