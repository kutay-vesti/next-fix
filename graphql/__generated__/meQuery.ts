/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: meQuery
// ====================================================

export interface meQuery_me {
  __typename: "User";
  id: string;
  email: string;
  role: UserRole;
  isVerified: boolean | null;
  firstname: string | null;
}

export interface meQuery {
  me: meQuery_me;
}
