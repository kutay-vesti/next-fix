import { gql, useQuery } from "@apollo/client";
import { getAccessToken } from "@lib/accesstoken";
import { getMeQuery } from "graphql/queries";
import { meQuery } from "graphql/__generated__/meQuery";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function useUser() {
  const { data, error, loading, refetch } = useQuery<meQuery>(getMeQuery);
  const router = useRouter();

  useEffect(() => {
    if (getAccessToken() !== "") {
      refetch();
    }
  }, [getAccessToken()]);

  useEffect(() => {
    if (error) {
      // router.replace("/login");
      console.log("error");
    }
  }, [error, router]);

  return { data, loading, error };
}
