import { useQuery } from "@apollo/client";
import { ProductCard } from "@components/product";

import algoliasearch from "algoliasearch/lite";

import { NextPage } from "next";
import { useEffect, useState } from "react";
import {
  Hits,
  InstantSearch,
  SearchBox,
  RefinementList,
  DynamicWidgets,
  InstantSearchServerState,
  useHits,
} from "react-instantsearch-hooks-web";
// import { InstantSearch, SearchBox, Configure } from 'react-instantsearch-dom';

import qs from "qs";
import Adjustment from "@components/icons/Adjustment";
import { Panel } from "@components/collection/RefinementList/Panel";
import { history } from "instantsearch.js/es/lib/routers/index.js";
// import useCart from '../hooks/myCart';
type HomePageProps = {
  serverState?: InstantSearchServerState;
  url?: string;
};

const Test: NextPage = () => {
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

  const [position, setPosition] = useState<number>(
    typeof window !== "undefined" ? window.pageYOffset : 0
  );
  const [visible, setVisible] = useState<"up" | "in-down" | "in-up">("up");

  //   useEffect(() => {
  //     const handleScroll = () => {
  //       let moving: number =
  //         typeof window !== "undefined" ? window.pageYOffset : 0;

  //       if (position < 18) {
  //         setVisible("up");
  //       } else if (position > moving) {
  //         setVisible("in-up");
  //       } else {
  //         setVisible("in-down");
  //       }

  //       setPosition(moving);
  //     };
  //     window.addEventListener("scroll", handleScroll);
  //     return () => {
  //       window.removeEventListener("scroll", handleScroll);
  //     };
  //   }, [position]);

  const searchStateToUrl: any = (searchState: any) =>
    searchState
      ? `${window.location.pathname}?${qs.stringify(searchState)}`
      : "";
  const searchClient = algoliasearch(
    "2S3Q24UHG3",
    "2479538bbf6bfdcdf3c5e7103b18b1cb"
  );

  function FallbackComponent({ attribute }: { attribute: string }) {
    return (
      <Panel header={attribute}>
        <RefinementList attribute={attribute} />
      </Panel>
    );
  }

  return (
    <div className="flex flex-row items-center  justify-center ">
      <InstantSearch
        searchClient={searchClient}
        indexName="test2"
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
                <RefinementList attribute="collections" />
                <RefinementList attribute="brand.name" />
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
};

export default Test;
