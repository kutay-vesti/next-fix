/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateAddressInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: updateAddress
// ====================================================

export interface updateAddress_updateAddress {
  __typename: "UpdateAddressOutput";
  ok: boolean;
  error: string | null;
}

export interface updateAddress {
  updateAddress: updateAddress_updateAddress;
}

export interface updateAddressVariables {
  input: UpdateAddressInput;
}
