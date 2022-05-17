import { gql } from "@apollo/client";
const createAddressMutation = gql`
  mutation createAddress($input: CreateAddressInput!) {
    createAddress(input: $input) {
      ok
      error
      createdAddressId
    }
  }
`;

export default createAddressMutation;
