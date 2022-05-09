/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderStatus, CartItemType, RentalPeriod, ColorType, SizeType } from "./globalTypes";

// ====================================================
// GraphQL query operation: myOrders
// ====================================================

export interface myOrders_myOrders_orders_shippingAddress {
  __typename: "Address";
  id: string;
  createdAt: any;
  updatedAt: any;
  title: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string | null;
  zipCode: string;
  country: string;
  phoneNumber: string;
  firstname: string | null;
  lastname: string | null;
}

export interface myOrders_myOrders_orders_billingAddress {
  __typename: "Address";
  id: string;
  createdAt: any;
  updatedAt: any;
  title: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string | null;
  zipCode: string;
  country: string;
  phoneNumber: string;
  firstname: string | null;
  lastname: string | null;
}

export interface myOrders_myOrders_orders_items_sku_merchant {
  __typename: "Merchant";
  displayName: string;
}

export interface myOrders_myOrders_orders_items_sku_product {
  __typename: "Product";
  name: string;
  id: string;
}

export interface myOrders_myOrders_orders_items_sku {
  __typename: "StockKeepingUnit";
  id: string;
  createdAt: any;
  updatedAt: any;
  sku: string;
  marketValue: number;
  comparisonRentalPrice4Days: number;
  rentalPrice4Days: number;
  discountedRentalPrice4Days: number;
  comparisonRentalPrice8Days: number;
  rentalPrice8Days: number;
  discountedRentalPrice8Days: number;
  comparisonRetailPrice: number;
  retailPrice: number;
  discountedRetailPrice: number;
  expressShippingExtra: number;
  retailStock: number;
  rentalStock: number;
  rentedDays: string[] | null;
  isAvailable: boolean;
  isExhibition: boolean;
  isExpressShipping: boolean;
  option1: string | null;
  color: ColorType;
  colorHexCode: string;
  size: SizeType;
  merchant: myOrders_myOrders_orders_items_sku_merchant | null;
  product: myOrders_myOrders_orders_items_sku_product | null;
}

export interface myOrders_myOrders_orders_items {
  __typename: "OrderItem";
  image: string | null;
  id: string;
  itemType: CartItemType;
  rentalPeriod: RentalPeriod | null;
  quantity: number;
  rentalStartDate: string | null;
  rentalEndDate: string | null;
  sku: myOrders_myOrders_orders_items_sku;
  createdAt: any;
  updatedAt: any;
  productName: string | null;
  productSlug: string | null;
  merchantName: string | null;
  merchantId: string | null;
  brandName: string | null;
  brandSlug: string | null;
}

export interface myOrders_myOrders_orders {
  __typename: "Order";
  id: string;
  createdAt: any;
  updatedAt: any;
  totalPrice: number;
  subTotal: number;
  currency: string;
  status: OrderStatus;
  shippingAddress: myOrders_myOrders_orders_shippingAddress;
  billingAddress: myOrders_myOrders_orders_billingAddress;
  items: myOrders_myOrders_orders_items[];
  tax: number;
}

export interface myOrders_myOrders {
  __typename: "MyOrdersOutput";
  error: string | null;
  ok: boolean;
  orders: myOrders_myOrders_orders[] | null;
}

export interface myOrders {
  myOrders: myOrders_myOrders;
}
