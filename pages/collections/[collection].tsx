import { useRouter } from "next/router";
import algoliasearch from "algoliasearch/lite";
import { Hit as AlgoliaHit } from "instantsearch.js";
import {
  DynamicWidgets,
  InstantSearch,
  Hits,
  Highlight,
  SearchBox,
  InstantSearchServerState,
  SortBy,
  InstantSearchSSRProvider,
} from "react-instantsearch-hooks-web";
import React, { useState } from "react";
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import { useQuery, gql, ApolloClient } from "@apollo/client";

import { initializeApollo } from "@lib/apollo";
import { Products } from "@components/collection/products";
import { getProductsQuery } from "graphql/queries";
import { Sorting } from "graphql/__generated__/globalTypes";
import {
  getProducts,
  getProductsVariables,
} from "graphql/__generated__/getProducts";
import { CollectionView } from "@components/collection";
import { Layout } from "@components/common";
import { ProductCard } from "@components/product";
import { Panel } from "@components/collection/RefinementList/Panel";
import { RefinementList } from "@components/collection/RefinementList/RefinementList";
import { history } from "instantsearch.js/es/lib/routers/index.js";
import { Configure } from "react-instantsearch-hooks";
import Adjustment from "@components/icons/Adjustment";
import { RefinementListSize } from "@components/collection/RefinementList/RefinementListSize";
import { RefinementListColor } from "@components/collection/RefinementList/RefinementListColor";
import CustomSortBy from "@components/collection/SortBy/SortBy";
import { MobileFilterMenuLayout } from "@components/collection/MobileFilterMenu/MobileFilterMenuLayout/MobileFilterMenuLayout";

const client = algoliasearch("2S3Q24UHG3", "2479538bbf6bfdcdf3c5e7103b18b1cb");
type HitProps = {
  hit: AlgoliaHit<{
    name: string;
    price: number;
  }>;
};

type HomePageProps = {
  serverState?: InstantSearchServerState;
  url?: string;
};

function Hit({ hit }: any) {
  // const { hits, results, sendEvent } = useHits(props);
  function FallbackComponent({ attribute }: { attribute: string }) {
    return (
      <Panel header={attribute}>
        <RefinementList attribute={attribute} />
      </Panel>
    );
  }
  return (
    <>
      {/* <span>{JSON.stringify(hit, 2, null)}</span> */}
      <ProductCard
        id={hit.id}
        name={hit.name}
        rentPrice={hit.discountedRentalPrice4Days}
        retailPrice={hit.discountedRetailPrice}
        description={hit.description}
        marketValue={hit.marketValue}
        productImages={hit.imageURL}
        color={hit.color}
        brandName={hit.brand?.name}
      ></ProductCard>
    </>
  );
}
const Collection: NextPage = () => {
  const router = useRouter();
  console.log("router", router.query.collection);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [test, setTest] = useState();
  console.log("test", test);
  return (
    <div className="flex flex-row items-center  justify-center ">
      <InstantSearch
        searchClient={client}
        indexName="vesti-test"
        initialUiState={{ indexName: { collection: "collection" } }}
        routing={{
          router: history({
            getLocation() {
              if (typeof window === "undefined") {
                return new URL(url!) as unknown as Location;
              }

              return window.location;
            },
          }),
        }}
      >
        <Configure filters={`collection:${router.query.collection}`} />
        <div className="flex max-w-[1880px] w-full overflow-visible flex-col ">
          <div className=" mb-3 flex justify-between items-center">
            <h1 className="font-black text-4xl  uppercase pb-3">
              {/* {data?.getProducts.products?.length !== 0 &&
              data?.getProducts.products?.[0].collections?.[0].name} */}
              {router.query.collection}
            </h1>
            <div>
              {/* <CustomSortBy
                items={[
                  { label: "Featured", value: "vesti-test" },
                  { label: "Price (asc)", value: "Decending" },
                  { label: "Price (desc)", value: "assending" },
                ]}
              /> */}
            </div>
            <div className=" tablet:hidden block ">
              <button
                onClick={() => setIsFilterOpen((prev) => !prev)}
                className="flex justify-center items-center px-4 py-2"
              >
                <Adjustment className="w-6 h-6 rotate-90 text-[#3d3d3d] " />
                <span className="text-sm">Filter</span>
              </button>
            </div>
          </div>

          <div className="flex">
            <div className="flex-none  w-[230px]  h-screen sticky top-0 left-0 overflow-scroll  items-start justify-start overflow-x-hidden tablet:block hidden">
              <div className="px-4 pt-2 pb-2 text-sm text-gray-500 ">
                <RefinementListSize attribute="size.values" />

                <RefinementListColor attribute="color.values" />

                {/* <DynamicWidgets fallbackComponent={FallbackComponent} /> */}
                <DynamicWidgets
                  // transformItems={(items, { results }) => {
                  //   if (results.hits.length > 0) {
                  //     return items;
                  //   }
                  // }}
                  fallbackComponent={FallbackComponent}
                />
              </div>
            </div>

            <div className="h-full w-full col-span-3  max-w-[1588px]">
              <div className="content-top   justify-end p-2 hidden  tablet:flex ">
                <SortBy
                  items={[
                    { label: "Featured", value: "vesti-test" },
                    { label: "Price (asc)", value: "Decending" },
                    { label: "Price (desc)", value: "assending" },
                  ]}
                />
              </div>

              {/* product mapping function */}
              <Hits
                hitComponent={Hit}
                classNames={{
                  list: "grid desktop:grid-cols-4 tablet:grid-cols-3  grid-cols-2 gap-y-3 gap-x-1 tablet:gap-x-4 tablet:px-2",
                  root: "root ",
                  emptyRoot: "",
                }}
              />
            </div>

            <div>{/* <SearchBox /> */}</div>
          </div>
        </div>
        <div>
          <MobileFilterMenuLayout
            isFilterOpen={isFilterOpen}
            setIsFilterOpen={setIsFilterOpen}
          >
            <>
              <div className="px-4 pt-2 pb-2 text-sm text-gray-500 ">
                <RefinementListSize attribute="size.values" />

                <RefinementListColor attribute="color.values" />

                {/* <DynamicWidgets fallbackComponent={FallbackComponent} /> */}
                <DynamicWidgets fallbackComponent={FallbackComponent} />
              </div>
            </>
          </MobileFilterMenuLayout>
        </div>
      </InstantSearch>
    </div>
  );
};
export default Collection;
function FallbackComponent({ attribute }: { attribute: string }) {
  if (attribute === "color.values" || attribute === "size.values") {
    return;
  }

  // <Panel header={attribute}>
  {
    /* </Panel> */
  }
  return <RefinementList attribute={attribute} />;
}

Collection.Layout = Layout;
