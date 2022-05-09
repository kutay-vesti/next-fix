/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddItemToCartInput, CartItemType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: addToCartMutation
// ====================================================

export interface addToCartMutation_addItemToCart_cart_cartItems_sku {
  __typename: "StockKeepingUnit";
  sku: string;
  retailStock: number;
  rentalStock: number;
  rentalPrice4Days: number;
  rentalPrice8Days: number;
}

export interface addToCartMutation_addItemToCart_cart_cartItems {
  __typename: "CartItem";
  id: string;
  itemType: CartItemType;
  quantity: number;
  sku: addToCartMutation_addItemToCart_cart_cartItems_sku;
}

export interface addToCartMutation_addItemToCart_cart {
  __typename: "Cart";
  id: string;
  multipleVendors: boolean;
  totalPrice: number;
  cartItems: addToCartMutation_addItemToCart_cart_cartItems[] | null;
}

export interface addToCartMutation_addItemToCart {
  __typename: "AddItemToCartOutput";
  ok: boolean;
  error: string | null;
  cart: addToCartMutation_addItemToCart_cart | null;
}

export interface addToCartMutation {
  addItemToCart: addToCartMutation_addItemToCart;
}

export interface addToCartMutationVariables {
  input: AddItemToCartInput;
}
