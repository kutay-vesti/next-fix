import { gql } from "@apollo/client";

const getAttributesQuery = gql`
  query getAttributes($input: GetAttributesOfCategoryInput!) {
    getAttributes(input: $input) {
      error
      ok
      category
      attributes {
        id
        name
        slug
        attributeValues {
          id
          name
          slug
        }
      }
    }
  }
`;

export default getAttributesQuery;
