import { gql } from "@apollo/client";
const addItemToCartMutation = gql`
  mutation addItemToCart($input: AddItemToCartInput!) {
    addItemToCart(input: $input) {
      ok
      error
      cart {
        id
        multipleVendors
        totalPrice
        cartItems {
          id
          itemType
          quantity
          sku {
            sku
            retailStock
            rentalStock
            rentalPrice4Days
            rentalPrice8Days
          }
        }
      }
    }
  }
`;

export default addItemToCartMutation;
