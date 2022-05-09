/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: addressQuery
// ====================================================

export interface addressQuery_myAddresses_defaultShippingAddress {
  __typename: "Address";
  id: string;
  firstname: string | null;
  lastname: string | null;
  title: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string | null;
  zipCode: string;
  country: string;
  phoneNumber: string;
}

export interface addressQuery_myAddresses_defaultBillingAddress {
  __typename: "Address";
  id: string;
  firstname: string | null;
  lastname: string | null;
  title: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string | null;
  zipCode: string;
  country: string;
  phoneNumber: string;
}

export interface addressQuery_myAddresses_otherAddresses {
  __typename: "Address";
  id: string;
  firstname: string | null;
  lastname: string | null;
  title: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string | null;
  zipCode: string;
  country: string;
  phoneNumber: string;
}

export interface addressQuery_myAddresses {
  __typename: "myAddressesOutput";
  defaultShippingAddress: addressQuery_myAddresses_defaultShippingAddress | null;
  defaultBillingAddress: addressQuery_myAddresses_defaultBillingAddress | null;
  otherAddresses: addressQuery_myAddresses_otherAddresses[] | null;
}

export interface addressQuery {
  myAddresses: addressQuery_myAddresses;
}
