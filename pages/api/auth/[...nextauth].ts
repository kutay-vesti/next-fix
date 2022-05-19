// import NextAuth from "next-auth"
// import GoogleProvider from "next-auth/providers/google"
// import FacebookProvider from "next-auth/providers/facebook"
// import GithubProvider from "next-auth/providers/github"
// import TwitterProvider from "next-auth/providers/twitter"
// import Auth0Provider from "next-auth/providers/auth0"
// import CredentialsProvider from "next-auth/providers/credentials"
// import { gql } from "@apollo/client"
// import { initializeApollo } from "../../../lib/apolloClient"
// import { refreshAccessToken } from "../../../lib/refreshAccessToken"
// // import AppleProvider from "next-auth/providers/apple"
// // import EmailProvider from "next-auth/providers/email"

// export const LOGIN_MUTATION = gql`
//   mutation loginMutation($input: LoginInput!) {
//     login(input: $input) {
//     accessToken
//     accessTokenExpiresAt
//     refreshToken
//     ok
//   error
//     }
//   }
// `;

// // For more information on each option (and a full list of options) go to
// // https://next-auth.js.org/configuration/options
// export default NextAuth({
//   // https://next-auth.js.org/configuration/providers/oauth
//   providers: [
//     CredentialsProvider({
//       // The name to display on the sign in form (e.g. 'Sign in with...')
//       name: 'Credentials',
//       // The credentials is used to generate a suitable form on the sign in page.
//       // You can specify whatever fields you are expecting to be submitted.
//       // e.g. domain, username, password, 2FA token, etc.
//       // You can pass any HTML attribute to the <input> tag through the object.
//       credentials: {
//         email: { label: "Username", type: "text", placeholder: "jsmith" },
//         password: {  label: "Password", type: "password" }
//       },
//       async authorize(credentials, req) {
//         const apolloClient = initializeApollo();
//         // You need to provide your own logic here that takes the credentials
//         // submitted and returns either a object representing a user or value
//         // that is false/null if the credentials are invalid.
//         // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
//         // You can also use the `req` object to obtain additional parameters
//         // (i.e., the request IP address)
// const {data,errors} = await apolloClient.mutate({mutation:LOGIN_MUTATION, variables:{
//   input:{
//     email:credentials?.email,
//     password:credentials?.password,
//   }
// }})
  
//         // If no error and we have user data, return it
//         if (data.login.ok && data) {
//           console.log("data",data)
//           return data.login
//         }
//         // Return null if user data could not be retrieved

//       }
//     })
//   ]
// ,
//   callbacks: {
//     async jwt({   token,user }) {
//       if(user){
//         console.log("user var")


     
//      token.accessToken = user.accessToken as string
//      token.accessTokenExpiresAt = user.accessTokenExpiresAt
// console.log("type", typeof token.accessTokenExpiresAt)
// return token
// }
// // if(Date.now() < new Date(token.accessTokenExpiresAt).getTime()){
//   //   return token;
//   // }
//   console.log("user",user)
//       console.log("token",token)
//     return token;
//     // return await refreshAccessToken(token)
//   },
// //  @ts-ignore
// session: (session: Session, token: JWT) => {
//   // don't include refresh token for security purposes

//   session.accessToken = token.accessToken as string;
//   session.error = token.error;

//   return session;
// },
//   },
// })
    

import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { gql } from "@apollo/client";

import { url } from "inspector";
import { JWT } from "next-auth/jwt";

import { initializeApollo } from "@lib/apollo";
import { refreshAccessToken } from "@lib/refreshAccessToken";

export const LOGIN_MUTATION = gql`
  mutation loginMutation($input: LoginInput!) {
    login(input: $input) {
      accessToken
      accessTokenExpiresAt
      refreshToken
    }
  }
`;
// import AppleProvider from "next-auth/providers/apple"
// import EmailProvider from "next-auth/providers/email"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    CredentialsProvider({
      name: "Recog Credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "email",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "password",
        },
      },
      authorize: async (credentials) => {
        const apolloClient = initializeApollo();
        try {
          const { data, errors } = await apolloClient.mutate({
            mutation: LOGIN_MUTATION,
            variables: {
              input: {
                email: credentials?.email,
                password: credentials?.password,
              },
            },
          });

          if (errors) throw new Error("errors");
          if (!data) throw new Error("Data not returned!");

          return data.login;
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // console.log("user", user);
      // console.log("token", token);
      if (user) {
        const {    
            accessToken,
          
            accessTokenExpiresAt,
         
            refreshToken
          } = user

       return {    
        accessToken,
      
        accessTokenExpiresAt,
     
        refreshToken
      } 
       
      }

      
      if (Date.now() < new Date(token.accessTokenExpiresAt + "").getTime()) {
        // console.log("trueee")
        return token;
      }
      // else{
    
      //   console.log("false");
      //   console.log("date now", Date.now())
      //   console.log("date now", new Date(Date.now()))
      //   console.log("token date", token.accessTokenExpiresAt)
      //   console.log("token date type", typeof token.accessTokenExpiresAt)
      //   console.log("date now new", new Date(token.accessTokenExpiresAt))
      //   console.log("date now get", new Date(token.accessTokenExpiresAt + "").getTime())
        
      // }
      return await refreshAccessToken(token);
    },

    //     jwt: async (token: JWT, user: User) => {
    //       // check if initial sign-in request
    //       if (user) {
    //         console.log("user",user)
    //         const {
    //           token
    //         } = user;
    // console.log("token",token)
    //         return {
    //           token
    //         };
    //       }

    //       if (Date.now() < new Date(token).getTime()) {
    //         return token;
    //       }

    //       return await refreshAccessToken(token);
    //     },
    // @ts-ignore
    // session: (session: Session, token: JWT) => {
    //   console.log("jwt", token);
    //   console.log("session", session);
    //   // don't include refresh token for security purposes
    //   // session.user = token.user;
    //   session.accessToken = token.accessToken as string;
    //   // session.error = token.error;

    //   return session;
    // },

    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      // console.log("jwt", token);
      //   console.log("session", session);
        // don't include refresh token for security purposes
        // session.user = token.user;
        session.accessToken = token.accessToken
        // session.error = token.error;
  
        return session;
    }

    // async session({ session, token }) {
    //   // Send properties to the client, like an access_token from a provider.
    //        console.log("jwt",token)
    //   console.log("session",session)
    //   session.accessToken = token.accessToken
    //   return session
    // }
  },
  // secret:"vestiyersecretkey"
  pages:{
    signIn:"auth/login",
    error:"auth/login",
  }
});
