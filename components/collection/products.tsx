import { useLazyQuery } from "@apollo/client";
import algoliasearch from "algoliasearch/lite";
import { Hits, InstantSearch, SearchBox } from "react-instantsearch-hooks-web";
import { useQuery, gql, ApolloClient } from "@apollo/client";
import { getProductsQuery } from "graphql/queries";
import {
  getProducts,
  getProducts_getProducts_products,
} from "graphql/__generated__/getProducts";
import { Sorting } from "graphql/__generated__/globalTypes";
import { useRouter } from "next/router";
// import { PRODUCTS_QUERY } from "pages/collections/[collection]";

import React, { FC, useState } from "react";

interface IProducts {
  ProductsData: getProducts;
  collection: string | string[] | undefined;
}

export const Products: FC<IProducts> = ({ ProductsData, collection }) => {
  const [productsData, setProductsData] = useState(
    ProductsData?.getProducts?.products || []
  );

  const routert = useRouter();

  const handleSetProducts = (products: getProducts_getProducts_products) => {
    const newProducts = productsData.concat(products);
    // console.log("newProducts", newProducts);
    setProductsData(newProducts);
  };

  const [lazyLoading, { loading, error }] = useLazyQuery(getProductsQuery, {
    variables: {
      input: {
        category: "elbise",
        collections: [collection],
        eventTypes: null,
        colors: null,
        sizes: null,
        filters: null,
        dates: null,
        sorting: Sorting[Sorting.Recommended],
        offset: 4,
        limit: 2,
      },
    },

    notifyOnNetworkStatusChange: true,
    onError(error) {
      // console.log("errror", error);
    },
    onCompleted: (data) => {
      // console.log("clicked");
      // console.log("getted products", data.getProducts?.products);
      handleSetProducts(data.getProducts?.products);
    },
  });

  // console.log("productsData", productsData);
  return (
    <div>
      <span>{routert.locales}</span>
      Products
      <button onClick={() => lazyLoading()}>lazy load</button>
      <button
        onClick={() =>
          routert.replace({
            pathname: `/collections/${collection}/`,
            query: { page: "2" },
          })
        }
      >
        Router
      </button>
      <div>
        {productsData?.map((product) => (
          <div key={product.id}>{product.id}</div>
        ))}
      </div>
    </div>
  );
};
