import { gql } from "@apollo/client";

const getProductQuery = gql`
  query productPageQuery($input: GetProductInput!) {
    getProduct(input: $input) {
      error
      ok
      product {
        id
        createdAt
        updatedAt
        name
        description
        marketValue
        rentalPrice4Days
        rentalPrice8Days
        discountedRetailPrice
        discountedRentalPrice8Days
        discountedRentalPrice4Days
        comparisonRentalPrice8Days
        comparisonRentalPrice4Days
        comparisonRetailPrice
        weight
        brand {
          id
          name
        }
        category {
          id
          name
        }
        collections {
          id
          name
        }
        option1 {
          option1Value
          color {
            colorValue
            hexCode

            images {
              label
              x1080
              x70
            }
            size {
              sizeValue
              skus {
                id
                marketValue
                rentalPrice4Days
                rentalPrice8Days
                discountedRetailPrice
                discountedRentalPrice8Days
                discountedRentalPrice4Days
                comparisonRentalPrice8Days
                comparisonRentalPrice4Days
                comparisonRetailPrice
                sku
                retailStock
                rentalStock
                option1
                color
                size
                isAvailable
                retailPrice
              }
            }
          }
        }
      }
    }
  }
`;

export default getProductQuery;
