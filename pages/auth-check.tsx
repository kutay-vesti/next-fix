import { useQuery } from "@apollo/client";
import useUser from "@lib/hooks/useUser";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

// import useCart from '../hooks/myCart';

const AuthCheck: NextPage = () => {
  const { data, loading, error } = useUser();

  console.log("data", data);
  console.log("error", error);
  console.log("loading", loading);
  return <div>div</div>;
};

export default AuthCheck;
