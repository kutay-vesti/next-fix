import { gql } from "@apollo/client";

const getShopEventTypeQuery = gql`
  query shopEventTypeQuery {
    getAllEventTypes {
      error
      ok
      eventTypes {
        id
        name
        imageURL
        slug
      }
    }
  }
`;

export default getShopEventTypeQuery;
