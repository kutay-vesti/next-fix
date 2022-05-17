import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "@lib/apollo";
import { Head } from "@components/common";
import { FC, ReactNode, useEffect, useState } from "react";

import algoliasearch from "algoliasearch";
import { getAccessToken, setAccessToken } from "@lib/accesstoken";
interface INoop {
  children: ReactNode;
}
const Noop: FC<INoop> = ({ children }) => <>{children}</>;

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/refreshToken", {
      method: "POST",
      credentials: "include",
    }).then(async (x) => {
      const { accessToken } = await x.json();
      setAccessToken(accessToken);
      setLoading(false);
    });
  }, []);
  // if (loading) {
  //   return <div>loading... token</div>;
  // }
  const Layout = (Component as any).Layout || Noop;
  return (
    <>
      <ApolloProvider client={apolloClient}>
        <Head />
        <Layout pageProps={pageProps}>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
