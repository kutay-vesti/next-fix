import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "@lib/apollo";
import { Head } from "@components/common";
import { FC, ReactNode, useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";

import algoliasearch from "algoliasearch";

interface INoop {
  children: ReactNode;
}
const Noop: FC<INoop> = ({ children }) => <>{children}</>;

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  const Layout = (Component as any).Layout || Noop;
  return (
    <>
      <ApolloProvider client={apolloClient}>
        <SessionProvider session={pageProps.session}>
          <Head />
          <Layout pageProps={pageProps}>
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
