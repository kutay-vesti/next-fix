import { gql } from "@apollo/client";
const updateAddressMutation = gql`
  mutation updateAddress($input: UpdateAddressInput!) {
    updateAddress(input: $input) {
      ok
      error
    }
  }
`;

export default updateAddressMutation;
