import { gql } from "@apollo/client";
const setDefaultShippingAddressMutation = gql`
  mutation setDefaultShippingAddress($input: SetDefaultAddressInput!) {
    setDefaultShippingAddress(input: $input) {
      ok
      error
      defaultShippingAddress {
        id
        title
      }
    }
  }
`;

export default setDefaultShippingAddressMutation;
