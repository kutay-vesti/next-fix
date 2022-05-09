import { useLazyQuery } from "@apollo/client";
import { getProductsQuery } from "graphql/queries";
import {
  getProducts,
  getProducts_getProducts_products,
} from "graphql/__generated__/getProducts";

import { FC, useEffect, useState } from "react";

interface CollectionViewProps {
  ProductsData: getProducts;
  collection: string | string[] | undefined;
}
enum Sorting {
  AscendingRentingPrice = "AscendingRentingPrice",
  DescendingRentingPrice = "DescendingRentingPrice",
  Latest = "Latest",
  Recommended = "Recommended",
}

const CollectionView: FC<CollectionViewProps> = ({
  ProductsData,
  collection,
}) => {
  const [productsData, setProductsData] = useState(
    ProductsData?.getProducts?.products || []
  );

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
  });
  return (
    <div>
      Products
      <button onClick={() => lazyLoading()}>lazy load</button>
      <div>
        {productsData?.map((product) => (
          <div key={product.id}>{product.id}</div>
        ))}
      </div>
    </div>
  );
};

export default CollectionView;
