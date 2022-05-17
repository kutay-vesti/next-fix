import { gql } from "@apollo/client";

const getEditProfileQuery = gql`
  query editprofilemeQuery {
    me {
      id
      email
      firstname
      lastname
      phone
      birthDate
      isVerified
    }
  }
`;

export default getEditProfileQuery;
