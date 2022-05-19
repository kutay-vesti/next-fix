// import { useMemo } from 'react';

// import type { GetServerSidePropsContext } from 'next';
// import type { IncomingMessage } from 'http';
// import { ApolloLink, createHttpLink, NormalizedCacheObject, Observable } from '@apollo/client';
// import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';
// import { getAccessToken, setAccessToken } from './accesstoken';
// import { onError } from "@apollo/client/link/error";
// import { TokenRefreshLink } from "apollo-link-token-refresh";
// import jwtDecode from "jwt-decode";

// interface PageProps {
//   props?: Record<string, any>;
// }

// export const APOLLO_STATE_PROPERTY_NAME = '__APOLLO_STATE__';
// export const COOKIES_TOKEN_NAME = 'jwt';

// // const httpLink = createHttpLink({
// //   uri: 'http://localhost:4000/graphql',
// //   credentials: 'include',
// // });

// // export const client = new ApolloClient({
// //   link: httpLink,
// //   cache: new InMemoryCache(),
// // });
// // const cache = new InMemoryCache();

// // export const client = new ApolloClient({
// //   // Provide required constructor fields
// //   ssrMode: typeof window === 'undefined',
// //   cache: new InMemoryCache(),

// //   link: new HttpLink({
// //     uri: 'http://localhost:4000/graphql',
// //   }),
// //   credentials: 'include',
// // });

// const requestLink = new ApolloLink(
//   (operation, forward) =>
//     new Observable(observer => {
//       let handle: any;
//       Promise.resolve(operation)
//         .then(operation => {
//           const accessToken = getAccessToken();
//           if (accessToken) {
//             operation.setContext({
//               headers: {
//                 authorization: `Bearer ${accessToken}`
//               }
//             });
//           }
//         })
//         .then(() => {
//           handle = forward(operation).subscribe({
//             next: observer.next.bind(observer),
//             error: observer.error.bind(observer),
//             complete: observer.complete.bind(observer)
//           });
//         })
//         .catch(observer.error.bind(observer));

//       return () => {
//         if (handle) handle.unsubscribe();
//       };
//     })
// );

// let apolloClient:any



// // function createApolloClient() {
// //   return new ApolloClient({
// //     ssrMode: typeof window === 'undefined', // set to true for SSR

    
// //     link: new HttpLink({
// //       uri: 'http://localhost:4000/graphql',
// //     }),
// //     cache: new InMemoryCache(),
// //     credentials: 'include',
// //   });
// // }



// function createApolloClient() {

// return new ApolloClient({
//   ssrMode: typeof window === 'undefined', // set to true for SSR

//   link: ApolloLink.from([
//     new TokenRefreshLink({
//       accessTokenField: "accessToken",
//       isTokenValidOrUndefined: () => {
//         const token = getAccessToken();

//         if (!token) {
//           return true;
//         }

//         try {
//           const { exp } = jwtDecode(token);
      
//           if (Date.now() >= exp * 1000) {
//             return false;
//           } else {
//             return true;
//           }
//         } catch {
//           return false;
//         }
//       },
//       fetchAccessToken: () => {
//         return fetch("localhost:4000/refreshToken", {
//           method: "POST",
//           credentials: "include"
//         });
//       },
//       handleFetch: accessToken => {
//         console.log("access token ",accessToken)
//         setAccessToken(accessToken);
//       },
//       handleError: err => {
//         console.warn("Your refresh token is invalid. Try to relogin");
//         console.error(err);
//       }
//     }),
//     onError(({ graphQLErrors, networkError }) => {
//       console.log(graphQLErrors);
//       console.log(networkError);
//     }),
//     requestLink,
//     new HttpLink({
//       uri: "http://localhost:4000/graphql",
//       credentials: "include"
//     })
//   ]),
//   cache: new InMemoryCache(),
// })

// }

// export function initializeApollo(initialState:any = null) {
//   const _apolloClient = apolloClient ?? createApolloClient();

//   // If your page has Next.js data fetching methods that use Apollo Client,
//   // the initial state gets hydrated here
//   if (initialState) {
//     // Get existing cache, loaded during client side data fetching
//     const existingCache = _apolloClient.extract();

//     // Restore the cache using the data passed from
//     // getStaticProps/getServerSideProps combined with the existing cached data
//     _apolloClient.cache.restore({ ...existingCache, ...initialState });
//   }

//   // For SSG and SSR always create a new Apollo Client
//   if (typeof window === 'undefined') return _apolloClient;

//   // Create the Apollo Client once in the client
//   if (!apolloClient) apolloClient = _apolloClient;
//   return _apolloClient;
// }

// export function useApollo(initialState:any) {
//   const store = useMemo(() => initializeApollo(initialState), [initialState]);
//   return store;
// }
// // const getToken = (req?: IncomingMessage) => {
// //   const parsedCookie = cookie.parse(
// //     req ? req.headers.cookie ?? '' : document.cookie,
// //   );

// //   return parsedCookie[COOKIES_TOKEN_NAME];
// // };

// // let apolloClient: ApolloClient<NormalizedCacheObject> = null;

// // const createApolloClient = (ctx?: GetServerSidePropsContext) => {
// //   const httpLink = createHttpLink({
// //     uri: 'https://api.vestiyer.co/graphql',
// //     credentials: 'include',
// //   });

// //   const authLink = setContext((_, { headers }) => {
// //     // Get the authentication token from cookies
// //     const token = getToken(ctx?.req);

// //     return {
// //       headers: {
// //         ...headers,
// //         authorization: token ? `Bearer ${token}` : '',
// //       },
// //     };
// //   });

// //   return new ApolloClient({
// //     ssrMode: typeof window === 'undefined',
// //     link: authLink.concat(httpLink),
// //     cache: new InMemoryCache(),
// //   });
// // };

// // export function initializeApollo(initialState = null, ctx = null) {
// //   const client = apolloClient ?? createApolloClient(ctx);

// //   // If your page has Next.js data fetching methods that use Apollo Client,
// //   // the initial state gets hydrated here
// //   if (initialState) {
// //     // Get existing cache, loaded during client side data fetching
// //     const existingCache = client.extract();

// //     // Merge the existing cache into data passed from getStaticProps/getServerSideProps
// //     const data = merge(initialState, existingCache, {
// //       // combine arrays using object equality (like in sets)
// //       arrayMerge: (destinationArray, sourceArray) => [
// //         ...sourceArray,
// //         ...destinationArray.filter((d) =>
// //           sourceArray.every((s) => !isEqual(d, s)),
// //         ),
// //       ],
// //     });

// //     // Restore the cache with the merged data
// //     client.cache.restore(data);
// //   }

// //   // For SSG and SSR always create a new Apollo Client
// //   if (typeof window === 'undefined') {
// //     return client;
// //   }

// //   // Create the Apollo Client once in the client
// //   if (!apolloClient) {
// //     apolloClient = client;
// //   }

// //   return client;
// // }

// // export function addApolloState(
// //   client: ApolloClient<NormalizedCacheObject>,
// //   pageProps: PageProps,
// // ) {
// //   if (pageProps?.props) {
// //     pageProps.props[APOLLO_STATE_PROPERTY_NAME] = client.cache.extract();
// //   }

// //   return pageProps;
// // }

// // export function useApollo(pageProps: PageProps) {
// //   const state = pageProps[APOLLO_STATE_PROPERTY_NAME];
// //   const store = useMemo(() => initializeApollo(state), [state]);

// //   return store;
// // }



// // import { ApolloClient, createHttpLink, HttpLink, InMemoryCache, makeVar, useApolloClient } from "@apollo/client";
// // import { setContext } from '@apollo/client/link/context';
// // import { useMemo } from "react";

// // export const LOCALSTORAGE_TOKEN = "vesiyer-token";
// // const token =
// //   typeof window !== "undefined"
// //     ? localStorage.getItem(LOCALSTORAGE_TOKEN)
// //     : "null";
// // export const isLoggedInVar = makeVar(Boolean(token));
// // export const authToken = makeVar(token);



// // const authLink = setContext((_, { headers }) => {
// //   return {
// //     headers: {
// //       ...headers,
// //       authorization: authToken() ? `Bearer ${authToken()}` : "",
// //     },
// //   };
// // });

// // // uri: "https://api.vestiyer.co/graphql",
// // const httpLink = createHttpLink({
// //   uri: 'http://localhost:4000/graphql',
// //   credentials: 'include',
// // });


// // function createApolloClient() {
// //   return new ApolloClient({
// //     ssrMode: typeof window === 'undefined', // set to true for SSR

// //     link: authLink.concat(httpLink),
// //     cache: new InMemoryCache({
// //       typePolicies: {
// //         Query: {
// //           fields: {
// //             isLoggedIn: {
// //               read() {
// //                 return isLoggedInVar();
// //               },
// //             },
// //             token: {
// //               read() {
// //                 return authToken();
// //               },
// //             },
// //           },
// //         },
// //       },
// //     }),
// //     credentials: 'include',
// //   });
// // }

// // let apolloClient

// // export function initializeApollo(initialState = null) {


// //   const _apolloClient = apolloClient ?? createApolloClient();

// //   // If your page has Next.js data fetching methods that use Apollo Client,
// //   // the initial state gets hydrated here
// //   if (initialState) {
// //     // Get existing cache, loaded during client side data fetching
// //     const existingCache = _apolloClient.extract();

// //     // Restore the cache using the data passed from
// //     // getStaticProps/getServerSideProps combined with the existing cached data
// //     _apolloClient.cache.restore({ ...existingCache, ...initialState });
// //   }

// //   // For SSG and SSR always create a new Apollo Client
// //   if (typeof window === 'undefined') return _apolloClient;

// //   // Create the Apollo Client once in the client
// //   if (!apolloClient) apolloClient = _apolloClient;
// //   return _apolloClient;
// // }

// // export function useApollo(initialState) {
// //   const store = useMemo(() => initializeApollo(initialState), [initialState]);
// //   return store;
// // }

import { useMemo } from "react";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getSession, signIn, useSession } from "next-auth/react";

let apolloClient: ApolloClient<any>;

function createApolloClient() {
  const httpLink = new HttpLink({
    uri: "http://localhost:4000/graphql",
      credentials: 'include',

  });

  const authLink = setContext(async (_, { headers }) => {
    const session = (await getSession()) as any;

    if (session?.error === "RefreshAccessTokenError") {
      signIn(); // Force sign in to hopefully resolve error
    }
    // const {data} = useSession()
    // const accessToken = data?.accessToken

if(session?.accessToken){
  return {
    headers: {
      ...headers,
      // authorization: accessToken ? `Bearer ${accessToken}` : null
      authorization: session?.accessToken
        ? `Bearer ${session?.accessToken}`
        : null,
    },
  };
}else{
  return {
    headers: {
      ...headers,
  
    },
  };
}


  
  });


  return new ApolloClient({
    ssrMode: typeof window === "undefined", // set to true for SSR
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState: any = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Restore the cache using the data passed from
    // getStaticProps/getServerSideProps combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}

export function useApollo(initialState: any) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}


