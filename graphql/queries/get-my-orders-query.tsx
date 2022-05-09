import { gql } from "@apollo/client";

const getMyOrders = gql`
  query myOrders {
    myOrders {
      error
      ok
      orders {
        id
        createdAt
        updatedAt
        totalPrice
        subTotal
        currency
        status
        shippingAddress {
          id
          createdAt
          updatedAt
          title
          addressLine1
          addressLine2
          city
          state
          zipCode
          country
          phoneNumber
          firstname
          lastname
        }
        billingAddress {
          id
          createdAt
          updatedAt
          title
          addressLine1
          addressLine2
          city
          state
          zipCode
          country
          phoneNumber
          firstname
          lastname
        }
        items {
          image
          id
          itemType
          rentalPeriod
          quantity
          rentalStartDate
          rentalEndDate
          sku {
            id
            createdAt
            updatedAt
            sku
            marketValue
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
            retailStock
            rentalStock
            rentedDays
            isAvailable
            isExhibition
            isExpressShipping
            option1
            color
            colorHexCode
            size
            merchant {
              displayName
            }
            product {
              name
              id
            }
          }
          createdAt
          updatedAt
          productName
          productSlug
          merchantName
          merchantId
          brandName
          brandSlug
        }
        tax
      }
    }
  }
`;

export default getMyOrders;
