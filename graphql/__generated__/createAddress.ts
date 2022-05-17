/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateAddressInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createAddress
// ====================================================

export interface createAddress_createAddress {
  __typename: "CreateAddressOutput";
  ok: boolean;
  error: string | null;
  createdAddressId: string | null;
}

export interface createAddress {
  createAddress: createAddress_createAddress;
}

export interface createAddressVariables {
  input: CreateAddressInput;
}
