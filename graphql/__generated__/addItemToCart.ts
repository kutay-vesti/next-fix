/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddItemToCartInput, CartItemType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: addItemToCart
// ====================================================

export interface addItemToCart_addItemToCart_cart_cartItems_sku {
  __typename: "StockKeepingUnit";
  sku: string;
  retailStock: number;
  rentalStock: number;
  rentalPrice4Days: number;
  rentalPrice8Days: number;
}

export interface addItemToCart_addItemToCart_cart_cartItems {
  __typename: "CartItem";
  id: string;
  itemType: CartItemType;
  quantity: number;
  sku: addItemToCart_addItemToCart_cart_cartItems_sku;
}

export interface addItemToCart_addItemToCart_cart {
  __typename: "Cart";
  id: string;
  multipleVendors: boolean;
  totalPrice: number;
  cartItems: addItemToCart_addItemToCart_cart_cartItems[] | null;
}

export interface addItemToCart_addItemToCart {
  __typename: "AddItemToCartOutput";
  ok: boolean;
  error: string | null;
  cart: addItemToCart_addItemToCart_cart | null;
}

export interface addItemToCart {
  addItemToCart: addItemToCart_addItemToCart;
}

export interface addItemToCartVariables {
  input: AddItemToCartInput;
}
