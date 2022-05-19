import { gql, useQuery } from "@apollo/client";

import { getMeQuery } from "graphql/queries";
import { meQuery } from "graphql/__generated__/meQuery";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

interface IUseUser {
  protectedRoute?: boolean;
}

export default function useUser() {
  const { data, error, loading, refetch } = useQuery<meQuery>(getMeQuery);
  // const router = useRouter();

  // console.log("data", data);
  // console.log("protectedRoute", protectedRoute);

  // useEffect(() => {
  //   if (protectedRoute && !data) {
  //     console.log("true");
  //     router.replace("/auth/login");
  //   }
  //   if (error) {
  //     // router.replace("/auth/login");
  //     console.log("error");
  //   }
  // }, [data, router, error, protectedRoute]);

  return { data, loading, error };
}
