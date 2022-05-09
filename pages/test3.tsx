import Head from "next/head";
import { GetServerSideProps } from "next";
import algoliasearch from "algoliasearch/lite";
import { Hit as AlgoliaHit } from "instantsearch.js";
import {
  DynamicWidgets,
  InstantSearch,
  Hits,
  Highlight,
  SearchBox,
  InstantSearchServerState,
  InstantSearchSSRProvider,
} from "react-instantsearch-hooks-web";
import { getServerState } from "react-instantsearch-hooks-server";
import { history } from "instantsearch.js/es/lib/routers/index.js";
import { Panel } from "@components/collection/RefinementList/Panel";
import Adjustment from "@components/icons/Adjustment";
import { useState } from "react";
import { ProductCard } from "@components/product";
import { RefinementList } from "@components/collection/RefinementList/RefinementList";
import { RefinementListColor } from "@components/collection/RefinementList/RefinementListColor";
import { RefinementListSize } from "@components/collection/RefinementList/RefinementListSize";

// const client = algoliasearch("latency", "6be0576ff61c053d5f9a3225e2a90f76");
const client = algoliasearch("2S3Q24UHG3", "2479538bbf6bfdcdf3c5e7103b18b1cb");

type HitProps = {
  hit: AlgoliaHit<{
    name: string;
    price: number;
  }>;
};

// function Hit({ hit }: HitProps) {
//   return (
//     <>
//       <Highlight hit={hit} attribute="name" className="Hit-label" />
//       <span className="Hit-price">{hit.price}</span>
//     </>
//   );
// }

type HomePageProps = {
  serverState?: InstantSearchServerState;
  url?: string;
};

export default function Test3({ serverState, url }: HomePageProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
  return (
    <div className="flex flex-row items-center  justify-center ">
      <InstantSearch
        searchClient={client}
        indexName="vesti-test"
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
        <div className="flex max-w-[1880px] w-full overflow-visible flex-col bg-red-600">
          <div className=" mb-3 flex justify-between items-center bg-green-600">
            <h1 className="font-black text-4xl  uppercase pb-3">
              {/* {data?.getProducts.products?.length !== 0 &&
              data?.getProducts.products?.[0].collections?.[0].name} */}
              Collections
            </h1>
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
                <Panel header="Size">
                  <RefinementListSize attribute="size.values" />
                </Panel>
                <Panel header="color.values">
                  <RefinementListColor attribute="color.values" />
                </Panel>

                {/* <DynamicWidgets fallbackComponent={FallbackComponent} /> */}
                <DynamicWidgets fallbackComponent={FallbackComponent} />
              </div>
            </div>

            <div className="h-full w-full col-span-3  max-w-[1588px]">
              <div className="content-top   justify-end p-2 hidden  tablet:flex "></div>

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
      </InstantSearch>
    </div>
  );
}

function FallbackComponent({ attribute }: { attribute: string }) {
  if (attribute === "color.values" || attribute === "size.values") {
    return;
  }
  return (
    <Panel header={attribute}>
      <RefinementList attribute={attribute} />
    </Panel>
  );
}

// export const getServerSideProps: GetServerSideProps<HomePageProps> =
//   async function getServerSideProps({ req }) {
//     const protocol = req.headers.referer?.split("://")[0] || "https";
//     const url = `${protocol}://${req.headers.host}${req.url}`;
//     const serverState = await getServerState(<HomePage url={url} />);

//     return {
//       props: {
//         serverState,
//         url,
//       },
//     };
//   };
