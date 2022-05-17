/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteAddressInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: deleteAddress
// ====================================================

export interface deleteAddress_updateAddress {
  __typename: "UpdateAddressOutput";
  ok: boolean;
  error: string | null;
}

export interface deleteAddress {
  updateAddress: deleteAddress_updateAddress;
}

export interface deleteAddressVariables {
  input: DeleteAddressInput;
}
