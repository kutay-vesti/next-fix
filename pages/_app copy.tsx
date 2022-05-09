import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "@lib/apollo";
import { Head } from "@components/common";
import { FC, ReactNode } from "react";
// import { InstantSearch } from "react-instantsearch-hooks-web";
import { InstantSearch } from "react-instantsearch-dom";

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
      <Head />
      <ApolloProvider client={apolloClient}>
        <Layout pageProps={pageProps}>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
