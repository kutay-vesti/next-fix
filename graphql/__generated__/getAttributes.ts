/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetAttributesOfCategoryInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getAttributes
// ====================================================

export interface getAttributes_getAttributes_attributes_attributeValues {
  __typename: "AttributeValue";
  id: string;
  name: string;
  slug: string;
}

export interface getAttributes_getAttributes_attributes {
  __typename: "AttributeLabel";
  id: string;
  name: string;
  slug: string;
  attributeValues: getAttributes_getAttributes_attributes_attributeValues[];
}

export interface getAttributes_getAttributes {
  __typename: "GetAttributesOfCategoryOutput";
  error: string | null;
  ok: boolean;
  category: string | null;
  attributes: getAttributes_getAttributes_attributes[] | null;
}

export interface getAttributes {
  getAttributes: getAttributes_getAttributes;
}

export interface getAttributesVariables {
  input: GetAttributesOfCategoryInput;
}
