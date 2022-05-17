import { gql } from "@apollo/client";
const removeItemFormCartMutation = gql`
  mutation removeItemFromCart($input: RemoveItemFromCartInput!) {
    removeItemFromCart(input: $input) {
      ok
      error
    }
  }
`;

export default removeItemFormCartMutation;
