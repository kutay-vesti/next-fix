/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: shopEventTypeQuery
// ====================================================

export interface shopEventTypeQuery_getAllEventTypes_eventTypes {
  __typename: "EventType";
  id: string;
  name: string;
  imageURL: string | null;
  slug: string;
}

export interface shopEventTypeQuery_getAllEventTypes {
  __typename: "GetAllEventTypesOutput";
  error: string | null;
  ok: boolean;
  eventTypes: shopEventTypeQuery_getAllEventTypes_eventTypes[] | null;
}

export interface shopEventTypeQuery {
  getAllEventTypes: shopEventTypeQuery_getAllEventTypes;
}
