/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum CartItemType {
  rental = "rental",
  retail = "retail",
}

export enum ColorType {
  black = "black",
  blue = "blue",
  brown = "brown",
  cream = "cream",
  crystalClear = "crystalClear",
  gold = "gold",
  green = "green",
  grey = "grey",
  multiColor = "multiColor",
  orange = "orange",
  pearl = "pearl",
  pink = "pink",
  print = "print",
  purple = "purple",
  red = "red",
  silver = "silver",
  testColor1 = "testColor1",
  testColor2 = "testColor2",
  white = "white",
  yellow = "yellow",
}

export enum OrderStatus {
  approved = "approved",
  cancelled = "cancelled",
  delivered = "delivered",
  pending = "pending",
  shipped = "shipped",
}

export enum RentalPeriod {
  eightDays = "eightDays",
  fourDays = "fourDays",
}

export enum SizeType {
  FR_32 = "FR_32",
  FR_34 = "FR_34",
  FR_36 = "FR_36",
  FR_38 = "FR_38",
  FR_40 = "FR_40",
  FR_42 = "FR_42",
  FR_44 = "FR_44",
  FR_46 = "FR_46",
  FR_48 = "FR_48",
  IT_36 = "IT_36",
  IT_38 = "IT_38",
  IT_40 = "IT_40",
  IT_42 = "IT_42",
  IT_44 = "IT_44",
  IT_46 = "IT_46",
  IT_48 = "IT_48",
  IT_50 = "IT_50",
  IT_52 = "IT_52",
  L = "L",
  M = "M",
  S = "S",
  UK_10 = "UK_10",
  UK_12 = "UK_12",
  UK_14 = "UK_14",
  UK_16 = "UK_16",
  UK_18 = "UK_18",
  UK_20 = "UK_20",
  UK_4 = "UK_4",
  UK_6 = "UK_6",
  UK_8 = "UK_8",
  US_0 = "US_0",
  US_10 = "US_10",
  US_12 = "US_12",
  US_14 = "US_14",
  US_16 = "US_16",
  US_2 = "US_2",
  US_4 = "US_4",
  US_6 = "US_6",
  US_8 = "US_8",
  XL = "XL",
  XS = "XS",
  XXL = "XXL",
  XXS = "XXS",
  XXXL = "XXXL",
  XXXS = "XXXS",
}

export enum Sorting {
  AscendingRentingPrice = "AscendingRentingPrice",
  DescendingRentingPrice = "DescendingRentingPrice",
  Latest = "Latest",
  Recommended = "Recommended",
}

export enum UserRole {
  Admin = "Admin",
  Owner = "Owner",
  User = "User",
}

export interface AddItemToCartInput {
  itemType: CartItemType;
  rentalPeriod?: RentalPeriod | null;
  quantity: number;
  rentalStartDate?: string | null;
  rentalEndDate?: string | null;
  sku: string;
  isExpressShipping: boolean;
}

export interface CreateAddressInput {
  title: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state?: string | null;
  zipCode: string;
  country: string;
  phoneNumber: string;
  firstname?: string | null;
  lastname?: string | null;
  isDefault?: boolean | null;
}

export interface CreateOrderInput {
  currency: string;
  shippingAddressId: string;
  billingAddressId: string;
}

export interface CreateUserInput {
  email: string;
  phone?: string | null;
  password: string;
  role: UserRole;
}

export interface DeleteAddressInput {
  id: string;
}

export interface DeleteItemFromCartInput {
  itemType: CartItemType;
  sku: string;
}

export interface GetAttributesOfCategoryInput {
  category?: string | null;
}

export interface GetProductInput {
  id: string;
}

export interface ProductFilterInputType {
  category?: string | null;
  collections?: string[] | null;
  eventTypes?: string[] | null;
  colors?: ColorType[] | null;
  sizes?: SizeType[] | null;
  dates?: string[] | null;
  filters?: ProductFiltersInputType[] | null;
  sorting: Sorting;
  limit: number;
  offset: number;
}

export interface ProductFiltersInputType {
  label: string;
  values: string[];
}

export interface RemoveItemFromCartInput {
  itemType: CartItemType;
  quantity: number;
  sku: string;
}

export interface SetCartAddressInput {
  shippingAddressId?: string | null;
  billingAddressId?: string | null;
}

export interface SetDefaultAddressInput {
  addressId: string;
}

export interface UpdateAddressInput {
  id: string;
  createdAt?: any | null;
  updatedAt?: any | null;
  title?: string | null;
  addressLine1?: string | null;
  addressLine2?: string | null;
  city?: string | null;
  state?: string | null;
  zipCode?: string | null;
  country?: string | null;
  phoneNumber?: string | null;
  firstname?: string | null;
  lastname?: string | null;
}

export interface UpdateUserInput {
  email?: string | null;
  phone?: string | null;
  password?: string | null;
  firstname?: string | null;
  lastname?: string | null;
  tc?: string | null;
  birthDate?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
