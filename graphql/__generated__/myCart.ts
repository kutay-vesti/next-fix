/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CartItemType, RentalPeriod, ColorType, SizeType } from "./globalTypes";

// ====================================================
// GraphQL query operation: myCart
// ====================================================

export interface myCart_myCart_cart_cartItems_sku_product_brand {
  __typename: "Brand";
  name: string;
  id: string;
  slug: string;
}

export interface myCart_myCart_cart_cartItems_sku_product_productImages {
  __typename: "ProductImage";
  imageURL: string;
  id: string;
  altText: string | null;
  variant: string | null;
}

export interface myCart_myCart_cart_cartItems_sku_product {
  __typename: "Product";
  brand: myCart_myCart_cart_cartItems_sku_product_brand | null;
  name: string;
  id: string;
  productImages: myCart_myCart_cart_cartItems_sku_product_productImages[] | null;
}

export interface myCart_myCart_cart_cartItems_sku {
  __typename: "StockKeepingUnit";
  id: string;
  marketValue: number;
  retailStock: number;
  rentalStock: number;
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
  sku: string;
  isExhibition: boolean;
  option1: string | null;
  color: ColorType;
  size: SizeType;
  product: myCart_myCart_cart_cartItems_sku_product | null;
}

export interface myCart_myCart_cart_cartItems {
  __typename: "CartItem";
  productName: string | null;
  productId: string | null;
  brandName: string | null;
  image: string | null;
  id: string;
  quantity: number;
  itemType: CartItemType;
  rentalEndDate: string | null;
  rentalStartDate: string | null;
  rentalPeriod: RentalPeriod | null;
  sku: myCart_myCart_cart_cartItems_sku;
}

export interface myCart_myCart_cart {
  __typename: "Cart";
  id: string;
  totalPrice: number;
  totalDiscount: number;
  isActive: boolean;
  shippingAddressId: string | null;
  billingAddressId: string | null;
  totalPriceAfterDiscount: number;
  totalTax: number;
  totalServiceFee: number;
  totalShippingFee: number;
  totalInsuranceFee: number;
  cartItems: myCart_myCart_cart_cartItems[] | null;
}

export interface myCart_myCart {
  __typename: "MyCartOutput";
  ok: boolean;
  error: string | null;
  cart: myCart_myCart_cart | null;
}

export interface myCart {
  myCart: myCart_myCart;
}
