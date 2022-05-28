/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateOrderInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createOrder
// ====================================================

export interface createOrder_createOrder_orders {
  __typename: "Order";
  id: string;
}

export interface createOrder_createOrder {
  __typename: "CreateOrderOutput";
  ok: boolean;
  error: string | null;
  orders: createOrder_createOrder_orders[] | null;
}

export interface createOrder {
  createOrder: createOrder_createOrder;
}

export interface createOrderVariables {
  input: CreateOrderInput;
}
