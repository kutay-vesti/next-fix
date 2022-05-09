import { gql } from "@apollo/client";

const getMeQuery = gql`
  query meQuery {
    me {
      id
      email
      role
      isVerified
      firstname
    }
  }
`;

export default getMeQuery;
