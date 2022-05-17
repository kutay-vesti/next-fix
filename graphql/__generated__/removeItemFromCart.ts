/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RemoveItemFromCartInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: removeItemFromCart
// ====================================================

export interface removeItemFromCart_removeItemFromCart {
  __typename: "RemoveItemFromCartOutput";
  ok: boolean;
  error: string | null;
}

export interface removeItemFromCart {
  removeItemFromCart: removeItemFromCart_removeItemFromCart;
}

export interface removeItemFromCartVariables {
  input: RemoveItemFromCartInput;
}
