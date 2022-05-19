import { gql } from "@apollo/client";
const deleteAddressMutation = gql`
  mutation deleteAddress($input: DeleteAddressInput!) {
    deleteAddress(input: $input) {
      ok
      error
    }
  }
`;

export default deleteAddressMutation;
