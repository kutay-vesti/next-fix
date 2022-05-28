import { gql, useLazyQuery, useQuery } from "@apollo/client";
import AddressForm from "@components/checkout/AddressForm/AddressForm";
import CheckoutHeader from "@components/checkout/CheckoutHeader/CheckoutHeader";
import CheckoutSummary from "@components/checkout/CheckoutSummary/CheckoutSummary";
import PaymentForm from "@components/checkout/PaymentForm/PaymentForm";
import { Layout } from "@components/common";
import useUser from "@lib/hooks/useUser";
import { getAddressQuery, getMyCartQuery } from "graphql/queries";
import { addressQuery } from "graphql/__generated__/addressQuery";
import { myCart } from "graphql/__generated__/myCart";
import * as _ from "lodash";

import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Checkout: NextPage = () => {
  const { data: user, loading: loadingUser } = useUser();
  const router = useRouter();
  const { data: session, status } = useSession();

  const [addressId, setAddressId] = useState<string | null>(null);
  const [billingAddressId, setBillingAddressId] = useState<string | null>(null);

  const [loadCart, { data, loading, error }] =
    useLazyQuery<myCart>(getMyCartQuery);

  const products = data?.myCart.cart?.cartItems;
  const cart = data?.myCart.cart;

  useEffect(() => {
    if (session) {
      loadCart();
    }
  }, [session]);

  console.log("cart", cart);
  useEffect(() => {
    if (cart?.shippingAddressId) {
      console.log("hooo");
      setAddressId(cart?.shippingAddressId);
      if (router.query.state !== "shipping-back") {
        router.push({ pathname: "/checkout", query: { state: "billing" } });
      }
    }
    if (cart?.billingAddressId) {
      setBillingAddressId(cart?.billingAddressId);
    }
  }, [cart?.shippingAddressId, cart?.billingAddressId]);

  useEffect(() => {
    if (cart?.cartItems?.length === 0) {
      router.push("/cart");
    }
  }, [cart]);

  const numberOfItems = () => {
    let number = 0;
    _.forEach(products, function (o) {
      return (number = number + 1 * o.quantity);
    });
    return number;
  };

  if (loadingUser || loading) {
    return <div>loading</div>;
  }
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  // const [checkoutState, setCheckoutState] = useState<"shipping" | "billing">(
  //   "shipping"
  // );

  // const [billingAddress, setBillingAddress] = useState("same");

  // const [checkOutState, setCheckOutState] = useState("1");

  //Check default addresses

  console.log("router", router.asPath === router.pathname);

  if (status === "authenticated") {
    return (
      <div>
        <CheckoutHeader />
        <main className="h-full min-h-screen  w-full   flex justify-center items-start">
          <div className="checkout-content flex flex-col-reverse tablet:flex-row  max-w-5xl  w-full ">
            <div className="w-full  flex flex-col items-center ">
              {(router.query.state === "shipping" ||
                router.asPath === router.pathname ||
                router.query.state === "shipping-back") && (
                <>
                  <div className=" mt-4 tablet:mt-0 ">
                    <div className="py-2 pt-6">
                      <h2 className="font-black text-lg">Teslimat Adresi</h2>
                      <p className="font-normal text-sm">
                        Teslimat adresini size ulaşabilmemiz için giriniz
                      </p>
                    </div>
                    <div>
                      <AddressForm addressId={addressId} shipping={true} />
                    </div>
                  </div>
                </>
              )}
              {router.query.state === "billing" && (
                <>
                  <div className=" mt-4 tablet:mt-0 ">
                    <div className="py-2 pt-6">
                      <h2 className="font-black text-lg">Teslimat Adresi</h2>
                      <p className="font-normal text-sm">
                        Teslimat adresini size ulaşabilmemiz için giriniz
                      </p>
                    </div>
                    <div>
                      <PaymentForm
                        addressId={addressId}
                        cart={cart}
                        billingAddressId={billingAddressId}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* <----Cart Summary----> */}
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
  }
  if (status === "unauthenticated") {
    Router.replace("/auth/login");
  }
  return <div className="h-screen">Hesabınızı açınız</div>;
};
export default Checkout;
