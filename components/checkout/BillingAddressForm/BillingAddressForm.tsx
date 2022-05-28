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
import { SAVE_CART_ADDRESS_MUTATION } from "../AddressForm/AddressForm";
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

// interface IAddressForm {
//   addressData: myAddressesQuery | undefined;
//   selectedAddress: any;
//   setSelectedAddress: any;
//   children: React.ReactNode;
//   setCheckOutState: React.Dispatch<React.SetStateAction<string>>;
// }

interface ITypeOutlet {
  setCheckOutState: React.Dispatch<React.SetStateAction<string>>;
  addressId: string | null;
  billingAddressId: string | null;
  checkOutState: string;
}

interface IAddressForm {
  shipping: boolean;
  selectedAddress: any;
  setSelectedAddress: React.Dispatch<any>;
  billingAddressId: string;
}
interface LodashType {
  __typename: "Address";
  id: string;
  firstname: string | null;
  lastname: string | null;
  title: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string | null;
  zipCode: string;
  country: string;
  phoneNumber: string;
}
function BillingAddressForm({
  shipping,
  setSelectedAddress,
  selectedAddress,
  billingAddressId,
}: IAddressForm) {
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
  const [savedAddress, setSavedAddress] = useState(false);
  const { data: addressData, loading: addressLoading } =
    useQuery<addressQuery>(getAddressQuery);

  const toplu = _.concat(
    addressData?.myAddresses.otherAddresses,
    addressData?.myAddresses.defaultShippingAddress
  );

  const setCartAddressCompleted = (data: setCartAddress) => {
    const router = useRouter();
    const { cart, ok, error } = data.setCartAddress;
    if (ok) {
      if (shipping) {
        router.push({ pathname: "/checkout", query: { state: "billing" } });
      }
    } else {
      console.log("error", error);
    }
  };

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

  const onError = (error: ApolloError) => {
    console.log("ERORROR!!!", error);
  };
  const onCreateCompleted = (data: createAddress) => {
    const { createdAddressId, ok, error } = data.createAddress;
    if (ok) {
      setCartAddress({
        variables: {
          input: {
            billingAddressId: createdAddressId,
          },
        },
      });
    } else {
      console.log("error", error);
    }
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
  const onSubmitAddAddress = () => {
    if (selectedAddress?.firstname) {
      if (shipping) {
        setCartAddress({
          variables: {
            input: {
              billingAddressId: selectedAddress.id,
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

  const defaultAddresse: any = _.find(
    _.concat(
      addressData?.myAddresses.otherAddresses,
      addressData?.myAddresses.defaultShippingAddress
    ),
    { id: billingAddressId }
  );

  console.log("defaultAddresse", defaultAddresse);

  const [addressSelection, setAddressSelection] = useState(false);
  console.log("selectedAddress", billingAddressId);

  useEffect(() => {
    if (defaultAddresse) {
      setSelectedAddress(defaultAddresse);
    }
  }, [defaultAddresse, setSelectedAddress]);

  useEffect(() => {
    if (selectedAddress !== "newAddress") {
      setAddressSelection(false);
      setValue("firstname", selectedAddress.firstname);
      setValue("lastname", selectedAddress.lastname);
      setValue("addressLine1", selectedAddress.addressLine1);
      setValue("addressLine2", selectedAddress.addressLine2);
      setValue("zipCode", selectedAddress.zipCode);
      setValue("state", selectedAddress.state);
      setValue("city", selectedAddress.city);
      setValue("phoneNumber", selectedAddress.phoneNumber);
    } else {
      setAddressSelection(true);
      resetField("firstname");
      resetField("lastname");
      resetField("addressLine1");
      resetField("addressLine2");
      resetField("zipCode");
      resetField("state");
      resetField("city");
      resetField("phoneNumber");
    }
  }, [defaultAddresse, resetField, selectedAddress, setValue]);

  return (
    <div>
      <>
        <div className="  w-full  tablet:w-[448px]">
          <div className=" w-full  tablet:w-[448px]">
            <Listbox value={selectedAddress} onChange={setSelectedAddress}>
              <Listbox.Button
                className="h-[56px] px-4  rounded-sm
         focus:ring-2 ring-[#333]  w-full text-left
          truncate focus:outline-none text-[17px]
          text-[#333] border border-[#d6d6d6]   "
              >
                <span>
                  {selectedAddress?.firstname
                    ? `  ${selectedAddress?.addressLine1}, ${
                        selectedAddress?.addressLine2
                      },${" "}
                ${selectedAddress?.state}, ${selectedAddress?.city}, ${
                        selectedAddress?.firstname
                      }${" "}
                ${selectedAddress?.lastname}`
                    : "Yeni adres ekle"}
                </span>
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
          {!addressSelection ? null : (
            <form
              onSubmit={handleSubmit(onSubmitAddAddress)}
              className="grid gap-3     w-full  tablet:w-[448px] mt-3 "
            >
              <Input
                disabled={
                  selectedAddress !== "newAddress" &&
                  selectedAddress !== "Var olan adreslerden seçin"
                }
                register={register}
                // defaultValue={defaultAddresses.firstname}
                inputValue="firstname"
                placeHolder="Adınız"
              />

              <Input
                disabled={
                  selectedAddress !== "newAddress" &&
                  selectedAddress !== "Var olan adreslerden seçin"
                }
                register={register}
                // defaultValue={defaultAddresses.lastname}
                inputValue="lastname"
                placeHolder="Soy adınız"
              />

              <Input
                disabled={
                  selectedAddress !== "newAddress" &&
                  selectedAddress !== "Var olan adreslerden seçin"
                }
                register={register}
                // defaultValue={defaultAddresses.addressLine1}
                inputValue="addressLine1"
                placeHolder="Adresiniz"
              />
              <Input
                disabled={
                  selectedAddress !== "newAddress" &&
                  selectedAddress !== "Var olan adreslerden seçin"
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
                    selectedAddress !== "Var olan adreslerden seçin"
                  }
                  register={register}
                  // defaultValue={defaultAddresses.zipCode}
                  inputValue="zipCode"
                  placeHolder="Posta kodu"
                />
                <Input
                  disabled={
                    selectedAddress !== "newAddress" &&
                    selectedAddress !== "Var olan adreslerden seçin"
                  }
                  register={register}
                  // defaultValue={defaultAddresses.state}
                  inputValue="state"
                  placeHolder="İlçe"
                />
                <Input
                  disabled={
                    selectedAddress !== "newAddress" &&
                    selectedAddress !== "Var olan adreslerden seçin"
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
                  selectedAddress !== "Var olan adreslerden seçin"
                }
                register={register}
                // defaultValue={defaultAddresses.phoneNumber}
                inputValue="phoneNumber"
                placeHolder="Telefon numarası"
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
                    : "Teslimatı seç "}
                </button>
              </div>
            </form>
          )}
        </div>
      </>
    </div>
  );
}

export default BillingAddressForm;
