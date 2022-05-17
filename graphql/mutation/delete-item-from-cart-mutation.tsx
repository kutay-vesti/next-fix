import { gql } from "@apollo/client";
const deleteItemFromCartMutation = gql`
  mutation deleteItemFromCart($input: DeleteItemFromCartInput!) {
    deleteItemFromCart(input: $input) {
      ok
      cart {
        id
      }
      error
    }
  }
`;

export default deleteItemFromCartMutation;
