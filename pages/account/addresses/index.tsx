import { useQuery } from "@apollo/client";
import AccountLayout from "@components/account/AccountLayout/AccountLayout";
import { AddressBox } from "@components/account/AddressBox/AddressBox";
import { Layout } from "@components/common";
import useUser from "@lib/hooks/useUser";
import { getAddressQuery, getMyOrders } from "graphql/queries";
import {
  addressQuery,
  addressQuery_myAddresses,
} from "graphql/__generated__/addressQuery";
import { myOrders } from "graphql/__generated__/myOrders";
import moment from "moment";
import { NextPage } from "next";
import Link from "next/link";
import React, { useEffect } from "react";

const Addresses: NextPage = () => {
  const { data: user, loading: userLoading, error: userError } = useUser();

  const {
    data: addressData,
    loading: addressLoading,
    refetch,
  } = useQuery<addressQuery>(getAddressQuery);

  useEffect(() => {
    if (user?.me.id) {
      refetch();
    }
  }, [user?.me.id]);

  if (addressLoading) {
    return <div>loading</div>;
  }
  if (userLoading) {
    return <div>loading</div>;
  }

  return (
    <>
      <AccountLayout>
        <div className="w-full">
          <div className="header border-b border-gray-300  p-4 flex flex-row justify-between items-center mx-4">
            {/* <div className="header border border-gray-300  p-4 flex flex-row justify-between rounded-md mx-4"> */}
            <h2 className="text-5xl font-black ">Adres Bilgilerim</h2>
            <Link href="/account/addresses/add">
              <div className="rounded-lg border-2  py-2 px-2 w-fit bg-black">
                <div className="flex flex-row-reverse gap-x-2 text-white justify-center items-center w-full h-full px-3 ">
                  <h2 className="text-xl font-bold ">Adress Ekle</h2>
                  <div className="text-xl font-bold  ">+</div>
                </div>
              </div>
            </Link>
          </div>
          <div className="flex flex-col gap-4 p-4 flex-wrap ">
            {!addressData?.myAddresses.defaultShippingAddress &&
              (addressData?.myAddresses.otherAddresses?.length === 0 ||
                !addressData?.myAddresses.otherAddresses) &&
              !addressLoading && <div>Kayıtlı adresiniz bulunmamakta</div>}

            <AddressBox
              addresData={addressData?.myAddresses.defaultShippingAddress}
              def={true}
            />
            {addressData?.myAddresses?.otherAddresses?.map((address) => {
              return <AddressBox addresData={address} def={false} />;
            })}
            {/* <span>{JSON.stringify(addressData)}</span> */}
          </div>
        </div>
      </AccountLayout>
    </>
  );
};
export default Addresses;

Addresses.Layout = Layout;
