import { gql, useMutation, useQuery } from "@apollo/client";
import { Minus, Pencil, Plus } from "@components/icons";
import TrashBin from "@components/icons/TrashBin";
import { getMyCartQuery } from "graphql/queries";
import { myCart_myCart_cart_cartItems } from "graphql/__generated__/myCart";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ProductSlideOver from "../ProductSlideOver/ProductSlideOver";

interface IProduct {
  product: myCart_myCart_cart_cartItems;
  increaseQuantity: (product: myCart_myCart_cart_cartItems) => void;
  decreaseQuantity: (product: myCart_myCart_cart_cartItems) => void;
  deleteItem: (product: myCart_myCart_cart_cartItems) => void;
  addToCartLoading: boolean;
  removeItemCartLoading: boolean;
  deleteItemFromCartLoading: boolean;
}

const Product = ({
  product,
  increaseQuantity,
  decreaseQuantity,
  deleteItem,
  addToCartLoading,
  removeItemCartLoading,
  deleteItemFromCartLoading,
}: IProduct) => {
  // const [loadingState, setLoadingState] = useState(false);
  const [openCart, setOpenCart] = useState(false);

  const {
    data,
    loading,
    error,
    refetch: refetchCart,
  } = useQuery(getMyCartQuery);
  return (
    <>
      <tr className="flex gap-x-4 py-2  w-full">
        {/* {loadingState ? <span>loading</span> : <span>non loading</span>} */}
        <td className=" ">
          <Link href={`/products/${product.productId}&merchantId=something`}>
            <a className="h-fit">
              <img
                width={160}
                src={product.image !== null ? product.image : undefined}
                alt=""
                className="border"
              />
            </a>
          </Link>
        </td>

        <td className="relative  grow">
          <Link href={`/products/${product.productId}`}>
            {/* TODO:ID PRODUCT ID */}
            <div className="flex flex-col gap-y-0.5">
              <span className="font-medium text-xs">{product.productName}</span>
              <span className="font-normal text-xs">{product.brandName}</span>
            </div>
          </Link>
          {product.itemType === "rental" && (
            <div>
              <p className="text-sm font-light">
                {moment(product.rentalStartDate).format("LL")} -{" "}
                {moment(product.rentalEndDate).format("LL")}
              </p>
            </div>
          )}
          <div className="priceline flex gap-x-2 mb-4 items-center">
            {product.itemType === "rental" && (
              <div className="font-semibold text-lg text-[#9d2226] ">
                {product.rentalPeriod === "fourDays"
                  ? product.sku.discountedRentalPrice4Days
                  : product.sku.discountedRentalPrice8Days}
                ₺
              </div>
            )}
            {product.itemType === "retail" && (
              <div className="font-semibold text-lg text-[#9d2226] ">
                {product.sku.discountedRetailPrice}₺
              </div>
            )}

            {product.itemType === "rental" && (
              <div className="line-through">
                {product.rentalPeriod === "fourDays"
                  ? product.sku.comparisonRentalPrice4Days
                  : product.sku.comparisonRentalPrice8Days}
                ₺
              </div>
            )}
            {product.itemType === "retail" && (
              <div className="line-through">
                {product.sku.comparisonRetailPrice}₺
              </div>
            )}
          </div>

          <div className="variant line mb-4 hover:bg-gray-100 w-fit p-2 rounded-lg">
            <button
              className="flex items-center  "
              onClick={() => setOpenCart(!openCart)}
            >
              <div className="bg-black  w-8 h-8 rounded-full flex items-center justify-center  z-10">
                <span className="text-xs font-semibold text-white">
                  {product.sku.size}
                </span>
              </div>
              <div
                style={{ backgroundColor: `${product.sku.color}` }}
                className={` w-8 h-8 rounded-full flex items-center justify-center -ml-3 z-0`}
              >
                <span className="text-xs font-semibold text-white"></span>
              </div>
              <span className="ml-2">
                <Pencil className="h-5 w-5" />
              </span>
            </button>
          </div>
          <div className="edit line">
            <div className="flex gap-x-3 items-center justify-start">
              {product.quantity === 1 ? (
                <>
                  {/* Delete from cart button */}
                  {/* Remove from cart button */}
                  <button
                    disabled={
                      addToCartLoading ||
                      removeItemCartLoading ||
                      deleteItemFromCartLoading
                    }
                    onClick={() => deleteItem(product)}
                  >
                    <TrashBin className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  <button
                    disabled={
                      addToCartLoading ||
                      removeItemCartLoading ||
                      deleteItemFromCartLoading
                    }
                    onClick={() => {
                      decreaseQuantity(product);
                    }}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </>
              )}
              {product.itemType === "rental" && product.quantity > 1 ? (
                <>
                  <button>
                    <svg width="12" height="7" fill="none">
                      <path
                        d="M11.143 1.857H.857a.857.857 0 110-1.714h10.286a.857.857 0 110 1.714z"
                        fill="#000"
                      ></path>
                    </svg>
                  </button>
                </>
              ) : null}
              {/* <input
                value={product.quantity}
                className="w-6 h-6  text-center bg-transparent text-base font-semibold"
              ></input> */}
              <span className="w-6 h-6 text-center bg-transparent text-base font-semibold">
                {product.quantity}
              </span>

              {product.itemType === "rental" ? null : (
                <>
                  {/* increase quantity button */}
                  <button
                    onClick={() => {
                      increaseQuantity(product);
                    }}
                    disabled={
                      addToCartLoading ||
                      removeItemCartLoading ||
                      deleteItemFromCartLoading
                    }
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="item actions absolute  top-0 right-0 ">
            <button>Fav</button>
          </div>
        </td>
      </tr>
      <div>
        <ProductSlideOver
          open={openCart}
          setOpen={setOpenCart}
          cart={data}
          productID={
            product.productId !== null ? product.productId : "somethingwrong"
          }
          color={product.sku.color}
          size={product.sku.size}
          rentalPeriod={product.rentalPeriod === "fourDays" ? 4 : 8}
          rentalStartDate={product.rentalStartDate}
          //new
          cartItem={product}
          // deleteItem={deleteItem}
          // increaseQuantity={increaseQuantity}
          // addToCartLoading={addToCartLoading}
          // deleteItemFromCartLoading={deleteItemFromCartLoading}
        />
      </div>
    </>
  );
};
export { Product };
