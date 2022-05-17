import { useMutation, useQuery } from "@apollo/client";
import useUser from "@lib/hooks/useUser";
import {
  addItemToCartMutation,
  deleteItemFromCartMutation,
  removeItemFormCartMutation,
} from "graphql/mutation";
import { getMyCartQuery } from "graphql/queries";
import {
  addItemToCart,
  addItemToCartVariables,
} from "graphql/__generated__/addItemToCart";

import {
  deleteItemFromCart,
  deleteItemFromCartVariables,
} from "graphql/__generated__/deleteItemFromCart";
import {
  myCart,
  myCart_myCart_cart_cartItems,
} from "graphql/__generated__/myCart";
import {
  removeItemFromCart,
  removeItemFromCartVariables,
} from "graphql/__generated__/removeItemFromCart";

import { NextPage } from "next";
import { useEffect, useState } from "react";

import * as _ from "lodash";
import Link from "next/link";
import { Layout } from "@components/common";
import { Product } from "@components/cart/CartProduct/CartProduct";

const Cart: NextPage = () => {
  const { data: user } = useUser();

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
  const [loadingState, setLoadingState] = useState(false);

  const products = data?.myCart.cart?.cartItems;
  const cart = data?.myCart.cart;

  const onCompletedAddToCart = (data: addItemToCart) => {
    refetchCart();
  };

  const [
    addToCartMutation,
    { loading: addToCartLoading, data: addToCartData, error: addToCartError },
  ] = useMutation<addItemToCart, addItemToCartVariables>(
    addItemToCartMutation,
    { onCompleted: onCompletedAddToCart }
  );

  const onCompletedRemoveItemFromCart = (data: removeItemFromCart) => {
    refetchCart();
  };

  const [
    removeItemFromCartMutation,
    {
      loading: removeItemCartLoading,
      data: removeItemCartData,
      error: removeItemCartError,
    },
  ] = useMutation<removeItemFromCart, removeItemFromCartVariables>(
    removeItemFormCartMutation,
    { onCompleted: onCompletedRemoveItemFromCart }
  );

  const onCompleteDeleteItemFromCart = (data: deleteItemFromCart) => {
    refetchCart();
  };

  const [
    deleteItemFromCart,
    {
      loading: deleteItemFromCartLoading,
      data: deleteItemFromCartData,
      error: deleteItemFromCartError,
    },
  ] = useMutation<deleteItemFromCart, deleteItemFromCartVariables>(
    deleteItemFromCartMutation,
    { onCompleted: onCompleteDeleteItemFromCart }
  );

  const increaseQuantity = (
    product: myCart_myCart_cart_cartItems,
    quantity: number = 1
  ) => {
    console.log("ADDING SKU", product.sku.sku);
    addToCartMutation({
      variables: {
        input: {
          quantity: quantity,
          sku: product.sku.sku,
          rentalPeriod: product.rentalPeriod,
          itemType: product.itemType,
          rentalStartDate: product.rentalStartDate,
          rentalEndDate: product.rentalEndDate,
          isExpressShipping: false, //TODO add express shipping
        },
      },
    });
  };

  const decreaseQuantity = (
    product: myCart_myCart_cart_cartItems,
    quantity: number = 1
  ) => {
    console.log("REMOVE SKU", product.sku.sku);
    removeItemFromCartMutation({
      variables: {
        input: {
          sku: product.sku.sku, //TODO input is going to change to sku
          itemType: product.itemType,
          quantity: quantity,
        },
      },
    });
  };

  const deleteItem = (product: myCart_myCart_cart_cartItems) => {
    deleteItemFromCart({
      variables: {
        input: {
          sku: product.sku.sku, //TODO input is going to change to sku
          itemType: product.itemType,
        },
      },
    });
  };

  useEffect(() => {
    if (
      addToCartLoading ||
      removeItemCartLoading ||
      deleteItemFromCartLoading ||
      loading
    ) {
      setLoadingState(true);
    } else {
      setLoadingState(false);
    }
  }, [
    addToCartLoading,
    setLoadingState,
    removeItemCartLoading,
    deleteItemFromCartLoading,
    loading,
  ]);

  const numberOfItems = () => {
    let number = 0;
    _.forEach(products, function (o) {
      return (number = number + 1 * o.quantity);
    });
    return number;
  };
  const retailLength = () => {
    let number = 0;
    _.forEach(products, function (o) {
      return o.itemType === "retail" ? (number = number + 1) : null;
    });
    return number;
  };
  const rentalLength = () => {
    let number = 0;
    _.forEach(products, function (o) {
      return o.itemType === "rental" ? (number = number + 1) : null;
    });
    return number;
  };

  return (
    <div className="flex justify-center ">
      <div className="CartPage max-w-5xl  w-full flex flex-col items-center self-center">
        <div className="Cart header mt-10 mb-5 flex flex-col justify-center items-center">
          <h1 className="font-black text-5xl">MY BAG</h1>
          <div className="shipping message ">
            <div>
              <div className="flex items-center py-2 gap-x-2">
                <span>
                  <svg className="progress-ring" width="36" height="36">
                    <circle
                      stroke="#EFEFEF"
                      strokeWidth="8"
                      strokeLinecap="round"
                      fill="transparent"
                      r="13"
                      cx="18"
                      cy="18"
                    ></circle>
                    <circle
                      className="progress-ring__circle"
                      stroke="#256923"
                      strokeWidth="8"
                      strokeLinecap="round"
                      fill="transparent"
                      r="13"
                      cx="18"
                      cy="18"
                    ></circle>
                  </svg>
                </span>
                <span>
                  <span>
                    <span className="font-semibold text-base">$34.01</span> away
                    from free shipping{" "}
                  </span>
                  <button className="underline font-normal text-xs pl-3">
                    + Add
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          className={` ${numberOfItems() !== 0 ? "hidden" : ""}
             flex flex-col  bg-gray-100 w-full  h-fit py-10 px-6 my-10 items-center`}
        >
          <div className="flex w-fit  h-fit">
            <h3 className="font-semibold text-2xl ">Sepetiniz boş</h3>
          </div>
          <div className="py-5 px-6 bg-black w-fit rounded-3xl mt-5 mx-9">
            <Link href="/collections/collection">
              <span className="text-base font-semibold text-[#fff]">
                Alışverişe Başla
              </span>
            </Link>
          </div>
        </div>

        <div className="Cart layout flex flex-col px-4  phoneFin:px-0 phoneFin:flex-row w-full gap-x-20 overflow-visible">
          <div className="w-full">
            <div className="layout items  w-full col-auto">
              {rentalLength() > 0 ? (
                <>
                  {" "}
                  <div className="border-b py-1 font-medium text-sm">
                    <span>Kiralama</span>
                  </div>
                  <table className="w-full">
                    <tbody>
                      {products?.map((product) => {
                        if (product.itemType !== "rental") {
                          return null;
                        }
                        return (
                          <Product
                            key={product.id}
                            product={product}
                            increaseQuantity={increaseQuantity}
                            decreaseQuantity={decreaseQuantity}
                            deleteItem={deleteItem}
                            addToCartLoading={addToCartLoading}
                            removeItemCartLoading={removeItemCartLoading}
                            deleteItemFromCartLoading={
                              deleteItemFromCartLoading
                            }
                          />
                        );
                      })}
                    </tbody>
                    {/* 
                    <Product /> */}
                  </table>
                </>
              ) : null}
              {retailLength() > 0 ? (
                <>
                  <div className="border-b py-1 font-medium text-sm">
                    <span>Satın al</span>
                  </div>
                  <table className="w-full">
                    <tbody>
                      {products?.map((product) => {
                        if (product.itemType !== "retail") {
                          return null;
                        }
                        return (
                          <Product
                            key={product.id}
                            product={product}
                            increaseQuantity={increaseQuantity}
                            decreaseQuantity={decreaseQuantity}
                            deleteItem={deleteItem}
                            addToCartLoading={addToCartLoading}
                            removeItemCartLoading={removeItemCartLoading}
                            deleteItemFromCartLoading={
                              deleteItemFromCartLoading
                            }
                          />
                        );
                      })}
                      {/* 
                    <Product /> */}
                    </tbody>
                  </table>
                </>
              ) : null}
              <div>
                <button>Share your bag, drop a hint</button>
              </div>
            </div>
          </div>

          <div
            className={`${
              numberOfItems() === 0 ? "hidden" : ""
            } stickey add to cart w-full phoneFin:w-fit sticky top-32  h-fit  `}
          >
            <div className="bg-black w-full phoneFin:w-[420px] py-5 px-6">
              <div className="relative group">
                <input
                  name="discount"
                  id="discount"
                  className="pt-7 pb-2  w-full rounded px-4 peer"
                  onChange={() => console.log("render indirim kodu")}
                />
                <label
                  htmlFor="discount"
                  className="absolute top-9 left-4 text-sm text-gray-600 peer-focus-visible:text-gray-500  peer-focus-visible:-translate-y-7 transition-all peer-valid:-translate-y-7  peer-valid:text-gray-500 peer-empty:-translate-y-4 peer-empty:text-gray-600"
                >
                  İndirim Kodu Giriniz
                </label>
                <button className="bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg absolute top-2.5 right-3 hover:bg-gray-300">
                  {">"}
                </button>
              </div>
            </div>
            <div className=" w-full phoneFin:w-[420px] py-5 px-6 bg-[#f8f8f8]">
              <table className="w-full">
                <tbody className=" flex flex-col gap-y-1.5 ">
                  <tr className="flex justify-between ">
                    <th className="text-xs font-normal">
                      <span>Ara toplam</span>
                      <span> ({numberOfItems()})</span>
                    </th>
                    <td className="text-xs font-semibold">
                      <span>₺{cart?.totalPrice}</span>
                    </td>
                  </tr>
                  <tr className="flex justify-between ">
                    <th className="text-xs font-normal">
                      <span>İndirim</span>
                    </th>
                    <td className="text-xs font-semibold">
                      <span>₺{cart?.totalDiscount}</span>
                    </td>
                  </tr>
                  <tr className="flex justify-between ">
                    <th className="text-xs font-normal">
                      <span>Kiralama Sigortası</span>
                    </th>
                    <td className="text-xs font-semibold">
                      <span>₺{cart?.totalInsuranceFee}</span>
                    </td>
                  </tr>
                  <tr className="flex justify-between ">
                    <th className="text-xs font-normal">
                      <span>
                        {cart?.totalShippingFee === 0
                          ? "Ücretsiz Kargo!"
                          : "Kargo ücreti"}
                      </span>
                    </th>
                    <td className="text-xs font-semibold">
                      <span>₺{cart?.totalShippingFee}</span>
                    </td>
                  </tr>
                  <tr className="flex justify-between ">
                    <th className="text-xs font-normal">
                      <span>Hizmet bedeli</span>
                    </th>
                    <td className="text-xs font-semibold">
                      <span>₺{cart?.totalServiceFee}</span>
                    </td>
                  </tr>
                  <tr className="flex justify-between ">
                    <th className="text-xs font-normal">
                      <span>Vergiler</span>
                    </th>
                    <td className="text-xs font-semibold">
                      <span>₺{cart?.totalTax}</span>
                    </td>
                  </tr>
                  <tr className="flex justify-between ">
                    <td className="border-b border-gray-200 my-2 w-full h-0"></td>
                  </tr>
                  <tr className="flex justify-between ">
                    <th className="text-2xl font-normal ">
                      <span>Toplam</span>
                    </th>
                    <td className="text-2xl font-semibold">
                      <span>₺{cart?.totalPriceAfterDiscount}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="w-full phoneFin:w-[420px] bg-[#f8f8f8] pb-4 px-5 ">
              <Link
                href={
                  user ? `/CheckoutLayout` : `/login?redirect=CheckoutLayout`
                }
              >
                <div className="bg-black rounded-3xl text-white w-full text-base font-semibold py-4 flex justify-center">
                  {!loadingState ? <span>Satın Al</span> : <span>Loading</span>}
                </div>
              </Link>
            </div>
          </div>
          {numberOfItems() > 0 && (
            <div className="fixed bottom-0 left-0 right-0 bg-[#fff] pt-3 pb-2 px-6  border-t  phoneFin:hidden z-50">
              <div className="flex justify-between pb-2 items-center">
                <span className="font-normal text-sm">
                  Ara Toplam:{" "}
                  <span className="font-semibold text-xl">152TL</span>
                </span>
                <span className="text-sm font-semibold text-[#9d2226] ">
                  Indırım <span className="">1512TL</span>
                </span>
              </div>
              <Link
                href={
                  user ? `/CheckOutLayout` : `/login?redirect=CheckOutLayout`
                }
              >
                <div className="bg-black py-4 px-8 rounded-full text-sm font-semibold text-white text-center mb-3">
                  <span className="">Satın al</span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;

Cart.Layout = Layout;
