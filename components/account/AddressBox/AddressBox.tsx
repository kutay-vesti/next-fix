import { gql, useMutation } from "@apollo/client";
import { setDefaultShippingAddressMutation } from "graphql/mutation";
import deleteAddressMutation from "graphql/mutation/delete-address-mutation";
import { getAddressQuery } from "graphql/queries";
import {
  addressQuery_myAddresses_defaultShippingAddress,
  addressQuery_myAddresses_otherAddresses,
} from "graphql/__generated__/addressQuery";
import {
  deleteAddress,
  deleteAddressVariables,
} from "graphql/__generated__/deleteAddress";
import {
  setDefaultShippingAddress,
  setDefaultShippingAddressVariables,
} from "graphql/__generated__/setDefaultShippingAddress";
import Link from "next/link";
import Router, { useRouter } from "next/router";

import React from "react";

interface IAddressBox {
  addresData:
    | addressQuery_myAddresses_otherAddresses
    | null
    | undefined
    | addressQuery_myAddresses_defaultShippingAddress;
  def: boolean;
}

function AddressBox({ addresData, def }: IAddressBox) {
  const onSetDefaultShippingAddress = (id: string) => {
    setDefaultShippingAddress({ variables: { input: { addressId: id } } });
  };
  const [
    setDefaultShippingAddress,
    { loading: loadingDefaultShippingAddress },
  ] = useMutation<
    setDefaultShippingAddress,
    setDefaultShippingAddressVariables
  >(setDefaultShippingAddressMutation, {
    refetchQueries: [{ query: getAddressQuery }],
  });

  const router = useRouter();

  const onCompleted = (data: deleteAddress) => {
    const {
      updateAddress: { ok, error },
    } = data;
    if (ok) {
      alert("adresiniz silindi");
      router.push("/account/addresses");
    }
  };

  const [deleteAddress, { loading: loadingDeleteAddress }] = useMutation<
    deleteAddress,
    deleteAddressVariables
  >(deleteAddressMutation, {
    refetchQueries: [{ query: getAddressQuery }],
    onCompleted,
  });

  if (!addresData) return null;
  return (
    <div className="">
      <div className="" key={addresData.id}>
        <div className=" flex flex-col space-between border-b  border-gray-300 w-full h-fit">
          <div className="flex flex-col justify-start items-start gap-0.5 px-4 pt-4 w-full h-full ">
            <div className="text-sm font-bold flex flex-row gap-x-2 mb-1 items-center">
              <div className="">
                <span>{addresData.title}</span>
              </div>
              {def ? (
                <div className="border  text-xs font-light bg-gray-300 py-1 px-2">
                  <span>Geçerli Adress</span>
                </div>
              ) : null}
            </div>
            <span className="text-sm font-normal">
              {addresData.firstname} {addresData.lastname}
            </span>
            <span className="flex text-sm font-normal">
              {addresData.addressLine1}
              {", "}
              {addresData.addressLine2}
            </span>
            <span className="text-sm font-normal">
              {addresData.state}, {addresData.city}, {addresData.zipCode},
              Türkiye{" "}
            </span>

            <span className="text-sm font-normal">
              Telefon numarası: {addresData.phoneNumber}
            </span>
          </div>

          <div className="px-4 py-3 flex gap-x-2 items-center justify-start">
            <Link href={`/account/addresses/edit?addressId=${addresData.id}`}>
              <a className="hover:underline text-blue-900 hover:text-red-500">
                Düzenle
              </a>
            </Link>
            |{/* TODO: */}
            <button
              onClick={() =>
                deleteAddress({ variables: { input: { id: addresData.id } } })
              }
            >
              <a className="hover:underline text-blue-900 hover:text-red-500">
                Kaldır
              </a>
            </button>
            {def ? null : `${"|"}`}
            {def ? null : (
              <button
                className="hover:underline text-blue-900 hover:text-red-500"
                onClick={() => onSetDefaultShippingAddress(addresData.id)}
              >
                Geçerli Adress Yap
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export { AddressBox };
