/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteItemFromCartInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: deleteItemFromCart
// ====================================================

export interface deleteItemFromCart_deleteItemFromCart_cart {
  __typename: "Cart";
  id: string;
}

export interface deleteItemFromCart_deleteItemFromCart {
  __typename: "DeleteItemFromCartOutput";
  ok: boolean;
  cart: deleteItemFromCart_deleteItemFromCart_cart | null;
  error: string | null;
}

export interface deleteItemFromCart {
  deleteItemFromCart: deleteItemFromCart_deleteItemFromCart;
}

export interface deleteItemFromCartVariables {
  input: DeleteItemFromCartInput;
}
