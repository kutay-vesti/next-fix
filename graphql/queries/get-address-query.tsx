import { gql } from "@apollo/client";

const getAddressQuery = gql`
  query addressQuery {
    myAddresses {
      defaultShippingAddress {
        id
        firstname
        lastname
        title
        addressLine1
        addressLine2
        city
        state
        zipCode
        country
        phoneNumber
      }
      defaultBillingAddress {
        id
        firstname
        lastname
        title
        addressLine1
        addressLine2
        city
        state
        zipCode
        country
        phoneNumber
      }

      otherAddresses {
        id
        firstname
        lastname
        title
        addressLine1
        addressLine2
        city
        state
        zipCode
        country
        phoneNumber
      }
    }
  }
`;

export default getAddressQuery;
