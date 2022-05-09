// import { useRouter } from "next/router";
// import React, { useState } from "react";
// import type {
//   GetStaticPaths,
//   GetStaticProps,
//   InferGetStaticPropsType,
//   NextPage,
// } from "next";
// import { useQuery, gql, ApolloClient } from "@apollo/client";

// import { initializeApollo } from "@lib/apollo";
// import { Products } from "@components/collection/products";
// import { getProductsQuery } from "graphql/queries";
// import { Sorting } from "graphql/__generated__/globalTypes";
// import {
//   getProducts,
//   getProductsVariables,
// } from "graphql/__generated__/getProducts";
// import { CollectionView } from "@components/collection";
// import { Layout } from "@components/common";

// interface ICollection {}

// // const Collection: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({

// const Collection: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
//   ProductsData,
//   collection,
// }) => {
//   const router = useRouter();

//   const [isAllProductsShowen, setIsAllProductsShowen] = useState(false);
//   const [offsetNum, setOffsetNum] = useState<number>(1);

//   const [pageNumber, setPageNumber] = useState<number>(1);

//   return router.isFallback ? (
//     <h1>Loading...</h1>
//   ) : (
//     <div>
//       <button onClick={() => {}}>123</button>
//       <Products ProductsData={ProductsData} collection={collection}></Products>
//       {/* <CollectionView ProductsData={ProductsData} collection={collection} /> */}

//       <h2>hello</h2>
//     </div>
//   );
// };
// export default Collection;

// export const getStaticPaths: GetStaticPaths = () => {
//   return {
//     paths: [
//       { params: { collection: "collection" } },
//       { params: { collection: "bestsellers" } },
//     ],
//     fallback: true,
//   };
// };

// export const getStaticProps: GetStaticProps = async (ctx) => {
//   const apolloClient: ApolloClient<object> = initializeApollo();

//   console.log("ctxctx", ctx.params);
//   const { data, error } = await apolloClient.query<
//     getProducts,
//     getProductsVariables
//   >({
//     query: getProductsQuery,
//     variables: {
//       input: {
//         category: "elbise",
//         collections: [ctx.params?.collection + ""],
//         eventTypes: null,
//         colors: null,
//         sizes: null,
//         filters: null,
//         dates: null,
//         sorting: Sorting[Sorting.Recommended],
//         offset: 1,
//         limit: 2,
//       },
//     },
//   });
//   console.log("error", error);
//   return {
//     props: {
//       ProductsData: data,
//       collection: ctx.params?.collection,
//     },
//   };
// };

import React from "react";

export const Colleiz = () => {
  return <div>Colleiz</div>;
};
