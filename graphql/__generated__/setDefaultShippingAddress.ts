/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SetDefaultAddressInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: setDefaultShippingAddress
// ====================================================

export interface setDefaultShippingAddress_setDefaultShippingAddress {
  __typename: "myAddressesOutput";
  ok: boolean;
  error: string | null;
}

export interface setDefaultShippingAddress {
  setDefaultShippingAddress: setDefaultShippingAddress_setDefaultShippingAddress;
}

export interface setDefaultShippingAddressVariables {
  input: SetDefaultAddressInput;
}
