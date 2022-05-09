/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetProductInput, ColorType, SizeType } from "./globalTypes";

// ====================================================
// GraphQL query operation: productPageQuery
// ====================================================

export interface productPageQuery_getProduct_product_brand {
  __typename: "Brand";
  id: string;
  name: string;
}

export interface productPageQuery_getProduct_product_category {
  __typename: "Category";
  id: string;
  name: string;
}

export interface productPageQuery_getProduct_product_collections {
  __typename: "Collection";
  id: string;
  name: string;
}

export interface productPageQuery_getProduct_product_option1_color_images {
  __typename: "ScaledImageObject";
  label: string;
  x1080: string;
  x70: string;
}

export interface productPageQuery_getProduct_product_option1_color_size_skus {
  __typename: "StockKeepingUnit";
  id: string;
  marketValue: number;
  rentalPrice4Days: number;
  rentalPrice8Days: number;
  discountedRetailPrice: number;
  discountedRentalPrice8Days: number;
  discountedRentalPrice4Days: number;
  comparisonRentalPrice8Days: number;
  comparisonRentalPrice4Days: number;
  comparisonRetailPrice: number;
  sku: string;
  retailStock: number;
  rentalStock: number;
  option1: string | null;
  color: ColorType;
  size: SizeType;
  isAvailable: boolean;
  retailPrice: number;
}

export interface productPageQuery_getProduct_product_option1_color_size {
  __typename: "GetProductOption3Field";
  sizeValue: string;
  skus: productPageQuery_getProduct_product_option1_color_size_skus[];
}

export interface productPageQuery_getProduct_product_option1_color {
  __typename: "GetProductOption2Field";
  colorValue: string;
  hexCode: string;
  images: productPageQuery_getProduct_product_option1_color_images[] | null;
  size: productPageQuery_getProduct_product_option1_color_size[];
}

export interface productPageQuery_getProduct_product_option1 {
  __typename: "GetProductOption1Field";
  option1Value: string;
  color: productPageQuery_getProduct_product_option1_color[];
}

export interface productPageQuery_getProduct_product {
  __typename: "ProductObjectForGet";
  id: string;
  createdAt: any;
  updatedAt: any;
  name: string;
  description: string;
  marketValue: number;
  rentalPrice4Days: number;
  rentalPrice8Days: number;
  discountedRetailPrice: number;
  discountedRentalPrice8Days: number;
  discountedRentalPrice4Days: number;
  comparisonRentalPrice8Days: number;
  comparisonRentalPrice4Days: number;
  comparisonRetailPrice: number;
  weight: number;
  brand: productPageQuery_getProduct_product_brand | null;
  category: productPageQuery_getProduct_product_category | null;
  collections: productPageQuery_getProduct_product_collections[] | null;
  option1: productPageQuery_getProduct_product_option1[] | null;
}

export interface productPageQuery_getProduct {
  __typename: "GetProductOutput";
  error: string | null;
  ok: boolean;
  product: productPageQuery_getProduct_product | null;
}

export interface productPageQuery {
  getProduct: productPageQuery_getProduct;
}

export interface productPageQueryVariables {
  input: GetProductInput;
}
