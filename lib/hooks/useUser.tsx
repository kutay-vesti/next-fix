import { gql, useQuery } from "@apollo/client";
import { getMeQuery } from "graphql/queries";
import { meQuery } from "graphql/__generated__/meQuery";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function useUser() {
  const { data, error, loading } = useQuery<meQuery>(getMeQuery);
  const router = useRouter();
  useEffect(() => {
    if (error) {
      router.replace("/login");
    }
  }, [error, router]);

  return { data, loading, error };
}
