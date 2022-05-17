import { gql } from "@apollo/client";
const deleteAddressMutation = gql`
  mutation deleteAddress($input: DeleteAddressInput!) {
    updateAddress(input: $input) {
      ok
      error
    }
  }
`;

export default deleteAddressMutation;
