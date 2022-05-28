/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SetCartAddressInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: setCartAddress
// ====================================================

export interface setCartAddress_setCartAddress_cart {
  __typename: "Cart";
  id: string;
  shippingAddressId: string | null;
  billingAddressId: string | null;
}

export interface setCartAddress_setCartAddress {
  __typename: "MyCartOutput";
  error: string | null;
  ok: boolean;
  cart: setCartAddress_setCartAddress_cart | null;
}

export interface setCartAddress {
  setCartAddress: setCartAddress_setCartAddress;
}

export interface setCartAddressVariables {
  input: SetCartAddressInput;
}
