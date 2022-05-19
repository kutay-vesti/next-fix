import { gql } from "@apollo/client";

import { JWT } from "next-auth/jwt";
import { initializeApollo } from "./apollo";



export const REFRESH_TOKEN_MUTATION = gql`
  mutation refreshTokenMutation($input: RefreshTokenInput!) {
    refreshToken(input: $input) {
    accessToken
    accessTokenExpiresAt

    # ok
    # error
    }
  }
`;

export const refreshAccessToken = async ({ refreshToken, ...token }: JWT) => {
  const apolloClient = initializeApollo();
  // console.log("refresh yenileniyor")

  try {

    const {data} = await apolloClient.mutate({mutation:REFRESH_TOKEN_MUTATION,
    variables:{input:{
      refreshToken: refreshToken
    }}})
    // const { data } = await apolloClient.mutate({
    //   mutation: gql`
    //     mutation RefreshToken($input: RefreshTokenInput!) {
    //       response: refreshToken(input: $input) {
    //         accessToken
    //         accessTokenExpiresAt
    //       }
    //     }
    //   `,
    //   variables: {
    //     input: {
    //       refreshToken,
    //     },
    //   },
    // });

    // if (!data) {
    //   return {
    //     error: "RefreshAccessTokenError",
    //   };
    // }

    // console.log("data refresh",data.refreshToken)

    // const { refreshToken } = data;

    return {
      ...token,
      ...data.refreshToken,
      refreshToken,
    };
  } catch (error) {
    return {
      error: "RefreshAccessTokenError",
    };
  }
};
