import Link from "next/link";
import { Logo } from "@components/ui";

function CheckoutHeader() {
  return (
    <header className="flex flex-row bg-black ">
      <div className="flex flex-row items-center  justify-end ">
        <Link href="/">
          <a className="h-[60px] invert p-1  flex justify-center items-center">
            <Logo></Logo>
          </a>
        </Link>
        <h1 className="font-semibold text-xl text-white flex items-center gap-x-0.5">
          <svg width="14" height="16" fill="none">
            <path
              d="M12 6.333h-.5V4.5a4.5 4.5 0 10-9 0v1.833H2A1.333 1.333 0 00.667 7.667v7A1.333 1.333 0 002 16h10a1.334 1.334 0 001.333-1.333v-7A1.334 1.334 0 0012 6.333zm-5 6a1.333 1.333 0 110-2.667 1.333 1.333 0 010 2.667zM9.833 6a.333.333 0 01-.333.333h-5A.333.333 0 014.167 6V4.5a2.833 2.833 0 115.666 0V6z"
              fill="#7E7E7E"
            ></path>
          </svg>
          <span className="flex flex-col"></span>
          Secure Checkout
        </h1>
      </div>
    </header>
  );
}

export default CheckoutHeader;
