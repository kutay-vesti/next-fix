import Link from "next/link";
import { FC } from "react";

const Hero: FC = () => {
  return (
    <div className="relative -z-50">
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100" />
      <div className="w-full ">
        <div className="relative shadow-xl ">
          <div className="absolute inset-0">
            <img
              className="h-full w-full object-cover"
              src="https://cdn.rtrcdn.com/assets/imgs/20211229_ReturnHP_Hero.jpg"
              alt="People working on laptops"
            />
          </div>
          <div className="relative flex flex-col px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
            <h1 className="text-left leading-snug text-4xl font-semibold tracking-normal sm:text-5xl lg:text-6xl  ">
              <span className=" text-white leading-snug  ">
                Your Dream Closet,
              </span>
              <br />
              <span className="text-white leading-snug ">On Demand</span>
            </h1>

            <span
              className="text-lg text-white mt-6 max-w-lg text-left
           sm:max-w-3xl"
            >
              Have everything you’ve ever wanted to wear (and then some!)
              <br />
              without buying a single thing. That’s the magic of rental.
              <br />
            </span>
            <div>
              <span
                className="text-lg text-white mt-6 max-w-lg text-left
           sm:max-w-3xl"
              >
                <b>Trials start at $69</b>
              </span>
            </div>

            <div className="mt-10 sm:max-w-none sm:flex sm:justify-start">
              <div className="space-y-4 sm:space-y-0  sm:inline-grid sm:grid-cols-2 sm:gap-5">
                <button className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-gray-900 bg-white hover:opacity-80 sm:px-8">
                  Explore Membership
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
