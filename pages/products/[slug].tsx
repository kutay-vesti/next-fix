import { ApolloClient } from "@apollo/client";
import { Layout } from "@components/common";
import ProductView from "@components/product/ProductView";
import { initializeApollo } from "@lib/apollo";
import { getProductQuery, getProductsQuery } from "graphql/queries";
import {
  getProducts,
  getProductsVariables,
} from "graphql/__generated__/getProducts";
import { Sorting } from "graphql/__generated__/globalTypes";
import {
  productPageQuery,
  productPageQueryVariables,
} from "graphql/__generated__/productPageQuery";
import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { useRouter } from "next/router";

export async function getStaticProps({
  params,
  locale,
  locales,
  preview,
}: GetStaticPropsContext<{ slug: string }>) {
  const apolloClient: ApolloClient<object> = initializeApollo();
  const config = { locale, locales };

  const { data: productData, error } = await apolloClient.query<
    productPageQuery,
    productPageQueryVariables
  >({
    query: getProductQuery,
    variables: {
      input: {
        id: params!.slug,
      },
    },
  });

  if (!productData) {
    throw new Error(`Product with slug '${params!.slug}' not found`);
  }

  return {
    props: {
      productData,
    },
    revalidate: 100,
  };
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const apolloClient: ApolloClient<object> = initializeApollo();
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
        limit: 10,
      },
    },
  });

  return {
    paths: locales
      ? locales.reduce<string[]>((arr, locale) => {
          // Add a product path for every locale
          productData?.getProducts?.products?.forEach((product) => {
            arr.push(`/${locale}/products/${product.id}`);
          });
          return arr;
        }, [])
      : productData?.getProducts?.products?.map(
          (product) => `/products/${product.id}`
        ),
    fallback: "blocking",
  };
}

export default function Slug({
  productData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  return router.isFallback ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <ProductView productData={productData} />
      {/* <span>{JSON.stringify(productData, null, 2)}</span> */}
    </>
  );
}

Slug.Layout = Layout;
