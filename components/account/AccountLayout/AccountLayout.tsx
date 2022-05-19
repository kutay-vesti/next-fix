import { useRouter } from "next/router";
import * as _ from "lodash";
import React, { Children } from "react";
import Link from "next/link";

interface IAccountLayout {
  children: React.ReactNode;
}

const AccountLayout: React.FC<IAccountLayout> = ({ children }) => {
  const router = useRouter();

  // console.log("layout router", router);
  const [_1, currentLocation] = _.split(router?.pathname, "account/", 2);
  // console.log(currentLocation);
  // const currentLocation = "profile";
  return (
    <div className="  flex flex-col  tablet:flex-row items-start justify-center p-4 te">
      {/* <div className="flex flex-row max-w-7xl w-full h-full "> */}
      {/* top side */}

      <div></div>
      {/* left side */}
      <div className=" tablet:block  tablet:w-fit w-full">
        <h2 className="font-semibold text-2xl sr-only">Hesabım</h2>

        <ul
          className="flex h-fit  items-start mt-20 tablet:mt-0
         tablet:flex-col justify-between  tablet:justify-start tablet:min-h-[50vh] w-full tablet:w-[224px]"
        >
          <li
            className={`   ${
              currentLocation === "dashboard"
                ? "bg-[#f8f8f8] rounded-md  "
                : "  rounded-md  "
            } hover:bg-[#f8f8f8] py-4 px-5 w-full`}
          >
            {/* <li className="bg-yellow-100 rounded-md h-10 w-full p-2"> */}
            <Link key="1" href="/account/dashboard">
              <a className="flex flex-col items-center justify-center gap-y-3 tablet:flex-row tablet:justify-start gap-x-3">
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
                <span className=" text-sm font-normal hover:underline">
                  Profilim
                </span>
              </a>
            </Link>
          </li>
          <li
            className={`   ${
              currentLocation === "orders"
                ? "bg-[#f8f8f8] rounded-md  "
                : "  rounded-md  "
            } hover:bg-[#f8f8f8] py-4 px-5 w-full`}
          >
            <Link key="2" href="/account/orders">
              <a className="flex flex-col items-center justify-center gap-y-3 tablet:flex-row tablet:justify-start gap-x-3">
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
                <span className="text-sm font-normal  hover:underline  ">
                  Siparişlerim
                </span>
              </a>
            </Link>
          </li>
          <li
            className={`   ${
              currentLocation === "profile"
                ? "bg-[#f8f8f8] rounded-md  "
                : "  rounded-md  "
            } hover:bg-[#f8f8f8]  px-5 py-3 tablet:py-4 tablet:px-5 w-full text-center tablet:text-left`}
          >
            <Link key="3" href="/account/profile">
              <a className="flex flex-col items-center justify-center gap-y-3 tablet:flex-row tablet:justify-start gap-x-3">
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
                <span className="text-sm font-normal  hover:underline">
                  Hesapım
                </span>{" "}
              </a>
            </Link>
          </li>

          <li
            className={`   ${
              currentLocation === "addresses"
                ? "bg-[#f8f8f8] rounded-md  "
                : "  rounded-md  "
            } hover:bg-[#f8f8f8] px-5 py-3 tablet:py-4 tablet:px-5 w-full text-center tablet:text-left`}
          >
            <Link key="6" href="/account/addresses">
              <a className="flex flex-col items-center justify-center gap-y-3 tablet:flex-row tablet:justify-start gap-x-3">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.5 19.5V15a6.5 6.5 0 00-4-6 2.5 2.5 0 00-5 0 6.5 6.5 0 00-4 6v4.5a2 2 0 01-2 2h17a2 2 0 01-2-2zM14 21.5a2 2 0 01-4 0M3.5 9A5.5 5.5 0 019 3.5M.5 9A8.5 8.5 0 019 .5M20.5 9A5.5 5.5 0 0015 3.5M23.5 9A8.5 8.5 0 0015 .5"
                    stroke="#000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <span className="text-sm font-normal  hover:underline">
                  Adresim
                </span>
              </a>
            </Link>
          </li>
        </ul>
      </div>
      {/* right side */}
      <div className="mt-4 w-full h-full">{children}</div>
    </div>
    // </div>
  );
};

export default AccountLayout;
