/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductFilterInputType, ColorType } from "./globalTypes";

// ====================================================
// GraphQL query operation: getProducts
// ====================================================

export interface getProducts_getProducts_products_color {
  __typename: "ColorVariant";
  values: ColorType[] | null;
  hexCodes: string[] | null;
}

export interface getProducts_getProducts_products_brand {
  __typename: "Brand";
  name: string;
}

export interface getProducts_getProducts_products_productImages {
  __typename: "ProductImage";
  imageURL: string;
  altText: string | null;
  isListing: boolean | null;
}

export interface getProducts_getProducts_products_collections {
  __typename: "Collection";
  name: string;
}

export interface getProducts_getProducts_products {
  __typename: "Product";
  id: string;
  name: string;
  comparisonRentalPrice4Days: number;
  marketValue: number;
  description: string;
  slug: string | null;
  rentalPrice4Days: number;
  discountedRentalPrice4Days: number;
  comparisonRentalPrice8Days: number;
  rentalPrice8Days: number;
  discountedRentalPrice8Days: number;
  comparisonRetailPrice: number;
  retailPrice: number;
  discountedRetailPrice: number;
  expressShippingExtra: number;
  color: getProducts_getProducts_products_color | null;
  brand: getProducts_getProducts_products_brand | null;
  productImages: getProducts_getProducts_products_productImages[] | null;
  collections: getProducts_getProducts_products_collections[] | null;
}

export interface getProducts_getProducts {
  __typename: "GetProductsOutput";
  ok: boolean;
  error: string | null;
  isLastPage: boolean | null;
  totalResults: string | null;
  products: getProducts_getProducts_products[] | null;
}

export interface getProducts {
  getProducts: getProducts_getProducts;
}

export interface getProductsVariables {
  input: ProductFilterInputType;
}
