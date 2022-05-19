import { ApolloClient } from "@apollo/client";
import Layout from "@components/common/Layout";
import ProductCarousel from "@components/common/ProductCarousel";

import { EventType, Hero } from "@components/home";
import { Divider } from "@components/ui";
import { initializeApollo } from "@lib/apollo";
import { getProductsQuery, getShopEventTypeQuery } from "graphql/queries";
import {
  getProducts,
  getProductsVariables,
} from "graphql/__generated__/getProducts";
import { Sorting } from "graphql/__generated__/globalTypes";
import { shopEventTypeQuery } from "graphql/__generated__/shopEventTypeQuery";

import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import Link from "next/link";

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient: ApolloClient<object> = initializeApollo();

  const { data: eventTypeQuery } = await apolloClient.query<shopEventTypeQuery>(
    {
      query: getShopEventTypeQuery,
    }
  );

  const { data: productData, error } = await apolloClient.query<
    getProducts,
    getProductsVariables
  >({
    query: getProductsQuery,
    variables: {
      input: {
        category: "elbise",
        collections: ["collection"],
        eventTypes: null,
        colors: null,
        sizes: null,
        filters: null,
        dates: null,
        sorting: Sorting[Sorting.Recommended],
        offset: 1,
        limit: 8,
      },
    },
  });

  return {
    props: {
      eventTypeQuery,
      productData,
    },
  };
};

export default function Home({
  eventTypeQuery,
  productData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="flex flex-col">
      <Hero />
      <EventType eventTypeQuery={eventTypeQuery} />
      <Divider />
      <Link href="/collections/collection">collection</Link>

      <Link href="/auth/login">login</Link>
      <Link href="/auth-check">auth</Link>
      <ProductCarousel
        CollectionName="collection"
        HeadlineText="Recent Collection"
        productData={productData}
      />
      <div className="h-96 bg-red-600 py-4"></div>
      <div className="h-96 bg-green-600 py-4"></div>
      <div className="h-96 bg-red-600 py-4"></div>
      <div className="h-96 bg-cyan-600 py-4"></div>
    </div>
  );
}

Home.Layout = Layout;
