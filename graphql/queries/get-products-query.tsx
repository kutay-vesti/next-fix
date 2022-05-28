import { gql } from "@apollo/client";

const getProductsQuery = gql`
  query getProducts($input: ProductFilterInputType!) {
    getProducts(input: $input) {
      ok
      error
      isLastPage
      totalResults
      products {
        id
        name
        comparisonRentalPrice4Days
        marketValue
        description
        name
        slug
        rentalPrice4Days
        discountedRentalPrice4Days
        comparisonRentalPrice8Days
        rentalPrice8Days
        discountedRentalPrice8Days
        comparisonRetailPrice
        retailPrice
        discountedRetailPrice
        expressShippingExtra
        color {
          values
          hexCodes
        }
        brand {
          name
        }

        productImages {
          imageURL
          altText
          isListing
          color
        }
        collections {
          name
        }
      }
    }
  }
`;

export default getProductsQuery;
