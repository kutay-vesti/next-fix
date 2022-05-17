/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateUserInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: editProfile
// ====================================================

export interface editProfile_updateUser {
  __typename: "UpdateUserOutput";
  ok: boolean;
  error: string | null;
}

export interface editProfile {
  updateUser: editProfile_updateUser;
}

export interface editProfileVariables {
  input: UpdateUserInput;
}
