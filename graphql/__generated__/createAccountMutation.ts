/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateUserInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createAccountMutation
// ====================================================

export interface createAccountMutation_createUser {
  __typename: "CreateUserOutput";
  ok: boolean;
  error: string | null;
}

export interface createAccountMutation {
  createUser: createAccountMutation_createUser;
}

export interface createAccountMutationVariables {
  input: CreateUserInput;
}
