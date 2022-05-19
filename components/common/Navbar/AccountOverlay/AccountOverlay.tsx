import { useApolloClient, useQuery } from "@apollo/client";
import { Account } from "@components/icons";

import { getMeQuery, getMyCartQuery } from "graphql/queries";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FC } from "react";
import { Cookies } from "react-cookie";

const AccountOverlay: FC = () => {
  const { data, loading, error, refetch: reFetchMe } = useQuery(getMeQuery);
  const { refetch } = useQuery(getMyCartQuery);
  // console.log("account overlay ", data);
  const { data: session, status } = useSession();

  // console.log("session status", session, status);
  const client = useApolloClient();
  if (loading) {
    return (
      <div className="antialiased  z-50 rounded-full flex items-center justify-center  ">
        <div className="group inline-block relative hover:bg-[#efefef] rounded-full p-2  ">
          <Link href="/account/orders">
            <a>
              <Account className="h-6 w-6    text-[#333] hover:opacity-90  " />
            </a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="antialiased  z-50 rounded-full flex items-center justify-center  ">
      <div className="group inline-block relative hover:bg-[#efefef] rounded-full p-2  ">
        <Link href={!session ? "/auth/login/" : "/account/orders"}>
          <a>
            <Account className="h-6 w-6    text-[#333] hover:opacity-90  " />
          </a>
        </Link>
        <div className="">
          <ul className="absolute hidden -translate-x-1/2 w-56 h-fit bg-transparent pt-4 -mt-1 group-hover:block z-50">
            <div className=" text-gray-700  bg-white shadow-lg p-4  ">
              <li className="">
                {data === undefined ? (
                  <div className="pb-4 flex gap-x-1">
                    <Link href="/auth/login">
                      <a className="bg-white border w-full text-center py-1.5 rounded-2xl text-sm font-semibold hover:border-gray-400">
                        Giriş
                      </a>
                    </Link>
                    <Link href="/create-account">
                      <a className="bg-black text-white border w-full text-center py-1.5 rounded-2xl text-sm font-semibold hover:opacity-70">
                        <span>Kaydol</span>
                      </a>
                    </Link>
                  </div>
                ) : (
                  <Link href={!session ? "/auth/login/" : "/account/orders"}>
                    <a className="rounded-t    pb-4 block whitespace-no-wrap">
                      {data.me.firstname ? (
                        <span className="font-semibold text-sm m-3">
                          Merhaba <span>{data.me.firstname}</span>
                        </span>
                      ) : (
                        <span className="font-semibold text-sm m-3">
                          Hoşgeldiniz
                        </span>
                      )}
                    </a>
                  </Link>
                )}
              </li>
              <div className="border-t  px-1  border-gray-200"> </div>
              <li className="">
                <Link href={!session ? "/auth/login" : "/account/dashboard"}>
                  <a className=" flex justify-start  items-center h-12 hover:bg-[#f0f0f0] rounded-md py-2 px-4  whitespace-no-wrap gap-x-4">
                    <svg
                      width="24"
                      height="17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.5 12a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0v0zM13.06 10.939l4.951-4.949M2.5 12.5h2M21.5 12.5h-2M20.776 8.365l-1.847.765M15.635 3.223L14.87 5.07M12 2.5v2M8.365 3.223L9.13 5.07M5.283 5.282l1.412 1.415M3.224 8.365l1.846.765"
                        stroke="#000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M12 .5A11.5 11.5 0 00.5 12v3.5a1 1 0 001 1h21a1 1 0 001-1V12A11.5 11.5 0 0012 .5v0z"
                        stroke="#000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                    <span>Dashboard</span>
                  </a>
                </Link>
              </li>
              <li className="">
                <Link href={!session ? "/auth/login" : "/account/orders"}>
                  <a className=" flex justify-start  items-center h-12 hover:bg-[#f0f0f0] rounded-md py-2 px-4  whitespace-no-wrap gap-x-4">
                    <svg
                      width="24"
                      height="16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.75 7.006h-.001M16.164 15.3a1.001 1.001 0 01-.84.025l-6.966-2.973a1 1 0 01-.608-.92V4.643a1 1 0 01.577-.906L14.857.69a1 1 0 01.795-.022l6.469 2.588a1 1 0 01.629.928v7.205a1 1 0 01-.553.894L16.164 15.3zM15.75 7.006L22.562 3.6"
                        stroke="#000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M7.928 4.073l7.82 2.933v8.397M18.98 5.39l-7.383-3.18M1.25 8.876l.047.021 3.953 1.826M2.882 6.13L5.25 7.223M4.123 3.203l1.127.52"
                        stroke="#000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                    <span>My orders</span>
                  </a>
                </Link>
              </li>
              <li className="">
                <Link href={!session ? "/auth/login" : "/account/profile"}>
                  <a className=" flex justify-start  items-center h-12 hover:bg-[#f0f0f0] rounded-md py-2 px-4  whitespace-no-wrap gap-x-4">
                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.068 14.184l-3.795.543.543-3.795 9.758-9.758a2.299 2.299 0 113.252 3.252l-9.758 9.758z"
                        stroke="#000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M12 5.5H2.5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V12"
                        stroke="#000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                    <span>My info</span>
                  </a>
                </Link>
              </li>
              <li className="">
                <Link href={!session ? "/auth/login" : "/account/addresses"}>
                  <a className=" flex justify-start  items-center h-12 hover:bg-[#f0f0f0] rounded-md py-2 px-4  whitespace-no-wrap gap-x-4">
                    <svg
                      width="24"
                      height="17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.5 12a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0v0zM13.06 10.939l4.951-4.949M2.5 12.5h2M21.5 12.5h-2M20.776 8.365l-1.847.765M15.635 3.223L14.87 5.07M12 2.5v2M8.365 3.223L9.13 5.07M5.283 5.282l1.412 1.415M3.224 8.365l1.846.765"
                        stroke="#000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M12 .5A11.5 11.5 0 00.5 12v3.5a1 1 0 001 1h21a1 1 0 001-1V12A11.5 11.5 0 0012 .5v0z"
                        stroke="#000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                    <span>Notifications</span>
                  </a>
                </Link>
              </li>
              <div
                className={`${
                  data?.me.role === "User" ? "" : "hidden"
                } border-t  px-1  border-gray-200`}
              >
                {" "}
              </div>
              <li className={`${data?.me.role === "User" ? "" : "hidden"}`}>
                <button
                  onClick={() => {
                    // localStorage.clear();

                    // reFetchMe();
                    // refetch();
                    // window.location.reload();
                    signOut();
                  }}
                  className=" w-full flex justify-start  items-center h-12 hover:bg-[#f0f0f0] rounded-md py-2 px-4  whitespace-no-wrap gap-x-4"
                >
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.414 16.5a11.5 11.5 0 100-9M12.5 16l4-4-4-4M16.5 12H.5"
                      stroke="#4D4D4D"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <span>Sign out</span>
                </button>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AccountOverlay;
