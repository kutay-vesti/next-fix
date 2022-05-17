import { useQuery } from "@apollo/client";
import CheckoutHeader from "@components/checkout/CheckoutHeader/CheckoutHeader";
import CheckoutSummary from "@components/checkout/CheckoutSummary/CheckoutSummary";
import { Layout } from "@components/common";
import useUser from "@lib/hooks/useUser";
import { getMyCartQuery } from "graphql/queries";
import { myCart } from "graphql/__generated__/myCart";
import * as _ from "lodash";

import { NextPage } from "next";
import Link from "next/link";
import React, { useEffect } from "react";

const Checkout: NextPage = () => {
  const { data: user, loading: loadingUser } = useUser();

  useEffect(() => {
    if (user?.me.firstname) {
      refetchCart();
    }
  }, [user]);

  const {
    data,
    loading,
    error,
    refetch: refetchCart,
  } = useQuery<myCart>(getMyCartQuery);

  const products = data?.myCart.cart?.cartItems;
  const cart = data?.myCart.cart;

  //   useEffect(() => {
  //     if (user?.me.id) {

  //     }
  //   }, [user?.me.id]);

  const numberOfItems = () => {
    let number = 0;
    _.forEach(products, function (o) {
      return (number = number + 1 * o.quantity);
    });
    return number;
  };

  if (loadingUser) {
    return <div>loading</div>;
  }

  return (
    <div>
      <CheckoutHeader />
      <main className="h-full min-h-screen  w-full   flex justify-center items-start">
        <div className="checkout-content flex flex-col-reverse tablet:flex-row  max-w-5xl  w-full ">
          <div className="w-full  flex flex-col items-center ">
            {/* <Outlet
            context={{
              setCheckOutState,
              addressId,
              checkOutState,
              billingAddressId,
            }}
          /> */}
          </div>
          <div className="w-full tablet:w-fit h ">
            {!loadingUser && (
              <CheckoutSummary
                products={products}
                cart={cart}
                numberOfItems={numberOfItems}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
export default Checkout;
