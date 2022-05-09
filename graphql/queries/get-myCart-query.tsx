import { gql } from "@apollo/client";

const getMyCartQuery = gql`
  query myCart {
    myCart {
      ok
      error
      cart {
        id
        totalPrice
        totalDiscount
        isActive
        shippingAddressId
        billingAddressId
        totalPriceAfterDiscount
        totalTax
        totalServiceFee
        totalShippingFee
        totalInsuranceFee
        cartItems {
          productName
          productId
          brandName
          image
          id
          quantity
          itemType
          rentalEndDate
          rentalStartDate
          rentalPeriod
          itemType
          sku {
            id
            marketValue
            retailStock
            rentalStock
            comparisonRentalPrice4Days
            rentalPrice4Days
            discountedRentalPrice4Days
            comparisonRentalPrice8Days
            rentalPrice8Days
            discountedRentalPrice8Days
            comparisonRetailPrice
            retailPrice
            discountedRetailPrice
            expressShippingExtra

            sku
            isExhibition
            option1
            color
            size
            product {
              brand {
                name
                id
                slug
              }
              name
              id
              productImages {
                imageURL
                id
                altText
                variant
              }
            }
          }
        }
      }
    }
  }
`;

export default getMyCartQuery;
