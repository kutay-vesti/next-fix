/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: editprofilemeQuery
// ====================================================

export interface editprofilemeQuery_me {
  __typename: "User";
  id: string;
  email: string;
  firstname: string | null;
  lastname: string | null;
  phone: string | null;
  birthDate: string | null;
  isVerified: boolean | null;
}

export interface editprofilemeQuery {
  me: editprofilemeQuery_me;
}
