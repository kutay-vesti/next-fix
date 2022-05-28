import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import ReturnLP_Hero_DESK_05052022 from "./../../../assets/ReturnLP_Hero_DESK_05052022.webp";
import ReturnHP_Hero_Mobile_New from "./../../../assets/ReturnHP_Hero_Mobile_New.webp";

const Hero: FC = () => {
  return (
    <div className="relative -z-50 h-fit">
      {/* <div className="absolute inset-x-0 bottom-0 bg-gray-100" /> */}
      <div className="w-full h-fit">
        <div className="relative  h-fit  ">
          <div className="block h-fit">
            {/* <img
              src={ReturnLP_Hero_DESK_05052022}
              className="h-full w-full object-cover"
              alt="People working on laptops"
            /> */}
            <div className="hidden phoneFin:block h-full">
              <Image
                src={ReturnLP_Hero_DESK_05052022}
                alt="people"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="block phoneFin:hidden h-fit">
              <Image
                src={ReturnHP_Hero_Mobile_New}
                alt="people"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div
            className="absolute text-left phoneFin:text-center  top-1/2 left-1/2 -ml-16 phoneFin:ml-0 
        transform -translate-x-1/2
           -translate-y-1/2 flex flex-col
           phoneFin:px-4 phoneFin:py-16 lg:py-32 lg:px-8"
          >
            <h1 className=" leading-snug text-4xl font-semibold tracking-normal sm:text-5xl lg:text-6xl   ">
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

            <div className="mt-10 sm:max-w-none sm:flex sm:justify-start self-start phoneFin:self-center">
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
