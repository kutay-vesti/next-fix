import React, { useEffect, useRef, useState } from "react";

import { useApolloClient, useQuery } from "@apollo/client";
import { Account, ShoppingBag } from "@components/icons";
import { getMeQuery, getMyCartQuery } from "graphql/queries";
import Link from "next/link";
import { FC } from "react";
import { myCart, myCart_myCart } from "graphql/__generated__/myCart";

// const AccountOverlay: FC = () => {
//   const { data, loading, error, refetch: reFetchMe } = useQuery(getMeQuery);
//   const { refetch } = useQuery(getMyCartQuery);
//   console.log("account overlay ", data);

//   const client = useApolloClient();
//   if (loading) {
//     return <div>yükleniyor...</div>;
//   }

interface IShoppingBagOverlay {
  cartData: myCart_myCart | undefined;
}

// function ShoppingBagOverlay({ cartData }: IShoppingBagOverlay) {

const ShoppingBagOverlay: FC = () => {
  const { data: user, loading, error } = useQuery(getMyCartQuery);
  const { data } = useQuery<myCart>(getMyCartQuery);
  const cartData = data?.myCart;

  if (loading) {
    return (
      <div className="antialiased  z-10 rounded-full flex items-cemter justify-center  ">
        <div className="group inline-block relative hover:bg-[#efefef] rounded-full p-2  ">
          <Link href="/cart">
            <a>
              <div>
                <ShoppingBag className="h-6 w-6 ml-0.5 text-[#333] hover:opacity-70" />
              </div>
            </a>
          </Link>
        </div>
      </div>
    );
  }

  // console.log("cart data", cartData?.cart?.cartItems?.length);

  // console.log(
  //   "cartData?.cart?.cartItems?.lengthcartData?.cart?.cartItems?.length",
  //   cartData?.cart?.cartItems?.length
  // );
  return (
    <div className="antialiased  z-10 rounded-full flex items-cemter justify-center  ">
      <div className="group inline-block relative hover:bg-[#efefef] rounded-full p-2  ">
        <Link href="/cart">
          <a>
            <div>
              <ShoppingBag className="h-6 w-6 ml-0.5 text-[#333] hover:opacity-70" />
              {cartData?.cart?.cartItems?.length !== undefined &&
              cartData?.cart?.cartItems?.length > 0 ? (
                <div className="absolute right-1 top-6 flex justify-center items-center h-2 w-2 p-2 rounded-full bg-black ">
                  <span className="text-white text-[10px] font-bold">
                    {cartData?.cart?.cartItems?.length}
                  </span>
                </div>
              ) : null}
            </div>
          </a>
        </Link>
        <div
          className={`${
            cartData?.cart?.cartItems?.length === 0 ||
            cartData?.cart?.cartItems?.length === undefined
              ? "hidden"
              : "hidden tablet:block "
          }`}
        >
          <ul className="absolute  hidden -translate-x-52 w-[250px] h-fit bg-transparent pt-4 -mt-1 group-hover:block ">
            {cartData?.cart?.cartItems?.slice(0, 3).map((item) => (
              <div key={item.id}>
                <div className=" text-gray-700 flex items-center py-3 p-1 bg-white shadow-lg">
                  <li>
                    <div className="flex items-start h-full gap-x-1 ">
                      <Link href="itemid">
                        <div className="flex items-center justify-center ">
                          <img
                            className="w-[80px] "
                            src={item.image !== null ? item.image : undefined}
                            alt={
                              item.productName !== null
                                ? item.productName
                                : undefined
                            }
                          ></img>
                        </div>
                      </Link>
                      <div>
                        <Link href={`/products/${item.id}`}>
                          {/* TODO:ID item ID */}
                          <div className="flex flex-col gap-y-0.5">
                            <span className="font-medium text-xs">
                              {item.productName}
                            </span>
                            <span className="font-normal text-xs">
                              {item.brandName}
                            </span>
                          </div>
                        </Link>
                        {/* {item.itemType === "rental" && (
              <div>
                <p className="text-sm font-light">
                  {moment(item.rentalStartDate).format("LL")} -{" "}
                  {moment(item.rentalEndDate).format("LL")}
                </p>
              </div>
            )} */}
                        <div className="flex flex-col">
                          <span className="text-xs">
                            Renk: {item.sku.color}
                          </span>
                          <span className="text-xs">Size: {item.sku.size}</span>
                          <span className="text-xs">Adet: {item.quantity}</span>
                        </div>
                      </div>
                    </div>
                  </li>
                </div>
                <div className="divvider border-b border-gray-200  w-full h-0"></div>
              </div>
            ))}

            <div className="footer bg-white w-full pb-2">
              <div className=" pt-3 w-full">
                <span className="px-3">
                  Ara toplam: {cartData?.cart?.totalPrice}TL
                </span>
              </div>
              <div className="w-full p-3 flex gap-2 ">
                <Link href="/cart">
                  <div className="w-full h-full">
                    <div className="w-full  h-11 white border border-black flex items-center justify-center ">
                      <span className="w-full text-center text-base font-semibold">
                        Sepet ({cartData?.cart?.cartItems?.length})
                      </span>
                    </div>
                  </div>
                </Link>
                <Link href="/CheckoutLayout">
                  <div className="w-full h-full">
                    <div className="w-full h-11 bg-black text-white flex items-center justify-center">
                      <span className="w-full text-center text-base font-semibold">
                        Satın Al
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ShoppingBagOverlay;
